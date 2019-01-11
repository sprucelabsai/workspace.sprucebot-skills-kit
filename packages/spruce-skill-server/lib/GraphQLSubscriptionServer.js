const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { PubSub } = require('graphql-subscriptions')
// const GraphQLSubscriptionServer = require('../lib/GraphQLSubscriptionServer')
// const { verifyJWT } = require('../lib/jwt')

module.exports = class GQLSubscriptionServer {
	constructor(options) {
		if (!options.server) {
			throw new Error('No server to attach to')
		}

		// Set up GraphQL subscriptions
		this.pubsub = new PubSub()
		if (options.enabled) {
			this.subServer = new SubscriptionServer(
				{
					execute,
					subscribe,
					schema: options.schema,
					onConnect: this.onConnect.bind(this),
					onDisconnect: this.onDisconnect.bind(this)
					// onOperation: this.onOperation.bind(this)
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
		const subscriptionContext = {}
		console.log('GQL Subscription Socket Connected', { params })

		let authHeader

		if (params && params.Authorization) {
			authHeader = params.Authorization
		} else if (params && params.authorization) {
			authHeader = params.authorization
		}

		// if (authHeader) {
		// 	subscriptionContext.user = await this.authenticate(authHeader)
		// }
		console.log(subscriptionContext)
		return subscriptionContext
	}

	async onDisconnect(params, socket) {
		console.log('onDisconnect', params)
	}

	async onOperation(params, socket) {
		console.log('onOperation', params)
	}

	// async authenticate(authorizationHeader: string) {
	// 	const token = authorizationHeader.replace('JWT ', '')
	// 	const data = verifyJWT(token)

	// 	if (data && data.userId) {
	// 		const user = await orm.models.User.authById(data.userId)
	// 		return user
	// 	}

	// 	return null
	// }
}
