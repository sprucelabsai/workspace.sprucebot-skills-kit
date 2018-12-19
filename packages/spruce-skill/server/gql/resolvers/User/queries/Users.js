// @flow
const config = require('config')
const { GraphQLList, GraphQLString } = require('graphql')
const { Op } = require('sequelize')
const { resolver, defaultListArgs } = require('graphql-sequelize')

module.exports = ctx => {
	const queries = {
		Users: {
			description: 'Get public information about users. Max/default limit 50.',
			type: new GraphQLList(ctx.gql.types.User),
			args: {
				...defaultListArgs(),
				organizationId: {
					description: 'The organizationId to fetch users for',
					type: GraphQLString
				},
				locationId: {
					description: 'The locationId to fetch users for',
					type: GraphQLString
				}
			},
			resolve: resolver(ctx.db.models.User, {
				before: (findOptions, args, context, info) => {
					ctx.gql.helpers.defaultBefore(findOptions, args, context, info)
					if (!context.auth.User) {
						throw new Error('USER_NOT_LOGGED_IN')
					}
					if (!context.scopes) {
						context.scopes = {}
					}
					if (!context.findOptions) {
						context.findOptions = {}
					}
					if (
						!findOptions.limit ||
						+findOptions.limit < 0 ||
						+findOptions.limit >= 50
					) {
						findOptions.limit = 50
					}

					context.scopes.Users = config.scopes.Users.public()

					return findOptions
				}
			})
		}
	}

	return { queries }
}
