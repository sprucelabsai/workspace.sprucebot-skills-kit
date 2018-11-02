"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var DayCol = function DayCol(props) {
  // convert everything to timestamps for easy comparison in lots of loops
  var start = parseInt(_momentTimezone.default.tz("".concat(props.date.format('YYYY-MM-DD'), " ").concat(props.startTime), props.timezone).format('X'), 10);
  var end = parseInt(_momentTimezone.default.tz("".concat(props.date.format('YYYY-MM-DD'), " ").concat(props.endTime), props.timezone).format('X'));
  var isActive;
  var now;
  var hours = props.hours.map(function (hour) {
    now = hour.timestamp;
    isActive = now >= start && now < end;
    return _react.default.createElement("div", {
      key: hour.label,
      className: (0, _classnames.default)('hour-block', {
        active: isActive,
        inactive: !isActive
      })
    });
  });
  return _react.default.createElement("div", {
    className: "bigcalendar__day-col"
  }, hours);
};

var _default = DayCol;
exports.default = _default;