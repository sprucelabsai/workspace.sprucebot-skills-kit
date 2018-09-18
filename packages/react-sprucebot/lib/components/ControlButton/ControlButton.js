"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var ControlButton = function ControlButton(_ref) {
  var iconLeft = _ref.iconLeft,
      iconRight = _ref.iconRight,
      children = _ref.children,
      className = _ref.className,
      props = (0, _objectWithoutProperties2.default)(_ref, ["iconLeft", "iconRight", "children", "className"]);
  return _react.default.createElement(_Button.default, (0, _extends2.default)({}, props, {
    className: "ControlButton control__button ".concat(className || ''),
    tabIndex: 0,
    hideLoader: true
  }), iconLeft && _react.default.createElement(_Icon.default, {
    className: "icon__left"
  }, iconLeft), _react.default.createElement("span", null, children), iconRight && _react.default.createElement(_Icon.default, {
    className: "icon__right"
  }, iconRight));
};

ControlButton.propTypes = {
  onClick: _propTypes.default.func,
  children: _propTypes.default.any,
  className: _propTypes.default.string,
  iconLeft: _propTypes.default.string,
  iconRight: _propTypes.default.string
};
var _default = ControlButton;
exports.default = _default;