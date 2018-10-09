"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var SpruceIcon4 = function SpruceIcon4(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M15.826 20.475H3.615l8.018-18.157 5.555 12.188h-3.825m.27-.006a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6.509 5.946a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
  }));
};

SpruceIcon4.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var DefaultLockup = function DefaultLockup() {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(SpruceIcon4, {
    className: "header-primary__lockup-icon"
  }), _react.default.createElement("p", {
    className: "header-primary__text"
  }, "Sprucebot"));
};

var _default = DefaultLockup;
exports.default = _default;