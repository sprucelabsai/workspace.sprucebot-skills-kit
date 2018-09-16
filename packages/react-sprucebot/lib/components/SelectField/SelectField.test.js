'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectField = require('./SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SelectField tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_SelectField2.default, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});