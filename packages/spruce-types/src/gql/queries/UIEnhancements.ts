import gql from 'graphql-tag'

export default gql`
	query UIEnhancements(
		$view: String!
		$sections: [String!]!
		$payload: JSON
		$organizationId: ID
		$locationId: ID
	) {
		getUiEnhancements(
			locationId: $locationId
			organizationId: $organizationId
			payload: $payload
			sections: $sections
			view: $view
		) {
			sections {
				id
			}
		}
	}
`
