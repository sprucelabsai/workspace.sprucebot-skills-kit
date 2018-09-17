"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var TeamWeek =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TeamWeek, _Component);

  function TeamWeek() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TeamWeek);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TeamWeek)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleOnClick", function (event, e) {
      var onSelectEvent = _this.props.onSelectEvent;
      onSelectEvent && onSelectEvent(event, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderDayEvents", function (events, date) {
      var _this$props = _this.props,
          max = _this$props.max,
          min = _this$props.min;
      return events.filter(function (event) {
        return (0, _moment.default)(event.start).isSame((0, _moment.default)(date), 'day');
      }).map(function (event, index) {
        var start = event.start,
            end = event.end;
        var totalMinutes = (0, _moment.default)(max).diff((0, _moment.default)(min), 'minutes');
        var startOfDay = (0, _moment.default)("".concat(date.format('YYYY-MM-DD'), " ").concat((0, _moment.default)(min).format('HH:mm:ss')));
        var endOfDay = (0, _moment.default)("".concat(date.format('YYYY-MM-DD'), " ").concat((0, _moment.default)(max).format('HH:mm:ss')));
        var left = Math.round((0, _moment.default)(start).diff(startOfDay, 'minutes') / totalMinutes * 100);
        var right = Math.round((0, _moment.default)(endOfDay).diff(end, 'minutes') / totalMinutes * 100);
        return _react.default.createElement("div", {
          key: "".concat(event.userId, "_").concat(event.start),
          onClick: function onClick(e) {
            return _this.handleOnClick(event, e);
          },
          className: "rbc-event event-".concat(index, " ").concat(event.className || ''),
          style: {
            left: "".concat(left, "%"),
            right: "".concat(right, "%")
          }
        }, event.title);
      });
    });
    return _this;
  }

  (0, _createClass2.default)(TeamWeek, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          _this$props2$classNam = _this$props2.className,
          className = _this$props2$classNam === void 0 ? '' : _this$props2$classNam,
          date = _this$props2.date,
          dayFormat = _this$props2.dayFormat,
          events = _this$props2.events;
      var currentDate = (0, _moment.default)(date).startOf('week');
      var end = (0, _moment.default)(currentDate).endOf('week');
      var dates = [];

      do {
        dates.push((0, _moment.default)(currentDate));
        currentDate.add(1, 'day');
      } while (currentDate <= end);

      return _react.default.createElement("div", {
        className: "team_week ".concat(className)
      }, _react.default.createElement("div", {
        className: "rbc-time-header"
      }, _react.default.createElement("div", {
        className: "rbc-row rbc-time-header-cell"
      }, dates.map(function (date) {
        return _react.default.createElement("div", {
          key: "header-for-".concat(date.format()),
          className: "rbc-header"
        }, date.format(dayFormat));
      }))), _react.default.createElement("div", {
        className: "rbc-time-content"
      }, _react.default.createElement("div", {
        className: "rbc-row rbc-time-content-cell"
      }, dates.map(function (date) {
        return _react.default.createElement("div", {
          key: "content-for-".concat(date.format()),
          className: "rbc-day-slot rbc-day-column"
        }, _react.default.createElement("div", {
          className: "rbc-allday-cell"
        }, events.filter(function (event) {
          return event.allDay && (0, _moment.default)(event.start).isSame((0, _moment.default)(date), 'day');
        }).map(function (event) {
          return _react.default.createElement("div", {
            key: "".concat(event.title, "_").concat(event.start),
            className: "rbc-event ".concat(event.className || ''),
            onClick: function onClick(e) {
              return _this2.handleOnClick(event, e);
            }
          }, event.title);
        })), _react.default.createElement("div", {
          className: "rbc-events-wrapper"
        }, _this2.renderDayEvents(events, date)));
      }))));
    }
  }], [{
    key: "title",
    value: function title(date) {
      return 'TEST';
    }
  }, {
    key: "navigate",
    value: function navigate(date) {
      console.log('TEAM WEEK', date);
    }
  }]);
  return TeamWeek;
}(_react.Component);

exports.default = TeamWeek;