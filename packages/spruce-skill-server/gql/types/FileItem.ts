import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'FileItem',
		description: 'A file item',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.FileItem)
		})
	})
