const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { PubSub } = require('graphql-subscriptions')
const { RedisPubSub } = require('graphql-redis-subscriptions')
const config = require('config')
const jwt = require('jsonwebtoken')
const IORedis = require('ioredis')

module.exports = class GQLSubscriptionServer {
	constructor(options) {
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

	async onConnect(params, socket) {
		let subscriptionContext = {}
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

	async onDisconnect(params, socket) {
		log.debug('GQL Subscription client disconnected')
	}

	authenticate(authorizationHeader) {
		const token = authorizationHeader.replace('JWT ', '')
		const decoded = jwt.verify(token, config.API_KEY.toString().toLowerCase())

		return decoded
	}
}
