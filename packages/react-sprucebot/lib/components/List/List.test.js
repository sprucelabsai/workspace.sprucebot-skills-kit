'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('./List');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('List tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_List.List, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});