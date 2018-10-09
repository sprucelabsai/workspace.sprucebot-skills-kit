"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _velocityReact = require("velocity-react");

var _Toast = _interopRequireWildcard(require("../../Toast"));

var ToastWrapper = function ToastWrapper(props) {
  var toasts = props.toasts,
      handleRemove = props.handleRemove;
  return _react.default.createElement("div", {
    className: "toasts-wrapper"
  }, _react.default.createElement(_velocityReact.VelocityTransitionGroup, {
    enter: {
      animation: {
        opacity: 1,
        translateX: 0
      },
      duration: 300
    },
    leave: {
      animation: {
        opacity: 0,
        translateX: '-4px'
      },
      duration: 0
    }
  }, toasts.map(function (toast, idx) {
    return _react.default.createElement("div", {
      key: idx,
      className: "toast-wrapper"
    }, _react.default.createElement(_Toast.default, (0, _extends2.default)({
      onRemove: function onRemove() {
        return handleRemove(idx);
      }
    }, toast)));
  })));
};

var _default = ToastWrapper;
exports.default = _default;