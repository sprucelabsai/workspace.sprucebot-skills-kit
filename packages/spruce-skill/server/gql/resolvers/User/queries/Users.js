// @flow
const config = require('config')
const { GraphQLString } = require('graphql')

module.exports = ctx => {
	const connection = ctx.gql.helpers.buildConnection({
		model: ctx.db.models.User,
		associationName: 'User',
		type: ctx.gql.types.User,
		connectionOptions: {
			before: async (findOptions, args, context, info) => {
				if (!context.auth || !context.auth.User) {
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
		}
	})

	const queries = {
		Users: {
			description: 'Get public information about users. Max/default limit 50.',
			type: connection.type,
			args: {
				...connection.args,
				organizationId: {
					description: 'The organizationId to fetch users for',
					type: GraphQLString
				},
				locationId: {
					description: 'The locationId to fetch users for',
					type: GraphQLString
				}
			},
			resolve: connection.resolve
		}
	}

	return { queries }
}
