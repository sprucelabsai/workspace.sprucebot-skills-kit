"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Card = exports.CardHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var CardHeader = function CardHeader(props) {
  var title = props.title,
      labelText = props.labelText,
      labelIcon = props.labelIcon,
      headerActions = props.headerActions,
      contextMenu = props.contextMenu;
  return _react.default.createElement("div", {
    className: "card-header"
  }, (title || labelText || labelIcon) && _react.default.createElement("div", {
    className: "card-header__text"
  }, labelIcon && _react.default.cloneElement(labelIcon, {
    className: 'card-header__label-icon'
  }), labelText && _react.default.createElement("span", {
    className: "card-header__label-text"
  }, labelText), title && _react.default.createElement("h3", {
    className: "card-header__title"
  }, title)), (headerActions || contextMenu) && _react.default.createElement("div", {
    className: "card-header__actions"
  }, headerActions && headerActions.length > 0 && headerActions.map(function (action) {
    return action;
  }), contextMenu));
};

exports.CardHeader = CardHeader;
CardHeader.defualtProps = {
  title: '',
  labelText: '',
  labelIcon: null,
  headerActions: [],
  contextMenu: null
};

var Card = function Card(props) {
  var children = props.children;
  return _react.default.createElement("div", {
    className: "card"
  }, children);
};

exports.Card = Card;
var _default = Card;
exports.default = _default;