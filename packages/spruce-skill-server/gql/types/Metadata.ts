import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'Metadata',
		description: 'Metadata',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Metadata)
		})
	})
