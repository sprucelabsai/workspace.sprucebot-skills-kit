"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _sharable = require("../actions/sharable");

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var emitting = state && state.emitting ? state.emitting : {};
  var errors = state && state.errors ? state.errors : {};
  var results = state && state.results ? state.results : {};

  switch (action.type) {
    case _sharable.EMIT_SHARABLE_EVENT_REQUEST:
      emitting[action.name] = true;
      return (0, _objectSpread2.default)({}, state, {
        emitting: emitting
      });

    case _sharable.EMIT_SHARABLE_EVENT_SUCCESS:
      emitting[action.name] = false;
      errors[action.name] = false;
      results[action.name] = action.result;
      return (0, _objectSpread2.default)({}, state, {
        emitting: emitting,
        errors: errors,
        results: results
      });

    case _sharable.EMIT_SHARABLE_EVENT_ERROR:
      emitting[action.name] = false;
      errors[action.name] = action.error;
      return (0, _objectSpread2.default)({}, state, {
        emitting: emitting,
        errors: errors,
        results: results
      });

    default:
      return state;
  }
}