"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var TimeLine = function TimeLine(props) {
  var className = props.className,
      rest = (0, _objectWithoutProperties2.default)(props, ["className"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _classnames.default)('bigcalendar__time-line', className, {})
  }, rest));
};

var _default = TimeLine;
exports.default = _default;