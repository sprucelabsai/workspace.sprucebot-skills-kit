// This is the query that will be run and attached to ctx.authV2 and props.authV2
module.exports = ({ userId, locationId, organizationId }) => `
{
	${
		userId
			? `
	User (
		id: "${userId}"
	) {
		id
		firstName
		lastName
		UserLocations {
			edges {
				node {
					role
					LocationId
					Job {
						name
						isDefault
						role
					}
				}
			}
		}
		UserGroups {
			edges {
				node {
					Group {
						name
					}
					Job {
						name
						isDefault
						role
					}
				}
			}
		}
		UserOrganizations {
			edges {
				node {
					role
					OrganizationId
				}
			}
		}
	}`
			: ``
	}
	${
		organizationId
			? `
	Organization(
		id: "${organizationId}"
	) {
		id
		name
		slug
	}
	`
			: ``
	}

	${
		locationId
			? `
	Location(
		id: "${locationId}"
	) {
		id
		name
		slug
	}
	`
			: ``
	}
}
`
