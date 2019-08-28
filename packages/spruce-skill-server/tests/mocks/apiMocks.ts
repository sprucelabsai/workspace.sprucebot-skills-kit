import { ISpruceContext } from '../../interfaces/ctx'
import Debug from 'debug'
import config from 'config'
import { Source } from 'graphql'

const debug = Debug('spruce-skill-server')
export default (ctx: ISpruceContext) => ({
	mockResolvers: {
		Query: {},
		Mutation: {
			// TODO: The mock server is still returning default data and ignoring this. If we custom mock mutation responses in the future this will need to be fixed. SDEV3-2131
			syncSkill: async (/*
				source: Source,
				args: any,
				context: Request,
				info: GraphQLResolveInfo
			*/) => {
				return {
					s3Bucket: '1234',
					databaseUrl: 'https://hacked.sprucebot.com/test/db/url'
				}
			}
		}
	},
	mockModels: {
		// Mock version of acls. Can't do real checks so we'll just check defaults in the config file and return true if any of them are valid.  This should be accurate enough for automated tests
		Acl: async (
			source: Source,
			args: any
			/*
			context: Request,
			info: GraphQLResolveInfo
			*/
		) => {
			debug('Doing ACL check using Mock server')
			if (args.userId && args.permissions) {
				const user = await ctx.db.models.User.findOne({
					where: {
						id: args.userId
					},
					include: [
						ctx.db.models.UserGroup,
						ctx.db.models.UserLocation,
						ctx.db.models.UserOrganization
					]
				})

				if (
					!user ||
					!user.UserLocations ||
					!user.UserGroups ||
					!user.UserOrganizations
				) {
					return null
				}

				// Simple way of setting the user permissions based on role. This is NOT totally accurate to the real system which would take into account actual jobs and permissions. This also assumes a user is only assigned to a single location
				let userRole = 'guest'
				if (user.UserLocations[0]) {
					switch (user.UserLocations[0].role) {
						case 'owner':
							userRole = 'manager'
							break
						case 'teammate':
							userRole = 'teammate'
							break
						case 'guest':
						default:
							userRole = 'guest'
							break
					}
				}

				const userGroup = user.UserGroups.find(
					ug => ug.OrganizationId === args.organizationId
				)
				if (userGroup) {
					userRole = 'groupManager'
				}

				const userOrg = user.UserOrganizations.find(
					uo => uo.OrganizationId === args.organizationId
				)
				if (userOrg) {
					userRole = 'owner'
				}

				const permissionSlugs = Object.keys(args.permissions)

				for (let i = 0; i < permissionSlugs.length; i += 1) {
					const slug = permissionSlugs[i]
					const permissions = args.permissions[slug]
					const slugResponse: {
						slug: string
						permissions: {
							name: string
							value: boolean
						}[]
					} = {
						slug,
						permissions: []
					}

					for (let j = 0; j < permissions.length; j += 1) {
						const permission = permissions[j]
						if (slug === config.get('SLUG')) {
							if (
								config.get<Record<string, any>>('acl').publishes[permission] &&
								config.get<Record<string, any>>('acl').publishes[permission]
									.defaults
							) {
								slugResponse.permissions.push({
									name: permission,
									value:
										userRole === 'owner' ||
										config.get<Record<string, any>>('acl').publishes[permission]
											.defaults[userRole] === true
								})
							}
						} else {
							debug(
								'Checking for permissions from a different skill in tests is not currently supported'
							)
						}
					}

					if (slugResponse.permissions.length > 0) {
						return slugResponse
					}
				}

				// If we got here the user did not match any of the requested permissions. Return a dummy failure
				return {
					slug: 'some_slug',
					permissions: [
						{
							name: 'some_permission',
							value: false
						}
					]
				}
			}
			return null
		},
		Acls: async (source: Source) => {
			return source
		},
		Organization: async (source: Source, args: any) => {
			if (args.id) {
				const user = await ctx.db.models.Organization.findOne({
					where: {
						id: args.id
					}
				})

				if (user) {
					return user.get()
				}
			}
			return {}
		},
		Location: async (source: Source, args: any) => {
			if (args.id) {
				const user = await ctx.db.models.Location.findOne({
					where: {
						id: args.id
					}
				})
				return user && user.get()
			}
			return {}
		},
		User: async (source: Source, args: any) => {
			if (args.id) {
				const user = await ctx.db.models.User.findOne({
					where: {
						id: args.id
					},
					include: [
						ctx.db.models.UserGroup,
						ctx.db.models.UserLocation,
						ctx.db.models.UserOrganization
					]
				})
				if (!user) {
					return {}
				}
				return {
					...user.get(),
					UserGroups: () => {
						if (user.UserGroups) {
							const edges = user.UserGroups.map(userGroup => ({
								node: userGroup
							}))
							return {
								edges
							}
						}

						return null
					},
					UserLocations: () => {
						if (user.UserLocations) {
							const edges = user.UserLocations.map(UserLocation => ({
								node: UserLocation
							}))
							return {
								edges
							}
						}

						return null
					},
					UserOrganizations: () => {
						if (user.UserOrganizations) {
							const edges = user.UserOrganizations.map(UserOrganization => ({
								node: UserOrganization
							}))
							return {
								edges
							}
						}

						return null
					}
				}
			}
			return {}
		}
	}
})
