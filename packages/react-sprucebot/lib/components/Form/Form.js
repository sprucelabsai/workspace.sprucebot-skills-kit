"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Form = function Form(_ref) {
  var className = _ref.className,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className"]);
  return _react.default.createElement("form", (0, _extends2.default)({}, props, {
    className: "Form ".concat(className || '')
  }));
};

var _default = Form;
exports.default = _default;