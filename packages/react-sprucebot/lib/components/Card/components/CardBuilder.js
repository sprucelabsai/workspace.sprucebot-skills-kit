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

var _Card = _interopRequireDefault(require("../Card"));

var _CardHeader = _interopRequireDefault(require("./CardHeader"));

var _CardFooter = _interopRequireDefault(require("./CardFooter"));

var _Button = _interopRequireDefault(require("../../Button/Button"));

// NOTE: Cards should be built in a way that they can be created with JSON
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
  var footerActions = footer && footer.actions;
  return _react.default.createElement(_Card.default, null, _react.default.createElement(_CardHeader.default, {
    title: title,
    labelText: labelText,
    labelIcon: labelIcon,
    actions: headerActions
  }), _react.default.createElement("div", {
    className: "card__body-inner",
    dangerouslySetInnerHTML: {
      __html: children
    }
  }), footer && _react.default.createElement(_CardFooter.default, null, footerActions && footerActions.length > 0 ? footerActions.map(function (action) {
    var Handler = action && action.type && CardBuilderKey[action.type];

    if (!Handler || typeof Handler === 'undefined') {
      return null;
    }

    return _react.default.createElement(Handler, (0, _extends2.default)({
      key: action.text,
      kind: "simple"
    }, action));
  }) : null));
};

CardBuilder.defaultProps = {
  footer: null
};
var _default = CardBuilder;
exports.default = _default;