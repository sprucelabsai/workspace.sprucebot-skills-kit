"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Card = exports.CardBuilder = exports.CardFooter = exports.CardBody = exports.CardHeader = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../Button/Button"));

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
    className: 'card-header__label-icon'
  }), labelText && _react.default.createElement("span", {
    className: "card-header__label-text"
  }, labelText)), title && _react.default.createElement("h3", {
    className: "card-header__title"
  }, title)), (actions || contextMenu) && _react.default.createElement("div", {
    className: "card-header__actions"
  }, actions, contextMenu));
}; // Card Body


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
  contextMenu: null // Card Footer

};

var CardFooter = function CardFooter(props) {
  var children = props.children;
  return _react.default.createElement("div", {
    className: "card__footer"
  }, children);
}; // NOTE: WIP
// CardBuilder
// This component will build a card by taking JSON input and translating
// it into the appropriate components


exports.CardFooter = CardFooter;
var CardBuilderKey = {
  button: _Button.default
};

var CardBuilder = function CardBuilder(props) {
  var header = props.header,
      body = props.body,
      footer = props.footer;
  var title = header.title,
      labelText = header.labelText,
      labelIcon = header.labelIcon,
      headerActions = header.actions;
  var children = body.children;
  var footerActions = footer.actions;
  return _react.default.createElement(Card, null, _react.default.createElement(CardHeader, {
    title: title,
    labelText: labelText,
    labelIcon: labelIcon,
    actions: headerActions && headerActions.length > 0 && headerActions.map(function (action) {
      var Handler = CardBuilderKey[action.type];

      if (!Handler || typeof Handler === 'undefined') {
        return null;
      }

      return _react.default.createElement(Handler, (0, _extends2.default)({
        key: action.text,
        kind: "simple"
      }, action));
    })
  }), _react.default.createElement("div", {
    className: "card__body-inner",
    dangerouslySetInnerHTML: {
      __html: children
    }
  }), footer && _react.default.createElement(CardFooter, null, footerActions && footerActions.length > 0 && footerActions.map(function (action) {
    var Handler = CardBuilderKey[action.type];
    console.log({
      Handler: Handler
    });

    if (!Handler || typeof Handler === 'undefined') {
      return null;
    }

    return _react.default.createElement(Handler, (0, _extends2.default)({
      key: action.text,
      kind: "simple"
    }, action));
  })));
}; // Card


exports.CardBuilder = CardBuilder;

var Card = function Card(props) {
  var children = props.children;
  return _react.default.createElement("div", {
    className: "card"
  }, children);
};

exports.Card = Card;
var _default = Card;
exports.default = _default;