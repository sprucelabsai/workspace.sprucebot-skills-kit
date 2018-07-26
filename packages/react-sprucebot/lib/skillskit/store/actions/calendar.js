'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var FETCH_EVENTS_REQUEST = exports.FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
var FETCH_EVENTS_SUCCESS = exports.FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
var FETCH_EVENTS_ERROR = exports.FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';

var fetchEvents = exports.fetchEvents = function fetchEvents(_ref) {
	var start = _ref.start,
	    end = _ref.end,
	    userId = _ref.userId;

	return function (dispatch, getState, next, client) {
		var _client$get = client.get('/api/1.0/teammate/calendar.json', {
			query: { start: start, end: end, userId: userId }
		}),
		    promise = _client$get.promise,
		    request = _client$get.request;

		next({
			type: FETCH_EVENTS_REQUEST,
			request: request,
			promise: promise
		});

		promise.then(function (result) {
			next({
				type: FETCH_EVENTS_SUCCESS,
				result: result
			});
		}).catch(function (error) {
			next({
				type: FETCH_EVENTS_ERROR,
				error: error
			});
		});

		return { promise: promise, request: request };
	};
};
