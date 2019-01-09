import {
	GO_AUTH_REQUEST_V2,
	GO_AUTH_SUCCESS_V2,
	GO_AUTH_ERROR_V2
} from '../actions/auth'

import { DID_UPDATE_USER } from '../actions/events'

export default function reducer(state = null, action) {
	switch (action.type) {
		case GO_AUTH_REQUEST_V2:
			return {
				...state,
				authing: true
			}
		case GO_AUTH_SUCCESS_V2:
			return {
				...state,
				...action.result,
				authing: false
			}
		case GO_AUTH_ERROR_V2:
			return {
				...state,
				error: action.error,
				authing: false
			}
		default:
			return state
	}
}
