import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'UserGroup',
		description: 'A user group',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.UserGroup)
		})
	})
