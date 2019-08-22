import { AbstractSprucebotAdapter } from '../index';

import url from '../utilities/url'
import https from 'https'
import Debug from 'debug'
const debug = Debug('@sprucelabs/spruce-node')

export default class Https implements AbstractSprucebotAdapter {
	private host: string
	private apiKey: string
	private id: string
	private version: string
	private allowSelfSignedCerts: boolean

	constructor(options: { host: string, apiKey: string, id: string, version: string, allowSelfSignedCerts?: boolean }) {
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
	}

	async query(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const path = '/graphql'
			// API Key must go with each request
			const headers = {
				'x-skill-id': this.id,
				'x-skill-api-key': this.apiKey,
				'Content-Type': 'application/json'
			}

			const request = https.request(
				{
					method: 'POST',
					host: this.host,
					headers,
					rejectUnauthorized: !this.allowSelfSignedCerts,
					path
				},
				response => {
					this.handleResponse(request, response, resolve, reject)
				}
			)

			request.end(
				JSON.stringify({
					query
				})
			)
		})
	}

	/**
	 * GET an endpoint.
	 *
	 * @param {String} url Path to the endpoint you want to hit. Do NOT include /api/${version}/skills/${id}
	 * @param {Object} query Vanilla object that is converted into a query string
	 * @returns {Promise}
	 */
	async get(path, query) {
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
					this.handleResponse(request, response, resolve, reject)
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
	 *
	 * @param {String} path
	 * @param {Object} data
	 * @param {Object} query
	 * @param {String} method
	 * @returns {Promise}
	 */
	async post(path, data, query, method = 'POST') {
		return new Promise((resolve, reject) => {
			// API Key must go with each request
			const headers = {
				'x-skill-api-key': this.apiKey,
				'Content-Type': 'application/json'
			}

			const request = https.request(
				{
					method: method,
					host: this.host,
					headers,
					rejectUnauthorized: !this.allowSelfSignedCerts,
					path: url.build(path, query, this.version, this.id)
				},
				response => {
					this.handleResponse(request, response, resolve, reject)
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
	async patch(path, data, query) {
		return this.post(path, data, query, 'PATCH')
	}

	/**
	 * Delete something from the API
	 * @param {String} path
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async delete(path, query) {
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
					this.handleResponse(request, response, resolve, reject)
				}
			)

			request.write('')
			request.end()
		})
	}

	/**
	 * Univeral handling of all responses from the API
	 *
	 * @param {Request} request
	 * @param {Response} response
	 * @param {Function} resolve
	 * @param {Function} reject
	 */
	handleResponse(request, response, resolve, reject) {
		// Build response as data comes in
		let body = ''
		response.on('data', d => (body += d))

		request.on('error', err => {
			log.warn(`REQUEST ERROR: ${request.method} ${request.path}`, err)
			reject(err)
		})

		// Handle errors
		response.on('error', err => {
			log.warn(`RESPONSE ERROR: ${request.method} ${request.path}`, err)
			reject(err)
		})

		// Handle completion
		response.on('end', () => {
			try {
				var parsed = JSON.parse(body)
				if (response.statusCode !== 200) {
					const error = new Error(
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
				log.warn(`RESPONSE ERROR: ${request.method} ${request.path}`, err)
				reject(err)
			}
		})
	}
}