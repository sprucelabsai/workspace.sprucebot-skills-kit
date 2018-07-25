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

var _LinkPile = require('../LinkPile/LinkPile');

var _LinkPile2 = _interopRequireDefault(_LinkPile);

var _ControlButton = require('./ControlButton');

var _ControlButton2 = _interopRequireDefault(_ControlButton);

var _ControlButton3 = require('./ControlButton.md');

var _ControlButton4 = _interopRequireDefault(_ControlButton3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconOptions = {
	null: 'None',
	favorite: 'Favorite',
	edit: 'Edit',
	close: 'Close',
	keyboard_arrow_up: 'Up',
	keyboard_arrow_down: 'Down',
	chevron_left: 'Left',
	chevron_right: 'Right',
	'🤖': 'Bot'
};

var defaultIcon = 'null';

var stories = (0, _react3.storiesOf)('ControlButton', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_ControlButton4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_LinkPile2.default,
		null,
		_react2.default.createElement(
			_ControlButton2.default,
			{
				onClick: (0, _addonActions.action)('ControlButton onClick')
			},
			'Control all the buttons!'
		),
		_react2.default.createElement(
			_ControlButton2.default,
			{
				iconLeft: (0, _react4.text)('Left Icon', 'edit'),
				onClick: (0, _addonActions.action)('ControlButton onClick')
			},
			'I have a left icon'
		),
		_react2.default.createElement(
			_ControlButton2.default,
			{
				iconLeft: (0, _react4.text)('Left Icon', 'edit'),
				iconRight: (0, _react4.text)('Right Icon', 'favorite'),
				onClick: (0, _addonActions.action)('ControlButton onClick')
			},
			'I have a right Icon'
		),
		_react2.default.createElement(
			_ControlButton2.default,
			{
				iconRight: (0, _react4.text)('Rigth Icon', '🤖'),
				href: (0, _react4.text)('Link href', 'https://sprucebot.com'),
				onClick: (0, _addonActions.action)('Link onClick')
			},
			'I\'m a link!'
		)
	);
})));