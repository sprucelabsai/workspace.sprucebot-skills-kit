'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FieldLabel = exports.FieldError = exports.FieldWrapper = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Field;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _Typography = require('../Typography/Typography');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldWrapper = exports.FieldWrapper = _styledComponents2.default.div.attrs({
	className: (0, _classnames2.default)('InputField', 'input__wrapper')
}).withConfig({
	displayName: 'Field__FieldWrapper',
	componentId: 'l70nmr-0'
})(['']);

var FieldError = exports.FieldError = _styledComponents2.default.span.attrs({
	className: (0, _classnames2.default)('FieldError', 'input__error', 'error-is-visible')
}).withConfig({
	displayName: 'Field__FieldError',
	componentId: 'l70nmr-1'
})(['']);

var FieldLabel = exports.FieldLabel = _styledComponents2.default.span.attrs({
	className: (0, _classnames2.default)('FieldLabel', 'input__mini__label', 'js-show-label')
}).withConfig({
	displayName: 'Field__FieldLabel',
	componentId: 'l70nmr-2'
})(['']);

function renderInput(props) {
	return _react2.default.createElement('input', props);
}

function Field(_ref) {
	var input = _ref.input,
	    _ref$meta = _ref.meta,
	    touched = _ref$meta.touched,
	    error = _ref$meta.error,
	    _ref$type = _ref.type,
	    type = _ref$type === undefined ? 'text' : _ref$type,
	    finePrint = _ref.finePrint,
	    label = _ref.label,
	    _ref$placeholder = _ref.placeholder,
	    placeholder = _ref$placeholder === undefined ? label : _ref$placeholder,
	    children = _ref.children;

	return _react2.default.createElement(
		FieldWrapper,
		null,
		label && input.value && _react2.default.createElement(
			FieldLabel,
			null,
			label
		),
		_react2.default.cloneElement(children, _extends({}, input, {
			type: type,
			placeholder: placeholder
		})),
		touched && error && _react2.default.createElement(
			FieldError,
			null,
			error
		),
		finePrint && _react2.default.createElement(
			_Typography.Paragraph,
			{ fine: true },
			finePrint
		)
	);
}