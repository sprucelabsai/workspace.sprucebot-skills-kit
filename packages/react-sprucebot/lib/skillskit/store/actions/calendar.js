"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchEvents = fetchEvents;
exports.FETCH_EVENTS_ERROR = exports.FETCH_EVENTS_SUCCESS = exports.FETCH_EVENTS_REQUEST = void 0;

var _axios = _interopRequireDefault(require("axios"));

var CancelToken = _axios.default.CancelToken;
var FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
exports.FETCH_EVENTS_REQUEST = FETCH_EVENTS_REQUEST;
var FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
exports.FETCH_EVENTS_SUCCESS = FETCH_EVENTS_SUCCESS;
var FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
exports.FETCH_EVENTS_ERROR = FETCH_EVENTS_ERROR;

function fetchEvents(_ref) {
  var start = _ref.start,
      end = _ref.end,
      userId = _ref.userId,
      teammateId = _ref.teammateId;
  var source = CancelToken.source();
  return function (dispatch, getState, next, client) {
    var promise = client.get("/api/1.0/teammate/calendar.json", {
      query: {
        start: start,
        end: end,
        userId: userId,
        teammateId: teammateId
      },
      cancelToken: source.token
    });
    next({
      type: FETCH_EVENTS_REQUEST,
      cancelToken: source,
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
    return {
      promise: promise,
      cancelToken: source
    };
  };
}