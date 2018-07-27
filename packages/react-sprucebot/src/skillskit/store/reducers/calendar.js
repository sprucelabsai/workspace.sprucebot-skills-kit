import {
	FETCH_EVENTS_REQUEST,
	FETCH_EVENTS_SUCCESS,
	FETCH_EVENTS_ERROR
} from '../actions/calendar'

const calendar = (state = {}, action) => {
	switch (action.type) {
		case FETCH_EVENTS_REQUEST: {
			return {
				...state,
				fetchCalendarLoading: true,
				fetchCalendarLoaded: false,
				fetchCalendarError: false
			}
		}
		case FETCH_EVENTS_SUCCESS: {
			return {
				...state,
				storeSchedule: action.result.storeSchedule,
				events: action.result.events.map(event => {
					return {
						...event,
						start: new Date(event.start),
						end: new Date(event.end)
					}
				}),
				fetchCalendarLoading: false,
				fetchCalendarLoaded: false,
				fetchCalendarError: true
			}
		}
		case FETCH_EVENTS_ERROR: {
			return {
				...state,
				fetchCalendarLoading: false,
				fetchCalendarLoaded: false,
				fetchCalendarError: action.error
			}
		}
		default:
			return state
	}
}

export default calendar
