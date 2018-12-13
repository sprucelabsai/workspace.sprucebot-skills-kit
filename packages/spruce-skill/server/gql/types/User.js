// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'User',
		description: 'A user',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.User)
		})
	})
