"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../../../Button/Button"));

var ListHeader = function ListHeader(props) {
  var title = props.title,
      subtitle = props.subtitle,
      isSmall = props.isSmall,
      actions = props.actions;
  var parentClass = (0, _classnames.default)('list-header', {
    'list-header-small': isSmall
  });
  return _react.default.createElement("div", {
    className: parentClass
  }, _react.default.createElement("div", {
    className: "list-header__text"
  }, _react.default.createElement("h3", {
    className: "list-header__title"
  }, title), subtitle && _react.default.createElement("p", {
    className: "list-header__subtitle"
  }, subtitle)), actions && actions.length > 0 && _react.default.createElement("ul", {
    className: "list-header__actions"
  }, actions.map(function (action, idx) {
    return _react.default.createElement("li", {
      key: idx,
      className: "list-header__action-wrapper"
    }, _react.default.createElement(_Button.default, action));
  })));
};

ListHeader.defaultProps = {
  subtitle: '',
  isSmall: false,
  actions: []
};
var _default = ListHeader;
exports.default = _default;