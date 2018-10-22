"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Text = require("./Text");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var stories = (0, _react2.storiesOf)('Text', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Default', function () {
  return _react.default.createElement(_Container.default, null, _react.default.createElement(_Text.H1, {
    className: "l-mb-small"
  }, (0, _react3.text)('H1', 'Expanding Your Home Network’s Reach')), _react.default.createElement(_Text.H2, {
    className: "l-mb-small"
  }, (0, _react3.text)('H2', 'How to Prepare for an Automated Future')), _react.default.createElement(_Text.H3, {
    className: "l-mb-small"
  }, (0, _react3.text)('H3', 'Cloud Produces Sunny Earnings at Amazon, Microsoft and Alphabet')), _react.default.createElement(_Text.H4, {
    className: "l-mb-small"
  }, (0, _react3.text)('H4', 'Daily Report: More Self-Driving Cars Take to the Streets')), _react.default.createElement(_Text.Text, {
    className: "l-mb-small"
  }, (0, _react3.text)('Text', 'With so much talk about how the Internet will spell the end of brick-and-mortar, nobody has stopped to ask, "What can the Internet do to save brick-and-mortar?"')), _react.default.createElement(_Text.Span, null, (0, _react3.text)('Span', "Amazon is not your competition. It is a place to get things cheap. Which is cool, because you're not a cheap business.")), _react.default.createElement(_Text.Text, {
    className: "l-mb-small"
  }, (0, _react3.text)('Text', 'Expanding Your Home Network’s Reach'), _react.default.createElement(_Text.Span, null, (0, _react3.text)('Span', "Amazon is not your competition. It is a place to get things cheap. Which is cool, because you're not a cheap business. "), _react.default.createElement(_Text.Anchor, {
    href: "#",
    target: "_blank"
  }, (0, _react3.text)('Anchor', 'This is a link')))));
});