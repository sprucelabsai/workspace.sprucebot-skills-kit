"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Avatar = _interopRequireDefault(require("../../../Avatar/Avatar"));

var _Button = _interopRequireWildcard(require("../../../Button/Button"));

var _Forms = require("../../../Forms");

var DragHandle = function DragHandle(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20 9H4v2h16V9zM4 15h16v-2H4v2z"
  }));
};

DragHandle.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var ListItem = function ListItem(props) {
  var title = props.title,
      subtitle = props.subtitle,
      avatar = props.avatar,
      image = props.image,
      icon = props.icon,
      isDraggable = props.isDraggable,
      toggleId = props.toggleId,
      actions = props.actions;
  var parentClass = (0, _classnames.default)('list-item', {
    'list-item-title-only': !subtitle,
    'list-item--is-draggable': isDraggable
  });
  return _react.default.createElement("li", {
    className: parentClass
  }, (image || icon || avatar) && !isDraggable && _react.default.createElement("div", {
    className: "list-item__image-wrapper"
  }, icon && _react.default.cloneElement(icon, {
    className: (0, _classnames.default)('list-item__icon', icon.props && icon.props.className)
  }), image && _react.default.createElement("img", {
    src: image,
    className: "list-item__image",
    alt: title,
    width: "40",
    height: "40"
  }), avatar && _react.default.createElement(_Avatar.default, {
    image: avatar,
    alt: title
  })), isDraggable && _react.default.createElement(DragHandle, {
    className: "drag-handle"
  }), _react.default.createElement("div", {
    className: "list-item__text-wrapper"
  }, toggleId ? _react.default.createElement("label", {
    className: "list-item__title",
    htmlFor: toggleId
  }, title) : _react.default.createElement("p", {
    className: "list-item__title"
  }, title), subtitle && _react.default.createElement("p", {
    className: "list-item__subtitle"
  }, subtitle)), !isDraggable && actions && actions.length > 0 && _react.default.createElement("div", {
    className: "list-item__actions-wrapper"
  }, actions.map(function (action, idx) {
    return _react.default.createElement(_Button.default, (0, _extends2.default)({
      key: idx,
      isSmall: true,
      className: "list-item__action"
    }, action));
  })), toggleId && _react.default.createElement(_Forms.Toggle, {
    id: toggleId
  }));
};

ListItem.defaultProps = {
  subtitle: '',
  avatar: '',
  image: '',
  icon: null,
  isDraggable: false,
  toggleId: '',
  actions: []
};
var _default = ListItem;
exports.default = _default;