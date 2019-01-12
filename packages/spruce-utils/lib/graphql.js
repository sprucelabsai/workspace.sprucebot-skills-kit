// @flow
import { get } from 'lodash'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import fetchPonyfill from 'fetch-ponyfill'
import https from 'https'
import gql, { disableFragmentWarnings } from 'graphql-tag'

// Disabling this for now. This warning is useful if you have a central
// store of global fragments, but we're using them in a distributed / dynamic
// manner. Might revisit later.
disableFragmentWarnings()

import { SpruceWebError } from './errors'

type GraphQLOperationProps = {|
	variables?: any,
	query?: string,
	mutation?: string,
	token?: string
|}

export class GraphQLClient {
	constructor({ rejectUnauthorized, uri, wsUri }) {
		const agent = new https.Agent({
			rejectUnauthorized
		})

		const { fetch } = fetchPonyfill({})

		const httpLink = createHttpLink({
			uri,
			fetch,
			credentials: 'same-origin',
			fetchOptions: { agent }
		})
		let link = httpLink
		if (typeof window !== 'undefined' && wsUri) {
			const wsLink = new WebSocketLink({
				uri: wsUri,
				options: {
					reconnect: true
				}
			})

			wsLink.subscriptionClient.onConnected(() =>
				log.debug('GraphQL Subscriptions websocket connected')
			)
			wsLink.subscriptionClient.onReconnected(() =>
				log.debug('GraphQL Subscriptions websocket reconnected')
			)
			wsLink.subscriptionClient.onConnecting(() =>
				log.debug('GraphQL Subscriptions websocket attempting to connect')
			)
			wsLink.subscriptionClient.onReconnecting(() =>
				log.debug('GraphQL Subscriptions websocket attempting to reconnect')
			)
			wsLink.subscriptionClient.onDisconnected(() =>
				log.debug('GraphQL Subscriptions websocket disconnected')
			)
			wsLink.subscriptionClient.onError(e =>
				log.warn('GraphQL Subscriptions websocket error', e)
			)

			const addExtensionsLink = new ApolloLink((operation, forward) => {
				return forward(operation).map(response => {
					response.data.extensions = response.extensions
					return response
				})
			})

			link = split(
				// split based on operation type
				({ query }) => {
					const { kind, operation } = getMainDefinition(query)
					return kind === 'OperationDefinition' && operation === 'subscription'
				},
				wsLink,
				addExtensionsLink.concat(httpLink)
			)
		} else {
			log.debug('GraphQL Subscriptions disabled.', {
				wsUri: wsUri || '<NOT SET>'
			})
		}

		this.client = new ApolloClient({
			cache: new InMemoryCache(),
			link,
			defaultOptions: {
				query: {
					fetchPolicy: 'no-cache'
				}
			}
		})
	}

	operation = async (
		{ token, ...options }: GraphQLOperationProps,
		operationType: 'query' | 'mutation'
	) => {
		let response

		let clientMethod = null

		if (operationType === 'query') {
			clientMethod = 'query'
		} else if (operationType === 'mutation') {
			clientMethod = 'mutate'
		}

		if (!clientMethod) {
			throw new SpruceWebError(
				`GraphQL: No matching client method for operation of type "${operationType}"`
			)
		}

		try {
			response = await this.client[clientMethod]({
				...options,
				query:
					options.query &&
					gql`
						${options.query}
					`,
				mutation:
					options.mutation &&
					gql`
						${options.mutation}
					`,
				context: {
					headers: {
						Authorization: token ? `JWT ${token}` : null
					}
				}
			})
		} catch (e) {
			if (e.networkError || e.graphQLErrors) {
				const graphQLErrors = get(e, 'graphQLErrors', [])
				const networkErrors = get(e, 'networkError.result.errors', [])
				const warnings = get(e, 'networkError.extensions.warnings', [])

				const errors = networkErrors.concat(graphQLErrors)

				throw new SpruceWebError(
					`GraphQL Request Failed. Reasons: [${errors
						.map(error => error.reason)
						.join(', ')}]`,
					{
						graphQLErrors,
						networkError: e.networkError,
						warnings
					}
				)
			} else {
				// Most likely malformed GQL. Just throw the error directly.
				throw e
			}
		}

		const warnings = get(response, 'data.extensions.warnings', [])

		if (warnings.length > 0) {
			console.log(JSON.stringify(warnings))
		}

		return response
	}

	query = (options: GraphQLOperationProps) => {
		return this.operation(options, 'query')
	}

	mutate = (options: GraphQLOperationProps) => {
		return this.operation(options, 'mutation')
	}
}
