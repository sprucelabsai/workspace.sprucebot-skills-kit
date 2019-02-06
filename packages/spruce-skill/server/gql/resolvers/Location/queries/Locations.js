// @flow
const config = require('config')
const { GraphQLList, GraphQLString } = require('graphql')
const { defaultListArgs } = require('graphql-sequelize')
module.exports = ctx => {
	const queries = {
		Locations: {
			description:
				'Get public information about locations. Max/default limit 50.',
			type: new GraphQLList(ctx.gql.types.Location),
			args: {
				...defaultListArgs(),
				...ctx.gql.helpers.defaultArgs(),
				organizationId: {
					description:
						'If passed and user has the "can_view_organization_locations" permission, additional locations with "isPublic=false" will be returned.',
					type: GraphQLString
				}
			},
			resolve: ctx.gql.helpers.resolver(ctx.db.models.Location, {
				before: async (findOptions, args, context /* , info */) => {
					if (!context.scopes) {
						context.scopes = {}
					}
					if (!findOptions.where) {
						findOptions.where = {}
					}
					if (args.organizationId) {
						const canViewOrgLocations = await ctx.services.acl.userIsAuthorizedForAcls(
							{
								userId: context.auth.User.id,
								organizationId: args.organizationId,
								permissions: {
									core: ['can_view_organization_locations']
								}
							}
						)

						if (!canViewOrgLocations) {
							throw new Error('NOT_AUTHORIZED')
						}
					} else {
						// Only show public locations
						findOptions.where.isPublic = true
					}
					if (!args.limit || +args.limit < 1 || +args.limit >= 50) {
						findOptions.limit = 50
					} else {
						findOptions.limit = +args.limit
					}

					context.scopes.Locations = config.scopes.Locations.public()

					return findOptions
				}
			})
		}
	}
	return { queries }
}
