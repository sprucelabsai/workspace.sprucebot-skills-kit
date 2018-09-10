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

stories.add('Primary', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_Button2.default,
		{ primary: true, onClick: (0, _addonActions.action)('Button onClick') },
		(0, _react4.text)('Button Text', 'Primary Button 😀🌲🤖')
	);
}))).add('Secondary', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_Button2.default,
		{ secondary: true, onClick: (0, _addonActions.action)('Button onClick') },
		(0, _react4.text)('Button Text', 'Secondary Button')
	);
}))).add('Alt', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_Button2.default,
		{ alt: true, onClick: (0, _addonActions.action)('Button onClick') },
		(0, _react4.text)('Button Text', 'Alt Button')
	);
}))).add('Disabled', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			_Button2.default,
			{ primary: true, disabled: true, onClick: (0, _addonActions.action)('Button onClick') },
			(0, _react4.text)('Button Text', 'Primary Button Disabled')
		),
		_react2.default.createElement(
			_Button2.default,
			{ alt: true, disabled: true, onClick: (0, _addonActions.action)('Button onClick') },
			(0, _react4.text)('Button Text', 'Secondary Button Disabled')
		)
	);
}))).add('Caution', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_Button2.default,
		{ primary: true, caution: true, onClick: (0, _addonActions.action)('Button onClick') },
		(0, _react4.text)('Button Text', 'Take Me To The Danger Zone')
	);
}))).add('Tertiary', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_Button2.default,
		{ tertiary: true, onClick: (0, _addonActions.action)('Button onClick') },
		(0, _react4.text)('Button Text', 'Minor Button')
	);
}))).add('Loading', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			_Button2.default,
			{ primary: true, busy: true, onClick: (0, _addonActions.action)('Button onClick') },
			(0, _react4.text)('Button Text', 'Primary Button Disabled')
		),
		_react2.default.createElement(
			_Button2.default,
			{ alt: true, busy: true, onClick: (0, _addonActions.action)('Button onClick') },
			(0, _react4.text)('Button Text', 'Secondary Button Disabled')
		)
	);
}))).add('Toggle', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_Button2.default,
		{ toggle: true, onClick: (0, _addonActions.action)('Button onClick') },
		(0, _react4.text)('Button Text', 'Toggle Button')
	);
}))).add('Remove', (0, _storybookReadme.withReadme)(_Button4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_Button2.default,
		{ primary: true, remove: true, onClick: (0, _addonActions.action)('Button onClick') },
		(0, _react4.text)('Button Text', 'Toggle Button')
	);
})));