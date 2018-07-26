'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _calendar = require('../actions/calendar');

var calendar = function calendar() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case _calendar.FETCH_CALENDAR_REQUEST:
			{
				return _extends({}, state, {
					fetchCalendarLoading: true,
					fetchCalendarLoaded: false,
					fetchCalendarError: false
				});
			}
		case _calendar.FETCH_CALENDAR_SUCCESS:
			{
				return _extends({}, state, {
					events: action.response,
					fetchCalendarLoading: false,
					fetchCalendarLoaded: false,
					fetchCalendarError: true
				});
			}
		case _calendar.FETCH_CALENDAR_ERROR:
			{
				return _extends({}, state, {
					fetchCalendarLoading: false,
					fetchCalendarLoaded: false,
					fetchCalendarError: action.error
				});
			}
		default:
			return state;
	}
};

exports.default = calendar;