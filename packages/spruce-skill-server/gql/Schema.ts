import globby from 'globby'
import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLSchemaConfig,
	parse,
	extendSchema
} from 'graphql'

import { addResolveFunctionsToSchema } from 'graphql-tools/dist/generate'

import fs from 'fs'

import helpers from './helpers'
import { ISpruceContext } from '../interfaces/ctx'

export default class Schema {
	public readonly gqlSchema: GraphQLSchema

	public constructor(options: { ctx: ISpruceContext; gqlDir: string }) {
		const { ctx, gqlDir } = options
		ctx.gql = {
			helpers: helpers(ctx),
			// @ts-ignore
			types: {}
		}
		const coreTypePaths = globby.sync([
			`${__dirname}/types/**/!(index|types|_helpers).(ts|js|gql)`
		])
		const typePaths = globby.sync([
			`${gqlDir}/types/**/!(index|types|_helpers).(ts|js|gql)`
		])
		const resolverPaths = globby.sync([
			`${gqlDir}/resolvers/**/!(index|types|_helpers).(ts|js)`
		])
		let queries = {}
		let mutations = {}
		let subscriptions = {}

		let sdl = ``
		let allResolvers = {
			Query: {},
			Mutation: {}
		}

		// Load GQL types first and assign to ctx.gql.types[<type name>]
		const allTypePaths = [...coreTypePaths, ...typePaths]
		allTypePaths.forEach(path => {
			log.debug(`checking GQL type @ ${path}`)
			if (path.search('.d.ts') > -1) {
				log.debug('Skipping GQL .d.ts file.')
				return true
			}

			try {
				log.debug(`Importing GQL types file: ${path}`)

				let type
				if (path.search(/\.gql/) > -1) {
					type = `${fs.readFileSync(path)}`
				} else {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					const requiredType = require(path)
					type = requiredType.default
						? requiredType.default(ctx)
						: requiredType(ctx)
				}

				// @ts-ignore dynamic require
				let name = path.replace(/^(.*[\\/])/, '')
				name = name.replace('.js', '').replace('.ts', '')

				if (typeof type === 'string') {
					sdl = `
                            ${sdl}
                            ${type}
                        `
				} else if (type && type.kind === 'Document') {
					// sdl using `gql` tag
					sdl = `
                            ${sdl}
                            ${type.loc.source.body}
                        `
				} else if (type) {
					// @ts-ignore
					ctx.gql.types[name] = type
				} else {
					log.debug(`Missing type in file: ${path}`)
				}
			} catch (e) {
				log.warn(`Unable to import GraphQL fields from ${path}`, e)
			}

			return true
		})

		// Load resolvers which could be queries, mutations, or subscriptions
		resolverPaths.forEach(path => {
			try {
				log.debug(`Importing GQL resolver file: ${path}`)
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const requiredType = require(path)
				const def = requiredType.default
					? requiredType.default(ctx)
					: requiredType(ctx)
				// Resolvers may contain queries and/or mutations
				queries = Object.assign(queries, def.queries || {})
				mutations = Object.assign(mutations, def.mutations || {})
				subscriptions = Object.assign(subscriptions, def.subscriptions || {})

				// check for shorthand
				if (def.gql) {
					const body = def.gql.loc ? def.gql.loc.source.body : def.gql

					sdl = `
                            ${sdl}
                            ${body}
                            `
				}

				const resolvers = def.resolvers

				if (resolvers) {
					allResolvers = {
						...allResolvers,
						...resolvers,
						Query: {
							...allResolvers.Query,
							...(resolvers.Query || {})
						},
						Mutation: {
							...allResolvers.Mutation,
							...(resolvers.Mutation || {})
						}
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

		log.debug(`Parsing Schema Definition Language ${sdl}`)
		const documentNode = sdl && parse(sdl)
		const extendedSchema = documentNode
			? extendSchema(longhandSchema, documentNode)
			: longhandSchema

		// add in reslovers
		const schema = addResolveFunctionsToSchema({
			schema: extendedSchema,
			resolvers: allResolvers
		})

		log.info('Finished importing GQL files and creating schema')

		this.gqlSchema = schema
	}
}
