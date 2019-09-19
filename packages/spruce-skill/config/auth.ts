/**
 * This is the GQL that is executed when the proper headers are set during a request. Make sure
 * any changes you make here are reflected in `./server/interfaces/auth.ts` so you get typechecking
 * in your code!
 */
const gql = (options: {
	userId?: string
	organizationId?: string
	locationId?: string
}): string => `
{
	${
		options.userId
			? `
	User (
		id: "${options.userId}"
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
		options.organizationId
			? `
	Organization(
		id: "${options.organizationId}"
	) {
		id
		name
		slug
	}
	`
			: ``
	}

	${
		options.locationId
			? `
	Location(
		id: "${options.locationId}"
	) {
		id
        name
        timezone
        slug
        OrganizationId
	}
	`
			: ``
	}
}
`

export default gql
