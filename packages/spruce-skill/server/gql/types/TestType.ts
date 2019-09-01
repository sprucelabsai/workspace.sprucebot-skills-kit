import gql from 'graphql-tag'
// import { ISkillContext } from 'server/interfaces/ctx'

export default (/*ctx: ISkillContext*/) => gql`
	type TestType {
		# a simple id combining the passed id and i suffix like '-1'
		id: String!

		# is The First or The Second
		name: String!
	}
`
