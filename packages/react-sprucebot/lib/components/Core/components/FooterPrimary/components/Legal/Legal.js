"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var Legal = function Legal(props) {
  var className = props.className,
      linkClassName = props.linkClassName;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", {
    className: className
  }, _react.default.createElement("a", {
    href: "#",
    target: "_blank",
    rel: "noopener noreferrer",
    className: linkClassName
  }, "Terms of Service"), _react.default.createElement("a", {
    href: "#",
    target: "_blank",
    rel: "noopener noreferrer",
    className: linkClassName
  }, "Privacy Policy")), _react.default.createElement("p", {
    className: className
  }, "\xA9 Spruce Labs 2018"));
};

var _default = Legal;
exports.default = _default;