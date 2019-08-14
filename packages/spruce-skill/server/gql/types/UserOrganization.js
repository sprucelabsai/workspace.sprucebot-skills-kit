// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'UserOrganization',
		description: 'A user organization',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.UserOrganization)
		})
	})
