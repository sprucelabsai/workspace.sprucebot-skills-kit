"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../../Button/Button"));

var CloseIcon = function CloseIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
  }));
};

CloseIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var Tag = function Tag(props) {
  var text = props.text,
      kind = props.kind,
      className = props.className,
      isSmall = props.isSmall;
  var parentClass = (0, _classnames.default)('tag', className, {
    'tag-primary': kind === 'primary',
    'tag-secondary': kind === 'secondary',
    'tag-small': isSmall
  });
  return _react.default.createElement("div", {
    className: parentClass
  }, _react.default.createElement("span", {
    className: "tag__text"
  }, text), _react.default.createElement(_Button.default, {
    className: "tag__btn",
    icon: _react.default.createElement(CloseIcon, null)
  }));
};

Tag.defaultProps = {
  kind: 'primary',
  isSmall: false
};
var _default = Tag;
exports.default = _default;