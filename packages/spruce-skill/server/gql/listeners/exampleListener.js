// @flow
const config = require('config')
const gql = require('graphql-tag')

module.exports = ctx => {
	// The subscription query
	const subscription = gql`
		subscription ExampleStream {
			ExampleStream {
				message
				sentAt
			}
		}
	`

	// Create the subscription and listen
	ctx.gqlSubscriptions.subscribe({
		uri: config.API_GRAPHQL_SUBSCRIPTION_URI,
		subscription,
		onEvent: response => {
			if (response.errors) {
				log.debug(
					`Received ExampleStream event with error from: ${
						config.API_GRAPHQL_SUBSCRIPTION_URI
					}`
				)
				log.warn(data.errors)
			} else if (response.data && response.data.ExampleStream) {
				log.debug(
					`Received ExampleStream event from: ${
						config.API_GRAPHQL_SUBSCRIPTION_URI
					}`
				)
				log.debug(response.data.ExampleStream)
			}
		},
		onError: err => {
			log.warn(err)
		},
		onConnected: () => {
			log.debug('GQL Subscription exampleListener: onConnected')
		},
		onDisconnected: () => {
			log.debug('GQL Subscription exampleListener: onDisconnected')
		},
		onReconnected: () => {
			log.debug('GQL Subscription exampleListener: onReconnected')
		}
	})
}
