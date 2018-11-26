export const DID_UPDATE_USER = 'events/DID_UPDATE_USER'

export function didUpdateUser(payload) {
	return {
		type: DID_UPDATE_USER,
		payload
	}
}
