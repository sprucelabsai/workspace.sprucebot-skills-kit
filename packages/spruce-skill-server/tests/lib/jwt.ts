import jwt from 'jsonwebtoken'
import uuid from 'uuid'
import { User } from '../../models/User'
import { Location } from '../../models/Location'
import { Organization } from '../../models/Organization'
import { IMockSkill } from '../mocks/SandboxMock'

function generateSkillJWT(options: {
	skill: IMockSkill
	user: User
	location?: Location | null
	organization?: Organization | null
	expiresIn?: number
	payload?: Record<string, any>
	eventType?: string
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
	if (expiresIn && +expiresIn > 0) {
		exp = +expiresIn
	}

	const data: Record<string, any> = {
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

	if (!skill.apiKey) {
		throw new Error('Unable to sign jwt. Skill is missing apiKey')
	}

	const token = jwt.sign(data, skill.apiKey, {
		algorithm: 'HS512',
		jwtid: uuid.v4(),
		expiresIn: exp
	})

	return token
}

export { generateSkillJWT }
