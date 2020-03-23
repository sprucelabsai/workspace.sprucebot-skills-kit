import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'Skill',
		description: 'A skill',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Skill)
		})
	})
