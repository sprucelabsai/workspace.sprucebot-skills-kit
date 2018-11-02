"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _findIndex = _interopRequireDefault(require("lodash/findIndex"));

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _TimeGutter = _interopRequireDefault(require("../TimeGutter/TimeGutter"));

var _TeammateHeader = _interopRequireDefault(require("../TeammateHeader/TeammateHeader"));

var _DragGrid = _interopRequireDefault(require("../DragGrid/DragGrid"));

var _DayCol = _interopRequireDefault(require("./DayCol"));

var _size = _interopRequireDefault(require("../../utils/size"));

var _event = _interopRequireDefault(require("../../utils/event"));

var _TimeLine = _interopRequireDefault(require("../TimeLine/TimeLine"));

var Day =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Day, _Component);

  function Day(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Day);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Day).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      scrollLeft: 0,
      scrollTop: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_timeRangeCache", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_columnMapCache", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentDidMount", function () {
      _this.updateHorizontalPagerDetails();

      _this.placeAndSize();

      window.addEventListener('resize', _this.updateHorizontalPagerDetails);
      _this._timeLineInterval = setInterval(_this.placeTimeLine, 10000); //TODO better way to detect everything is rendered and sized correctly

      setTimeout(_this.updateHorizontalPagerDetails, 1000);
      setTimeout(_this.placeAndSize, 1000);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentWillUnmount", function () {
      clearInterval(_this._timeLineInterval);
      window.removeEventListener('resize', _this.updateHorizontalPagerDetails);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleScroll", function (e) {
      var target = e.target;
      var scrollTop = target.scrollTop,
          scrollLeft = target.scrollLeft;

      _this.setState({
        scrollTop: scrollTop,
        scrollLeft: scrollLeft
      }); // arrows that sit in the upper right


      _this.updateHorizontalPagerDetails();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getTimeRangeDetails", function (min, max) {
      var _this$props = _this.props,
          startDate = _this$props.startDate,
          slotsPerHour = _this$props.slotsPerHour,
          timezone = _this$props.timezone;
      var key = "".concat(startDate.format('YYYY-MM-DD'), "-").concat(min, "-").concat(max);

      if (!_this._timeRangeCache[key]) {
        var minMoment = _momentTimezone.default.tz("".concat(startDate.format('YYYY-MM-DD'), " ").concat(min), timezone);

        var maxMoment = _momentTimezone.default.tz("".concat(startDate.format('YYYY-MM-DD'), " ").concat(max), timezone);

        var minTimestamp = parseInt(minMoment.format('X'), 10);
        var maxTimestamp = parseInt(maxMoment.format('X'), 10);
        var hours = (maxTimestamp - minTimestamp) / 60 / 60;
        var slotDurationMin = 1 / slotsPerHour * 60;
        _this._timeRangeCache[key] = {
          min: min,
          max: max,
          minMoment: minMoment,
          maxMoment: maxMoment,
          minTimestamp: minTimestamp,
          maxTimestamp: maxTimestamp,
          seconds: maxTimestamp - minTimestamp,
          slotDurationMin: slotDurationMin,
          totalTimeSlots: slotsPerHour * hours
        };
      }

      return _this._timeRangeCache[key];
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateHorizontalPagerDetails", function () {
      var onUpdateHorizontalPagerDetails = _this.props.onUpdateHorizontalPagerDetails;
      var currentPage;
      var totalPages = 3;

      var scrolledRight = _this.dragGridRef.current.isScrolledAllTheWayRight();

      var scrolledLeft = _this.dragGridRef.current.isScrolledAllTheWayLeft();

      if (scrolledRight && scrolledLeft) {
        currentPage = 0;
        totalPages = 1;
      } else if (scrolledRight) {
        currentPage = 2;
      } else if (scrolledLeft) {
        currentPage = 0;
      } else {
        currentPage = 1;
      }

      onUpdateHorizontalPagerDetails({
        currentPage: currentPage,
        totalPages: totalPages
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleHorizontalPageNext", function () {
      var scrollLeft = _this.state.scrollLeft;

      var pageWidth = _this.dragGridRef.current.getWidth();

      _this.dragGridRef.current.animateHorizontalTo(scrollLeft + pageWidth);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleHorizontalPageBack", function () {
      var scrollLeft = _this.state.scrollLeft;

      var pageWidth = _this.dragGridRef.current.getWidth();

      _this.dragGridRef.current.animateHorizontalTo(scrollLeft - pageWidth);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTeammateScroll", function (e) {
      var target = e.target;
      var teammateLeft = target.scrollLeft;
      var viewLeft = _this.state.scrollLeft;

      if (teammateLeft !== viewLeft) {
        _this.dragGridRef.current.setScrollLeft(teammateLeft);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "snapEventToNearestValidX", function (x) {
      var dayColWidth = _this.dayColWidth();

      var nearest = Math.round(x / dayColWidth);
      return Math.max(0, Math.min(_this.props.users.length - 1, nearest) * dayColWidth);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "snapEventToNearestValidY", function (y) {
      var elementHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var slotHeight = _this.slotHeight();

      var nearest = Math.round(y / slotHeight);
      var maxTop = _this.dayColHeight() - elementHeight;
      return Math.max(0, Math.min(maxTop, nearest * slotHeight));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "yToTime", function (y) {
      var slotHeight = _this.slotHeight();

      var range = _this.getTimeRangeDetails(_this.props.minTime, _this.props.maxTime);

      var nearest = Math.round(y / slotHeight);
      var minutesFromMinTime = nearest * range.slotDurationMin;
      var time = (0, _momentTimezone.default)(range.minMoment).add(minutesFromMinTime, 'minutes');
      return time;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "timeToY", function (date) {
      var _this$props2 = _this.props,
          timezone = _this$props2.timezone,
          minTime = _this$props2.minTime,
          maxTime = _this$props2.maxTime;

      var dayColHeight = _this.dayColHeight();

      var startTime = parseInt(_momentTimezone.default.tz(date, timezone).format('X'));

      var dayColTimeRangeDetails = _this.getTimeRangeDetails(minTime, maxTime);

      var secondsIntoDay = startTime - dayColTimeRangeDetails.minTimestamp;
      var top = secondsIntoDay / dayColTimeRangeDetails.seconds * dayColHeight;
      return top;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "xToUser", function (y) {
      var dayColWidth = _this.dayColWidth();

      var nearest = Math.round(y / dayColWidth);
      return _this.props.users[nearest];
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropOfEvent",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(event, newX, newY) {
        var newStartTime, newUser, onDropEvent, pass;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                newStartTime = _this.yToTime(newY);
                newUser = _this.xToUser(newX);
                onDropEvent = _this.props.onDropEvent;
                _context.t0 = onDropEvent;

                if (!_context.t0) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return onDropEvent(event, newStartTime, newUser);

              case 7:
                _context.t0 = _context.sent;

              case 8:
                pass = _context.t0;
                return _context.abrupt("return", pass);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDragOfEvent", function (event, dragDetails) {
      // update time
      var dragEventNode = dragDetails.dragEventNode;

      var time = _this.yToTime(parseFloat(dragEventNode.style.top));

      dragEventNode.querySelector('.time').innerHTML = time.format('h:mma');
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "placeAndSize", function () {
      var firstDayCol = _this.scrollInnerRef.current.querySelector('.bigcalendar__day-col');

      if (firstDayCol) {
        //size events
        var _this$props3 = _this.props,
            startDate = _this$props3.startDate,
            events = _this$props3.events;

        _this.eventsForDay(events, startDate).forEach(function (event) {
          _this.placeEvent(event);

          _this.sizeEvent(event);
        }); //size time line to show current time n' such


        _this.sizeTimeLine();

        _this.placeTimeLine();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dayColWidth", function () {
      var firstDayCol = _this.scrollInnerRef.current.querySelector('.bigcalendar__day-col');

      return _size.default.getWidth(firstDayCol);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dayColHeight", function () {
      var firstDayCol = _this.scrollInnerRef.current.querySelector('.bigcalendar__day-col');

      return _size.default.getHeight(firstDayCol);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "slotHeight", function () {
      var _this$props4 = _this.props,
          minTime = _this$props4.minTime,
          maxTime = _this$props4.maxTime;

      var range = _this.getTimeRangeDetails(minTime, maxTime);

      var dayColHeight = _this.dayColHeight();

      return dayColHeight / range.totalTimeSlots;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "eventsForDay", (0, _memoizeOne.default)(function (events, date) {
      var timezone = _this.props.timezone;
      return (0, _sortBy.default)(events.filter(function (event) {
        var eventStart = _momentTimezone.default.tz(event.startAt, timezone);

        return eventStart.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
      }), ['startAt']);
    }));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getColumnMap", function () {
      if (!_this._columnMapCache) {
        var _this$props5 = _this.props,
            minTime = _this$props5.minTime,
            maxTime = _this$props5.maxTime,
            startDate = _this$props5.startDate,
            events = _this$props5.events;

        var range = _this.getTimeRangeDetails(minTime, maxTime);

        var totalTimeSlots = range.totalTimeSlots;

        var slotHeight = _this.slotHeight();

        var endSlot = 0;

        var todaysEvents = _this.eventsForDay(events, startDate);

        _this._columnMapCache = {
          eventDetails: {}
        };
        todaysEvents.forEach(function (event) {
          var currentStart = (0, _momentTimezone.default)(event.startAt);
          var eventMap = [];
          var userId = event.userId;

          if (!_this._columnMapCache[userId]) {
            _this._columnMapCache[userId] = new Array(totalTimeSlots).fill(null);
          } // STEP 1, build event map (the eventId and busy/available for each timeslot)


          event.blocks.forEach(function (block) {
            var startY = _this.timeToY(currentStart);

            var blockStartSlot = Math.round(startY / slotHeight);
            var endAt = (0, _momentTimezone.default)(currentStart).add(block.durationSec, 'seconds');

            var endY = _this.timeToY(endAt);

            var blockEndSlot = Math.round(endY / slotHeight);

            for (var blockSlot = blockStartSlot; blockSlot < blockEndSlot; blockSlot++) {
              eventMap[blockSlot] = {
                eventId: event.id,
                busy: block.markAsBusy
              };
            }

            currentStart.add(block.durationSec, 'seconds');
            endSlot = blockEndSlot;
          }); // STEP 2, check which column this event can fit in

          var column = 0;
          var conflicts;

          do {
            conflicts = 0;
            eventMap.forEach(function (details, slot) {
              // make sure slot / column exists
              if (!_this._columnMapCache[userId][slot]) {
                _this._columnMapCache[userId][slot] = [];
              }

              if (!_this._columnMapCache[userId][slot][column]) {
                _this._columnMapCache[userId][slot][column] = {};
              }

              if (details.busy && _this._columnMapCache[userId][slot][column].busy) {
                conflicts++;
              }
            });

            if (conflicts > 0) {
              column += 1;
            }
          } while (conflicts > 0); // STEP 3, slot it in, tracking overlap


          var overlap = false;
          eventMap.forEach(function (details, slot) {
            if (_this._columnMapCache[userId][slot][column].busy === false) {
              overlap = true;
              _this._columnMapCache[userId][slot][column] = (0, _objectSpread2.default)({}, details, {
                overlapping: 1
              });
            } else {
              _this._columnMapCache[userId][slot][column] = details;
            }
          }); // STEP 4, track it for easy retrieval

          var eventStartY = _this.timeToY(event.startAt);

          var eventStartSlot = Math.round(eventStartY / slotHeight);
          _this._columnMapCache.eventDetails[event.id] = {
            startSlot: eventStartSlot,
            endSlot: endSlot,
            column: column,
            overlapping: overlap
          };
        }); // STEP 5, add additional data around each event to make sizing possible

        todaysEvents.forEach(function (event) {
          var details = _this._columnMapCache.eventDetails[event.id];
          var maxColumns = 0;
          var overlapped = false;

          for (var slot = details.startSlot; slot < details.endSlot; slot++) {
            overlapped = overlapped || _this._columnMapCache[event.userId][slot][details.column].eventId !== event.id;

            if (_this._columnMapCache[event.userId][slot][details.column].eventId === event.id && _this._columnMapCache[event.userId][slot][details.column].busy) {
              maxColumns = Math.max(maxColumns, _this._columnMapCache[event.userId][slot].filter(function (details) {
                return details.busy;
              }).length);
            }
          }

          _this._columnMapCache.eventDetails[event.id].columns = maxColumns;
          _this._columnMapCache.eventDetails[event.id].overlapped = overlapped;
        });
      }

      return _this._columnMapCache;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "placeEvent", function (event) {
      var users = _this.props.users;

      var eventNode = _this.dragGridRef.current.getEventNode(event);

      var userIndex = (0, _findIndex.default)(users, function (u) {
        return u.id === event.userId;
      });

      var dayColWidth = _this.dayColWidth();

      var dayColHeight = _this.dayColHeight();

      if (userIndex > -1 && dayColWidth && dayColHeight) {
        //left
        var left = userIndex * dayColWidth;
        eventNode.style.left = "".concat(left, "px"); //top

        var top = _this.timeToY(event.startAt);

        eventNode.style.top = "".concat(top, "px"); // show the event (if it was even hidden)

        eventNode.style.display = 'block';
      } else {
        //hide the event if it does not belong to a teammate
        eventNode.style.display = 'none';
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "sizeEvent", function (event) {
      var users = _this.props.users;
      var userIndex = (0, _findIndex.default)(users, function (u) {
        return u.id === event.userId;
      });

      var dayColWidth = _this.dayColWidth();

      var dayColHeight = _this.dayColHeight();

      if (userIndex > -1 && dayColWidth && dayColHeight) {
        var _this$props6 = _this.props,
            minTime = _this$props6.minTime,
            maxTime = _this$props6.maxTime,
            eventRightMargin = _this$props6.eventRightMargin;

        var eventNode = _this.dragGridRef.current.getEventNode(event); //height for blocks


        var blockNodes = eventNode.querySelectorAll('.bigcalendar__event-block');

        var dayColTimeRangeDetails = _this.getTimeRangeDetails(minTime, maxTime);

        event.blocks.forEach(function (block, idx) {
          var height = block.durationSec / dayColTimeRangeDetails.seconds * dayColHeight;
          var node = blockNodes[idx];
          node.style.height = "".concat(height, "px");
        });

        if (event.id !== 'dragging') {
          var colMap = _this.getColumnMap();

          var details = colMap.eventDetails[event.id];
          console.log({
            colMap: colMap,
            details: details
          });
          var width = dayColWidth / details.columns;
          var leftIndent = width * details.column;

          if (details.overlapped) {
            width -= eventRightMargin * 2;
          } else if (details.overlapping) {
            width -= eventRightMargin * 2;
            leftIndent += eventRightMargin;
          } else if (details.column === details.columns - 1) {
            width -= eventRightMargin;
          }

          eventNode.style.width = width + 'px';
          eventNode.style.marginLeft = leftIndent + 'px';
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "sizeTimeLine", function () {
      var timeLineNode = _this.scrollInnerRef.current.querySelector('.bigcalendar__time-line');

      var pageWidth = _this.dragGridRef.current.getScrollWidth();

      timeLineNode.style.width = "".concat(pageWidth, "px");
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "placeTimeLine", function () {
      var timezone = _this.props.timezone;

      var now = _momentTimezone.default.tz(new Date(), timezone);

      var top = _this.timeToY(now);

      var timeLineNode = _this.scrollInnerRef.current.querySelector('.bigcalendar__time-line');

      timeLineNode.style.top = "".concat(top, "px");
    });
    _this.dragGridRef = _react.default.createRef();
    _this.scrollInnerRef = _react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(Day, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props7 = this.props,
          events = _this$props7.events,
          startDate = _this$props7.startDate;

      if (prevProps.events !== events || prevProps.startDate !== startDate) {
        // reset all event cache
        this._columnMapCache = null;
        this.placeAndSize();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          users = _this$props8.users,
          hours = _this$props8.hours,
          timezone = _this$props8.timezone,
          calendarBodyHeight = _this$props8.calendarBodyHeight,
          minTime = _this$props8.minTime,
          maxTime = _this$props8.maxTime,
          slotsPerHour = _this$props8.slotsPerHour,
          startTime = _this$props8.startTime,
          endTime = _this$props8.endTime,
          startDate = _this$props8.startDate,
          events = _this$props8.events;
      var _this$state = this.state,
          scrollTop = _this$state.scrollTop,
          scrollLeft = _this$state.scrollLeft;
      return _react.default.createElement("div", {
        className: "bigcalendar__view-day"
      }, _react.default.createElement("div", {
        className: "bigcalendar__user-header"
      }, _react.default.createElement(_TeammateHeader.default, {
        onMouseDown: this.handleViewMouseDown,
        onScroll: this.handleTeammateScroll,
        scrollLeft: scrollLeft,
        users: users
      })), _react.default.createElement("div", {
        className: "bigcalendar__body-wrapper"
      }, _react.default.createElement(_TimeGutter.default, {
        hours: hours,
        calendarBodyHeight: calendarBodyHeight,
        scrollTop: scrollTop,
        onMouseDown: this.handleViewMouseDown
      }), _react.default.createElement(_DragGrid.default, {
        snapEventToNearestValidX: this.snapEventToNearestValidX,
        snapEventToNearestValidY: this.snapEventToNearestValidY,
        onScroll: this.handleScroll,
        ref: this.dragGridRef,
        events: this.eventsForDay(events, startDate),
        sizeEvent: this.sizeEvent,
        timezone: timezone,
        onDragEvent: this.handleDragOfEvent,
        onDropEvent: this.handleDropOfEvent,
        style: {
          height: calendarBodyHeight
        }
      }, _react.default.createElement("div", {
        className: "scroll-inner",
        ref: this.scrollInnerRef
      }, users.map(function (user) {
        return _react.default.createElement(_DayCol.default, {
          date: startDate,
          slotsPerHour: slotsPerHour,
          key: "day-col-".concat(user.id),
          hours: hours,
          user: user,
          startTime: startTime,
          endTime: endTime,
          minTime: minTime,
          maxTime: maxTime,
          timezone: timezone
        });
      }), _react.default.createElement(_TimeLine.default, null)))));
    }
  }]);
  return Day;
}(_react.Component);

(0, _defineProperty2.default)(Day, "defaultProps", {
  dragThreshold: 10,
  scrollDuringDragMargin: 50,
  dragScrollSpeed: 5,
  eventRightMargin: 10
});
var _default = Day;
exports.default = _default;