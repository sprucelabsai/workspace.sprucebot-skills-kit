'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _onboarding = require('./onboarding');

var _onboarding2 = _interopRequireDefault(_onboarding);

var _reduxForm = require('redux-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { auth: _auth2.default, config: _config2.default, onboarding: _onboarding2.default, form: _reduxForm.reducer };