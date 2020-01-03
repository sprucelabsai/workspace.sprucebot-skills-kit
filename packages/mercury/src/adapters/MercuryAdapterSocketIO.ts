import log from '../lib/log'
import { MercuryAdapter } from '../MercuryAdapter'
import {
	IAuthStatus,
	TOnPromiseHandler,
	IMercuryOnOptions,
	TOnConnectPromiseHandler
} from '../Mercury'
import Socket from 'socket.io-client/dist/socket.io.js'

export interface IMercuryAdapterSocketIOOptions {
	socketIOUrl: string
	// jwt?: string
}

export default class MercuryAdapterSocketIO implements MercuryAdapter {
	public isConnected = false
	private socket?: Socket
	private options!: IMercuryAdapterSocketIOOptions
	private eventHandler!: TOnPromiseHandler
	private onConnect!: TOnConnectPromiseHandler

	public init(
		options: IMercuryAdapterSocketIOOptions,
		eventHandler: TOnPromiseHandler,
		onConnect: TOnConnectPromiseHandler
	): void {
		log.debug({ options })
		this.options = options
		this.eventHandler = eventHandler
		this.onConnect = onConnect
		this.connect()
	}

	public on(options: IMercuryOnOptions): void {
		const { eventName } = options
		console.log({ options })

		this.socket.emit('subscribe', {
			...options
			// TODO: pass jwt for auth purposes
			// jwt: this.options.jwt
		})
	}

	private connect() {
		this.socket = Socket(this.options.socketIOUrl, {
			path: '/mercury',
			transports: ['websocket', 'polling']
		})
		this.setupCoreEventHandlers()
	}

	private setupCoreEventHandlers() {
		if (!this.socket) {
			log.warn('Can not set event handlers. SocketIO not connected.')
			return
		}
		this.socket.on('connect', async () => {
			log.debug('SOCKET CONNECT')
			this.isConnected = true
			try {
				await this.onConnect()
			} catch (e) {
				log.warn(e)
			}
		})

		this.socket.on('err', data => {
			log.warn('Socket error')
			log.warn(data)
		})

		this.socket.on('mercury-event', async data => {
			try {
				await this.eventHandler(data)
			} catch (e) {
				log.warn(e)
			}
		})
	}
}
