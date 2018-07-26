export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR'

export const fetchEvents = ({ start, end, userId }) => {
	return (dispatch, getState, next, client) => {
		const { promise, request } = client.get(`/api/1.0/teammate/calendar.json`, {
			query: { start, end, userId }
		})

		next({
			type: FETCH_EVENTS_REQUEST,
			request,
			promise
		})

		promise
			.then(result => {
				next({
					type: FETCH_EVENTS_SUCCESS,
					result
				})
			})
			.catch(error => {
				next({
					type: FETCH_EVENTS_ERROR,
					error
				})
			})

		return { promise, request }
	}
}
