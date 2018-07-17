import {
	EMIT_SHARABLE_EVENT_REQUEST,
	EMIT_SHARABLE_EVENT_SUCCESS,
	EMIT_SHARABLE_EVENT_ERROR
} from '../actions/sharable'

export default function reducer(state = null, action) {
	const emitting = state && state.emitting ? state.emitting : {}
	const errors = state && state.errors ? state.errors : {}
	const results = state && state.results ? state.results : {}
	switch (action.type) {
		case EMIT_SHARABLE_EVENT_REQUEST:
			emitting[action.name] = true
			return {
				...state,
				emitting
			}
		case EMIT_SHARABLE_EVENT_SUCCESS:
			emitting[action.name] = false
			errors[action.name] = false
			results[action.name] = action.result
			return {
				...state,
				emitting,
				errors,
				results
			}
		case EMIT_SHARABLE_EVENT_ERROR:
			emitting[action.name] = false
			errors[action.name] = action.error
			return {
				...state,
				emitting,
				errors,
				results
			}
		default:
			return state
	}
}
