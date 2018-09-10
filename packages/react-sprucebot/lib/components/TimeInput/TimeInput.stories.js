'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _TimeInput = require('./TimeInput');

var _TimeInput2 = _interopRequireDefault(_TimeInput);

var _TimeInput3 = require('./TimeInput.md');

var _TimeInput4 = _interopRequireDefault(_TimeInput3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('TimeInput', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Placeholder', (0, _storybookReadme.withReadme)(_TimeInput4.default, function () {
  return _react2.default.createElement(
    'p',
    null,
    'Placeholder'
  );
}));