// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'Group',
		description: 'A group',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Group)
		})
	})
