"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _Card = _interopRequireWildcard(require("./Card"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var stories = (0, _react2.storiesOf)('Card', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    title: "Get the most out of Spruce"
  }), _react.default.createElement(_Card.CardBody, null, _react.default.createElement("p", null, "Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.")), _react.default.createElement(_Card.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Get some skills"
  }))));
});