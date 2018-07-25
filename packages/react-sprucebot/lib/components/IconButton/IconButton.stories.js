'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _IconButton3 = require('./IconButton.md');

var _IconButton4 = _interopRequireDefault(_IconButton3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('IconButton', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_IconButton4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_IconButton2.default,
		{ className: 'edit' },
		'edit'
	);
})));