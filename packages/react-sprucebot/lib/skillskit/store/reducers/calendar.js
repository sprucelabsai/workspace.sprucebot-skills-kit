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
		case _calendar.FETCH_EVENTS_REQUEST:
			{
				return _extends({}, state, {
					fetchCalendarLoading: true,
					fetchCalendarLoaded: false,
					fetchCalendarError: false
				});
			}
		case _calendar.FETCH_EVENTS_SUCCESS:
			{
				return _extends({}, state, {
					storeSchedule: action.result.storeSchedule,
					events: action.result.events.map(function (event) {
						return _extends({}, event, {
							start: new Date(event.start),
							end: new Date(event.end)
						});
					}),
					fetchCalendarLoading: false,
					fetchCalendarLoaded: false,
					fetchCalendarError: true
				});
			}
		case _calendar.FETCH_EVENTS_ERROR:
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