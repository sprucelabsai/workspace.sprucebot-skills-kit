// @flow
const { GraphQLObjectType } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'Skill',
		description: 'A skill',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Skill)
		})
	})
