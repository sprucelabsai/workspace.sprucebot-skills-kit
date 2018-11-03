"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../../../../../Button/Button"));

var EventDetailsFooter = function EventDetailsFooter(props) {
  var primaryCTA = props.primaryCTA;
  return _react.default.createElement("div", {
    className: "event-details-footer"
  }, _react.default.createElement(_Button.default, (0, _extends2.default)({
    kind: "primary",
    isFullWidth: true
  }, primaryCTA)));
};

var _default = EventDetailsFooter;
exports.default = _default;