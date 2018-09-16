'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Field;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _Typography = require('../Typography/Typography');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Field(_ref) {
	var _ref$input = _ref.input,
	    value = _ref$input.value,
	    onChange = _ref$input.onChange,
	    name = _ref$input.name,
	    _ref$meta = _ref.meta,
	    touched = _ref$meta.touched,
	    error = _ref$meta.error,
	    type = _ref.type,
	    finePrint = _ref.finePrint,
	    label = _ref.label,
	    _ref$placeholder = _ref.placeholder,
	    placeholder = _ref$placeholder === undefined ? label : _ref$placeholder,
	    children = _ref.children;

	return _react2.default.createElement(
		'div',
		{ className: (0, _classnames2.default)('InputField', 'input__wrapper') },
		label && value && _react2.default.createElement(
			'span',
			{
				className: (0, _classnames2.default)('FieldLabel', 'input__mini__label', 'js-show-label')
			},
			label
		),
		_react2.default.cloneElement(children, {
			className: (0, _classnames2.default)({ with_label: !!label }),
			name: name,
			value: value,
			onChange: onChange,
			type: type,
			placeholder: placeholder
		}),
		touched && error && _react2.default.createElement(
			'span',
			{
				className: (0, _classnames2.default)('FieldError', 'input__error', 'error-is-visible')
			},
			error
		),
		finePrint && _react2.default.createElement(
			_Typography.Paragraph,
			{ fine: true },
			finePrint
		)
	);
}

Field.propTypes = {
	input: _propTypes2.default.shape({
		value: _propTypes2.default.any.isRequired,
		onChange: _propTypes2.default.func
	}).isRequired,
	meta: _propTypes2.default.shape({
		touched: _propTypes2.default.bool,
		error: _propTypes2.default.string
	}).isRequired,
	children: _propTypes2.default.element.isRequired
};