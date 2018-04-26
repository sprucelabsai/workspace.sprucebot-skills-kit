import { uniqueId } from 'lodash'
import moment from 'moment-timezone'

const NOW = moment(946738800000).tz('America/Los_Angeles')

export default {
	id: uniqueId(),
	role: 'owner',
	isDev: true,
	status: 'online',
	visits: 0,
	LocationId: uniqueId(),
	UserId: uniqueId(),
	User: {
		updatedAt: NOW,
		createdAt: NOW,
		id: uniqueId(),
		firstName: 'Sprucebot',
		lastName: null,
		name: 'Sprucebot',
		profileImageUUID: uniqueId(),
		profileImages: {
			profile60: 'https://localhost/png.jpg',
			'profile60@2x': 'https://localhost/png.jpg',
			profile150: 'https://localhost/png.jpg',
			'profile150@2x': 'https://localhost/png.jpg'
		},
		defaultProfileImages: {
			profile60: 'https://localhost/png.jpg',
			'profile60@2x': 'https://localhost/png.jpg',
			profile150: 'https://localhost/png.jpg',
			'profile150@2x': 'https://localhost/png.jpg'
		},
		casualName: 'Shane'
	},
	lastRecordedVisit: NOW,
	updatedAt: NOW,
	Location: {
		id: uniqueId(),
		name: 'Spruce Labs',
		addressLine1: '153 trsr str',
		addressLine2: null,
		addressCity: 'Denver',
		addressState: null,
		addressZip: '58745',
		addressCountry: 'US',
		geo: { lat: 40.1614104, lng: -105.1056151 },
		OrganizationId: uniqueId(),
		Organization: {
			id: uniqueId(),
			name: 'Spruce Labs',
			Categories: null,
			allowWhiteLabelling: false,
			whiteLabellingStylesheetUrl: null
		},
		isPublic: false,
		timezone: 'America/Denver'
	}
}
