/* eslint-disable @typescript-eslint/no-var-requires */
import globby from 'globby'
import Debug from 'debug'
import { GraphQLObjectType, GraphQLSchema, GraphQLSchemaConfig } from 'graphql'
import helpers from './helpers'
import { ISpruceContext } from '../interfaces/ctx'
const debug = Debug('spruce-skill-server')

export default class Schema {
	public constructor(options: { ctx: ISpruceContext; gqlDir: string }) {
		const { ctx, gqlDir } = options
		try {
			ctx.gql = {
				helpers: helpers(ctx),
				// @ts-ignore
				types: {}
			}
			const coreTypePaths = globby.sync([
				`${__dirname}/types/**/!(index|types|_helpers).js`
			])
			const typePaths = globby.sync([
				`${gqlDir}/types/**/!(index|types|_helpers).js`
			])
			const resolverPaths = globby.sync([
				`${gqlDir}/resolvers/**/!(index|types|_helpers).js`
			])
			let queries = {}
			let mutations = {}
			let subscriptions = {}
			// Load GQL types first and assign to ctx.gql.types[<type name>]
			coreTypePaths.forEach(path => {
				try {
					debug(`Importing GQL file: ${path}`)
					const requiredType = require(path)
					const type = requiredType.default
						? requiredType.default(ctx)
						: requiredType(ctx)
					let name = path.replace(/^(.*[\\/])/, '')
					name = name.replace('.js', '')
					if (type) {
						// @ts-ignore
						ctx.gql.types[name] = type
					}
				} catch (e) {
					log.warn(`Unable to import GraphQL fields from ${path}`, e)
				}
			})
			typePaths.forEach(path => {
				try {
					debug(`Importing GQL file: ${path}`)
					const requiredType = require(path)
					const type = requiredType.default
						? requiredType.default(ctx)
						: requiredType(ctx)
					let name = path.replace(/^(.*[\\/])/, '')
					name = name.replace('.js', '')
					if (type) {
						// @ts-ignore
						ctx.gql.types[name] = type
					}
				} catch (e) {
					log.warn(`Unable to import GraphQL fields from ${path}`, e)
				}
			})
			// Load resolvers which could be queries, mutations, or subscriptions
			resolverPaths.forEach(path => {
				try {
					debug(`Importing GQL file: ${path}`)
					const requiredType = require(path)
					const def = requiredType.default
						? requiredType.default(ctx)
						: requiredType(ctx)
					// Resolvers may contain queries and/or mutations
					queries = Object.assign(queries, def.queries || {})
					mutations = Object.assign(mutations, def.mutations || {})
					subscriptions = Object.assign(subscriptions, def.subscriptions || {})
				} catch (e) {
					log.warn(`Unable to import GraphQL fields from ${path}`, e)
				}
			})

			const resolvers: GraphQLSchemaConfig = {
				query: null
			}
			if (queries && Object.keys(queries).length > 0) {
				resolvers.query = new GraphQLObjectType({
					name: 'Query',
					fields: queries
				})
			}
			if (mutations && Object.keys(mutations).length > 0) {
				resolvers.mutation = new GraphQLObjectType({
					name: 'Mutation',
					fields: mutations
				})
			}
			if (subscriptions && Object.keys(subscriptions).length > 0) {
				resolvers.subscription = new GraphQLObjectType({
					name: 'Subscription',
					fields: subscriptions
				})
			}

			const schema = new GraphQLSchema(resolvers)

			log.info('Finished importing GQL files and creating schema')

			return schema
		} catch (e) {
			log.crit('Error creating GraphQL schema')
			log.crit(e)
		}
	}
}
