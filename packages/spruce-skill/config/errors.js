module.exports = {
	UNKNOWN: {
		code: 500,
		status: 'failure',
		reason: 'A server side error occurred.',
		friendlyReason:
			"I honestly have no idea what went wrong, but I've let the humans know and they are on it!"
	},
	ROUTE_NOT_FOUND: {
		code: 404,
		status: 'failure',
		reason: 'Invalid route. Check the path and request methods',
		friendlyReason: 'The droids you were looking for could not be found.'
	},
	LOCATION_NOT_FOUND: {
		code: 404,
		status: 'failure',
		reason: 'Location could not be found.',
		friendlyReason: 'I could not find the location you are looking for.'
	},
	USER_NOT_FOUND: {
		code: 404,
		status: 'failure',
		reason: 'User could not be found.',
		friendlyReason: "No joke, I can't find that user."
	},
	INVALID_AUTHENTICATION: {
		code: 401,
		status: 'failure',
		reason: 'Authentication failed.',
		friendlyReason: "Sorry, you can't be here right now."
	},
	USER_NOT_LOGGED_IN: {
		code: 403,
		status: 'failure',
		reason: 'The user is not logged in',
		friendlyReason: 'Please log in and try again.'
	},
	NOT_AUTHORIZED: {
		code: 403,
		status: 'failure',
		reason: 'Permission denied.',
		friendlyReason: 'Permission denied.'
	},
	LOADING_ONBOARDING_ERROR: {
		code: 404,
		status: 'failure',
		reason: 'finishedOnboarding could not be found',
		friendlyReason: 'I could not tell if you have gone through onboarding yet.'
	},
	SAVE_ONBOARDING_ERROR: {
		code: 404,
		status: 'failure',
		reason: 'Could not save finishedOnboarding',
		friendlyReason:
			'I had a problem trying to let the Bots know you had finished onboarding.  Maybe try again?'
	},
	INVALID_PAYLOAD: {
		code: 400,
		status: 'failure',
		reason: 'The event payload was invalid',
		friendlyReason: 'Sorry, something went wrong'
	},
	NOT_IMPLEMENTED: {
		code: 510,
		status: 'failure',
		reason: 'The handler for this action has not been implemented.',
		friendlyReason: 'Sorry, something went wrong'
	},
	// Upload
	INVALID_FILE_FORMAT: {
		code: 400,
		status: 'failure',
		reason: 'The file format is invalid.',
		friendlyReason: "Sorry, I wasn't able to process your file(s)"
	}
}
