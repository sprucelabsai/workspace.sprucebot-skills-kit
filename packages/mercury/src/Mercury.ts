import request from 'superagent'
import log from './lib/log'
import { MercuryAdapter } from './MercuryAdapter'
import MercuryAdapterSocketIO from './adapters/MercuryAdapterSocketIO'

export interface IOnData {
	/** The event name that is being triggered */
	eventName: string

	/** The unique id for this event */
	eventId: string

	/** The skill that sent this data */
	skill: {
		id: string
		name: string
		slug: string
	}

	/** The data sent with this event */
	payload: Record<string, any>
}

export type TOnFunctionHandler = (data: IMercuryOnOptions) => void
export type TOnPromiseHandler = (data: IMercuryOnOptions) => Promise<void>
export type TOnHandler = TOnFunctionHandler | TOnPromiseHandler
export type TOnConnectPromiseHandler = () => Promise<void>
export type TOnConnectFunctionHandler = () => void
export type TOnConnectHandler =
	| TOnConnectPromiseHandler
	| TOnConnectFunctionHandler

export enum MercuryAdapterKind {
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
	scope: MercurySubscriptionScope
	eventName: string
	eventId?: string
	organizationId?: string | null
	locationId?: string | null
	userId?: string | null
	payload?: Record<string, any>
	responses?: Record<string, any>[]
}

export interface IMercuryAdapterOnOptions extends IMercuryOnOptions {
	credentials?: MercuryAuth
}

export interface IMercuryEmitOptions {
	eventId?: string
	eventName: string
	organizationId?: string | null
	locationId?: string | null
	userId?: string | null
	payload?: Record<string, any>
	credentials?: MercuryAuth
}

export interface IMercuryInitilizationOptions {
	/** The URL for the Spruce API */
	spruceApiUrl: string

	/** Your connection credentials to connect as either a User or a Skill */
	credentials?: MercuryAuth

	/**
	 * Callback function to execute when Mercury has connected.
	 * You should set up your event listeners mercury.on(...) in the onConnect callback
	 *
	 * This function will also be called in case of a reconnect
	 */
	onConnect?: TOnConnectHandler

	/**
	 * Callback function to execute when Mercury has disconnected.
	 *
	 * This callback usually doesn't need to be implemented.
	 * Mercury will handle cleanup of callback functions created in onConnect
	 */
	onDisconnect?: TOnConnectHandler
}

/** The scope of the data in a subscription */
export enum MercurySubscriptionScope {
	/** Anonymous (eventName only): Receives this event across all organizations and locations */
	AnonymousGlobal = 'anonymousGlobal',
	/** Anonymous (eventName only): Receives this event across an entire organization including all locations in the organization. */
	AnonymousOrganization = 'anonymousOrganization',
	/** Anonymous (eventName only): Receives this event across all organizations and locations */
	AnonymousLocation = 'anonymousLocation',
	/** Anonymous (eventName only): Receives this event for a user */
	AnonymousUser = 'anonymousUser',
	/** Receives this event across all organizations and locations */
	Global = 'global',
	/** Receives this event across an entire organization including all locations in the organization. */
	Organization = 'organization',
	/** Receives this event across all organizations and locations */
	Location = 'location',
	/** Receives this event for a user */
	User = 'user'
}

export class Mercury {
	public logLevel = 'warn'

	get isConnected(): boolean {
		if (this.adapter) {
			return this.adapter.isConnected
		}
		return false
	}
	private clientOnConnect?: TOnConnectHandler
	private clientOnDisconnect?: TOnConnectHandler
	private adapter?: MercuryAdapter
	private eventHandlers: Record<
		string,
		{
			onFinished: TOnHandler[]
			onResponse: TOnHandler[]
		}
	> = {}
	private credentials?: MercuryAuth

	constructor(options?: IMercuryInitilizationOptions) {
		this.connect(options)
			.then(() => {
				log.debug('Mercury connect finished')
			})
			.catch(e => {
				log.warn(e)
			})
	}

	/** Connects Mercury. Calling this method directly  */
	public async connect(options?: IMercuryInitilizationOptions): Promise<void> {
		if (!options) {
			log.warn('Mercury not initialized. Missing "options" in constructor')
			return
		}

		const { onConnect, onDisconnect, credentials } = options

		this.clientOnConnect = onConnect
		this.clientOnDisconnect = onDisconnect
		this.credentials = credentials

		const adapterOptions = await this.getAdapterOptions(options)
		this.setAdapter(adapterOptions)
	}

	/** Subscribe to events */
	public on(options: IMercuryOnOptions, handler: TOnHandler): void {
		if (!this.adapter) {
			log.debug('Mercury: Unable to set .on() event because no adapter is set')
			// Retry setting the subscription
			setTimeout(() => this.on(options, handler), 500)
			return
		}

		try {
			const key = this.getEventHandlerKey(options)
			if (!this.eventHandlers[key]) {
				this.eventHandlers[key] = {
					onFinished: [],
					onResponse: []
				}
			}
			this.eventHandlers[key].onResponse.push(handler)

			this.adapter.on({
				...options,
				credentials: this.credentials
			})
		} catch (e) {
			log.warn(e)
		}
	}

	/** Emit an event and set handler for responses */
	public emit(options: IMercuryEmitOptions, handler: TOnHandler) {
		if (!this.adapter) {
			log.warn('Mercury: Unable to emit because adapter is not set.')
			return
		}
		const eventId = this.uuid()
		if (!this.eventHandlers[eventId]) {
			this.eventHandlers[eventId] = {
				onFinished: [],
				onResponse: []
			}
		}
		this.eventHandlers[eventId].onResponse = [handler]
		this.adapter.emit({
			...options,
			eventId,
			credentials: this.credentials
		})

		return this.emitOnFinishedCallback(eventId)
	}

