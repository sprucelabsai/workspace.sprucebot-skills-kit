/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Debug from 'debug'
import { ISpruceContext } from '../../interfaces/ctx'
import { AbstractSprucebotAdapter } from '@sprucelabs/spruce-node'
import { buildClientSchema } from 'graphql'
import {
	mockServer,
	addResolveFunctionsToSchema,
	IMockServer
} from 'graphql-tools'
import introspectionSchemaResult from '../../support/apiSchema.json'
import { IEmitResponseCallback } from '../../interfaces/global'

const debug = Debug('spruce-skill-server')

interface IHttpsMockOptions {
	ctx: ISpruceContext
	mockResolvers: any
	mockModels: any
}

export default class HttpsMock extends AbstractSprucebotAdapter {
	private ctx: ISpruceContext
	private gqlServer: IMockServer

	public constructor(options: IHttpsMockOptions) {
		super()
		const { ctx, mockResolvers, mockModels } = options
		this.ctx = ctx

		// @ts-ignore: missmatch on schema TODO: understand why and fix
		const schema = buildClientSchema(introspectionSchemaResult.data)
		addResolveFunctionsToSchema({
			schema,
			resolvers: mockResolvers,
			resolverValidationOptions: { requireResolversForResolveType: false }
		})

		this.gqlServer = mockServer(schema, mockModels)
	}

	public async gql(gql: string, variables?: Record<string, any>): Promise<any> {
		return this.gqlServer.query(gql, variables)
	}

	public async get(path: string, query: Record<string, any>): Promise<any> {
		let matches = path.match(/\/locations\/([^/]+)\/users\/([^/]+)$/)
		if (matches && matches[1] && matches[2]) {
			// ctx.sb.user() has been called. Fetch the data from the DB. Used for v1 authentication
			const locationId = matches[1]
			const userId = matches[2]
			const userLocation = await this.ctx.db.models.UserLocation.findOne({
				where: {
					UserId: userId,
					LocationId: locationId
				},
				include: [
					this.ctx.db.models.User,
					{
						model: this.ctx.db.models.Location,
						include: [this.ctx.db.models.Organization]
					}
				]
			})
			return userLocation
		}

		matches = path.match(/\/locations\/([^/]+)$/)
		if (matches && matches[1]) {
			// ctx.sb.location() has been called
			const locationId = matches[1]
			const location = await this.ctx.db.models.Location.findOne({
				where: {
					id: locationId
				}
			})

			return location
		}

		return Promise.resolve({})
	}
	public async post(
		path: string,
		data: Record<string, any>,
		query?: Record<string, any>,
		method?: string
	): Promise<any> {
		let response: any = {
			// Pass back the request options so it can be validated in tests
			requestOptions: {
				path,
				data,
				query,
				method
			}
		}

		// `locations/${locationId}/emit`
		// `organizations/${organizationId}/emit`
		const isEmit = /\/emit$/.test(path)
		if (isEmit) {
			// If it's an emit, the default response is an empty array. The request options can be checked via callback
			response = []
			if (global.testEmitResponse && global.testEmitResponse[data.eventName]) {
				// @ts-ignore
				const cb = (global.testEmitResponse[
					data.eventName
				] as IEmitResponseCallback).callback
				if (cb) {
					await cb({
						path,
						data,
						query,
						method: method || 'POST'
					})
				}

				if (
					(global.testEmitResponse[data.eventName] as IEmitResponseCallback)
						.data
				) {
					return (global.testEmitResponse[
						data.eventName
					] as IEmitResponseCallback).data
				} else if (
					!(global.testEmitResponse[data.eventName] as IEmitResponseCallback)
						.data &&
					!(global.testEmitResponse[data.eventName] as IEmitResponseCallback)
						.callback
				) {
					return global.testEmitResponse[data.eventName]
				}
			} else {
				debug(`EVENT Triggered but not tested: ${data.eventName}`)
			}
		}

		return response
	}
	public async patch(
		path: string,
		data?: Record<string, any>,
		query?: Record<string, any>
	): Promise<any> {
		console.log('MOCK PATCH', data, path, query)
		return Promise.resolve({})
	}
	public async delete(path: string, query?: Record<string, any>): Promise<any> {
		console.log('MOCK DELETE', path, query)
		return Promise.resolve({})
	}
}
