"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Card = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button/Button"));

// NOTE: Cards should be built in a way that they can be created with JSON
var Card = function Card(props) {
  var children = props.children,
      isCentered = props.isCentered,
      isCritical = props.isCritical,
      className = props.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('card', className, {
      'card-centered': isCentered,
      'card-critical': isCritical
    })
  }, children);
};

exports.Card = Card;
Card.defaultProps = {
  isCentered: false
};
var _default = Card;
exports.default = _default;