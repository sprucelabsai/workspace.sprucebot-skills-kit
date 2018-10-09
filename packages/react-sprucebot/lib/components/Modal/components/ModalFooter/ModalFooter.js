"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../../../Button/Button"));

var ModalFooter = function ModalFooter(props) {
  var primaryAction = props.primaryAction,
      secondaryAction = props.secondaryAction;
  return _react.default.createElement("div", {
    className: "modal-footer"
  }, _react.default.createElement(_Button.default, (0, _extends2.default)({
    kind: "primary"
  }, primaryAction)), secondaryAction && _react.default.createElement(_Button.default, (0, _extends2.default)({
    kind: "secondary"
  }, secondaryAction)));
};

var _default = ModalFooter;
exports.default = _default;