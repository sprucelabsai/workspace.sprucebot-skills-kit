'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _FormField = require('../FormField/FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TextAreaField = function TextAreaField(_ref) {
	var className = _ref.className,
	    props = _objectWithoutProperties(_ref, ['className']);

	return _react2.default.createElement(
		_FormField2.default,
		props,
		_react2.default.createElement(StyledTextArea, _extends({}, props, { className: 'TextArea ' + (className || '') }))
	);
};

exports.default = TextAreaField;