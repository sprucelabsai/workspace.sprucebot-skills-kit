import {
	FETCH_CALENDAR_REQUEST,
	FETCH_CALENDAR_SUCCESS,
	FETCH_CALENDAR_ERROR
} from '../actions/calendar'

const calendar = (state = {}, action) => {
	switch (action.type) {
		case FETCH_CALENDAR_REQUEST: {
			return {
				...state,
				fetchCalendarLoading: true,
				fetchCalendarLoaded: false,
				fetchCalendarError: false
			}
		}
		case FETCH_CALENDAR_SUCCESS: {
			return {
				...state,
				events: action.response,
				fetchCalendarLoading: false,
				fetchCalendarLoaded: false,
				fetchCalendarError: true
			}
		}
		case FETCH_CALENDAR_ERROR: {
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
