'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LinkPile = require('./LinkPile');

var _LinkPile2 = _interopRequireDefault(_LinkPile);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('LinkPile tests', function () {
	it('Should match the snapshot', function () {
		var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(_LinkPile2.default, null));

		expect(renderedComponent).toMatchSnapshot();
	});
});