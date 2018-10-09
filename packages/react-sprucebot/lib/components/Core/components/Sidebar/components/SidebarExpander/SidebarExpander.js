"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../../../../../Button/Button"));

var ExpandIcon2 = function ExpandIcon2(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6-1.41-1.41z"
  }));
};

ExpandIcon2.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var CollapseIcon2 = function CollapseIcon2(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
  }));
};

CollapseIcon2.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var SidebarExpander = function SidebarExpander(props) {
  var isExpanded = props.isExpanded,
      toggleExpanded = props.toggleExpanded,
      forceCloseSidebar = props.forceCloseSidebar;
  return _react.default.createElement("div", {
    className: "sidebar-collapse"
  }, _react.default.createElement(_Button.default, {
    icon: isExpanded ? _react.default.createElement(CollapseIcon2, null) : _react.default.createElement(ExpandIcon2, null),
    onClick: function onClick() {
      toggleExpanded();
      forceCloseSidebar();
    },
    isSmall: true
  }));
};

var _default = SidebarExpander;
exports.default = _default;