'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _ButtonGrid = require('./ButtonGrid');

var _ButtonGrid2 = require('./ButtonGrid.md');

var _ButtonGrid3 = _interopRequireDefault(_ButtonGrid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('ButtonGrid', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_ButtonGrid3.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		'div',
		{ className: 'single_col' },
		_react2.default.createElement(
			_ButtonGrid.ButtonGrid,
			null,
			_react2.default.createElement(
				_ButtonGrid.GridButton,
				{
					selected: (0, _react4.boolean)('Select Option 1', false),
					subtitle: 'It\'s good',
					onClick: (0, _addonActions.action)('Select tile')
				},
				'Option 1'
			),
			_react2.default.createElement(
				_ButtonGrid.GridButton,
				{
					selected: (0, _react4.boolean)('Select Option 2', false),
					subtitle: 'It\'s better!',
					onClick: (0, _addonActions.action)('Select tile')
				},
				'Option 2'
			),
			_react2.default.createElement(
				_ButtonGrid.GridButton,
				{
					selected: (0, _react4.boolean)('Select Option 3', true),
					subtitle: 'Def worth a look',
					onClick: (0, _addonActions.action)('Select tile')
				},
				'Option 3'
			)
		),
		_react2.default.createElement(
			_ButtonGrid.ButtonGrid,
			null,
			_react2.default.createElement(
				_ButtonGrid.GridButton,
				{
					selected: (0, _react4.boolean)('Select 🤖', true),
					onClick: (0, _addonActions.action)('Select tile')
				},
				'\uD83E\uDD16'
			),
			_react2.default.createElement(
				_ButtonGrid.GridButton,
				{
					selected: (0, _react4.boolean)('Select 🔥 #1', false),
					onClick: (0, _addonActions.action)('Select tile')
				},
				'\uD83D\uDD25'
			),
			_react2.default.createElement(
				_ButtonGrid.GridButton,
				{
					selected: (0, _react4.boolean)('Select 🔥 #2', false),
					onClick: (0, _addonActions.action)('Select tile')
				},
				'\uD83D\uDD25'
			),
			_react2.default.createElement(
				_ButtonGrid.GridButton,
				{
					selected: (0, _react4.boolean)('Select 🌲', true),
					onClick: (0, _addonActions.action)('Select tile')
				},
				'\uD83C\uDF32'
			)
		)
	);
})));