import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'Group',
		description: 'A group',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Group)
		})
	})
