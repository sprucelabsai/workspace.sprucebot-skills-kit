// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'LocationGroup',
		description: 'A location group',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.LocationGroup)
		})
	})
