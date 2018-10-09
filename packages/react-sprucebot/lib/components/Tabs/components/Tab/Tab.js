"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../../../Button/Button"));

var Tab = function Tab(props) {
  var text = props.text,
      isCurrent = props.isCurrent,
      rest = (0, _objectWithoutProperties2.default)(props, ["text", "isCurrent"]);
  return _react.default.createElement("li", {
    className: "tab"
  }, _react.default.createElement(_Button.default, (0, _extends2.default)({
    className: (0, _classnames.default)('tab__inner', {
      'tab--is-current': props.isCurrent
    }),
    text: props.text
  }, rest)));
};

Tab.defaultProps = {
  isCurrent: false
};
var _default = Tab;
exports.default = _default;