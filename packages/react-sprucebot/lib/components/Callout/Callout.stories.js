'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Callout = require('./Callout');

var _Callout2 = _interopRequireDefault(_Callout);

var _BotText = require('../BotText/BotText');

var _BotText2 = _interopRequireDefault(_BotText);

var _Callout3 = require('./Callout.md');

var _Callout4 = _interopRequireDefault(_Callout3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Callout', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Callout4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		'div',
		{ className: 'single_col' },
		_react2.default.createElement(
			_BotText2.default,
			null,
			'If you have some information you need to call out (think modal dialog), you can use the ',
			'<Callout />',
			' component.'
		),
		_react2.default.createElement(
			_Callout2.default,
			{ on: (0, _react4.boolean)('Toggle callout', false) },
			_react2.default.createElement(
				_BotText2.default,
				null,
				'Things like nested forms or multi-step processes benefit greatly from a callout. It lets you see where you were, but brings focus to what you\'re about to do.'
			)
		)
	);
})));