'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Tabs = require('./Tabs');

var _Tabs2 = require('./Tabs.md');

var _Tabs3 = _interopRequireDefault(_Tabs2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Tabs', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Tabs3.default, function () {
	return _react2.default.createElement(
		_Tabs.Tabs,
		{ onChange: function onChange() {
				return null;
			} },
		_react2.default.createElement(
			_Tabs.TabPane,
			{ title: 'day' },
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					'I am the tab pane'
				)
			)
		),
		_react2.default.createElement(
			_Tabs.TabPane,
			{ title: 'week' },
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					'I TOO am the tab pane'
				)
			)
		)
	);
}));