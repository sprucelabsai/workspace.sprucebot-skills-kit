// @flow
const config = require('config')
const { GraphQLString } = require('graphql')

module.exports = ctx => {
	// TODO: Change this file to suit the needs for your skill (or remove it). This is meant only as an example and could introduce security concerns.
	log.warn('TODO: Update gql/Location/queries/Location.js for this skill')

	const connection = ctx.gql.helpers.buildConnection({
		model: ctx.db.models.Location,
		associationName: 'Location',
		type: ctx.gql.types.Location,
		connectionOptions: {
			before: async (findOptions, args, context) => {
				if (!context.auth || !context.auth.User) {
					throw new Error('USER_NOT_LOGGED_IN')
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
					findOptions.where.OrganizationId = args.organizationId
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
		}
	})

	const queries = {
		Locations: {
			description:
				'Get public information about locations. Max/default limit 50.',
			args: {
				...connection.args,
				organizationId: {
					description:
						'If passed and user has the "can_view_organization_locations" permission, additional locations with "isPublic=false" will be returned.',
					type: GraphQLString
				}
			},
			type: connection.type,
			resolve: connection.resolve
		}
	}
	return { queries }
}
