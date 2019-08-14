// @flow
const config = require('config')
const { GraphQLString } = require('graphql')
const { Op } = require('sequelize')

module.exports = ctx => {
	// TODO: Change this file to suit the needs for your skill (or remove it). This is meant only as an example and could introduce security concerns.
	log.warn(
		'TODO: Update gql/UserLocation/queries/UserLocations.js for this skill'
	)

	const connection = ctx.gql.helpers.buildConnection({
		model: ctx.db.models.UserLocation,
		associationName: 'UserLocation',
		type: ctx.gql.types.UserLocation,
		connectionOptions: {
			before: async (findOptions, args, context) => {
				if (!context.auth || !context.auth.User) {
					throw new Error('USER_NOT_LOGGED_IN')
				}
				if (!args.organizationId && !args.locationId) {
					throw new Error('NOT_AUTHORIZED')
				}
				if (
					!findOptions.limit ||
					+findOptions.limit < 0 ||
					+findOptions.limit >= 50
				) {
					findOptions.limit = 50
				}

				if (!findOptions.where) {
					findOptions.where = {}
				}

				if (!context.scopes) {
					context.scopes = {}
				}

				if (args.organizationId) {
					const canViewOrgRoles = await ctx.services.acl.userIsAuthorizedForAcls(
						{
							userId: context.auth.User.id,
							organizationId: args.organizationId,
							permissions: {
								core: ['can_view_organization_roles']
							}
						}
					)
					if (canViewOrgRoles) {
						context.scopes.UserLocations = config.scopes.UserLocations.team()

						findOptions.where.LocationId = {
							[Op.in]: ctx.db.sequelize.literal(
								`(SELECT id FROM "Locations" WHERE "OrganizationId"=${ctx.db.sequelize.escape(
									args.organizationId
								)})`
							)
						}
					} else {
						throw new Error('NOT_AUTHORIZED')
					}
				} else if (args.locationId) {
					const location = await ctx.db.models.Location.findOne({
						where: {
							id: args.locationId
						}
					})
					if (!location) {
						throw new Error('LOCATION_NOT_FOUND')
					}
					// If the user can view teammates and is on the same team
					const canViewTeammateRoles = await ctx.services.acl.userIsAuthorizedForAcls(
						{
							userId: context.auth.User.id,
							locationId: args.locationId,
							organizationId: location.OrganizationId,
							permissions: {
								core: ['can_view_teammate_roles']
							}
						}
					)
					if (canViewTeammateRoles) {
						context.scopes.UserLocations = config.scopes.UserLocations.team()
						findOptions.where.LocationId = args.locationId
					} else {
						throw new Error('NOT_AUTHORIZED')
					}
				}

				return findOptions
			}
		}
	})
	const queries = {
		UserLocations: {
			type: connection.type,
			args: {
				...connection.args,
				organizationId: {
					description:
						'Organization permissions may grant access to additional fields.',
					type: GraphQLString
				},
				locationId: {
					description:
						'Location permissions may grant access to additional fields.',
					type: GraphQLString
				}
			},
			resolve: connection.resolve
		}
	}

	return { queries }
}
