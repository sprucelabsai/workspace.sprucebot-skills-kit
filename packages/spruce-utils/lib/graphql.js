// @flow
import { get } from 'lodash'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetchPonyfill from 'fetch-ponyfill'
import https from 'https'
import gql from 'graphql-tag'

import { SpruceWebError } from './errors'

type GraphQLOperationProps = {|
	variables?: any,
	query?: string,
	mutation?: string,
	token?: string
|}

export class GraphQLClient {
	constructor({ rejectUnauthorized, uri }) {
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

		const addExtensionsLink = new ApolloLink((operation, forward) => {
			return forward(operation).map(response => {
				response.data.extensions = response.extensions
				return response
			})
		})

		this.client = new ApolloClient({
			cache: new InMemoryCache(),
			link: addExtensionsLink.concat(httpLink),
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

		try {
			response = await this.client[operationType]({
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

	mutation = (options: GraphQLOperationProps) => {
		return this.operation(options, 'mutation')
	}
}
