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

var _Loader = _interopRequireDefault(require("../Loader/Loader"));

var Button = function Button(props) {
  var className = props.className,
      kind = props.kind,
      isSmall = props.isSmall,
      isFullWidth = props.isFullWidth,
      isLoading = props.isLoading,
      text = props.text,
      href = props.href,
      icon = props.icon,
      type = props.type,
      onClick = props.onClick,
      rest = (0, _objectWithoutProperties2.default)(props, ["className", "kind", "isSmall", "isFullWidth", "isLoading", "text", "href", "icon", "type", "onClick"]);
  var btnClass = (0, _classnames.default)(className, {
    btn: true,
    'btn-primary': kind === 'primary',
    'btn-secondary': kind === 'secondary',
    'btn-caution': kind === 'caution',
    'btn-simple': kind === 'simple',
    'btn-full-width': isFullWidth,
    'btn--loading': isLoading,
    'btn-small': isSmall,
    'btn-icon-only': !text
  });

  var handleClick = function handleClick(e) {
    e.currentTarget.blur();

    if (onClick) {
      onClick();
    }
  };

  var Inner = function Inner() {
    return _react.default.createElement("span", {
      className: "btn__inner"
    }, icon && _react.default.createElement("span", {
      className: "btn__icon-wrapper"
    }, _react.default.cloneElement(icon, {
      className: (0, _classnames.default)('btn__icon', icon.props.className)
    })), text && _react.default.createElement("span", {
      className: "btn__text"
    }, text), isLoading && _react.default.createElement(_Loader.default, null));
  };

  var button = _react.default.createElement("button", (0, _extends2.default)({
    className: btnClass,
    type: type,
    onClick: handleClick
  }, rest), _react.default.createElement(Inner, null));

  var anchor = _react.default.createElement("a", (0, _extends2.default)({
    href: href,
    className: btnClass
  }, rest), _react.default.createElement(Inner, null));

  return href ? anchor : button;
};

Button.defaultProps = {
  className: '',
  kind: '',
  isSmall: false,
  isFullWidth: false,
  isLoading: false,
  text: '',
  href: '',
  icon: null,
  type: 'button',
  onClick: function onClick() {
    return null;
  }
};
var _default = Button;
exports.default = _default;