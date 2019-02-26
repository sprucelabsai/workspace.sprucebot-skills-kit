const { GraphQLString, GraphQLEnumType } = require('graphql')

// You can customize connection options here if necessary. See https://github.com/mickhansen/graphql-sequelize/blob/master/docs/relay.md#connections for options.
// The naming convention for these files is:
// <Model Name><Association Type><Association Name>
// For example, this file is overriding the Location Users association and is named: "LocationBelongsToManyUsers"
// Another example might be "OrganizationHasManyLocations"

module.exports = ctx => {
	return {
		orderBy: new GraphQLEnumType({
			name: 'LocationBelongsToManyUsersOrderBy',
			values: {
				FIRST_NAME: { value: ['firstName', 'ASC'] }, // The first ENUM value will be the default order. The direction will be used for `first`, will automatically be inversed for `last` lookups.
				LAST_NAME: { value: ['lastName', 'ASC'] }
				// CUSTOM: { value: [function(source, args, context, info) {}, 'ASC'] } // build and return custom order for sequelize orderBy option
			}
		}),
		before: async (findOptions, args, context, info) => {
			return findOptions
		},
		after: async (obj, args, context, info) => {
			return obj
		},
		connectionFields: {
			customConnectionField: {
				type: GraphQLString,
				resolve: (options, unused, context, info) => {
					const { args, edges, pageInfo, where } = options
					return 'Custom connection field'
				}
			}
		},
		edgeFields: {
			customEdgeField: {
				type: GraphQLString,
				resolve: (edge, args, context, info) => {
					return `Custom Edge Field. Here is the node id: ${edge.node.id}`
				}
			}
		}
	}
}
