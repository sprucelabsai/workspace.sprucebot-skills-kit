import { ISkillContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISkillContext) =>
	new GraphQLObjectType({
		name: 'Example',
		description: 'An example model',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Example)
		})
	})
