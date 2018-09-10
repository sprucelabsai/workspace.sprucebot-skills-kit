'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Switch = require('./Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Switch3 = require('./Switch.md');

var _Switch4 = _interopRequireDefault(_Switch3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Switch', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Switch4.default, function () {
  return _react2.default.createElement(_Switch2.default, null);
}));