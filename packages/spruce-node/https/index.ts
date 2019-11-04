import { AbstractSprucebotAdapter } from '../index'
import https from 'https'
import { ClientRequest, IncomingMessage } from 'http'
import { GraphQLClient } from 'graphql-request'

import url from '../utilities/url'
import HttpsError from './HttpsError'

export default class Https implements AbstractSprucebotAdapter {
	private host: string
	private apiKey: string
	private id: string
	private version: string
	private allowSelfSignedCerts: boolean
	private gqlClient: GraphQLClient

	public constructor(options: {
		host: string
		apiKey: string
		id: string
		version: string
		allowSelfSignedCerts?: boolean
	}) {
		const { host, apiKey, id, version, allowSelfSignedCerts = false } = options
		if (!host || !apiKey || !id || !version) {
			throw new Error(
				'You gotta pass host, apiKey, id, and version to the Http constructor.'
			)
		}
		this.host = host
		this.apiKey = apiKey
		this.id = id
		this.version = version
		this.allowSelfSignedCerts = allowSelfSignedCerts

		// setup gql
		const hostwithProtocol =
			this.host.search('http') === -1 ? `https://${this.host}` : this.host
		this.gqlClient = new GraphQLClient(`${hostwithProtocol}/graphql`, {
			headers: {
				'x-skill-id': this.id,
				'x-skill-api-key': this.apiKey
			}
		})
	}

	public async gql(
		query: string,
		variables?: Record<string, any>
	): Promise<any> {
		return this.gqlClient.rawRequest(query, variables)
	}

	/**
	 * GET an endpoint.
	 */
	public async get(
		path: string,
		query?: Record<string, any>
	): Promise<Record<string, any>> {
		// everything is a promise
		return new Promise((resolve, reject) => {
			// API Key must go with each request
			const headers = {
				'x-skill-api-key': this.apiKey
			}

			const request = https.request(
				{
					host: this.host,
					path: url.build(path, query, this.version, this.id),
					rejectUnauthorized: !this.allowSelfSignedCerts,
					headers
				},
				response => {
					this.handleResponse(request, response, resolve, reject, 'GET')
				}
			)

			// handle error with request
			request.on('error', err => {
				reject(err)
			})

			request.end()
		})
	}

	/**
	 * POST some data to the API. Override `method` to PATCH for patching.
	 */
	public async post(
		path: string,
		data?: Record<string, any>,
		query?: Record<string, any>,
		method = 'POST'
	): Promise<any> {
		return new Promise((resolve, reject) => {
			// API Key must go with each request
			const headers = {
				'x-skill-api-key': this.apiKey,
				'Content-Type': 'application/json'
			}

			const request = https.request(
				{
					method,
					host: this.host,
					headers,
					rejectUnauthorized: !this.allowSelfSignedCerts,
					path: url.build(path, query, this.version, this.id)
				},
				response => {
					this.handleResponse(request, response, resolve, reject, method)
				}
			)

			request.end(JSON.stringify(data))
		})
	}

	/**
	 * Make an update through the API
	 *
	 * @param {String} path
	 * @param {Object} data
	 * @param {Object} query
	 * @returns {Promise}
	 */
	public async patch(
		path: string,
		data?: Record<string, any>,
		query?: Record<string, any>
	): Promise<Record<string, any>> {
		return this.post(path, data, query, 'PATCH')
	}

	/**
	 * Delete something from the API
	 */
	public async delete(
		path: string,
		query: Record<string, any>
	): Promise<Record<string, any>> {
		return new Promise((resolve, reject) => {
			const headers = {
				'x-skill-api-key': this.apiKey
			}
			const request = https.request(
				{
					method: 'DELETE',
					host: this.host,
					headers,
					rejectUnauthorized: !this.allowSelfSignedCerts,
					path: url.build(path, query, this.version, this.id)
				},
				response => {
					this.handleResponse(request, response, resolve, reject, 'DELETE')
				}
			)

			request.write('')
			request.end()
		})
	}

	/**
	 * Univeral handling of all responses from the API
	 */
	public handleResponse(
		request: ClientRequest,
		response: IncomingMessage,
		resolve: (value?: any | PromiseLike<any>) => void,
		reject: (reason?: unknown) => void,
		method: string
	): void {
		// Build response as data comes in
		let body = ''
		response.on('data', d => (body += d))

		request.on('error', err => {
			log.warn(`REQUEST ERROR: ${method} ${request.path}`, err)
			reject(err)
		})

		// Handle errors
		response.on('error', err => {
			log.warn(`RESPONSE ERROR: ${method} ${request.path}`, err)
			reject(err)
		})

		// Handle completion
		response.on('end', () => {
			try {
				const parsed = JSON.parse(body)
				if (response.statusCode !== 200) {
					const error = new HttpsError(
						parsed.friendlyReason || parsed.reason || JSON.stringify(parsed)
					)
					error.request = request
					error.response = response
					error.response.body = body
					error.response.json = parsed
					reject(error)
				} else {
					resolve(parsed)
				}
			} catch (err) {
				log.warn(`RESPONSE ERROR: ${method} ${request.path}`, err)
				reject(err)
			}
		})
	}
}
