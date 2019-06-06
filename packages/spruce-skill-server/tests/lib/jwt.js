const jwt = require('jsonwebtoken')
const uuid = require('uuid')

module.exports.generateSkillJWT = function generateSkillJWT({
	skill,
	user,
	location,
	organization,
	expiresIn,
	payload,
	eventType
}) {
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
