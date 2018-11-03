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

var _is_js = _interopRequireDefault(require("is_js"));

var _router = _interopRequireDefault(require("next/router"));

var _link = _interopRequireDefault(require("next/link"));

var _Loader = _interopRequireDefault(require("../Loader/Loader"));

// TODO: Incorporate Next.js router link
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
      linkProps = props.linkProps,
      rest = (0, _objectWithoutProperties2.default)(props, ["className", "kind", "isSmall", "isFullWidth", "isLoading", "text", "href", "icon", "type", "onClick", "linkProps"]);
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
  }); // Check if the link is relative (client-side) or absolute

  var linkIsRelative = true;

  if (href && _is_js.default.url(href)) {
    linkIsRelative = false;
  }

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
  }, rest), _react.default.createElement(Inner, null)); // Only return a Next link if the href is relative


  var anchor = linkIsRelative ? _react.default.createElement(_link.default, (0, _extends2.default)({
    href: href
  }, linkProps), _react.default.createElement("a", (0, _extends2.default)({
    className: btnClass
  }, rest), _react.default.createElement(Inner, null))) : _react.default.createElement("a", (0, _extends2.default)({
    href: href,
    className: btnClass
  }, rest), _react.default.createElement(Inner, null));

  if (!text && !icon) {
    // TODO: Handle Logging
    // console.error(
    // 	'<Button /> must have text, icon, or both. Please check the props your passing.'
    // )
    return null;
  }

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