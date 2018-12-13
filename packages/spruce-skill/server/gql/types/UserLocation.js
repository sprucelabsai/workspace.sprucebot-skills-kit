// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'UserLocation',
		description: 'A user location',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.UserLocation)
		})
	})
