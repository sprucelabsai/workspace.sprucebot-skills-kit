"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _Card = _interopRequireWildcard(require("./Card"));

var stories = (0, _react2.storiesOf)('Card', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Card', function () {
  return _react.default.createElement(_Container.default, null, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    title: "Hello"
  }), _react.default.createElement("p", null, "Hello")));
});