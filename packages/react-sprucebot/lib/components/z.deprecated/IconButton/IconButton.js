"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var IconButton = function IconButton(_ref) {
  var children = _ref.children,
      className = _ref.className,
      loaderStyle = _ref.loaderStyle,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children", "className", "loaderStyle"]);
  return _react.default.createElement(_Button.default, (0, _extends2.default)({
    loaderDark: true,
    loaderStyle: (0, _objectSpread2.default)({
      fontSize: '.5em'
    }, loaderStyle)
  }, props, {
    className: "IconButton icon__button ".concat(className || '')
  }), _react.default.createElement(_Icon.default, {
    fontSize: props.fontSize
  }, children));
};

IconButton.propTypes = {
  onClick: _propTypes.default.func,
  children: _propTypes.default.any
};
var _default = IconButton;
exports.default = _default;