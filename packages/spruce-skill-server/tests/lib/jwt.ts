import jwt from 'jsonwebtoken'
import uuid from 'uuid'

function generateSkillJWT(options: {
	skill: any
	user: any
	location: any
	organization: any
	expiresIn: any
	payload: any
	eventType: any
}): string {
	const {
		skill,
		user,
		location,
		organization,
		expiresIn,
		payload,
		eventType
	} = options

	let exp = 86400
	if (expiresIn && parseInt(expiresIn, 10) > 0) {
		exp = parseInt(expiresIn, 10)
	}

	const data = {
		firstSentAt: new Date(),
		deliveryTry: 1,
		eventType,
		payload
	}

	if (user) {
		data.userId = user.id
	}

	if (location) {
		data.locationId = location.id
		data.organizationId = location.OrganizationId
	}

	if (organization) {
		data.organizationId = organization.id
	}

	const token = jwt.sign(data, skill.apiKey, {
		algorithm: 'HS512',
		jwtid: uuid.v4(),
		expiresIn: exp
	})

	return token
}

export { generateSkillJWT }
