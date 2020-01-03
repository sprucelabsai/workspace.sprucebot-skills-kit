import request from 'superagent'
import log from './lib/log'
import { MercuryAdapter } from './MercuryAdapter'
import MercuryAdapterDeepstream, {
	IMercuryAdapterDeepstreamOptions
} from './adapters/MercuryAdapterDeepstream'
import MercuryAdapterSocketIO from './adapters/MercuryAdapterSocketIO'

export interface IOnData {
	/** The event name that is being triggered */
	eventName: string
}

export type TOnFunctionHandler = (data: IOnData) => void
export type TOnPromiseHandler = (data: IOnData) => Promise<void>
export type TOnConnectPromiseHandler = () => Promise<void>
export type TOnHandler = TOnFunctionHandler | TOnPromiseHandler

export enum MercuryAdapterKind {
	Deepstream = 'deepstream',
	// eslint-disable-next-line spruce/prefer-pascal-case-enums
	SocketIO = 'socketio'
}

export interface IMercuryError {}

/** Authenticate with Mercury as a User */
export interface IMercuryAuthUser {
	/** The user's JWT token */
	token: string
}
/** Authenticate with Mercury as a Skill */
export interface IMercuryAuthSkill {
	/** Your skill's ID */
	id: string

	/** Your skill's API key */
	apiKey: string
}

/** Authenticate with Mercury as a user */
export interface IMercuryAuthUsernamePassword {
	/** Your skill's ID */
	username: string

	/** Your skill's API key */
	password: string
}

export interface IAuthStatus {
	isAuthenticated: boolean
}

export type MercuryAuth =
	| IMercuryAuthUser
	| IMercuryAuthSkill
	| IMercuryAuthUsernamePassword

export interface IMercuryConnectOptions {
	/** The adapter the client should use */
	adapter: MercuryAdapterKind

	/** Adapter connection options */
	adapterOptions: Record<string, any>
}

export enum MercuryRole {
	User = 'user',
	Skill = 'skill',
	Anonymous = 'anonymous'
}

export interface IMercuryOnOptions {
	eventName: string
	organizationId?: string | null
	locationId?: string | null
	userId?: string | null
}

export class Mercury {
	public logLevel = 'warn'
	public isConnected = false
	private clientOnConnect?: TOnConnectPromiseHandler
	private adapter?: MercuryAdapter
	private eventHandlers: Record<string, TOnHandler> = {}

	constructor(options?: {
		spruceApiUrl: string
		credentials?: MercuryAuth
		onConnect?: TOnConnectPromiseHandler
	}) {
		this.clientOnConnect = options && options.onConnect
		this.connect(options)
			.then(() => {
				log.debug('Mercury connect finished')
			})
			.catch(e => {
				log.warn(e)
			})
	}

	public async connect(options?: {
		spruceApiUrl: string
		credentials?: MercuryAuth
	}): Promise<void> {
		if (!options) {
			log.warn('Mercury not initialized. Missing "options" in constructor')
			return
		}

		const adapterOptions = await this.getAdapterOptions(options)
		this.setAdapter(adapterOptions)
	}

	/** Subscribe to events */
	public on(options: IMercuryOnOptions, handler: TOnHandler): void {
		if (!this.adapter) {
			log.debug('Mercury: Unable to set .on() event because no adapter is set')
			return
		}
		const { eventName, organizationId, locationId, userId } = options
		const key = this.getEventHandlerKey(options)
		this.eventHandlers[key] = handler
		this.adapter.on(options)
		// Check if the handler is a promise
		// const objToCheck = handler as any
		// if (objToCheck && typeof objToCheck.then === 'function') {
		// 	// this.onPromise(eventName, handler as TOnPromiseHandler)
		// 	this.eventHandlers[key] = handler
		// } else if (objToCheck && typeof objToCheck === 'function') {
		// 	// this.onFunction(eventName, handler as TOnFunctionHandler)
		// 	this.eventHandlers[key] = this.onFunction(handler as TOnFunctionHandler)
		// } else {
		// 	// Bad
		// 	log.warn('Event handler not recognized as a callback or Promise')
		// }
	}

	public emit(options: {
		eventName: string
		organizationId?: string | null
		locationId?: string | null
		userId?: string | null
		payload?: Record<string, any>
	}) {}

	// private onPromise(eventName: string, handler: TOnPromiseHandler) {}

	// private onFunction(eventName: string, handler: TOnFunctionHandler) {}
	// private onFunction(handler: TOnFunctionHandler) {
	// 	return new Promise(resolve => {
	// 		handler()
	// 	})
	// }

	private setAdapter(options: {
		adapter: MercuryAdapterKind
		connectionOptions: Record<string, any>
	}): boolean {
		const { adapter, connectionOptions } = options
		log.debug('setAdapter', { options })
		// TODO: Globby the adapters directory and set the correct one when we have multiple
		let isAdapterSet = false
		switch (adapter) {
			case MercuryAdapterKind.Deepstream:
				this.adapter = new MercuryAdapterDeepstream()
				this.adapter.init(
					connectionOptions,
					this.handleEvent.bind(this),
					this.onConnect.bind(this)
				)
				isAdapterSet = true
				break

			case MercuryAdapterKind.SocketIO:
				this.adapter = new MercuryAdapterSocketIO()
				this.adapter.init(
					connectionOptions,
					this.handleEvent.bind(this),
					this.onConnect.bind(this)
				)
				isAdapterSet = true
				break
			default:
				break
		}

		return isAdapterSet
	}

	private getEventHandlerKey(options: IMercuryOnOptions): string {
		const { eventName, organizationId, locationId, userId } = options

		let key = `events-${eventName}`

		if (organizationId) {
			key += `-organizations-${organizationId}`
		}
		if (locationId) {
			key += `-locations-${locationId}`
		}
		if (userId) {
			key += `-users-${userId}`
		}

		return key
	}

	private async getAdapterOptions(options: {
		spruceApiUrl: string
		credentials?: MercuryAuth
	}): Promise<{
		adapter: MercuryAdapterKind
		connectionOptions: Record<string, any>
	}> {
		const { spruceApiUrl, credentials } = options

		const response = await request
			.post(`${spruceApiUrl}/api/2.0/mercury/connect`)
			.send(credentials)

		return response.body
	}

	private async handleEvent(options: IOnData) {
		log.debug('Mercury: handleEvent', {
			options
		})
	}

	private async onConnect() {
		log.debug('Mercury: onConnect')
		if (this.clientOnConnect) {
			try {
				await this.clientOnConnect()
			} catch (e) {
				log.warn(e)
			}
		}
	}
}
