"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _EventDetails = _interopRequireDefault(require("../../components/EventDetails/EventDetails"));

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {});
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
      _this.teammateHeaderRef.current.domNodeRef.current.scrollLeft = scrollLeft;
      _this.timeGutterRef.current.domNodeRef.current.scrollTop = scrollTop; // // arrows that sit in the upper right
      // this.updateHorizontalPagerDetails()

      if (_this._lastDragDetails) {
        _this.handleDragOfEvent(_this._lastDragDetails.event, _this._lastDragDetails.dragDetails);
      }
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "snapEventToNearestValidX", function (_ref) {
      var mouseX = _ref.mouseX;

      var dayColWidth = _this.dayColWidth();

      var nearest = Math.floor(mouseX / dayColWidth);
      return Math.max(0, Math.min(_this.props.users.length - 1, nearest) * dayColWidth);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "snapEventToNearestValidY", function (_ref2) {
      var dragNodeTop = _ref2.dragNodeTop,
          _ref2$dragNodeHeight = _ref2.dragNodeHeight,
          dragNodeHeight = _ref2$dragNodeHeight === void 0 ? 0 : _ref2$dragNodeHeight;

      var slotHeight = _this.slotHeight();

      var nearest = Math.round(dragNodeTop / slotHeight);
      var maxTop = _this.dayColHeight() - dragNodeHeight;
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "heightToSeconds", function (height) {
      var range = _this.getTimeRangeDetails(_this.props.minTime, _this.props.maxTime);

      var dayColHeight = _this.dayColHeight();

      var ratio = height / dayColHeight;
      return range.seconds * ratio;
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getDragNode", function (_ref3) {
      var event = _ref3.event,
          block = _ref3.block,
          blockIdx = _ref3.blockIdx,
          dragEventNode = _ref3.dragEventNode,
          dragBlockNode = _ref3.dragBlockNode;
      return blockIdx === 0 ? dragEventNode : dragBlockNode;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDownOnView", function (e) {
      if (!e.target.classList.contains('hour-block')) {
        return false;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDownOnEvent", function (_ref4) {
      var e = _ref4.e,
          event = _ref4.event,
          block = _ref4.block,
          blockIdx = _ref4.blockIdx;
      var response = {
        e: e,
        event: event,
        block: block,
        blockIdx: blockIdx
      };
      var target = e.target; // if we clicked an available block, find any events under us to see if
      // we should pass the click to them

      if (!block.markAsBusy) {
        var matches = _this.dragGridRef.current.getEventsAtLocation({
          x: e.clientX,
          y: e.clientY
        }); // the first one would actually match the event passed here
        // so lets check the first event under us


        matches.shift(); //filter out non busy (available) blocks

        matches = matches.filter(function (match) {
          return match.block.markAsBusy;
        });

        if (matches.length > 0) {
          response.event = matches[0].event;
          response.block = matches[0].block;
          response.blockIdx = matches[0].blockIdx;
          var resize = matches[0].resize;

          if (resize) {
            var eventNode = _this.dragGridRef.current.getEventNode(matches[0].event);

            target = eventNode.querySelector(".".concat(resize.direction));
          }
        } // ignore the click entirely so it gets passed onto the drag grid view
        else {
            return false;
          }
      } // did we click a resize handle? if so, lets set up for that


      if (target.classList.contains('resize-handle')) {
        _this._resizeDetails = {
          e: e,
          event: response.event,
          block: response.block,
          blockIdx: response.blockIdx,
          direction: target.classList.contains('resize-n') ? 'n' : 's'
        };
      }

      _this._scrollStartingPosition = {
        left: _this.dragGridRef.current.getScrollLeft(),
        top: _this.dragGridRef.current.getScrollTop()
      };
      return response;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropEvent",
    /*#__PURE__*/
    function () {
      var _ref5 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(event, newX, newY) {
        var dragDetails, resizeDetails, newStartTime, newUser, onDropEvent;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // reset some things
                dragDetails = _this._dragDetails || {};
                resizeDetails = _this._resizeDetails || {};
                _this._dragDetails = null;
                _this._resizeDetails = null;
                _this._lastDragDetails = null;
                newStartTime = dragDetails.newStartAt || resizeDetails.newStartAt || _this.yToTime(newY);
                newUser = _this.xToUser(newX);
                onDropEvent = _this.props.onDropEvent;
                return _context.abrupt("return", onDropEvent && onDropEvent((0, _objectSpread2.default)({
                  event: event,
                  newStartAt: newStartTime,
                  newUser: newUser && newUser.id !== event.userId ? newUser : null
                }, dragDetails, resizeDetails)));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3) {
        return _ref5.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDragOfEvent", function (event, dragDetails) {
      // if anything is selected, null it
      if (_this.state.selectedEvent) {
        _this.setState({
          selectedEvent: null
        });
      }

      var _this$props3 = _this.props,
          onDragEvent = _this$props3.onDragEvent,
          timezone = _this$props3.timezone;
      var dragEventNode = dragDetails.dragEventNode,
          blockIdx = dragDetails.blockIdx,
          sourceEventNode = dragDetails.sourceEventNode; // to track the cancelling of drag grid moving the event for us

      var cancelDrag = false;

      if (_this._resizeDetails) {
        cancelDrag = true;
        var startingScrollTop = _this._scrollStartingPosition.top;
        var deltaScrollTop = _this.dragGridRef.current.getScrollTop() - startingScrollTop;
        var dragBlockNode = dragDetails.dragBlockNode,
            eMouseMove = dragDetails.eMouseMove,
            eMouseDown = dragDetails.eMouseDown,
            _blockIdx = dragDetails.blockIdx,
            sourceBlockNode = dragDetails.sourceBlockNode;
        var dragDistance = eMouseMove.clientY + deltaScrollTop - eMouseDown.clientY;

        var originalHeight = _size.default.getHeight(sourceBlockNode);

        var slotHeight = _this.slotHeight();

        var originalTop = parseFloat(sourceEventNode.style.top);
        var direction = _this._resizeDetails.direction;
        var resizeDetails = (0, _objectSpread2.default)({}, _this._resizeDetails, {
          blockUpdates: [] // drag always changes the height of the selected block, so lets set the height
          // callout that height is set differently deppending on drag direction
          // also, when dragging north, we should not be able to drag more than the height
          // of the previous block (if there is one)

        });

        var distance = _this.snapEventToNearestValidY({
          dragNodeTop: Math.abs(dragDistance)
        });

        if (dragDistance < 0) {
          distance *= -1;
        } // clamp distance


        if (direction === 'n' && _blockIdx > 0) {
          distance = Math.max(distance, _size.default.getHeight(sourceBlockNode.previousSibling) * -1);
        } else if (direction === 'n') {
          // so it won't go too far up
          distance = Math.max(distance, originalTop * -1); // so it won't go too far down

          distance = Math.min(distance, originalHeight - slotHeight);
        } else if (direction === 's') {
          distance = Math.min(distance, _this.dayColHeight() - _size.default.getLocalBottom(sourceEventNode));
        }

        var height = originalHeight;

        if (direction === 's') {
          height += distance;
        } else {
          height -= distance;
        }

        height = Math.max(slotHeight, height);
        dragBlockNode.style.height = parseInt(height) + 'px';
        resizeDetails.blockUpdates.push({
          blockIdx: _blockIdx,
          newDurationSec: _this.heightToSeconds(height)
        }); // if we are resizing the first block north, we actually need to
        // move the whole event up and adjust the start time

        if (_blockIdx > 0 && direction === 'n') {
          var previousDragBlock = dragBlockNode.previousSibling;
          var previousSourceBlock = sourceBlockNode.previousSibling;

          var previousHeight = _size.default.getHeight(previousSourceBlock);

          var _height = previousHeight + distance; // can't go too big or it starts to feel like dragging a block down


          _height = Math.min(_height, originalHeight + previousHeight - slotHeight);
          previousDragBlock.style.height = parseInt(_height) + 'px';
          resizeDetails.blockUpdates.push({
            blockIdx: _blockIdx - 1,
            newDurationSec: _this.heightToSeconds(_height)
          });
        } // don't resize this block if we're dragging north and we're the first block
        //if we are the first block, we have to move the whole event up the inverse
        //of the change in the height of the block
        else if (_blockIdx === 0 && direction === 'n') {
            var newTop = originalTop + distance;
            dragEventNode.style.top = "".concat(newTop, "px");

            var deltaSeconds = _this.heightToSeconds(distance * -1);

            var newStartAt = _momentTimezone.default.tz(event.startAt, timezone).subtract(deltaSeconds, 'seconds');

            resizeDetails.newStartAt = newStartAt;
            dragEventNode.querySelector('.time').innerHTML = newStartAt.format('h:mma');
          }

        _this._resizeDetails = resizeDetails;
      } // dragging an event is peasy peezy (drag grid handles it)
      // we'll just make some day view only updates
      else if (blockIdx === 0) {
          var time = _this.yToTime(parseFloat(dragEventNode.style.top));

          dragEventNode.querySelector('.time').innerHTML = time.format('h:mma');
          _this._didDragEvent = true;
        } //dragging a block means changing duration of the block ahead of it
        //drag grid cannot handle this
        else {
            cancelDrag = true;
            var _sourceBlockNode = dragDetails.sourceBlockNode,
                _dragBlockNode = dragDetails.dragBlockNode,
                _eMouseMove = dragDetails.eMouseMove,
                _eMouseDown = dragDetails.eMouseDown;
            var previousSourceBlockNode = _sourceBlockNode.previousSibling;
            var _previousDragBlock = _dragBlockNode.previousSibling;

            var _dragDistance = _eMouseMove.clientY - _eMouseDown.clientY;

            var _originalHeight = _size.default.getHeight(previousSourceBlockNode);

            var maxDistance = _this.dayColHeight() - _size.default.getLocalBottom(sourceEventNode);

            var _distance = Math.min(_dragDistance, maxDistance);

            var newHeight = Math.max(0, _this.snapEventToNearestValidY({
              dragNodeTop: _originalHeight + _distance
            }));
            _previousDragBlock.style.height = parseInt(newHeight) + 'px';

            var duration = _this.heightToSeconds(newHeight);

            _this._dragDetails = {
              blockUpdates: [{
                blockIdx: blockIdx - 1,
                newDurationSec: duration
              }]
            };
          } // we ask drag grid to only move the dom node if we are moving the whole event (block 0)
      // all other drags are ignored


      _this._lastDragDetails = {
        event: event,
        dragDetails: dragDetails
      };
      return onDragEvent ? onDragEvent(event, dragDetails) : !cancelDrag;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSelectEvent",
    /*#__PURE__*/
    function () {
      var _ref7 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_ref6) {
        var event, block, blockIdx, eventNode, detailsNode, detailsWidth, gridWidth, eventRight, eventLeft, detailsRight, top;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event = _ref6.event, block = _ref6.block, blockIdx = _ref6.blockIdx;

                if (!event.details) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 4;
                return _this.setState({
                  selectedEvent: event
                });

              case 4:
                // place details next to event
                eventNode = _this.dragGridRef.current.getEventNode(event);
                detailsNode = _this.dragGridRef.current.domNodeRef.current.querySelector('.event-details');
                detailsWidth = _size.default.getWidth(detailsNode);
                gridWidth = _this.dragGridRef.current.getWidth();
                eventRight = _size.default.getLocalRight(eventNode);
                eventLeft = _size.default.getLocalLeft(eventNode);
                detailsRight = eventRight + detailsWidth;
                top = _size.default.getLocalTop(eventNode);
                detailsNode.style.top = "".concat(top, "px");

                if (detailsRight > gridWidth) {
                  detailsNode.style.left = "".concat(eventLeft - detailsWidth, "px");
                } else {
                  detailsNode.style.left = "".concat(eventRight, "px");
                }

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x4) {
        return _ref7.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDeselectEvent", function () {
      _this.setState({
        selectedEvent: null
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleHighlightEvent",
    /*#__PURE__*/
    function () {
      var _ref9 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(_ref8) {
        var event, block, blockIdx;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                event = _ref8.event, block = _ref8.block, blockIdx = _ref8.blockIdx;

                _this.setState({
                  highlightedEventAndBlock: {
                    event: event,
                    block: block,
                    blockIdx: blockIdx
                  }
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x5) {
        return _ref9.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleUnHighlightEvent", function () {
      _this.setState({
        highlightedEventAndBlock: null
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleCloseEventDetails", function () {
      _this.handleDeselectEvent();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "placeAndSize", function () {
      var firstDayCol = _this.scrollInnerRef.current.querySelector('.bigcalendar__day-col');

      if (firstDayCol) {
        //size events
        var _this$props4 = _this.props,
            startDate = _this$props4.startDate,
            events = _this$props4.events;

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
      var _this$props5 = _this.props,
          minTime = _this$props5.minTime,
          maxTime = _this$props5.maxTime;

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isToday", function (date) {
      return _this.props.startDate.format('YYYY-MM-DD') === _momentTimezone.default.tz(date, _this.props.timezone).format('YYYY-MM-DD');
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getColumnMap", function () {
      if (!_this._columnMapCache) {
        var _this$props6 = _this.props,
            minTime = _this$props6.minTime,
            maxTime = _this$props6.maxTime,
            startDate = _this$props6.startDate,
            events = _this$props6.events;

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

          _this._columnMapCache.eventDetails[event.id].columns = Math.max(maxColumns, _this._columnMapCache.eventDetails[event.id].column + 1);
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
        var _this$props7 = _this.props,
            minTime = _this$props7.minTime,
            maxTime = _this$props7.maxTime,
            eventRightMargin = _this$props7.eventRightMargin;

        var eventNode = _this.dragGridRef.current.getEventNode(event); //height for blocks


        var blockNodes = eventNode.querySelectorAll('.bigcalendar__event-block');

        var dayColTimeRangeDetails = _this.getTimeRangeDetails(minTime, maxTime);

        event.blocks.forEach(function (block, idx) {
          var height = block.durationSec / dayColTimeRangeDetails.seconds * dayColHeight;
          var node = blockNodes[idx];
          node.style.height = "".concat(parseInt(height), "px");
        });

        if (event.id !== 'dragging') {
          var colMap = _this.getColumnMap();

          var details = colMap.eventDetails[event.id];
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

      if (timeLineNode) {
        var pageWidth = _this.dragGridRef.current.getScrollWidth();

        timeLineNode.style.width = "".concat(pageWidth, "px");
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "placeTimeLine", function () {
      var timeLineNode = _this.scrollInnerRef.current.querySelector('.bigcalendar__time-line');

      if (timeLineNode) {
        var timezone = _this.props.timezone;

        var now = _momentTimezone.default.tz(new Date(), timezone);

        var top = _this.timeToY(now);

        timeLineNode.style.top = "".concat(top, "px");
      }
    });
    _this.dragGridRef = _react.default.createRef();
    _this.scrollInnerRef = _react.default.createRef();
    _this.teammateHeaderRef = _react.default.createRef();
    _this.timeGutterRef = _react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(Day, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props8 = this.props,
          events = _this$props8.events,
          startDate = _this$props8.startDate;

      if (prevProps.events !== events || prevProps.startDate !== startDate) {
        // reset all event cache
        this._columnMapCache = null;
        this.placeAndSize();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props9 = this.props,
          users = _this$props9.users,
          hours = _this$props9.hours,
          timezone = _this$props9.timezone,
          calendarBodyHeight = _this$props9.calendarBodyHeight,
          minTime = _this$props9.minTime,
          maxTime = _this$props9.maxTime,
          slotsPerHour = _this$props9.slotsPerHour,
          startTime = _this$props9.startTime,
          endTime = _this$props9.endTime,
          startDate = _this$props9.startDate,
          events = _this$props9.events;
      var _this$state = this.state,
          selectedEvent = _this$state.selectedEvent,
          highlightedEventAndBlock = _this$state.highlightedEventAndBlock;
      console.log('render');
      var eventDetails = null;

      if (selectedEvent && selectedEvent.details) {
        eventDetails = (0, _objectSpread2.default)({}, selectedEvent.details);
        eventDetails.header = eventDetails.header || {};
        eventDetails.header.onClickClose = this.handleCloseEventDetails;
      }

      return _react.default.createElement("div", {
        className: (0, _classnames.default)('bigcalendar__view-day', {
          'has-selected-event': !!selectedEvent,
          'has-highlighted-event': !!highlightedEventAndBlock
        })
      }, _react.default.createElement("div", {
        className: "bigcalendar__user-header"
      }, _react.default.createElement(_TeammateHeader.default, {
        onMouseDown: this.handleViewMouseDown,
        onScroll: this.handleTeammateScroll,
        users: users,
        ref: this.teammateHeaderRef
      })), _react.default.createElement("div", {
        className: "bigcalendar__body-wrapper"
      }, _react.default.createElement(_TimeGutter.default, {
        hours: hours,
        calendarBodyHeight: calendarBodyHeight,
        onMouseDown: this.handleViewMouseDown,
        ref: this.timeGutterRef
      }), _react.default.createElement(_DragGrid.default, {
        onMouseDownOnView: this.handleMouseDownOnView,
        onSelectEvent: this.handleSelectEvent,
        onDeselectEvent: this.handleDeselectEvent,
        onHighlightEvent: this.handleHighlightEvent,
        onUnHighlightEvent: this.handleUnHighlightEvent,
        onMouseDownOnEvent: this.handleMouseDownOnEvent,
        getDragNode: this.getDragNode,
        snapEventToNearestValidX: this.snapEventToNearestValidX,
        snapEventToNearestValidY: this.snapEventToNearestValidY,
        onScroll: this.handleScroll,
        ref: this.dragGridRef,
        selectedEvent: selectedEvent,
        highlightedEventAndBlock: highlightedEventAndBlock,
        events: this.eventsForDay(events, startDate),
        sizeEvent: this.sizeEvent,
        timezone: timezone,
        onDragEvent: this.handleDragOfEvent,
        onDropEvent: this.handleDropEvent,
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
      }), this.isToday() && _react.default.createElement(_TimeLine.default, null)), eventDetails && _react.default.createElement(_EventDetails.default, eventDetails))));
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