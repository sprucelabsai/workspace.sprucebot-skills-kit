import config from 'config'
import { ISkillContext } from 'server/interfaces/ctx'
import { IGQLResolvers } from '@sprucelabs/spruce-skill-server'
import gql from 'graphql-tag'
export default (ctx: ISkillContext) => {
	const locations: IGQLResolvers<ISkillContext> = {
		sdl: gql`
			type LocationConnection {
				pageInfo: PageInfo!
				edges: [LocationEdge]
				totalCount: Int
			}

			type LocationEdge {
				node: Location
				cursor: String!
			}

			extend type Query {
				Locations(
					limit: Int
					order: String
					where: JSON
					offset: Int
					after: String
					first: Int
					before: String
					last: Int
				): LocationConnection
			}
		`,
		resolvers: {
			Query: {
				Locations: ctx.gql.helpers.buildSequelizeResolver({
					modelName: 'Location',
					many: true,
					associationName: 'Location',
					before: async (findOptions, args, context) => {
						// require someone to be logged it!
						if (!context.auth || !context.auth.User) {
							throw new Error('USER_NOT_LOGGED_IN')
						}
						const where: Record<string, any> = findOptions.where
							? (findOptions.where as any)
							: {}

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
							where.OrganizationId = args.organizationId
						} else {
							// Only show public locations
							where.isPublic = true
						}

						// set any search limitations you want
						if (!args.limit || +args.limit < 1 || +args.limit >= 50) {
							findOptions.limit = 50
						} else {
							findOptions.limit = +args.limit
						}

						// set scopes, see config/scopes.ts
						context.scopes.Locations = config.scopes.Locations.public()

						// set back where
						findOptions.where = where

						return findOptions
					}
				})
			}
		}
	}

	return locations
}
