import log from '../lib/log'
import { MercuryAdapter } from '../MercuryAdapter'
import { IAuthStatus } from '../Mercury'
import Socket from 'socket.io-client/dist/socket.io.js'

export interface IMercuryAdapterSocketIOOptions {
	socketIOUrl: string
	username?: string
	password?: string
	jwt?: string
}

export default class MercuryAdapterSocketIO implements MercuryAdapter {
	public isConnected = false
	private socket?: Socket
	private options!: IMercuryAdapterSocketIOOptions

	public init(options: IMercuryAdapterSocketIOOptions): void {
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

		this.socket.emit('subscribe', {
			eventName,
			jwt: this.options.jwt
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
		this.socket.on('connect', () => {
			log.debug('SOCKET CONNECT')
		})

		this.socket.on('err', data => {
			log.warn('Socket error')
			log.warn(data)
		})

		this.socket.on('event', data => {
			log.debug('Received Event', { data })
		})
	}
}
