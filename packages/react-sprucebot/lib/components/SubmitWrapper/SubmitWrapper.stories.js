'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _SubmitWrapper = require('./SubmitWrapper');

var _SubmitWrapper2 = _interopRequireDefault(_SubmitWrapper);

var _SubmitWrapper3 = require('./SubmitWrapper.md');

var _SubmitWrapper4 = _interopRequireDefault(_SubmitWrapper3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('SubmitWrapper', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_SubmitWrapper4.default, function () {
  return _react2.default.createElement(_SubmitWrapper2.default, null);
}));