'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

var StyledTextArea = (0, _styledComponents2.default)(_reactTextareaAutosize2.default).attrs({
	className: 'TextArea'
}).withConfig({
	displayName: 'TextArea__StyledTextArea',
	componentId: 's1czbmms-0'
})(['min-height:1em;']);

function TextAreaField(props) {
	return _react2.default.createElement(
		_FormField2.default,
		props,
		_react2.default.createElement(StyledTextArea, null)
	);
}