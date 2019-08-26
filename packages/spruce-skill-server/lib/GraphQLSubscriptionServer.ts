import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { PubSub } from 'graphql-subscriptions'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import config from 'config'
import jwt from 'jsonwebtoken'
import IORedis from 'ioredis'
import { ISpruceContext } from '../interfaces/ctx'

export default class GQLSubscriptionServer {
	private ctx: ISpruceContext
	// @ts-ignore
	private pubsub: PubSub | RedisPubSub
	// @ts-ignore
	private subServer?: SubscriptionServer

	public constructor(options: Record<string, any>) {
		if (!options.server) {
			throw new Error('No server to attach to')
		}

		this.ctx = options.ctx

		// Set up GraphQL subscriptions
		if (process.env.REDIS_URL) {
			// Prefer using redis subscriptions so multiple servers can be run
			this.pubsub = new RedisPubSub({
				publisher: new IORedis(process.env.REDIS_URL),
				subscriber: new IORedis(process.env.REDIS_URL)
			})
		} else {
			// Fall back to regular pubsub which will only work properly if a single instance is running
			this.pubsub = new PubSub()
		}
		if (options.enabled) {
			this.subServer = new SubscriptionServer(
				{
					execute,
					subscribe,
					schema: options.schema,
					onConnect: this.onConnect.bind(this),
					onDisconnect: this.onDisconnect.bind(this)
				},
				{
					server: options.server,
					path: '/graphql'
				}
			)

			log.info('Sockets enabled: GraphQL server started')
		} else {
			log.info('GraphQL server disabled')
		}
	}

	private async onConnect(
		params: {
			Authorization?: string
			authorization?: string
		}
		/* socket: any */
	): Promise<Record<string, any>> {
		let subscriptionContext: Record<string, any> = {}
		log.debug('GQL Subscription Socket Connected', { params })

		let authHeader

		if (params && params.Authorization) {
			authHeader = params.Authorization
		} else if (params && params.authorization) {
			authHeader = params.authorization
		}

		if (authHeader) {
			try {
				const jwtData = this.authenticate(authHeader)
				subscriptionContext = {
					userId: jwtData && jwtData.userId,
					locationId: jwtData && jwtData.locationId,
					organizationId: jwtData && jwtData.organizationId,
					ctx: this.ctx
				}
			} catch (e) {
				log.debug('GQL Subscription Authentication failed')
			}
		}

		return subscriptionContext
	}

	private async onDisconnect(/*params, socket*/): Promise<void> {
		log.debug('GQL Subscription client disconnected')
	}

	private authenticate(
		authorizationHeader: string
	): {
		userId?: string
		locationId?: string
		organizationId?: string
	} {
		const token = authorizationHeader.replace('JWT ', '')
		const decoded = jwt.verify(
			token,
			config
				.get('API_KEY')
				.toString()
				.toLowerCase()
		)

		return decoded as {
			userId?: string
			locationId?: string
			organizationId?: string
		}
	}
}
