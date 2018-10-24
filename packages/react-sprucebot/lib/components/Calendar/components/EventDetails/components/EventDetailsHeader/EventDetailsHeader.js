"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireWildcard(require("../../../../../Button/Button"));

var _ContextMenu = _interopRequireWildcard(require("../../../../../ContextMenu/ContextMenu"));

var _Icon = _interopRequireDefault(require("../../../../../Icon/Icon"));

var _Text = require("../../../../../Text/Text");

var BackIcon = function BackIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
  }));
};

BackIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var EventDetailsHeader = function EventDetailsHeader(props) {
  var label = props.label,
      title = props.title,
      handleGoBack = props.handleGoBack,
      contextMenu = props.contextMenu;
  return _react.default.createElement("div", {
    className: "event-details-header"
  }, handleGoBack && _react.default.createElement(_Button.default, {
    isSmall: true,
    className: "event-details-header__button",
    icon: _react.default.createElement(BackIcon, null)
  }), _react.default.createElement("div", {
    className: "event-details-header__text-wrapper"
  }, _react.default.createElement(_Text.Text, {
    className: "event-details-header__label"
  }, label), _react.default.createElement(_Text.Text, {
    className: "event-details-header__title"
  }, title)), _react.default.createElement("div", {
    className: "event-details-header__actions-wrapper"
  }, contextMenu && _react.default.createElement(_ContextMenu.default, (0, _extends2.default)({
    isSmall: true
  }, contextMenu)), _react.default.createElement(_Button.default, {
    isSmall: true,
    className: "event-details-header__button",
    icon: _react.default.createElement(_Icon.default, {
      icon: "close"
    })
  })));
};

var _default = EventDetailsHeader;
exports.default = _default;