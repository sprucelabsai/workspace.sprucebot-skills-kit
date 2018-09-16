'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});