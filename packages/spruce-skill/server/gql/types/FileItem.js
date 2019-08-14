// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'FileItem',
		description: 'A file item',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.FileItem)
		})
	})
