"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var FormRow = function FormRow(props) {
  return _react.default.createElement("div", {
    className: "form-row"
  }, props.children);
};

var _default = FormRow;
exports.default = _default;