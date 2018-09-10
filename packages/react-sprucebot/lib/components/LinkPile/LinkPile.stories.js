'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _LinkPile = require('./LinkPile');

var _LinkPile2 = _interopRequireDefault(_LinkPile);

var _LinkPile3 = require('./LinkPile.md');

var _LinkPile4 = _interopRequireDefault(_LinkPile3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('LinkPile', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_LinkPile4.default, function () {
  return _react2.default.createElement(_LinkPile2.default, null);
}));