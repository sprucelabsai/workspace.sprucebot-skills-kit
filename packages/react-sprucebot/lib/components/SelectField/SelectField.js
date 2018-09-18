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

var _FormField = _interopRequireDefault(require("../FormField/FormField"));

var TextAreaField = function TextAreaField(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children"]);
  return _react.default.createElement(_FormField.default, props, _react.default.createElement("select", (0, _extends2.default)({}, props, {
    className: (0, _classnames.default)('SelectField', 'custom_dropdown')
  }), children));
};

var _default = TextAreaField;
exports.default = _default;