	private emitOnFinishedCallback(eventId: string): Promise<any> {
		let onFinishedHandler
		const onFinished = new Promise(resolve => {
			onFinishedHandler = resolve
		})

		if (!this.eventHandlers[eventId]) {
			this.eventHandlers[eventId] = {
				onFinished: [],
				onResponse: []
			}
		}
		if (onFinishedHandler) {
			this.eventHandlers[eventId].onFinished.push(onFinishedHandler)
		}

		return onFinished
	}

	private setAdapter(options: {
		adapter: MercuryAdapterKind
		connectionOptions: Record<string, any>
	}): boolean {
		const { adapter, connectionOptions } = options
		log.debug('setAdapter', { options })
		// TODO: Globby the adapters directory and set the correct one when we have multiple
		let isAdapterSet = false
		switch (adapter) {
			case MercuryAdapterKind.SocketIO:
				this.adapter = new MercuryAdapterSocketIO()
				this.adapter.init(
					connectionOptions,
					this.handleEvent.bind(this),
					this.onConnect.bind(this),
					this.onDisconnect.bind(this)
				)
				isAdapterSet = true
				break
			default:
				break
		}

		return isAdapterSet
	}

	/** Used for keepting track of callbacks in this.eventHandlers */
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

	/** Used for determining which callbacks to execute from this.eventHandlers */
	private getPossibleEventHandlerKeys(options: IMercuryOnOptions): string[] {
		const { eventName, userId, locationId, organizationId } = options
		const base = `events-${eventName}`
		const possibleHandlerKeys: string[] = []
		let orgKey: string | null = null
		let locationKey: string | null = null

		// Base event
		possibleHandlerKeys.push(base)

		if (organizationId) {
			orgKey = `organizations-${organizationId}`
			possibleHandlerKeys.push(`${base}-${orgKey}`)
		}
		if (locationId && orgKey) {
			locationKey = `locations-${locationId}`
			possibleHandlerKeys.push(`${base}-${orgKey}-${locationKey}`)
		}
		if (userId) {
			const userKey = `users-${userId}`
			possibleHandlerKeys.push(`${base}-${userKey}`)
			// if (orgKey) {
			// 	possibleHandlerKeys.push(`${base}-${orgKey}-${userKey}`)
			// }
			// if (orgKey && locationKey) {
			// 	possibleHandlerKeys.push(`${base}-${orgKey}-${locationKey}-${userKey}`)
			// }
		}

		return possibleHandlerKeys
	}

	/** Sends the authentication credentials to the API and gets back the adapter details to use for connecting */
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

	/** Called when the adapter detects an event. This function then looks to see if there are any callbacks for that event to invoke */
	private async handleEvent(options: IMercuryOnOptions) {
		log.debug('*** Mercury.handleEvent')
		log.debug('Mercury: handleEvent', {
			options
		})

		const eventId = options && options.eventId
		const eventName = options && options.eventName

		log.debug({ eventHandlers: this.eventHandlers })

		// Check if there is a callback for this eventId
		if (
			eventId &&
			options.responses &&
			this.eventHandlers[eventId] &&
			this.eventHandlers[eventId].onFinished
		) {
			log.debug('Event finished. Calling event handlers', {
				onFinished: this.eventHandlers[eventId].onFinished
			})
			this.eventHandlers[eventId].onFinished.forEach(handler => {
				console.log('Calling onFinshed')
				console.log({ handler })
				console.log(typeof handler)
				this.executeHandler(handler, options)
			})
		} else if (
			eventId &&
			this.eventHandlers[eventId] &&
			this.eventHandlers[eventId].onResponse
		) {
			this.eventHandlers[eventId].onResponse.forEach(handler => {
				this.executeHandler(handler, options)
			})
		}

		if (eventName) {
			const possibleHandlerKeys = this.getPossibleEventHandlerKeys(options)
			possibleHandlerKeys.forEach(key => {
				if (this.eventHandlers[key] && this.eventHandlers[key].onResponse) {
					this.eventHandlers[key].onResponse.forEach(handler => {
						this.executeHandler(handler, options)
					})
				}
			})
		}
	}

	/** Executes either a function or promise callback by detecting the type */
	private executeHandler(handler: TOnHandler, data?: any) {
		// Check if the handler is a promise
		const objToCheck = handler as any

		console.log(typeof objToCheck)

		if (objToCheck && typeof objToCheck.then === 'function') {
			objToCheck(data)
				.then(() => {
					log.debug('Mercury: Executed promise callback')
				})
				.catch((e: Error) => {
					log.warn('Mercury: Error executing promise callback', e)
				})
		} else if (objToCheck && typeof objToCheck === 'function') {
			try {
				objToCheck(data)
				log.debug('Mercury: Executed function callback')
			} catch (e) {
				log.warn('Mercury: Error executing function callback', e)
			}
		} else {
			log.warn(
				'Mercury: Unable to execute callback for event because Handler is not a promise or function'
			)
			console.log(objToCheck)
		}
	}

	/** Called when the adapter connects */
	private onConnect() {
		log.debug('Mercury: onConnect')
		if (this.clientOnConnect) {
			this.executeHandler(this.clientOnConnect)
		}
	}

	private onDisconnect() {
		log.debug('Mercury: onDisconnect')
		// Clear event handlers
		this.eventHandlers = {}

		if (this.clientOnDisconnect) {
			this.executeHandler(this.clientOnDisconnect)
		}
	}

	/** UUID v4 generator (from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript) */
	private uuid() {
		// @ts-ignore
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
			(
				c ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
			).toString(16)
		)
	}
}
