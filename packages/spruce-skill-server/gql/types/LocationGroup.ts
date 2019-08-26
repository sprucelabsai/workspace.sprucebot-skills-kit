import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'LocationGroup',
		description: 'A location group',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.LocationGroup)
		})
	})
