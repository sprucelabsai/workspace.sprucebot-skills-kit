"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FormPartials = require("../../FormPartials");

var ArrowIcon = function ArrowIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7 10l5 5 5-5H7z"
  }));
};

ArrowIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var Select = function Select(props) {
  var id = props.id,
      options = props.options,
      isSimple = props.isSimple,
      className = props.className,
      label = props.label,
      postLabel = props.postLabel,
      error = props.error,
      helper = props.helper,
      rest = (0, _objectWithoutProperties2.default)(props, ["id", "options", "isSimple", "className", "label", "postLabel", "error", "helper"]);
  var parentClass = (0, _classnames.default)('select text-input__inner', className, {
    'select-simple': isSimple,
    'select--has-error': error
  });
  return _react.default.createElement("div", {
    className: "select-wrapper"
  }, label && _react.default.createElement(_FormPartials.InputPre, {
    id: id,
    label: label,
    postLabel: postLabel
  }), _react.default.createElement("div", {
    className: parentClass
  }, _react.default.createElement("select", rest, options.map(function (option) {
    return _react.default.createElement("option", {
      key: option
    }, option);
  })), !isSimple && _react.default.createElement(ArrowIcon, {
    className: "select__icon"
  })), (error || helper) && _react.default.createElement(_FormPartials.InputHelper, {
    helper: helper,
    error: error
  }));
};

var _default = Select;
exports.default = _default;