"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _calendar = require("../actions/calendar");

var calendar = function calendar() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _calendar.FETCH_EVENTS_REQUEST:
      {
        return (0, _objectSpread2.default)({}, state, {
          fetchCalendarLoading: true,
          fetchCalendarLoaded: false,
          fetchCalendarError: false
        });
      }

    case _calendar.FETCH_EVENTS_SUCCESS:
      {
        return (0, _objectSpread2.default)({}, state, {
          storeSchedule: action.result.storeSchedule,
          events: action.result.events.map(function (event) {
            return (0, _objectSpread2.default)({}, event, {
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
        return (0, _objectSpread2.default)({}, state, {
          fetchCalendarLoading: false,
          fetchCalendarLoaded: false,
          fetchCalendarError: action.error
        });
      }

    default:
      return state;
  }
};

var _default = calendar;
exports.default = _default;