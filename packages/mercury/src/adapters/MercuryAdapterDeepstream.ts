import log from '../lib/log'
import { DeepstreamClient } from '@deepstream/client'
import { JSONObject } from '@deepstream/client/dist/constants'
import { MercuryAdapter } from '../MercuryAdapter'
import { AuthenticationCallback } from '@deepstream/client/dist/connection/connection'
import { IAuthStatus } from 'src/Mercury'

export interface IMercuryAdapterDeepstreamOptions {
	deepstreamServerUrl: string
	username: string
	password: string
}

export default class MercuryAdapterDeepstream implements MercuryAdapter {
	public isConnected = false

	private clientData?: JSONObject | null
	private client?: DeepstreamClient
	private options!: IMercuryAdapterDeepstreamOptions

	public init(options: IMercuryAdapterDeepstreamOptions): void {
		log.debug({ options })
		this.options = options
		this.connect()
	}

	public on(options: {
		eventName: string
		payload: Record<string, any>
	}): void {
		const { eventName, payload } = options
		console.log({ eventName, payload })
	}

	private connect() {
		this.client = new DeepstreamClient(this.options.deepstreamServerUrl)
		this.client.login(
			{
				username: this.options.username,
				password: this.options.password
			},
			this.onConnect.bind(this)
		)
		this.setupEventHandlers()
	}
	private onConnect(success: boolean, clientData: JSONObject | null): void {
		if (success) {
			this.isConnected = true
			this.clientData = clientData
		}
	}
	private setupEventHandlers() {
		if (!this.client) {
			log.warn('Can not set event handlers. Deepstream not connected.')
			return
		}
		this.client.on('connectionStateChanged', connectionState => {
			if (connectionState === 'OPEN') {
				log.debug(`connectionState: ${connectionState}`)
			}
		})
		this.client.on('error', err => {
			log.warn(err)
		})
	}
}
