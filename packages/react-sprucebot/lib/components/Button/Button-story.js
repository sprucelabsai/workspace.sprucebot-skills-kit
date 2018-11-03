"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Wrapper = _interopRequireDefault(require("../../../.storybook/Wrapper"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var Icon11 = function Icon11(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M4.285 1.49h-.011A4.5 4.5 0 0 0 .75 5.887v.89a1.5 1.5 0 0 0 1.5 1.5H6a1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 0 1.5 1.5h3.75a1.5 1.5 0 0 0 1.5-1.5v-.89a4.5 4.5 0 0 0-3.524-4.393h-.011a40.593 40.593 0 0 0-15.43-.002zM12.305 11.275H11.7a9 9 0 0 0-8.931 7.884l-.093.744a3 3 0 0 0 2.977 3.372h12.7a3 3 0 0 0 2.975-3.375l-.093-.744a9 9 0 0 0-8.93-7.88z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M9.75 11.487V9.025M14.25 11.487V9.025",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M12 20.275a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

Icon11.defaultProps = {
  width: "24",
  height: "25",
  viewBox: "0 0 24 25",
  xmlns: "http://www.w3.org/2000/svg"
};
var btnText = (0, _react3.text)('text', 'Hello World');
var isSmall = (0, _react3.boolean)('isSmall', false);
var isFullWidth = (0, _react3.boolean)('isFullWidth', false);
var icon = (0, _react3.text)('icon', 'edit');
var stories = (0, _react2.storiesOf)('Button', module);
stories.addDecorator((0, _react3.withKnobsOptions)({
  escapeHTML: false
}));
stories.addDecorator(_react3.withKnobs);
stories.add('Primary', function () {
  var _React$createElement;

  return _react.default.createElement(_Button.default, (_React$createElement = {
    className: (0, _react3.text)('className', 'l-mr-small l-mb-small'),
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    text: btnText,
    kind: (0, _react3.text)('kind', '') || 'primary',
    disabled: (0, _react3.boolean)('disabled', false),
    isLoading: (0, _react3.boolean)('isLoading', false)
  }, (0, _defineProperty2.default)(_React$createElement, "isSmall", (0, _react3.boolean)('isSmall', false)), (0, _defineProperty2.default)(_React$createElement, "icon", icon ? _react.default.createElement(_Icon.default, {
    icon: (0, _react3.text)('icon', ''),
    className: (0, _react3.text)('iconClassName', 'btn__line-icon')
  }) : null), (0, _defineProperty2.default)(_React$createElement, "href", (0, _react3.text)('href', '')), (0, _defineProperty2.default)(_React$createElement, "target", (0, _react3.text)('target', '')), (0, _defineProperty2.default)(_React$createElement, "onClick", (0, _react3.text)('onClick', '() => console.log("you clicked")')), (0, _defineProperty2.default)(_React$createElement, "linkProps", (0, _react3.object)('linkProps', {})), _React$createElement));
}).add('Secondary', function () {
  var _React$createElement2;

  return _react.default.createElement(_Button.default, (_React$createElement2 = {
    className: (0, _react3.text)('className', 'l-mr-small l-mb-small'),
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    text: btnText,
    kind: (0, _react3.text)('kind', '') || 'secondary',
    disabled: (0, _react3.boolean)('disabled', false),
    isLoading: (0, _react3.boolean)('isLoading', false)
  }, (0, _defineProperty2.default)(_React$createElement2, "isSmall", (0, _react3.boolean)('isSmall', false)), (0, _defineProperty2.default)(_React$createElement2, "icon", icon ? _react.default.createElement(_Icon.default, {
    icon: (0, _react3.text)('icon', ''),
    className: (0, _react3.text)('iconClassName', 'btn__line-icon')
  }) : null), (0, _defineProperty2.default)(_React$createElement2, "href", (0, _react3.text)('href', '')), (0, _defineProperty2.default)(_React$createElement2, "target", (0, _react3.text)('target', '')), (0, _defineProperty2.default)(_React$createElement2, "onClick", (0, _react3.text)('onClick', '() => console.log("you clicked")')), (0, _defineProperty2.default)(_React$createElement2, "linkProps", (0, _react3.object)('linkProps', {})), _React$createElement2));
}).add('Simple', function () {
  var _React$createElement3;

  return _react.default.createElement(_Button.default, (_React$createElement3 = {
    className: (0, _react3.text)('className', 'l-mr-small l-mb-small'),
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    text: btnText,
    kind: (0, _react3.text)('kind', '') || 'simple',
    disabled: (0, _react3.boolean)('disabled', false),
    isLoading: (0, _react3.boolean)('isLoading', false)
  }, (0, _defineProperty2.default)(_React$createElement3, "isSmall", (0, _react3.boolean)('isSmall', false)), (0, _defineProperty2.default)(_React$createElement3, "icon", icon ? _react.default.createElement(_Icon.default, {
    icon: (0, _react3.text)('icon', ''),
    className: (0, _react3.text)('iconClassName', 'btn__line-icon')
  }) : null), (0, _defineProperty2.default)(_React$createElement3, "href", (0, _react3.text)('href', '')), (0, _defineProperty2.default)(_React$createElement3, "target", (0, _react3.text)('target', '')), (0, _defineProperty2.default)(_React$createElement3, "onClick", (0, _react3.text)('onClick', '() => console.log("you clicked")')), (0, _defineProperty2.default)(_React$createElement3, "linkProps", (0, _react3.object)('linkProps', {})), _React$createElement3));
}).add('Caution', function () {
  var _React$createElement4;

  return _react.default.createElement(_Button.default, (_React$createElement4 = {
    className: (0, _react3.text)('className', 'l-mr-small l-mb-small'),
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    text: btnText,
    kind: (0, _react3.text)('kind', '') || 'caution',
    disabled: (0, _react3.boolean)('disabled', false),
    isLoading: (0, _react3.boolean)('isLoading', false)
  }, (0, _defineProperty2.default)(_React$createElement4, "isSmall", (0, _react3.boolean)('isSmall', false)), (0, _defineProperty2.default)(_React$createElement4, "icon", icon ? _react.default.createElement(_Icon.default, {
    icon: (0, _react3.text)('icon', ''),
    className: (0, _react3.text)('iconClassName', 'btn__line-icon')
  }) : null), (0, _defineProperty2.default)(_React$createElement4, "href", (0, _react3.text)('href', '')), (0, _defineProperty2.default)(_React$createElement4, "target", (0, _react3.text)('target', '')), (0, _defineProperty2.default)(_React$createElement4, "onClick", (0, _react3.text)('onClick', '() => console.log("you clicked")')), (0, _defineProperty2.default)(_React$createElement4, "linkProps", (0, _react3.object)('linkProps', {})), _React$createElement4));
});