'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Button3 = require('./Button.md');

var _Button4 = _interopRequireDefault(_Button3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Button', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		'div',
		{ className: 'single_col' },
		_react2.default.createElement(
			_Button2.default,
			{
				primary: (0, _react4.boolean)('primary', false),
				secondary: (0, _react4.boolean)('secondary', false),
				caution: (0, _react4.boolean)('caution', false),
				alt: (0, _react4.boolean)('alt', false),
				busy: (0, _react4.boolean)('busy', false),
				remove: (0, _react4.boolean)('remove', false),
				toggle: (0, _react4.boolean)('toggle', false),
				onClick: (0, _addonActions.action)('Button onClick')
			},
			(0, _react4.text)('Button Text', 'Happy Button 😀🌲🤖')
		)
	);
})));