import { GraphQLObjectType, GraphQLString } from 'graphql'

export default () =>
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
