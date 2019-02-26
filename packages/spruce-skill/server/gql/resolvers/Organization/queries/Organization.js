// @flow
const config = require('config')
const { GraphQLString, GraphQLNonNull } = require('graphql')

module.exports = ctx => {
	// TODO: Change this file to suit the needs for your skill (or remove it). This is meant only as an example and could introduce security concerns.
	log.warn(
		'TODO: Update gql/Organization/queries/Organization.js for this skill'
	)

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
			},
			resolve: ctx.gql.helpers.enhancedResolver(ctx.db.models.Organization, {
				before: async (findOptions, args, context /* , info */) => {
					if (!context.scopes) {
						context.scopes = {}
					}

					if (!context.where) {
						context.where = {}
					}

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
