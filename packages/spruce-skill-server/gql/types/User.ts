import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'User',
		description: 'A user',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.User)
		})
	})
