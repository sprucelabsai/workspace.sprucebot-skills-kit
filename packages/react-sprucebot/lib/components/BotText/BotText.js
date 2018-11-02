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

var BotText = function BotText(props) {
  var text = props.text,
      children = props.children,
      className = props.className,
      rest = (0, _objectWithoutProperties2.default)(props, ["text", "children", "className"]);

  if (!children && !text) {
    // TODO: Handle logging
    // console.error('Bot Text must either have children or text')
    return null;
  }

  if (text && !children) {
    return _react.default.createElement("p", (0, _extends2.default)({
      className: (0, _classnames.default)('bot-text', className),
      dangerouslySetInnerHTML: {
        __html: text
      }
    }, rest));
  }

  if (children && !text) {
    return _react.default.createElement("p", (0, _extends2.default)({
      className: (0, _classnames.default)('bot-text', className)
    }, rest), children);
  }

  return null;
};

var _default = BotText;
exports.default = _default;