import { ISkillContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'
import config from 'config'

export default (ctx: ISkillContext) => {
	// Don't expose this besides to run tests
	// Delete this code if using this as an example
	if (!config.TESTING_SKILLS_KIT) {
		return
	}
	return new GraphQLObjectType({
		name: 'Example',
		description: 'An example model',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Example)
		})
	})
}
