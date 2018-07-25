'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var FETCH_CALENDAR_REQUEST = exports.FETCH_CALENDAR_REQUEST = 'FETCH_CALENDAR_REQUEST';
var FETCH_CALENDAR_SUCCESS = exports.FETCH_CALENDAR_SUCCESS = 'FETCH_CALENDAR_SUCCESS';
var FETCH_CALENDAR_ERROR = exports.FETCH_CALENDAR_ERROR = 'FETCH_CALENDAR_ERROR';

var fetchCalendar = exports.fetchCalendar = function fetchCalendar(_ref) {
	var start = _ref.start,
	    end = _ref.end,
	    teammateIds = _ref.teammateIds;
	return {
		types: [FETCH_CALENDAR_REQUEST, FETCH_CALENDAR_SUCCESS, FETCH_CALENDAR_ERROR],
		promise: function promise(client, auth) {
			return client.get('/api/1.0/teammate/calendar.json', {
				query: { start: start, end: end, teammateIds: teammateIds }
			});
		}
	};
};
