"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../../Button/Button"));

// NOTE: Cards should be built in a way that they can be created with JSON
var CardFooter = function CardFooter(props) {
  var children = props.children;
  return _react.default.createElement("div", {
    className: "card__footer"
  }, children);
};

var _default = CardFooter;
exports.default = _default;