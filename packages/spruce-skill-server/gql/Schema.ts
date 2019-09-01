import globby from 'globby'
import Debug from 'debug'
import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLSchemaConfig,
	parse,
	extendSchema,
	GraphQLResolveInfo
} from 'graphql'
import helpers from './helpers'
import { ISpruceContext } from '../interfaces/ctx'
const debug = Debug('spruce-skill-server')

export interface IGqlShorthandResolver {
	(args: any, context: Request, info: GraphQLResolveInfo): any
}

export default class Schema {
	public readonly gqlSchema: GraphQLSchema
	public readonly shorthandResolvers: {
		[name: string]: IGqlShorthandResolver
	}

	public constructor(options: { ctx: ISpruceContext; gqlDir: string }) {
		const { ctx, gqlDir } = options
		ctx.gql = {
			helpers: helpers(ctx),
			// @ts-ignore
			types: {}
		}
		const coreTypePaths = globby.sync([
			`${__dirname}/types/**/!(index|types|_helpers).(ts|js)`
		])
		const typePaths = globby.sync([
			`${gqlDir}/types/**/!(index|types|_helpers).(ts|js)`
		])
		const resolverPaths = globby.sync([
			`${gqlDir}/resolvers/**/!(index|types|_helpers).(ts|js)`
		])
		let queries = {}
		let mutations = {}
		let subscriptions = {}

		let shorthandMarkup = ``
		let shorthandResolvers = {}

		// Load GQL types first and assign to ctx.gql.types[<type name>]
		const allTypePaths = [...coreTypePaths, ...typePaths]
		allTypePaths.forEach(path => {
			debug(`checking GQL type @ ${path}`)
			if (path.search('.d.ts') > -1) {
				debug('Skipping GQL .d.ts file.')
				return true
			}

			try {
				debug(`Importing GQL types file: ${path}`)
				// @ts-ignore dynamic require
				const requiredType = require(path)
				const type = requiredType.default
					? requiredType.default(ctx)
					: requiredType(ctx)
				let name = path.replace(/^(.*[\\/])/, '')
				name = name.replace('.js', '').replace('.ts', '')

				if (typeof type === 'string') {
					shorthandMarkup = `
                            ${shorthandMarkup}
                            ${type}
                        `
				} else if (type && type.kind === 'Document') {
					// shorthand using `gql` tag
					shorthandMarkup = `
                            ${shorthandMarkup}
                            ${type.loc.source.body}
                        `
				} else if (type) {
					// @ts-ignore
					ctx.gql.types[name] = type
				}
			} catch (e) {
				log.warn(`Unable to import GraphQL fields from ${path}`, e)
			}

			return true
		})

		// Load resolvers which could be queries, mutations, or subscriptions
		resolverPaths.forEach(path => {
			try {
				debug(`Importing GQL resolver file: ${path}`)
				// @ts-ignore dynamic require
				const requiredType = require(path)
				const def = requiredType.default
					? requiredType.default(ctx)
					: requiredType(ctx)
				// Resolvers may contain queries and/or mutations
				queries = Object.assign(queries, def.queries || {})
				mutations = Object.assign(mutations, def.mutations || {})
				subscriptions = Object.assign(subscriptions, def.subscriptions || {})

				// check for shorthand
				if (def.shorthand && def.shorthand.gql) {
					const resolvers = def.shorthand.resolvers || {}

					shorthandMarkup = `
                        ${shorthandMarkup}
                        ${
													typeof def.shorthand.gql === 'string'
														? def.shorthand.gql
														: def.shorthand.gql.loc.source.body
												}
                        `

					shorthandResolvers = {
						...shorthandResolvers,
						...resolvers
					}
				}
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

		const longhandSchema = new GraphQLSchema(resolvers)

		debug(`Parsing GQL Schema language ${shorthandMarkup}`)
		const documentNode = shorthandMarkup && parse(shorthandMarkup)
		const schema = documentNode
			? extendSchema(longhandSchema, documentNode)
			: longhandSchema

		log.info('Finished importing GQL files and creating schema')

		this.gqlSchema = schema
		this.shorthandResolvers = shorthandResolvers
	}
}
