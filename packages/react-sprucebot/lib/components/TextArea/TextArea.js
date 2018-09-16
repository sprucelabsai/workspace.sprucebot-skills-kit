"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

var _FormField = _interopRequireDefault(require("../FormField/FormField"));

var TextAreaField = function TextAreaField(_ref) {
  var className = _ref.className,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className"]);
  return _react.default.createElement(_FormField.default, props, _react.default.createElement(StyledTextArea, (0, _extends2.default)({}, props, {
    className: "TextArea ".concat(className || '')
  })));
};

var _default = TextAreaField;
exports.default = _default;