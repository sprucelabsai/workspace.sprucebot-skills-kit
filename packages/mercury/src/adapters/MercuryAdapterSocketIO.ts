import log from '../lib/log'
import { MercuryAdapter } from '../MercuryAdapter'
import {
	TOnPromiseHandler,
	TOnConnectFunctionHandler,
	IMercuryEmitOptions,
	IMercuryAdapterOnOptions
} from '../Mercury'
// @ts-ignore
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
	private onConnect!: TOnConnectFunctionHandler

	public init(
		options: IMercuryAdapterSocketIOOptions,
		eventHandler: TOnPromiseHandler,
		onConnect: TOnConnectFunctionHandler
	): void {
		log.debug({ options })
		this.options = options
		this.eventHandler = eventHandler
		this.onConnect = onConnect
		this.connect()
	}

	public on(options: IMercuryAdapterOnOptions): void {
		this.socket.emit('subscribe', options)
	}

	public emit(options: IMercuryEmitOptions) {
		if (!this.socket) {
			log.warn('Can not emit. SocketIO not connected.')
			return
		}

		this.socket.emit('mercury-emit', options)
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
		this.socket.on('connect', () => {
			log.debug('SOCKET CONNECT')
			this.isConnected = true
			this.onConnect()
		})

		this.socket.on('err', (data: any) => {
			log.warn('Socket error')
			log.warn(data)
		})

		this.socket.on('mercury-event', async (data: any) => {
			try {
				await this.eventHandler(data)
			} catch (e) {
				log.warn(e)
			}
		})
	}
}
