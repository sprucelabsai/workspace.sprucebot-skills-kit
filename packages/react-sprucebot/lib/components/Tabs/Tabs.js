"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _Tab = _interopRequireDefault(require("./components/Tab/Tab"));

var _ContextMenu = _interopRequireDefault(require("../ContextMenu/ContextMenu"));

// TODO: Figure out how to split tabs up based on what's visible in the viewport
var Tabs = function Tabs(props) {
  var tabs = props.tabs;
  var hiddenTabs = [];
  var activeTab = tabs.find(function (tab) {
    return tab.isCurrent;
  }); // TODO: Determine how hidden tabs work

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("ul", {
    className: "tab-group"
  }, tabs.map(function (tab) {
    return _react.default.createElement(_Tab.default, (0, _extends2.default)({
      key: tab.text
    }, tab));
  }), hiddenTabs && hiddenTabs.length > 0 && _react.default.createElement("li", {
    className: "tab"
  }, _react.default.createElement(_ContextMenu.default, {
    actions: [{
      text: 'Edit'
    }]
  }))), activeTab && activeTab.panel);
};

var _default = Tabs;
exports.default = _default;