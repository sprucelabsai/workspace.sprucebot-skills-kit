import {
	DID_ONBOARDING_REQUEST,
	DID_ONBOARDING_SUCCESS,
	DID_ONBOARDING_ERROR,
	FINISH_ONBOARDING_REQUEST,
	FINISH_ONBOARDING_SUCCESS,
	FINISH_ONBOARDING_ERROR
} from '../actions/onboarding'

export default function reducer(state = null, action) {
	switch (action.type) {
		case DID_ONBOARDING_REQUEST:
			return {
				...state,
				onboardingError: undefined,
				onboardingLoading: true,
				onboardingLoaded: false
			}
		case DID_ONBOARDING_SUCCESS:
			return {
				...state,
				onboardingComplete: action.result.finishedOnboarding,
				onboardingError: undefined,
				onboardingLoading: false,
				onboardingLoaded: true
			}
		case DID_ONBOARDING_ERROR:
			return {
				...state,
				onboardingError: action.error,
				onboardingLoading: false,
				onboardingLoaded: false
			}
		case FINISH_ONBOARDING_REQUEST:
			return {
				...state,
				onboardingError: undefined,
				onboardingSaving: true,
				onboardingSaved: false
			}
		case FINISH_ONBOARDING_SUCCESS:
			return {
				...state,
				onboardingComplete: action.result.finishedOnboarding,
				onboardingError: undefined,
				onboardingSaving: false,
				onboardingSaved: true
			}
		case FINISH_ONBOARDING_ERROR:
			return {
				...state,
				onboardingError: action.error,
				onboardingSaving: false,
				onboardingSaved: false
			}
		default:
			return state
	}
}
