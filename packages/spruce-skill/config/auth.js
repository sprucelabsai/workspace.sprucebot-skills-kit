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
			role
			LocationId
			Job {
				name
				isDefault
				role
			}
		}
		UserGroups {
			Group {
				name
			}
			Job {
				name
				isDefault
				role
			}
		}
		UserOrganizations {
			role
			OrganizationId
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
