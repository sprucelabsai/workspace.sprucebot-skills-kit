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

	var emitting = state && state.emitting ? state.emitting : {};
	var errors = state && state.errors ? state.errors : {};
	var results = state && state.results ? state.results : {};
	switch (action.type) {
		case _onboarding.EMIT_SHARABLE_EVENT_REQUEST:
			emitting[action.name] = true;
			return _extends({}, state, {
				emitting: emitting
			});
		case _onboarding.EMIT_SHARABLE_EVENT_SUCCESS:
			emitting[action.name] = false;
			errors[action.name] = false;
			results[action.name] = action.result;
			return _extends({}, state, {
				emitting: emitting,
				errors: errors,
				results: results
			});
		case _onboarding.EMIT_SHARABLE_EVENT_ERROR:
			emitting[action.name] = false;
			errors[action.name] = action.error;
			return _extends({}, state, {
				emitting: emitting,
				errors: errors,
				results: results
			});
		default:
			return state;
	}
}