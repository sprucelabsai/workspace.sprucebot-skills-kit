import { ISkillContext } from 'server/interfaces/ctx'
import { IGQLResolvers } from '@sprucelabs/spruce-skill-server'
import gql from 'graphql-tag'
import config from 'config'

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
				Settings: async (source, args, context) => {
					const { auth } = context

					if (!auth || !auth.User) {
						throw new Error('USER_NOT_LOGGED_IN')
					}

					// Get settings specific to what's being requested
					const response = await ctx.utilities.settings.getRequestedSettings({
						settings: config.settings, // Your settings definition is in config/settings.js
						requestedSettings: args.requestedSettings,
						userId: auth.User.id,
						locationId: auth.Location.id,
						organizationId: auth.Organization.id
					})

					return { settings: response }
				}
			}
		}
	}

	return settings
}
