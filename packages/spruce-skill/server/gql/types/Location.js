// @flow
const { GraphQLObjectType } = require('graphql')
const GraphQLJSON = require('graphql-type-json')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'Location',
		description: 'A location',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Location, {
				exclude: ['geo']
			}),
			geo: {
				type: GraphQLJSON,
				// Just return geo...this is public information
				resolve: async (obj: Object) => obj.geo
			}
		})
	})
