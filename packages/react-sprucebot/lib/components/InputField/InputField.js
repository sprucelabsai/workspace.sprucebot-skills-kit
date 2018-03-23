'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = InputField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormField = require('../FormField/FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InputField(props) {
	return _react2.default.createElement(
		_FormField2.default,
		props,
		_react2.default.createElement('input', null)
	);
}