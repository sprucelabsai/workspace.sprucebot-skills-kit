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
	private onDisconnect!: TOnConnectFunctionHandler

	public init(
		options: IMercuryAdapterSocketIOOptions,
		eventHandler: TOnPromiseHandler,
		onConnect: TOnConnectFunctionHandler,
		onDisconnect: TOnConnectFunctionHandler
	): void {
		log.debug({ options })
		this.options = options
		this.eventHandler = eventHandler
		this.onConnect = onConnect
		this.onDisconnect = onDisconnect
		this.connect()
	}

	public on(options: IMercuryAdapterOnOptions): void {
		if (this.isConnected) {
			this.socket.emit('subscribe', options)
		} else {
			log.debug(
				'Mercury SocketIO: Unable to set .on() event because adapter is not connected'
			)
			// If we're not connected, we should just retry shortly
			// TODO: Set some kind of final timeout here?
			setTimeout(() => this.on(options), 500)
		}
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
		this.socket.on('disconnect', () => {
			log.debug('SOCKET DISCONNECT')
			this.isConnected = false
			this.onDisconnect()
		})

		this.socket.on('err', (data: any) => {
			log.warn('Socket error', data)
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
