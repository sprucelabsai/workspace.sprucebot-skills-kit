// @flow
const config = require('config')
const { GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const { defaultListArgs } = require('graphql-sequelize')

const EXAMPLE_STREAM = 'EXAMPLE_STREAM'

/*
	This subscription acts as a proxy for an external graphql server.
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
				return payload
			}
		}
	}
	return { subscriptions }
}
