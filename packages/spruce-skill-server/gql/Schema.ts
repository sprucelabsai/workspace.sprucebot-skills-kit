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
import config from 'config'

import Debug from 'debug'
const debug = Debug('spruce-skill-server')

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
			debug(`checking GQL type @ ${path}`)

			// TODO filter these out with globby above
			if (path.search('.d.ts') > -1) {
				debug('Skipping GQL .d.ts file.')
				return true
			}

			try {
				debug(`Importing GQL types file: ${path}`)

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
				name = name
					.replace('.js', '')
					.replace('.ts', '')
					.replace('.gql', '')
					.replace('.graphql', '')

				// TODO find a way to do testing without coupling skills-kit-server and spruce-skill
				if (!config.TESTING_SKILLS_KIT && name === 'TestType') {
					return true
				}

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
					debug(`Missing type in file: ${path}`)
				}
			} catch (e) {
				log.crit(`Unable to import GraphQL fields from ${path}`, e)
				throw e
			}

			return true
		})

		// Load resolvers which could be queries, mutations, or subscriptions
		resolverPaths.forEach(path => {
			try {
				debug(`Importing GQL resolver file: ${path}`)
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
				if (def.sdl) {
					const body = def.sdl.loc ? def.sdl.loc.source.body : def.sdl

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
				log.crit(`Unable to import GraphQL fields from ${path}`, e)
				throw e
			}
		})

		const resolvers: GraphQLSchemaConfig = {
			query: null
		}

		if (sdl.length > 0 || Object.keys(queries).length > 0) {
			resolvers.query = new GraphQLObjectType({
				name: 'Query',
				fields: queries
			})
		}
		if (Object.keys(queries).length === 0) {
			//change first `extend type Query` to just `type Query` since no query type will exist yet
			sdl = sdl.replace('extend type Query', 'type Query')
		}

		if (sdl.length > 0 || Object.keys(mutations).length > 0) {
			resolvers.mutation = new GraphQLObjectType({
				name: 'Mutation',
				fields: mutations
			})
		}

		if (Object.keys(mutations).length === 0) {
			//change first `extend type Mutation` to just `type Mutation` since no mutation type will exist yet
			sdl = sdl.replace('extend type Mutation', 'type Mutation')
		}

		if (subscriptions && Object.keys(subscriptions).length > 0) {
			resolvers.subscription = new GraphQLObjectType({
				name: 'Subscription',
				fields: subscriptions
			})
		}

		const longhandSchema = new GraphQLSchema(resolvers)

		debug(`Parsing Schema Definition Language ${sdl}`)
		const documentNode = sdl && parse(sdl)
		const extendedSchema = documentNode
			? extendSchema(longhandSchema, documentNode)
			: longhandSchema

		// add in reslovers
		let cleanedResolvers = { ...allResolvers }
		if (Object.keys(cleanedResolvers.Query).length === 0) {
			delete cleanedResolvers.Query
		}

		if (Object.keys(cleanedResolvers.Mutation).length === 0) {
			delete cleanedResolvers.Mutation
		}

		const schema =
			Object.keys(cleanedResolvers).length === 0
				? extendedSchema
				: addResolveFunctionsToSchema({
						schema: extendedSchema,
						resolvers: cleanedResolvers
				  })

		debug('Finished importing GQL files and creating schema')

		this.gqlSchema = schema
	}
}
