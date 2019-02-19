const globby = require('globby')
const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const helpers = require('./helpers')

module.exports = class Schema {
	constructor({ ctx, gqlDir }) {
		try {
			ctx.gql = {
				helpers: helpers(ctx),
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
					log.info(`Importing GQL file: ${path}`)
					// $FlowIgnore
					const type = require(path)(ctx) // eslint-disable-line
					let name = path.replace(/^(.*[\\\/])/, '')
					name = name.replace('.js', '')
					if (type) {
						ctx.gql.types[name] = type
					}
				} catch (e) {
					log.warn(`Unable to import GraphQL fields from ${path}`, e)
				}
			})
			typePaths.forEach(path => {
				try {
					log.info(`Importing GQL file: ${path}`)
					// $FlowIgnore
					const type = require(path)(ctx) // eslint-disable-line
					let name = path.replace(/^(.*[\\\/])/, '')
					name = name.replace('.js', '')
					if (type) {
						ctx.gql.types[name] = type
					}
				} catch (e) {
					log.warn(`Unable to import GraphQL fields from ${path}`, e)
				}
			})
			// Load resolvers which could be queries, mutations, or subscriptions
			resolverPaths.forEach(path => {
				try {
					log.info(`Importing GQL file: ${path}`)
					// $FlowIgnore
					const def = require(path)(ctx) // eslint-disable-line
					// Resolvers may contain queries and/or mutations
					queries = Object.assign(queries, def.queries || {})
					mutations = Object.assign(mutations, def.mutations || {})
					subscriptions = Object.assign(subscriptions, def.subscriptions || {})
				} catch (e) {
					log.warn(`Unable to import GraphQL fields from ${path}`, e)
				}
			})

			const resolvers = {}
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

			return schema
		} catch (e) {
			log.crit('Error creating GraphQL schema')
			log.crit(e)
		}
	}
}
