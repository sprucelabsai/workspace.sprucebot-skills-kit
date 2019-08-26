import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'
const GraphQLJSON = require('graphql-type-json')

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'Location',
		description: 'A location',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Location, {
				exclude: ['geo']
			}),
			geo: {
				type: GraphQLJSON,
				// Just return geo...this is public information
				resolve: async obj => obj.geo
			}
		})
	})
