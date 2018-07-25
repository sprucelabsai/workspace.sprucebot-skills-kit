'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Error = require('./Error');

var _Error2 = _interopRequireDefault(_Error);

var _Error3 = require('./Error.md');

var _Error4 = _interopRequireDefault(_Error3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Error', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Error4.default, (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(_Error2.default, null);
})));