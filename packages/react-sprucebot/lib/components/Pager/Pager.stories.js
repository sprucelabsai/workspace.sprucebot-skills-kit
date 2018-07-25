'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Pager = require('./Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _Pager3 = require('./Pager.md');

var _Pager4 = _interopRequireDefault(_Pager3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Pager', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Pager4.default, function () {
  return _react2.default.createElement(_Pager2.default, { totalPages: 1 });
}));