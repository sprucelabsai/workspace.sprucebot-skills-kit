import { GraphQLObjectType, GraphQLList } from 'graphql'
import { ISpruceContext } from '../../interfaces/ctx'

module.exports = (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'Warning',
		description: 'The scope warnings for a query',
		fields: () => ({
			scopes: {
				type: new GraphQLList(ctx.gql.types.ScopeWarning),
				description: 'The list of scope warning on a query'
			}
		})
	})
