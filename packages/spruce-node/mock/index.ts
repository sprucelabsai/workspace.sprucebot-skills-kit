// import Debug from 'debug'
// import { buildClientSchema } from 'graphql'
// import {
// 	mockServer,
// 	addResolveFunctionsToSchema
// } from 'graphql-tools'
// import introspectionSchemaResult from './apiSchema.json'
// import { AbstractSprucebotAdapter, IAbstractSprucebotAdapterOptions } from '../index';
// import { ClientRequest, IncomingMessage } from 'http';
// import HttpsError from 'https/HttpsError.js';

// const debug = Debug('@sprucelabs/spruce-node')

// export default class MockHttps implements AbstractSprucebotAdapter {
   
//     private mockApi!: any
//     private mockServer!: any

// 	async mockApiGQLServerInit({ mockResolvers, mockModels }) {
// 		try {
// 			const schema = buildClientSchema(introspectionSchemaResult.data)
// 			// TODO: This doesn't seem to be replacing mutations on the schema with the custom resolvers in apiMocks.js. Instead, it's returning default mock data. SDEV3-2131
// 			addResolveFunctionsToSchema({
// 				schema,
// 				resolvers: mockResolvers
// 			})
// 			this.mockServer = mockServer(schema, mockModels)
// 		} catch (e) {
// 			console.log(e)
// 		}
// 	}

// 	async mockApiInit(mockApi) {
// 		this.mockApi = mockApi
// 	}

// 	async gql(query) {
// 		const result = await this.mockServer.query(query)
// 		return result
// 	}

// 	async mutation(query) {
// 		const result = await this.mockServer.query(query)
// 		return result
// 	}

// 	/**
// 	 * GET an endpoint.
// 	 */
// 	get(path:string, query?:Record<string, any>) {
// 		return this.mockApi.get(path, query)
// 	}

// 	/**
// 	 * POST some data to the API. Override `method` to PATCH for patching.
// 	 *
// 	 */
// 	post(path:string, data?:Record<string, any>, query?:Record<string, any>, method = 'POST') {
// 		return this.mockApi.post(path, data, query, method)
// 	}

// 	/**
// 	 * Make an update through the API
// 	 *
// 	 * @param {String} path
// 	 * @param {Object} data
// 	 * @param {Object} query
// 	 * @returns {Promise}
// 	 */
// 	patch(path:string, data?:Record<string, any>, query?:Record<string, any>) {
// 		return this.mockApi.patch(path, data, query)
// 	}

// 	/**
// 	 * Delete something from the API
// 	 */
// 	async delete(path:string, query?:Record<string, any>) {
// 		return this.mockApi.delete(path, query)
// 	}

	
// }
