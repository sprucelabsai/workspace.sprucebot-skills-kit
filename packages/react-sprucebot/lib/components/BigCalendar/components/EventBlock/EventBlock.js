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

var EventBlock = function EventBlock(props) {
  var block = props.block,
      className = props.className,
      startAt = props.startAt,
      rest = (0, _objectWithoutProperties2.default)(props, ["block", "className", "startAt"]); // NOTE: you MUST keep resize-n the first class in any resize-handle
  // IT MUST BE IN THE FORM OF resize-[n|s|e|w]

  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _classnames.default)('bigcalendar__event-block', className, block.className, {
      busy: block.markAsBusy,
      available: !block.markAsBusy
    })
  }, rest), _react.default.createElement("div", {
    className: "resize-n resize-handle"
  }, _react.default.createElement("div", {
    className: "resize-highlight-handle"
  })), _react.default.createElement("p", {
    className: "title"
  }, block.title), _react.default.createElement("p", {
    className: "time"
  }, startAt.format('h:mma')), _react.default.createElement("div", {
    className: "resize-s resize-handle"
  }, _react.default.createElement("div", {
    className: "resize-highlight-handle"
  })));
};

var _default = EventBlock;
exports.default = _default;