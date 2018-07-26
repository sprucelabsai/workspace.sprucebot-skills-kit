export const FETCH_CALENDAR_REQUEST = 'FETCH_CALENDAR_REQUEST'
export const FETCH_CALENDAR_SUCCESS = 'FETCH_CALENDAR_SUCCESS'
export const FETCH_CALENDAR_ERROR = 'FETCH_CALENDAR_ERROR'

export const fetchCalendar = ({ start, end, userId }) => ({
	types: [FETCH_CALENDAR_REQUEST, FETCH_CALENDAR_SUCCESS, FETCH_CALENDAR_ERROR],
	promise: (client, auth) => {
		return client.get(`/api/1.0/teammate/calendar.json`, {
			query: { start, end, userId }
		})
	}
})
