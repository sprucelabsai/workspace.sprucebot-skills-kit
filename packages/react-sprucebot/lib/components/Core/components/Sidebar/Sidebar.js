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

var _SidebarExpander = _interopRequireDefault(require("./components/SidebarExpander/SidebarExpander"));

var _SidebarItem = _interopRequireDefault(require("./components/SidebarItem/SidebarItem"));

var _SidebarFooter = _interopRequireDefault(require("./components/SidebarFooter/SidebarFooter"));

var Sidebar = function Sidebar(props) {
  var items = props.items,
      forceCloseSidebar = props.forceCloseSidebar,
      toggleExpanded = props.toggleExpanded,
      isExpanded = props.isExpanded;
  return _react.default.createElement("aside", {
    className: (0, _classnames.default)('sidebar', {
      'sidebar--is-collapsed': !isExpanded
    })
  }, _react.default.createElement(_SidebarExpander.default, {
    toggleExpanded: toggleExpanded,
    isExpanded: isExpanded,
    forceCloseSidebar: forceCloseSidebar
  }), _react.default.createElement("ul", {
    className: "sidebar__inner"
  }, items.map(function (item, idx) {
    return _react.default.createElement(_SidebarItem.default, (0, _extends2.default)({
      key: idx
    }, item));
  })), _react.default.createElement(_SidebarFooter.default, null));
};

var _default = Sidebar;
exports.default = _default;