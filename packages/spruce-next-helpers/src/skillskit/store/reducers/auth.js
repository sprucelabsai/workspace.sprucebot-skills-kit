import {
	GO_AUTH_REQUEST,
	GO_AUTH_SUCCESS,
	GO_AUTH_ERROR
} from '../actions/auth'

import {
	GO_AUTH_REQUEST_V2,
	GO_AUTH_SUCCESS_V2,
	GO_AUTH_ERROR_V2
} from '../actions/authV2'

import { DID_UPDATE_USER } from '../actions/events'

export default function reducer(state = null, action) {
	switch (action.type) {
		case GO_AUTH_REQUEST:
		case GO_AUTH_REQUEST_V2:
			return {
				...state,
				authing: true
			}
		case GO_AUTH_SUCCESS:
		case GO_AUTH_SUCCESS_V2:
			return {
				...state,
				...action.result,
				authing: false
			}
		case GO_AUTH_ERROR:
		case GO_AUTH_ERROR_V2:
			return {
				...state,
				error: action.error,
				authing: false
			}
		case DID_UPDATE_USER:
			const { user: updatedUser } = action.payload
			let user = {}
			if (updatedUser.UserId === state.UserId) {
				user = updatedUser
			}
			return {
				...state,
				...user
			}
		default:
			return state
	}
}
