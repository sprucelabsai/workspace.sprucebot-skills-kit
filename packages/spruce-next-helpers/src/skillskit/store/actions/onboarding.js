export const DID_ONBOARDING_REQUEST = 'onboarding/DID_ONBOARDING_REQUEST'
export const DID_ONBOARDING_SUCCESS = 'onboarding/DID_ONBOARDING_SUCCESS'
export const DID_ONBOARDING_ERROR = 'onboarding/DID_ONBOARDING_ERROR'

export const FINISH_ONBOARDING_REQUEST = 'onboarding/FINISH_ONBOARDING_REQUEST'
export const FINISH_ONBOARDING_SUCCESS = 'onboarding/FINISH_ONBOARDING_SUCCESS'
export const FINISH_ONBOARDING_ERROR = 'onboarding/FINISH_ONBOARDING_ERROR'

export function didOnboarding() {
	return {
		types: [
			DID_ONBOARDING_REQUEST,
			DID_ONBOARDING_SUCCESS,
			DID_ONBOARDING_ERROR
		],
		promise: (client, auth) => {
			return client.get(`/api/1.0/guest/onboarding.json`)
		}
	}
}

export function finishOnboarding() {
	return {
		types: [
			FINISH_ONBOARDING_REQUEST,
			FINISH_ONBOARDING_SUCCESS,
			FINISH_ONBOARDING_ERROR
		],
		promise: (client, auth) => {
			return client.post(`/api/1.0/guest/onboarding.json`)
		}
	}
}
