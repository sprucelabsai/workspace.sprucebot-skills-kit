// @flow
const { GraphQLObjectType, GraphQLString } = require('graphql')

module.exports = ctx =>
	new GraphQLObjectType({
		name: 'ScopeWarning',
		description: 'The scope warnings for a query',
		fields: () => ({
			field: {
				type: GraphQLString,
				description:
					'The field not allowed in this query using the requested scope'
			}
			// friendlyResponse: {
			// 	type: GraphQLString,
			// 	description:
			// 		'The field not allowed in this query using the requested scope'
			// }
		})
	})
