"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Toggle = function Toggle(props) {
  var id = props.id,
      className = props.className,
      postText = props.postText,
      rest = (0, _objectWithoutProperties2.default)(props, ["id", "className", "postText"]);
  var parentClass = (0, _classnames.default)('toggle__wrapper', className);
  return _react.default.createElement("div", {
    className: parentClass
  }, _react.default.createElement("div", {
    className: "toggle"
  }, _react.default.createElement("input", {
    className: "toggle__input",
    type: "checkbox",
    id: id
  }), _react.default.createElement("label", {
    className: "toggle__label",
    for: id
  })), postText && _react.default.createElement("label", {
    className: "toggle__text",
    for: id
  }, postText));
};

var _default = Toggle;
exports.default = _default;