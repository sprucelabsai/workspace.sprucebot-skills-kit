"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FooterPrimary = require("../../../FooterPrimary");

var SidebarFooter = function SidebarFooter() {
  return _react.default.createElement("div", {
    className: "sidebar__footer"
  }, _react.default.createElement("div", {
    className: "sidebar-item"
  }, _react.default.createElement("div", {
    className: "sidebar-item__inner"
  }, _react.default.createElement(_FooterPrimary.HelpButton, {
    className: "sidebar-item__link",
    iconClassName: "sidebar-item__icon sidebar-item__line-icon",
    textClassName: "sidebar-item__text"
  }))), _react.default.createElement(_FooterPrimary.Legal, {
    className: "sidebar__footer-text",
    linkClassName: "sidebar__footer-link"
  }));
};

var _default = SidebarFooter;
exports.default = _default;