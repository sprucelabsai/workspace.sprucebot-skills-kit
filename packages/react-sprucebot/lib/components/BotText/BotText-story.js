"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _BotText = _interopRequireDefault(require("./BotText"));

var stories = (0, _react2.storiesOf)('Bot Text', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Bot Text', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_BotText.default, {
    text: (0, _react3.text)('text', 'Hey there from Sprucebot 🌲🤖'),
    className: (0, _react3.text)('className', '')
  }));
});