'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Pre = require('./Pre');

var _Pre2 = _interopRequireDefault(_Pre);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Pre tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_Pre2.default, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});