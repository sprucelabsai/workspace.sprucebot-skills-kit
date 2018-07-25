'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Stars = require('./Stars');

var _Stars2 = _interopRequireDefault(_Stars);

var _Stars3 = require('./Stars.md');

var _Stars4 = _interopRequireDefault(_Stars3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Stars', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Stars4.default, function () {
  return _react2.default.createElement(_Stars2.default, null);
}));