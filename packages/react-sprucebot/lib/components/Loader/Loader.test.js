'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Loader tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_Loader2.default, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});