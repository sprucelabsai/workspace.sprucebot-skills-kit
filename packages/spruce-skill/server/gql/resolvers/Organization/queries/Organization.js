// @flow
const config = require('config')
const { GraphQLString, GraphQLNonNull } = require('graphql')

module.exports = ctx => {
	const queries = {
		Organization: {
			description:
				'Gets information about a single organization. Depending on user permissions, additional information may be available.',
			type: ctx.gql.types.Organization,
			args: {
				id: {
					description: 'id of the organization',
					type: new GraphQLNonNull(GraphQLString)
				}
				// ...ctx.gql.helpers.defaultArgs()
			},
			resolve: ctx.gql.helpers.enhancedResolver(ctx.db.models.Organization, {
				before: async (findOptions, args, context /* , info */) => {
					if (!context.scopes) {
						context.scopes = {}
					}

					if (!context.where) {
						context.where = {}
					}

					// const org = await ctx.db.models.Organization.findOne({
					// 	where: {
					// 		id: args.id
					// 	}
					// })

					findOptions.where.id = args.id

					// Public info
					context.scopes.Organization = config.scopes.Organization.public()
					return findOptions
				}
			})
		}
	}

	return { queries }
}
