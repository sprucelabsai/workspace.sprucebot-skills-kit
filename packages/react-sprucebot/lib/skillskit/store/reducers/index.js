"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _config = _interopRequireDefault(require("./config"));

var _onboarding = _interopRequireDefault(require("./onboarding"));

var _sharable = _interopRequireDefault(require("./sharable"));

var _calendar = _interopRequireDefault(require("./calendar"));

var _reduxForm = require("redux-form");

var _default = {
  auth: _auth.default,
  config: _config.default,
  onboarding: _onboarding.default,
  sharable: _sharable.default,
  form: _reduxForm.reducer,
  calendar: _calendar.default
};
exports.default = _default;