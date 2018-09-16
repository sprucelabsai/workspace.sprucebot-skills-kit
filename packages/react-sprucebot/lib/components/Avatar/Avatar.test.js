'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Avatar tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_Avatar2.default, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});