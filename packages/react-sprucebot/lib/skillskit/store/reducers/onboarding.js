'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _onboarding = require('../actions/onboarding');

function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _onboarding.DID_ONBOARDING_REQUEST:
			return _extends({}, state, {
				onboardingError: undefined,
				onboardingLoading: true,
				onboardingLoaded: false
			});
		case _onboarding.DID_ONBOARDING_SUCCESS:
			return _extends({}, state, {
				onboardingComplete: action.result.finishedOnboarding,
				onboardingError: undefined,
				onboardingLoading: false,
				onboardingLoaded: true
			});
		case _onboarding.DID_ONBOARDING_ERROR:
			return _extends({}, state, {
				onboardingError: action.error,
				onboardingLoading: false,
				onboardingLoaded: false
			});
		case _onboarding.FINISH_ONBOARDING_REQUEST:
			return _extends({}, state, {
				onboardingError: undefined,
				onboardingSaving: true,
				onboardingSaved: false
			});
		case _onboarding.FINISH_ONBOARDING_SUCCESS:
			return _extends({}, state, {
				onboardingComplete: action.result.finishedOnboarding,
				onboardingError: undefined,
				onboardingSaving: false,
				onboardingSaved: true
			});
		case _onboarding.FINISH_ONBOARDING_ERROR:
			return _extends({}, state, {
				onboardingError: action.error,
				onboardingSaving: false,
				onboardingSaved: false
			});
		default:
			return state;
	}
}