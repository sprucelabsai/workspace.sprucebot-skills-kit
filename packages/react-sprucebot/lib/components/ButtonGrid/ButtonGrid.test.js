'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ButtonGrid = require('./ButtonGrid');

var _ButtonGrid2 = _interopRequireDefault(_ButtonGrid);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ButtonGrid tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_ButtonGrid2.default, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});