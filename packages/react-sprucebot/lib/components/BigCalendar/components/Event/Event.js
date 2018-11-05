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

var _EventBlock = _interopRequireDefault(require("../EventBlock/EventBlock"));

var Event = function Event(props) {
  var event = props.event,
      className = props.className,
      _onMouseDown = props.onMouseDown,
      timezone = props.timezone,
      rest = (0, _objectWithoutProperties2.default)(props, ["event", "className", "onMouseDown", "timezone"]);

  var startAt = _momentTimezone.default.tz(event.startAt, timezone);

  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _classnames.default)('bigcalendar__event', className, event.className)
  }, rest), event.blocks.map(function (block, idx) {
    var eventBlock = _react.default.createElement(_EventBlock.default, {
      startAt: startAt,
      onMouseDown: function onMouseDown(e) {
        _onMouseDown && _onMouseDown({
          e: e,
          event: event,
          block: block,
          blockIdx: idx
        });
      },
      key: "block-".concat(event.id, "-").concat(idx),
      block: block
    });

    startAt = (0, _momentTimezone.default)(startAt).add(block.durationSec, 'seconds');
    return eventBlock;
  }));
};

var _default = Event;
exports.default = _default;