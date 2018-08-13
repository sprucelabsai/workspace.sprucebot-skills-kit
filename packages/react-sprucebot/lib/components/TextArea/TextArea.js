'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\tmin-height: 1em;\n'], ['\n\tmin-height: 1em;\n']);

exports.default = TextAreaField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _FormField = require('../FormField/FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledTextArea = (0, _styledComponents2.default)(_reactTextareaAutosize2.default).attrs({
	className: 'TextArea'
})(_templateObject);

function TextAreaField(props) {
	return _react2.default.createElement(
		_FormField2.default,
		props,
		_react2.default.createElement(StyledTextArea, null)
	);
}