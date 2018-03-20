'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TextAreaField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FormField = require('../FormField/FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var StyledSelect = _styledComponents2.default.select.attrs({
	className: (0, _classnames2.default)('SelectField', 'custom_dropdown')
}).withConfig({
	displayName: 'SelectField__StyledSelect',
	componentId: 's5mgo8y-0'
})(['']);

function TextAreaField(_ref) {
	var children = _ref.children,
	    props = _objectWithoutProperties(_ref, ['children']);

	return _react2.default.createElement(
		_FormField2.default,
		props,
		_react2.default.createElement(
			StyledSelect,
			null,
			children
		)
	);
}