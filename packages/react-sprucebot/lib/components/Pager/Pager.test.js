'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Pager = require('./Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Pager tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_Pager2.default, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});