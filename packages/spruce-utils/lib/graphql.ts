import { compact, get } from 'lodash'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import {
	InMemoryCache,
	IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
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

interface IGraphQLOperationProps {
	token: string
	variables?: any
}

interface IGraphQLQueryProps extends IGraphQLOperationProps {
	query: string
	mutation: never
}

interface IGraphQLMutationProps extends IGraphQLOperationProps {
	query: never
	mutation: string
}

interface IGraphQLSubscriptionProps extends IGraphQLOperationProps {
	subscription: string
	onData: Function
	onReconnected?: Function
	onConnected?: Function
	onConnecting?: Function
	onReconnecting?: Function
	onDisconnected?: Function
	onError?: Function
}

export type IGraphQLSubscription = (
	options: IGraphQLSubscriptionProps
) => { unsubscribe: () => void }

// Stub logging so that it works if you don't have
// sprucebot-log in the global namespace.
// TODO: come up with a permanent solution for this.
let log = {
	debug: (...args) => {
		console.log(...args)
	},
	warn: (...args) => {
		console.log(...args)
	}
}

// @ts-ignore
if (global && global.log) {
	// @ts-ignore
	log = global.log
}

export class GraphQLClient {
	client: any
	token?: string
	webSocketLink?: WebSocketLink

	onConnectedListener?: Function
	onConnectingListener?: Function
	onDisconnectedListener?: Function
	onErrorListener?: Function
	onReconnectedListener?: Function
	onReconnectingListener?: Function

	constructor({
		rejectUnauthorized,
		uri,
		wsUri,
		introspectionQueryResultData
	}: {
		rejectUnauthorized: boolean
		uri: string
		wsUri: string
		introspectionQueryResultData: any
	}) {
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

		let link

		const addExtensionsLink = new ApolloLink((operation, forward) => {
			return forward
				? forward(operation).map(response => {
						if (response && response.data) {
							response.data.extensions = response.extensions
						}
						return response
				  })
				: null
		})

		if (typeof window !== 'undefined' && wsUri) {
			this.webSocketLink = new WebSocketLink({
				uri: wsUri,
				options: {
					reconnect: true,
					lazy: true,
					connectionParams: () => {
						if (this.token) {
							return {
								Authorization: `JWT ${this.token}`
							}
						}
					}
				}
			})

			// @ts-ignore
			this.webSocketLink.subscriptionClient.onConnected(() =>
				log.debug('GraphQL Subscriptions websocket connected')
			)
			// @ts-ignore
			this.webSocketLink.subscriptionClient.onReconnected(() =>
				log.debug('GraphQL Subscriptions websocket reconnected')
			)
			// @ts-ignore
			this.webSocketLink.subscriptionClient.onConnecting(() =>
				log.debug('GraphQL Subscriptions websocket attempting to connect')
			)
			// @ts-ignore
			this.webSocketLink.subscriptionClient.onReconnecting(() =>
				log.debug('GraphQL Subscriptions websocket attempting to reconnect')
			)
			// @ts-ignore
			this.webSocketLink.subscriptionClient.onDisconnected(() =>
				log.debug('GraphQL Subscriptions websocket disconnected')
			)
			// @ts-ignore
			this.webSocketLink.subscriptionClient.onError(e =>
				log.warn('GraphQL Subscriptions websocket error', e)
			)

			link = split(
				// split based on operation type
				({ query }) => {
					const operationDefinition = getMainDefinition(query)

					return (
						operationDefinition.kind === 'OperationDefinition' &&
						operationDefinition.operation === 'subscription'
					)
				},
				this.webSocketLink,
				addExtensionsLink.concat(httpLink)
			)
		} else {
			link = addExtensionsLink.concat(httpLink)

			log.debug('GraphQL Subscriptions disabled.', {
				wsUri: wsUri || '<NOT SET>'
			})
		}

		const cacheOptions: { fragmentMatcher?: IntrospectionFragmentMatcher } = {}

		if (introspectionQueryResultData) {
			cacheOptions.fragmentMatcher = new IntrospectionFragmentMatcher({
				introspectionQueryResultData
			})
		}

		this.client = new ApolloClient({
			cache: new InMemoryCache(cacheOptions),
			link,
			defaultOptions: {
				query: {
					fetchPolicy: 'no-cache'
				}
			}
		})
	}

	setToken = (token: string) => {
		this.token = token
	}

	operation = async (
		{ token, ...options }: IGraphQLQueryProps | IGraphQLMutationProps,
		operationType: 'query' | 'mutation'
	) => {
		let response

		let clientMethod: null | string = null

		if (operationType === 'query') {
			clientMethod = 'query'
		} else if (operationType === 'mutation') {
			clientMethod = 'mutate'
		}

		if (!clientMethod) {
			throw new SpruceWebError(
				`GraphQL: No matching client method for operation of type "${operationType}"`,
				{}
			)
		}

		const jwtToken = token || this.token

		const gqlDocumentBody = get(options, `${operationType}.loc.source.body`, '')
			.replace(/[ \t\n]+/gi, ' ')
			.trim()

		// Pull names of queries or mutations out for logging.
		const definitions = get(options, `${operationType}.definitions`, [])
		const definitionNames = compact(
			definitions.map(definition => get(definition, 'name.value'))
		)

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
						Authorization: jwtToken ? `JWT ${jwtToken}` : undefined
					}
				}
			})
		} catch (e) {
			if (e.networkError || e.graphQLErrors) {
				const graphQLErrors = get(e, 'graphQLErrors', [])
				const networkErrors = get(e, 'networkError.result.errors', [])
				const errors = networkErrors.concat(graphQLErrors)

				throw new SpruceWebError(
					`GraphQL Request Failed (${operationType} ${definitionNames.join(
						'/'
					)}). Reasons: [${errors.map(error => error.reason).join(', ')}]`,
					{
						reasons: errors.map(error => error.reasons).filter(msg => !!msg),
						friendlyReasons: errors
							.map(error => error.friendlyReason)
							.filter(msg => !!msg),
						originalError: e,
						gqlDocumentBody,
						variables: options.variables
					}
				)
			} else {
				// Most likely malformed GQL. Just throw the error directly.
				throw e
			}
		}

		const warnings = get(response, 'data.extensions.warnings', [])

		if (warnings.length > 0) {
			log.warn(JSON.stringify(warnings))
		}

		return response
	}

	query = (options: IGraphQLQueryProps) => {
		return this.operation(options, 'query')
	}

	mutate = (options: IGraphQLMutationProps) => {
		return this.operation(options, 'mutation')
	}

	setupListeners = options => {
		// For each listener, first unbind it if it was already bound. Then
		// Re-bind it to the options passed.
		// @ts-ignore
		if (this.webSocketLink && this.webSocketLink.subscriptionClient) {
			this.onConnectingListener && this.onConnectingListener()
			this.onConnectingListener =
				options.onConnecting &&
				// @ts-ignore
				this.webSocketLink.subscriptionClient.onConnecting(options.onConnecting)

			this.onConnectedListener && this.onConnectedListener()
			this.onConnectedListener =
				options.onConnected &&
				// @ts-ignore
				this.webSocketLink.subscriptionClient.onConnected(options.onConnected)

			this.onDisconnectedListener && this.onDisconnectedListener()
			this.onDisconnectedListener =
				options.onDisconnected &&
				// @ts-ignore
				this.webSocketLink.subscriptionClient.onDisconnected(
					options.onDisconnected
				)

			this.onErrorListener && this.onErrorListener()
			this.onErrorListener =
				options.onError &&
				// @ts-ignore
				this.webSocketLink.subscriptionClient.onError(options.onError)

			this.onReconnectingListener && this.onReconnectingListener()
			this.onReconnectingListener =
				options.onReconnecting &&
				// @ts-ignore
				this.webSocketLink.subscriptionClient.onReconnecting(
					options.onReconnecting
				)

			this.onReconnectedListener && this.onReconnectedListener()
			this.onReconnectedListener =
				options.onReconnected &&
				// @ts-ignore
				this.webSocketLink.subscriptionClient.onReconnected(
					options.onReconnected
				)
		}
	}

	subscribe: IGraphQLSubscription = options => {
		if (options.token) {
			this.setToken(options.token)
		}

		this.setupListeners(options)

		return this.client
			.subscribe({
				query: options.subscription,
				variables: options.variables
			})
			.subscribe({
				next: options.onData
			})
	}
}
