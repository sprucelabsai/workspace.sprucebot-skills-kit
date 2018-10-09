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

var RadioIconYes = function RadioIconYes(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }));
};

RadioIconYes.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var RadioIconNo = function RadioIconNo(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }));
};

RadioIconNo.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var Radio = function Radio(props) {
  var id = props.id,
      label = props.label,
      postText = props.postText,
      className = props.className,
      rest = (0, _objectWithoutProperties2.default)(props, ["id", "label", "postText", "className"]);
  var parentClass = (0, _classnames.default)('checkbox-item', className);
  return _react.default.createElement("div", {
    className: parentClass
  }, _react.default.createElement("div", {
    className: "checkbox-item__inner"
  }, _react.default.createElement("input", (0, _extends2.default)({
    className: "checkbox-item__input",
    type: "radio",
    id: id
  }, rest)), _react.default.createElement("label", {
    className: "checkbox-item__label",
    htmlFor: id
  }, label), _react.default.createElement("div", {
    className: "checkbox-item__icons"
  }, _react.default.createElement(RadioIconYes, {
    className: "checkbox-item__icon checkbox-item__icon-yes"
  }), _react.default.createElement(RadioIconNo, {
    className: "checkbox-item__icon checkbox-item__icon-no"
  }))), postText && _react.default.createElement("p", {
    className: "checkbox-item__post-text"
  }, postText));
};

var _default = Radio;
exports.default = _default;