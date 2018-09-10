'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Input3 = require('./Input.md');

var _Input4 = _interopRequireDefault(_Input3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Input', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Input4.default, function () {
	return _react2.default.createElement(_Input2.default, { label: 'Email Address' });
}));