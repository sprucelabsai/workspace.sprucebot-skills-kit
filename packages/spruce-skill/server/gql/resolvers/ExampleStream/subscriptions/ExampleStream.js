// @flow
const config = require('config')
const { GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const { defaultListArgs } = require('graphql-sequelize')

const EXAMPLE_STREAM = 'EXAMPLE_STREAM'

/*
	This subscription acts as a proxy for an external graphql server. In this case for the Core API. See server/gql/listeners/exampleListener.js
*/
module.exports = ctx => {
	const responseType = new GraphQLObjectType({
		name: 'ExampleStreamItem',
		description: 'An example item with randomly generated data',
		fields: () => ({
			message: {
				description: 'A random message that will be fired every 10 seconds',
				type: GraphQLString
			},
			sentAt: {
				description: 'A timestamp for when this message is generated',
				type: GraphQLString
			}
		})
	})

	const subscriptions = {
		ExampleStream: {
			subscribe: (payload, args, context, info) => {
				/*
					You can check for authorization here. The params are extracted from a valid JWT token sent in the header with format of:
					"Authorization": "JWT <token>"

					The fields that could be set are:
					context.userId
					context.locationId
					context.organizationId

					In this example, we're not doing any authorization checks
				*/
				log.debug('ExampleStream subscribe context', { context })

				return ctx.gqlServer.pubsub.asyncIterator(EXAMPLE_STREAM)
			},
			description:
				'An example of creating a stream of data from an external graphql server',
			type: responseType,
			args: {},
			async resolve(
				payload: Object,
				args: Object,
				context: Object,
				info: Object
			) {
				// Just pass through the payload from the event that was triggered in server/gql/listeners/exampleListener.js
				return payload
			}
		}
	}
	return { subscriptions }
}
