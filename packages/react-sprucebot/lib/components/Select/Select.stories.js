'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Select3 = require('./Select.md');

var _Select4 = _interopRequireDefault(_Select3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Select', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Select4.default, function () {
  return _react2.default.createElement(_Select2.default, null);
}));