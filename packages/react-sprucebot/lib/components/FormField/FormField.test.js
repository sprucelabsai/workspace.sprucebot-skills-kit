'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

require('jest-styled-components');

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChange = jest.fn();

test('it renders set value and triggers onChange', function () {
	var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
		_FormField2.default,
		{
			type: 'text',
			input: { value: 'test1', onChange: onChange },
			meta: { touched: false }
		},
		_react2.default.createElement('input', null)
	));
	expect(wrapper).toMatchSnapshot();
	wrapper.find('input[type="text"]').simulate('change', { target: { value: 'test' } });
	expect(onChange).toHaveBeenCalledWith({ target: { value: 'test' } });
});

test('it renders with a label, finePrint, placeholder, and error', function () {
	var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
		_FormField2.default,
		{
			label: 'Test Label',
			placeholder: 'Placeholdn\'',
			type: 'text',
			input: { value: 'test2', onChange: onChange },
			meta: { touched: true, error: 'TEST ERROR' },
			finePrint: 'Fine Print!'
		},
		_react2.default.createElement('input', null)
	));
	expect(wrapper).toMatchSnapshot();
});