// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'Job',
		description: 'A job',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Job)
		})
	})
