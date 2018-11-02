"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../../Button/Button"));

// NOTE: Cards should be built in a way that they can be created with JSON
var CardHeader = function CardHeader(props) {
  var title = props.title,
      labelText = props.labelText,
      labelIcon = props.labelIcon,
      actions = props.actions,
      contextMenu = props.contextMenu;
  return _react.default.createElement("div", {
    className: "card-header"
  }, (title || labelText || labelIcon) && _react.default.createElement("div", {
    className: "card-header__text"
  }, (labelText || labelIcon) && _react.default.createElement("div", {
    className: "card-header__label"
  }, labelIcon && _react.default.cloneElement(labelIcon, {
    className: (0, _classnames.default)('card-header__label-icon', labelIcon.props.className)
  }), labelText && _react.default.createElement("span", {
    className: "card-header__label-text"
  }, labelText)), title && _react.default.createElement("h3", {
    className: "card-header__title"
  }, title)), (actions || contextMenu) && _react.default.createElement("div", {
    className: "card-header__actions"
  }, _react.default.createElement(_react.Fragment, null, actions && actions.length > 0 && actions.map(function (action) {
    return _react.default.createElement(_Button.default, (0, _extends2.default)({
      key: action.text,
      kind: "simple",
      isSmall: true
    }, action));
  }), contextMenu)));
};

CardHeader.defualtProps = {
  title: '',
  labelText: '',
  labelIcon: null,
  headerActions: [],
  contextMenu: null
};
var _default = CardHeader;
exports.default = _default;