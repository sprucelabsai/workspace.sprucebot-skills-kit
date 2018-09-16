'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Select tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_Select2.default, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});