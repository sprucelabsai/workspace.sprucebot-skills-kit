"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _auth = require("../actions/auth");

var _events = require("../actions/events");

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _auth.GO_AUTH_REQUEST:
      return (0, _objectSpread2.default)({}, state, {
        authing: true
      });

    case _auth.GO_AUTH_SUCCESS:
      return (0, _objectSpread2.default)({}, state, action.result, {
        authing: false
      });

    case _auth.GO_AUTH_ERROR:
      return (0, _objectSpread2.default)({}, state, {
        error: action.error,
        authing: false
      });

    case _events.DID_UPDATE_USER:
      var updatedUser = action.payload.user;
      var user = {};

      if (updatedUser.UserId === state.UserId) {
        user = updatedUser;
      }

      return (0, _objectSpread2.default)({}, state, user);

    default:
      return state;
  }
}