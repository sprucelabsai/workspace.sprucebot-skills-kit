'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Loader3 = require('./Loader.md');

var _Loader4 = _interopRequireDefault(_Loader3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Loader', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Loader4.default, function () {
  return _react2.default.createElement(_Loader2.default, null);
}));