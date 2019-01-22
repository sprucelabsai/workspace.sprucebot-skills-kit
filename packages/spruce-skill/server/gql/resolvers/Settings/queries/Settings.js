// @flow
const config = require('config')
const { GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const GraphQLJSON = require('graphql-type-json')

const responseType = new GraphQLObjectType({
	name: 'GetSettingsResponse',
	description: 'The requested settings',
	fields: () => ({
		settings: {
			description: 'The settings',
			type: GraphQLJSON
		}
	})
})

module.exports = ctx => {
	const queries = {
		Settings: {
			description: 'Get settings',
			type: responseType,
			args: {
				requestedSettings: {
					description: 'List of settings to fetch',
					type: new GraphQLList(GraphQLString)
				}
			},
			async resolve(
				source: Object,
				args: Object,
				context: Object
				// info: Object
			) {
				if (!context.auth || !context.auth.User) {
					throw new Error('USER_NOT_LOGGED_IN')
				}

				// Get settings specific to what's being requested
				const response = await ctx.utilities.settings.getRequestedSettings({
					settings: config.settings, // Your settings definition is in config/settings.js
					requestedSettings: args.requestedSettings,
					userId: context.auth.User.id,
					locationId: context.auth.locationId,
					organizationId: context.auth.organizationId
				})

				return { settings: response }
			}
		}
	}

	return { queries }
}
