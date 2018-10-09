"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var ModalBody = function ModalBody(props) {
  return _react.default.createElement("div", {
    className: "modal-body"
  }, props.children);
};

var _default = ModalBody;
exports.default = _default;