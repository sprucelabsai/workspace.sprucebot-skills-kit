'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

require('jest-styled-components');

var _InputField = require('./InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _FormField = require('../FormField/FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('it renders a FormField', function () {
	var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_InputField2.default, { input: { value: 'test', onChange: jest.fn() }, meta: {} }));

	expect(wrapper).toMatchSnapshot();

	expect(wrapper.find(_FormField2.default)).toHaveLength(1);
});