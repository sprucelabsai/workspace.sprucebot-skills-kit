"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InputField;

var _react = _interopRequireDefault(require("react"));

var _FormField = _interopRequireDefault(require("../FormField/FormField"));

function InputField(props) {
  return _react.default.createElement(_FormField.default, props, _react.default.createElement("input", null));
}