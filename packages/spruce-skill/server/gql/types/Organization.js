// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'Organization',
		description: 'An organization',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Organization)
		})
	})
