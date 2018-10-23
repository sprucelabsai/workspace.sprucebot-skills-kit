"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListWrapper = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ListHeader = _interopRequireWildcard(require("./components/ListHeader/ListHeader"));

var _ListItem = _interopRequireWildcard(require("./components/ListItem/ListItem"));

var ListWrapper = function ListWrapper(props) {
  return _react.default.createElement("div", {
    className: "list-wrapper"
  }, props.children);
};

exports.ListWrapper = ListWrapper;

var List = function List(props) {
  var header = props.header,
      items = props.items,
      className = props.className,
      isSmall = props.isSmall;
  var parentClass = (0, _classnames.default)('list', className, {
    'list-small': isSmall
  });
  console.log({
    items: items
  });
  return _react.default.createElement(_react.Fragment, null, header && _react.default.createElement(_ListHeader.default, (0, _extends2.default)({
    isSmall: isSmall
  }, header)), _react.default.createElement("ul", {
    className: parentClass
  }, items.map(function (item, idx) {
    return _react.default.createElement(_ListItem.default, (0, _extends2.default)({
      key: idx
    }, item));
  })));
};

List.defaultProps = {
  header: null,
  className: '',
  isSmall: false
};
var _default = List;
exports.default = _default;