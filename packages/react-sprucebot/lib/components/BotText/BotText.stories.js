'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _addonInfo = require('@storybook/addon-info');

var _BotText = require('./BotText');

var _BotText2 = _interopRequireDefault(_BotText);

var _BotText3 = require('./BotText.md');

var _BotText4 = _interopRequireDefault(_BotText3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('BotText', module);

stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_BotText4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_BotText2.default,
		null,
		(0, _react4.text)('BotText', 'Hey there from Sprucebot 🌲🤖')
	);
})));