export const EMIT_SHARABLE_EVENT_REQUEST =
	'sharable/EMIT_SHARABLE_EVENT_REQUEST'
export const EMIT_SHARABLE_EVENT_SUCCESS =
	'sharable/EMIT_SHARABLE_EVENT_SUCCESS'
export const EMIT_SHARABLE_EVENT_ERROR = 'sharable/EMIT_SHARABLE_EVENT_ERROR'

export function emitEvent(name, payload) {
	return {
		types: [
			EMIT_SHARABLE_EVENT_REQUEST,
			EMIT_SHARABLE_EVENT_SUCCESS,
			EMIT_SHARABLE_EVENT_ERROR
		],
		promise: (client, auth) => {
			return client.post(`/api/1.0/guest/sharable/emit.json`, {
				body: {
					name,
					payload
				}
			})
		},
		name
	}
}
