'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _auth = require('../actions/auth');

var _events = require('../actions/events');

function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _auth.GO_AUTH_REQUEST:
			return _extends({}, state, {
				authing: true
			});
		case _auth.GO_AUTH_SUCCESS:
			return _extends({}, state, action.result, {
				authing: false
			});
		case _auth.GO_AUTH_ERROR:
			return _extends({}, state, {
				error: action.error,
				authing: false
			});
		case _events.DID_UPDATE_USER:
			var updatedUser = action.payload.user;

			var user = {};
			if (updatedUser.UserId === state.UserId) {
				user = updatedUser;
			}
			return _extends({}, state, user);
		default:
			return state;
	}
}