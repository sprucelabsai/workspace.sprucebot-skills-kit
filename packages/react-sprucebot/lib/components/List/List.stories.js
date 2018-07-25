'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _List3 = require('./List.md');

var _List4 = _interopRequireDefault(_List3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('List', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Placeholder', (0, _storybookReadme.withReadme)(_List4.default, function () {
  return _react2.default.createElement(
    'p',
    null,
    'Placeholder'
  );
}));