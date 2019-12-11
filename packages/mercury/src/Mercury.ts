import request from 'superagent'
import log from './lib/log'
import { MercuryAdapter } from './MercuryAdapter'
import MercuryAdapterDeepstream, {
	IMercuryAdapterDeepstreamOptions
} from './adapters/MercuryAdapterDeepstream'

export interface IOnData {
	/** The event name that is being triggered */
	eventName: string
}

export type TOnFunctionHandler = (data: IOnData) => void
export type TOnPromiseHandler = (data: IOnData) => Promise<void>
export type TOnHandler = TOnFunctionHandler | TOnPromiseHandler

export enum MercuryAdapterKind {
	Deepstream = 'deepstream'
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
	adapter: MercuryAdapter

	/** Adapter connection options */
	adapterOptions: Record<string, any>
}

export enum MercuryRole {
	User = 'user',
	Skill = 'skill',
	Anonymous = 'anonymous'
}

export class Mercury {
	public logLevel = 'warn'
	public isConnected = false
	private adapter?: MercuryAdapter

	constructor(options?: { spruceApiUrl: string; credentials?: MercuryAuth }) {
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
	public on(eventName: string, handler: TOnHandler): void {
		// Check if the handler is a promise
		const objToCheck = handler as any
		if (objToCheck && typeof objToCheck.then === 'function') {
			this.onPromise(eventName, handler as TOnPromiseHandler)
		} else if (objToCheck && typeof objToCheck === 'function') {
			this.onFunction(eventName, handler as TOnFunctionHandler)
		} else {
			// Bad
			log.warn('Evnet handler not recognized as a callback or Promise')
		}
	}

	private onPromise(eventName: string, handler: TOnPromiseHandler) {}

	private onFunction(eventName: string, handler: TOnFunctionHandler) {}

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
				this.adapter.init(connectionOptions)
				isAdapterSet = true
				break
			default:
				break
		}

		return isAdapterSet
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
}
