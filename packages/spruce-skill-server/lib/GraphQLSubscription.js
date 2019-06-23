const { execute } = require('apollo-link')
const { WebSocketLink } = require('apollo-link-ws')
const { SubscriptionClient } = require('subscriptions-transport-ws')
const ws = require('ws')
const gql = require('graphql-tag')
const config = require('config')

module.exports = class GraphQLSubscriptions {
	constructor() {
		this.clients = []
		this.consumers = []
	}
	subscribe({
		uri,
		subscription,
		queryVars,
		onEvent,
		onError,
		onConnected,
		onDisconnected,
		onReconnected
	}) {
		const subscriptionClient = this.createSubscriptionObservable({
			wsurl: uri,
			query: subscription,
			variables: queryVars || {},
			onConnected,
			onDisconnected,
			onReconnected
		})
		// TODO: Reuse clients if possible
		const consumer = subscriptionClient.subscribe(onEvent, onError)
		this.clients.push(subscriptionClient)
		this.consumers.push(consumer)
	}
	getWsClient({ wsurl, onConnected, onDisconnected, onReconnected }) {
		const client = new SubscriptionClient(
			wsurl,
			{
				reconnect: true,
				connectionParams: {
					'x-skill-id': config.ID,
					'x-skill-api-key': config.API_KEY
				}
			},
			ws
		)
		if (onConnected) {
			client.onConnected(onConnected)
		}
		if (onDisconnected) {
			client.onDisconnected(onDisconnected)
		}
		if (onReconnected) {
			client.onReconnected(onReconnected)
		}

		return client
	}

	createSubscriptionObservable({
		wsurl,
		query,
		variables,
		onConnected,
		onDisconnected,
		onReconnected
	}) {
		const client = this.getWsClient({
			wsurl,
			onConnected,
			onDisconnected,
			onReconnected
		})
		const link = new WebSocketLink(client)
		return execute(link, { query: query, variables: variables })
	}
}
