// @flow
const { GraphQLList, GraphQLString } = require('graphql')
const { Op } = require('sequelize')
const { resolver, defaultListArgs } = require('graphql-sequelize')
// const { defaultArgs, defaultBefore } = require('../../../_helpers')

module.exports = ctx => {
	const queries = {
		Users: {
			description: 'Get public information about users. Max/default limit 50.',
			type: new GraphQLList(ctx.gql.types.User),
			args: {
				...defaultListArgs(),
				// ...defaultArgs(),
				organizationId: {
					description:
						'Organization permissions may grant access to additional fields.',
					type: GraphQLString
				}
			},
			resolve: resolver(ctx.db.models.User, {
				before: (findOptions, args, context, info) => {
					// defaultBefore(findOptions, args, context, info)
					if (!context.scopes) {
						context.scopes = {}
					}
					if (
						!findOptions.limit ||
						+findOptions.limit < 0 ||
						+findOptions.limit >= 50
					) {
						findOptions.limit = 50
					}

					// if (!context.user) {
					// 	throw new Error('USER_NOT_LOGGED_IN')
					// }

					// context.scopes.Users = {
					// 	Users: 'public'
					// }

					return findOptions
				}
			})
		}
	}

	return { queries }
}
