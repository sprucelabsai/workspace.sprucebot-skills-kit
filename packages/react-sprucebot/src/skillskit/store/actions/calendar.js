import axios from 'axios'

const CancelToken = axios.CancelToken

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR'

export function fetchEvents({ start, end, userId }) {
	const source = CancelToken.source()

	return (dispatch, getState, next, client) => {
		const promise = client.get(`/api/1.0/teammate/calendar.json`, {
			query: { start, end, userId },
			cancelToken: source.token
		})

		next({
			type: FETCH_EVENTS_REQUEST,
			cancelToken: source,
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

		return { promise, cancelToken: source }
	}
}
