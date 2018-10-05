"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _TextInput = _interopRequireDefault(require("../TextInput/TextInput"));

// TODO: May be better as a stateful component in order to trim itself
var DomainInput = function DomainInput(props) {
  var rest = (0, _extends2.default)({}, props);
  return _react.default.createElement(_TextInput.default, rest);
};

var _default = DomainInput;
exports.default = _default;