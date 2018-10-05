"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Container = function Container(props) {
  var children = props.children,
      className = props.className,
      size = props.size,
      center = props.center;
  var parentClass = (0, _classnames.default)('l-container', className, {
    'l-container-small': size === 'small',
    'l-container-medium': size === 'medium'
  });
  return _react.default.createElement("div", {
    className: parentClass
  }, props.children);
};

Container.defaultProps = {
  center: false,
  className: ''
};
var _default = Container;
exports.default = _default;