'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Feed = require('./Feed');

var _Feed2 = _interopRequireDefault(_Feed);

var _Feed3 = require('./Feed.md');

var _Feed4 = _interopRequireDefault(_Feed3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Feed', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Feed4.default, (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(_Feed2.default, null);
})));