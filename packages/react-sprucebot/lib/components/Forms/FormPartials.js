"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputHelper = exports.InputInner = exports.InputPre = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../../components/Button/Button"));

var DropdownArrow = function DropdownArrow(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7 10l5 5 5-5H7z"
  }));
};

DropdownArrow.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var InputPre = function InputPre(props) {
  var id = props.id,
      label = props.label,
      postLabel = props.postLabel;
  return _react.default.createElement("div", {
    className: "text-input__pre"
  }, _react.default.createElement("label", {
    htmlFor: id,
    className: "text-input__label"
  }, label), postLabel && _react.default.createElement("span", {
    className: "text-input__post-label"
  }, postLabel));
};

exports.InputPre = InputPre;

var InputInner = function InputInner(props) {
  var kind = props.kind,
      iconBefore = props.iconBefore,
      iconAfter = props.iconAfter,
      appendix = props.appendix,
      handleClear = props.handleClear,
      rest = (0, _objectWithoutProperties2.default)(props, ["kind", "iconBefore", "iconAfter", "appendix", "handleClear"]);
  return _react.default.createElement("div", {
    className: "text-input__inner"
  }, iconBefore && _react.default.cloneElement(iconBefore, {
    className: 'text-input__icon-pre'
  }), kind === 'phone-number' && _react.default.createElement(CountryInput, null), kind === 'credit-card' && _react.default.createElement("p", null, "CC"), _react.default.createElement("input", (0, _extends2.default)({
    className: "text-input__input"
  }, rest)), appendix && _react.default.createElement("p", {
    className: "text-input__appendix"
  }, appendix), iconAfter && _react.default.createElement(_Button.default, {
    onClick: handleClear,
    className: "text-input__clear-btn",
    icon: iconAfter
  }));
};

exports.InputInner = InputInner;

var InputHelper = function InputHelper(props) {
  var error = props.error,
      helper = props.helper;
  return _react.default.createElement("p", {
    className: "text-input__helper"
  }, " ", error || helper);
};

exports.InputHelper = InputHelper;