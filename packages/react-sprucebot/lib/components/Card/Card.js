"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Card = exports.CardFooter = exports.CardBody = exports.CardHeader = void 0;

var _react = _interopRequireDefault(require("react"));

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
  }, labelIcon && _react.default.cloneElement(labelIcon, {
    className: 'card-header__label-icon'
  }), labelText && _react.default.createElement("span", {
    className: "card-header__label-text"
  }, labelText), title && _react.default.createElement("h3", {
    className: "card-header__title"
  }, title)), (actions || contextMenu) && _react.default.createElement("div", {
    className: "card-header__actions"
  }, actions && actions.length > 0 && actions.map(function (action) {
    return action;
  }), contextMenu));
};

exports.CardHeader = CardHeader;

var CardBody = function CardBody(props) {
  var children = props.children;
  return _react.default.createElement("div", {
    className: "card__body-inner"
  }, children);
};

exports.CardBody = CardBody;
CardHeader.defualtProps = {
  title: '',
  labelText: '',
  labelIcon: null,
  headerActions: [],
  contextMenu: null
};

var CardFooter = function CardFooter(props) {
  var children = props.children;
  return _react.default.createElement("div", {
    className: "card__footer"
  }, children);
};

exports.CardFooter = CardFooter;

var Card = function Card(props) {
  var children = props.children;
  return _react.default.createElement("div", {
    className: "card"
  }, children);
};

exports.Card = Card;
var _default = Card;
exports.default = _default;