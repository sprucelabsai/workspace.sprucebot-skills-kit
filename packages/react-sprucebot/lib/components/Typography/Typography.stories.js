'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Typography = require('./Typography');

var _Typography2 = require('./Typography.md');

var _Typography3 = _interopRequireDefault(_Typography2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Typography', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Typography3.default, function () {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			_Typography.H1,
			null,
			'Heading One'
		),
		_react2.default.createElement(
			_Typography.H2,
			null,
			'Heading Two'
		),
		_react2.default.createElement(
			_Typography.H3,
			null,
			'Heading Three'
		),
		_react2.default.createElement(
			_Typography.H4,
			null,
			'Heading Four'
		),
		_react2.default.createElement(
			_Typography.H5,
			null,
			'Heading Five'
		),
		_react2.default.createElement(
			_Typography.H6,
			null,
			'Heading Six'
		),
		_react2.default.createElement(
			_Typography.SectionHeading,
			null,
			'Section Heading'
		),
		_react2.default.createElement(
			_Typography.Paragraph,
			null,
			'This is body Copy'
		),
		_react2.default.createElement(
			_Typography.A,
			null,
			'Link'
		)
	);
}));