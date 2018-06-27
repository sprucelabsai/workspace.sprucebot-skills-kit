'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

require('jest-styled-components');

var _ControlButton = require('./ControlButton');

var _ControlButton2 = _interopRequireDefault(_ControlButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('it renders', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ControlButton2.default, null)).toJSON();
	expect(tree).toMatchSnapshot();
});

test('it renders a link', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ControlButton2.default, { href: 'https://sprucebot.com' })).toJSON();
	expect(tree).toMatchSnapshot();
});