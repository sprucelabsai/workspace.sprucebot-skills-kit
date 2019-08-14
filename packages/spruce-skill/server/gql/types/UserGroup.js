// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'UserGroup',
		description: 'A user group',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.UserGroup)
		})
	})
