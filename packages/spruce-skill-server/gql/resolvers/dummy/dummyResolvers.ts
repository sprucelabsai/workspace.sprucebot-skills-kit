import { GraphQLObjectType, GraphQLString } from 'graphql'

/**
 * Placeholder longhand query and mutation to prevent errors w/ schema stitching
 * https://github.com/apollographql/graphql-tools/issues/764
 */
export default () => {
	const mutationResponseType = new GraphQLObjectType({
		name: 'dummyMutationResponse',
		description: 'Dummy placeholder',
		fields: () => ({
			status: {
				description: 'Dummy response',
				type: GraphQLString
			}
		})
	})

	const queryResponseType = new GraphQLObjectType({
		name: 'dummyQueryResponse',
		description: 'Dummy placeholder',
		fields: () => ({
			status: {
				description: 'Dummy response',
				type: GraphQLString
			}
		})
	})

	const mutations = {
		dummyMutation: {
			description: 'Dummy mutation (placeholder)',
			type: mutationResponseType,
			args: {},
			async resolve() {
				return { status: 'success' }
			}
		}
	}

	const queries = {
		dummyQuery: {
			description: 'Dummy query (placeholder)',
			type: queryResponseType,
			args: {},
			async resolve() {
				return { status: 'success' }
			}
		}
	}

	return { queries, mutations }
}
