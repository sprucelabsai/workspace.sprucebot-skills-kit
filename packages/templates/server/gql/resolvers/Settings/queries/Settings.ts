import { ISkillContext } from 'server/interfaces/ctx'
import { IGQLResolvers } from '@sprucelabs/spruce-skill-server'
import gql from 'graphql-tag'
import config from 'config'
import get from 'ts-get'

export default (ctx: ISkillContext) => {
	const settings: IGQLResolvers = {
		sdl: gql`
			type SettingsReturnType {
				settings: JSON
			}

			extend type Query {
				"Get settings for your skill"
				Settings(requestedSettings: [String!]!): SettingsReturnType
			}
		`,
		resolvers: {
			Query: {
				Settings: async (_source, args, context) => {
					const { auth } = context

					if (!auth || !auth.User) {
						throw new Error('USER_NOT_LOGGED_IN')
					}

					if (!auth.Organization) {
						throw new Error('ORGANIZATION_NOT_FOUND')
					}

					// Get settings specific to what's being requested
					const response = await ctx.utilities.settings.getRequestedSettings({
						//@ts-ignore settings can't be typed
						settings: config.settings, // Your settings definition is in config/settings.js
						requestedSettings: args.requestedSettings,
						userId: auth.User.id,
						locationId: get(auth, a => a.Location.id),
						organizationId: auth.Organization.id
					})

					return { settings: response }
				}
			}
		}
	}

	return settings
}
