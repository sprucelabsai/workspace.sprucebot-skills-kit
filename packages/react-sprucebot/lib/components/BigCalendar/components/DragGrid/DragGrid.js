"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _es6Tween = require("es6-tween");

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _indexOf = _interopRequireDefault(require("lodash/indexOf"));

var _Event = _interopRequireDefault(require("../Event/Event"));

var _size = _interopRequireDefault(require("../../utils/size"));

var _event = _interopRequireDefault(require("../../utils/event"));

var DragGrid =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DragGrid, _Component);

  function DragGrid(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DragGrid);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DragGrid).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      scrollLeft: 0,
      scrollTop: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getEventNode", function (event) {
      return _this.domNodeRef.current.querySelector("[data-event-id='".concat(event.id, "']"));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getBlockNode", function (event, blockIdx) {
      return _this.domNodeRef.current.querySelectorAll("[data-event-id='".concat(event.id, "'] .bigcalendar__event-block"))[blockIdx];
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getScrollLeft", function () {
      return _this.domNodeRef.current.scrollLeft;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getScrollTop", function () {
      return _this.domNodeRef.current.scrollTop;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setScrollTop", function (top) {
      _this.domNodeRef.current.scrollTop = top;
      return (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setScrollLeft", function (left) {
      _this.domNodeRef.current.scrollLeft = left;
      return (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getWidth", function () {
      return _size.default.getWidth(_this.domNodeRef.current);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getScrollWidth", function () {
      return _size.default.getScrollWidth(_this.domNodeRef.current);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isScrolledAllTheWayRight", function () {
      return _size.default.isScrolledAllTheWayRight(_this.domNodeRef.current);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isScrolledAllTheWayLeft", function () {
      return _size.default.isScrolledAllTheWayLeft(_this.domNodeRef.current);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "animateHorizontalTo", function (left) {
      var scrollLeft = _this.getScrollLeft();

      _this._activeTween = new _es6Tween.Tween({
        scrollLeft: scrollLeft
      }).to({
        scrollLeft: left
      }, 500).easing(_es6Tween.Easing.Quintic.Out).on('update', function (_ref) {
        var scrollLeft = _ref.scrollLeft;

        _this.setScrollLeft(scrollLeft);
      });

      _this._activeTween.start();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleScroll", function (e) {
      var target = e.target;
      var onScroll = _this.props.onScroll;
      onScroll && onScroll(e); // keep event under mouse as scroll

      if (_this._activeDrag && _this._handleDragOnScroll) {
        _this.handleDragOfEvent(_this._activeDrag.eMouseMove, false);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDownOnView", function (e) {
      var _eventUtil$clientXY = _event.default.clientXY(e),
          clientX = _eventUtil$clientXY.clientX,
          clientY = _eventUtil$clientXY.clientY;

      var _this$props$onMouseDo = _this.props.onMouseDownOnView,
          onMouseDownOnView = _this$props$onMouseDo === void 0 ? function () {
        return true;
      } : _this$props$onMouseDo;

      if (onMouseDownOnView(e) === false) {
        return false;
      }

      _this._dragOffset = {
        startingScrollLeft: _this.getScrollLeft(),
        startingScrollTop: _this.getScrollTop(),
        startingClientX: clientX,
        startingClientY: clientY
      };
      console.log('mouse down in view');
      e.preventDefault();
      window.addEventListener('mousemove', _this.handleMouseDragOfView, {
        passive: false
      });
      window.addEventListener('mouseup', _this.handleMouseUpFromView);
      return true;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDragOfView", function (e) {
      var _eventUtil$clientXY2 = _event.default.clientXY(e),
          clientX = _eventUtil$clientXY2.clientX,
          clientY = _eventUtil$clientXY2.clientY;

      var _this$_dragOffset = _this._dragOffset,
          startingClientX = _this$_dragOffset.startingClientX,
          startingClientY = _this$_dragOffset.startingClientY,
          startingScrollLeft = _this$_dragOffset.startingScrollLeft,
          startingScrollTop = _this$_dragOffset.startingScrollTop;
      var deltaLeft = clientX - startingClientX;
      var deltaTop = clientY - startingClientY;
      _this.domNodeRef.current.scrollLeft = startingScrollLeft - deltaLeft;
      _this.domNodeRef.current.scrollTop = startingScrollTop - deltaTop;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTouchStartOnView", function (e) {
      console.log('touch start on view');

      if (_this.handleMouseDownOnView(e) !== false) {
        window.addEventListener('touchend', _this.handleTouchEndOnView, {
          passive: false
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTouchEndOnView", function (e) {
      console.log('touch end on view');

      _this.handleMouseUpFromView(e);

      window.removeEventListener('touchend', _this.handleTouchEndOnView);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getEventsAtLocation", function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      var matches = document.elementsFromPoint(x, y);
      var blockNodes = matches.filter(function (node) {
        return node.classList.contains('bigcalendar__event-block');
      });
      var resizes = [false].concat((0, _toConsumableArray2.default)(matches.filter(function (node) {
        return node.classList.contains('resize-handle');
      }))).map(function (match) {
        if (match) {
          return {
            direction: match.className.split(' ')[0]
          };
        }
      });
      var events = blockNodes.map(function (blockNode, idx) {
        var eventNode = blockNode.parentNode;
        var eventId = eventNode.dataset.eventId;

        var event = _this.props.events.find(function (event) {
          return event.id === eventId;
        });

        var blockIdx = (0, _toConsumableArray2.default)(eventNode.children).indexOf(blockNode);
        var block = event.blocks[blockIdx];
        return {
          event: event,
          block: block,
          blockIdx: blockIdx,
          resize: resizes[idx]
        };
      });
      return events;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDownOnEvent", function (_ref3) {
      var e = _ref3.e,
          event = _ref3.event,
          block = _ref3.block,
          blockIdx = _ref3.blockIdx,
          _ref3$stopEvent = _ref3.stopEvent,
          stopEvent = _ref3$stopEvent === void 0 ? true : _ref3$stopEvent,
          _ref3$setListeners = _ref3.setListeners,
          setListeners = _ref3$setListeners === void 0 ? true : _ref3$setListeners;
      var _this$props$onMouseDo2 = _this.props.onMouseDownOnEvent,
          onMouseDownOnEvent = _this$props$onMouseDo2 === void 0 ? function (args) {
        return blockIdx === 0 ? args : false;
      } : _this$props$onMouseDo2;
      var results = onMouseDownOnEvent({
        e: e,
        event: event,
        block: block,
        blockIdx: blockIdx
      });

      if (results) {
        stopEvent && e.preventDefault();
        stopEvent && e.stopPropagation();
        _this._pendingDrag = results;

        var _eventUtil$clientXY3 = _event.default.clientXY(e),
            clientX = _eventUtil$clientXY3.clientX,
            clientY = _eventUtil$clientXY3.clientY;

        _this._startingDragPoint = {
          x: clientX,
          y: clientY
        };
        setListeners && window.addEventListener('mousemove', _this.handleDragOfEvent, {
          passive: false
        });
        setListeners && window.addEventListener('mouseup', _this.handleMouseUpFromEvent, {
          passive: false
        });
      }

      return results !== false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTouchStartOnEvent", function (_ref4) {
      var e = _ref4.e,
          event = _ref4.event,
          block = _ref4.block,
          blockIdx = _ref4.blockIdx;
      clearTimeout(_this._longPressTimeout);
      window.addEventListener('touchend', _this.handleTouchEndOnEvent);
      window.addEventListener('touchmove', _this.handleTouchDragOfEvent, {
        passive: false
      });
      e.persist();
      e.preventDefault();
      e.stopPropagation();
      _this._pendingTouch = {
        e: e,
        event: event,
        block: block,
        blockIdx: blockIdx
      };
      _this._longPressTimeout = setTimeout(function () {
        _this._longPressTimeout = false;

        _this.handleLongPressOnEvent({
          e: e,
          event: event,
          block: block,
          blockIdx: blockIdx
        });
      }, 200);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTouchStartOnDragEvent", function (_ref5) {
      var e = _ref5.e,
          event = _ref5.event,
          block = _ref5.block,
          blockIdx = _ref5.blockIdx;
      window.addEventListener('touchend', _this.handleTouchEndOnEvent);
      window.addEventListener('touchmove', _this.handleTouchDragOfEvent, {
        passive: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTouchEndOnEvent", function (e) {
      // we did not successfully long press, simulate all mouse events hurry
      if (_this._longPressTimeout) {
        clearInterval(_this._longPressTimeout);
        var args = _this._pendingTouch; //start by simulating mouse down

        _this.handleMouseDownOnEvent((0, _objectSpread2.default)({}, args, {
          setListeners: false,
          stopEvent: false
        }));

        _this.handleMouseUpFromEvent(_this._pendingTouch.e);
      } else if (_this._touchDragging) {
        _this._touchDragging = false;
        var _this$props = _this.props,
            highlightedEventAndBlock = _this$props.highlightedEventAndBlock,
            onUnHighlightEvent = _this$props.onUnHighlightEvent; // if we have actually moved the drag node, drop it and be done with drag/resize

        _this.handleDropEvent();

        if (highlightedEventAndBlock && onUnHighlightEvent) {
          onUnHighlightEvent();
        }
      }

      window.removeEventListener('touchmove', _this.handleTouchDragOfEvent);
      window.removeEventListener('touchend', _this.handleTouchEndOnEvent);
      _this.domNodeRef.current.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      e.preventDefault();
      e.stopPropagation();
      _this._handleDragOnScroll = false;
      _this._pendingTouch = null;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleLongPressOnEvent", function (_ref6) {
      var e = _ref6.e,
          event = _ref6.event,
          block = _ref6.block,
          blockIdx = _ref6.blockIdx;
      var _this$props$onHighlig = _this.props.onHighlightEvent,
          onHighlightEvent = _this$props$onHighlig === void 0 ? function () {
        return true;
      } : _this$props$onHighlig;

      if (onHighlightEvent({
        e: e,
        event: event,
        block: block,
        blockIdx: blockIdx
      }) !== false) {
        _this.startDragOfEvent({
          e: e,
          event: event,
          block: block,
          blockIdx: blockIdx
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "beginScrollHorizontally", function (speed) {
      if (_this._scrollHorizontalSpeed !== speed) {
        clearInterval(_this._scrollHorizontalInterval);
        _this._scrollHorizontalSpeed = speed;
        _this._scrollHorizontalInterval = setInterval(function () {
          _this.domNodeRef.current.scrollLeft += speed;
        }, 10);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "stopScrollingHorizontally", function () {
      _this._scrollHorizontalSpeed = 0;
      clearInterval(_this._scrollHorizontalInterval);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "beginScrollingVertically", function (speed) {
      if (_this._scrollVerticalSpeed !== speed) {
        clearInterval(_this._scrollVerticalInterval);
        _this._scrollVerticalSpeed = speed;
        _this._scrollVerticalInterval = setInterval(function () {
          _this.domNodeRef.current.scrollTop += speed;
        }, 10);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "stopScrollingVertically", function () {
      _this._scrollVerticalSpeed = 0;
      clearInterval(_this._scrollVerticalInterval);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTouchDragOfEvent", function (e) {
      clearTimeout(_this._longPressTimeout);
      _this._longPressTimeout = false;

      if (_this._activeDrag) {
        if (_this.domNodeRef.current.style.overflow !== 'hidden') {
          _this.domNodeRef.current.style.overflow = 'hidden';
          document.body.style.webkitTouchCallout = 'none';
          document.body.style.webkitUserSelect = 'none';
          document.body.style.overflow = 'hidden';
          _this._touchDragging = true;
        }

        _this.handleDragOfEvent(e);

        e.preventDefault();
        e.stopPropagation();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDragOfEvent", function (e) {
      var autoScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var dragEvent = _this.state.dragEvent;

      if (dragEvent) {
        var _eventUtil$clientXY4 = _event.default.clientXY(e),
            clientX = _eventUtil$clientXY4.clientX,
            clientY = _eventUtil$clientXY4.clientY;

        var _this$props2 = _this.props,
            scrollDuringDragMargin = _this$props2.scrollDuringDragMargin,
            dragScrollSpeed = _this$props2.dragScrollSpeed,
            onDragEvent = _this$props2.onDragEvent;
        var _this$_activeDrag = _this._activeDrag,
            offsetX = _this$_activeDrag.offsetX,
            offsetY = _this$_activeDrag.offsetY,
            wrapperLeft = _this$_activeDrag.wrapperLeft,
            wrapperTop = _this$_activeDrag.wrapperTop,
            dragNodeHeight = _this$_activeDrag.dragNodeHeight,
            sourceEvent = _this$_activeDrag.sourceEvent,
            dragNode = _this$_activeDrag.dragNode; //if we are close to an edge, lets scroll that first

        var normalizedClientX = clientX - wrapperLeft;
        var normalizedClientY = clientY - wrapperTop;

        var wrapperRight = _size.default.getRight(_this.domNodeRef.current);

        var wrapperBottom = _size.default.getBottom(_this.domNodeRef.current); // scroll in any direction depending on if you're under the scrollDuringDragMargin


        if (autoScroll) {
          if (clientX >= wrapperRight - scrollDuringDragMargin) {
            _this.beginScrollHorizontally(dragScrollSpeed);
          } else if (clientX <= wrapperLeft + scrollDuringDragMargin) {
            _this.beginScrollHorizontally(-dragScrollSpeed);
          } else {
            _this.stopScrollingHorizontally();
          }

          if (clientY >= wrapperBottom - scrollDuringDragMargin) {
            _this.beginScrollingVertically(dragScrollSpeed);
          } else if (clientY <= wrapperTop + scrollDuringDragMargin) {
            _this.beginScrollingVertically(-dragScrollSpeed);
          } else {
            _this.stopScrollingVertically();
          }
        }

        var scrollTop = _this.domNodeRef.current.scrollTop;
        var scrollLeft = _this.domNodeRef.current.scrollLeft;
        var snapProps = {
          dragNodeLeft: normalizedClientX + scrollLeft - offsetX,
          dragNodeTop: normalizedClientY + scrollTop - offsetY,
          mouseX: normalizedClientX + scrollLeft,
          mouseY: normalizedClientY + scrollTop,
          dragEvent: dragEvent,
          dragNodeHeight: dragNodeHeight,
          sourceEvent: sourceEvent
        };

        var x = _this.props.snapEventToNearestValidX(snapProps);

        var y = _this.props.snapEventToNearestValidY(snapProps); //track last event


        _this._activeDrag.eMouseMove = e; // let parent components know and have the opportunity to ignore this drag

        var ignoreDrag = onDragEvent && onDragEvent(sourceEvent, _this._activeDrag);

        if (ignoreDrag !== false) {
          // update position
          dragNode.style.left = x + 'px';
          dragNode.style.top = y + 'px';
        }
      } // we have not actually started dragging yet, so we check how far we've moved from click
      else {
          var _eventUtil$clientXY5 = _event.default.clientXY(e),
              _clientX = _eventUtil$clientXY5.clientX,
              _clientY = _eventUtil$clientXY5.clientY;

          var _this$_startingDragPo = _this._startingDragPoint,
              _x = _this$_startingDragPo.x,
              _y = _this$_startingDragPo.y;
          var a = _x - _clientX;
          var b = _y - _clientY;
          var distance = Math.sqrt(a * a + b * b); //start the drag!

          if (distance >= _this.props.dragThreshold) {
            _this.startDragOfEvent({
              e: e,
              event: _this._pendingDrag.event,
              block: _this._pendingDrag.block,
              blockIdx: _this._pendingDrag.blockIdx
            });

            _this._pendingDrag = null;
          }
        }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseUpFromView", function (e) {
      console.log('mouse up from view');
      window.removeEventListener('mousemove', _this.handleMouseDragOfView);
      window.removeEventListener('mouseup', _this.handleMouseUpFromView);

      var _ref7 = _this._dragOffset || {},
          _ref7$startingScrollL = _ref7.startingScrollLeft,
          startingScrollLeft = _ref7$startingScrollL === void 0 ? 0 : _ref7$startingScrollL,
          _ref7$startingScrollT = _ref7.startingScrollTop,
          startingScrollTop = _ref7$startingScrollT === void 0 ? 0 : _ref7$startingScrollT;

      var _this$props3 = _this.props,
          selectedEvent = _this$props3.selectedEvent,
          highlightedEventAndBlock = _this$props3.highlightedEventAndBlock,
          onDeselectEvent = _this$props3.onDeselectEvent,
          onUnHighlightEvent = _this$props3.onUnHighlightEvent;

      var moved = startingScrollLeft !== _this.getScrollLeft() || startingScrollTop !== _this.getScrollTop();

      if (selectedEvent && !moved) {
        onDeselectEvent && onDeselectEvent();
      }

      if (highlightedEventAndBlock && !moved) {
        onUnHighlightEvent && onUnHighlightEvent();
      }

      if (_this.state.dragEvent && !moved) {
        _this.handleDropEvent();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseUpFromEvent", function (e) {
      console.log('mouse up of event');

      if (!_this.state.dragEvent) {
        _this.props.onSelectEvent({
          event: _this._pendingDrag.event,
          block: _this._pendingDrag.block,
          blockIdx: _this._pendingDrag.blockIdx
        });

        _this._pendingDrag = null;
      } else {
        _this.handleDropEvent();
      }

      window.removeEventListener('mousemove', _this.handleDragOfEvent);
      window.removeEventListener('mouseup', _this.handleMouseUpFromEvent);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropEvent",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var _this$_activeDrag2, dragEventNode, sourceEvent, sourceEventNode, onDropEvent, valid, reset;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$_activeDrag2 = _this._activeDrag, dragEventNode = _this$_activeDrag2.dragEventNode, sourceEvent = _this$_activeDrag2.sourceEvent, sourceEventNode = _this$_activeDrag2.sourceEventNode;
              onDropEvent = _this.props.onDropEvent; // stop scrolling

              _this.stopScrollingHorizontally();

              _this.stopScrollingVertically();

              _this._activeDrag = null;

              if (!onDropEvent) {
                _context.next = 11;
                break;
              }

              _context.next = 8;
              return onDropEvent(sourceEvent, parseFloat(dragEventNode.style.left), parseFloat(dragEventNode.style.top));

            case 8:
              _context.t0 = _context.sent;
              _context.next = 12;
              break;

            case 11:
              _context.t0 = false;

            case 12:
              valid = _context.t0;

              reset = function reset() {
                _this.setState({
                  dragEvent: null
                });
              };

              if (valid) {
                reset();
              } else {
                dragEventNode.classList.toggle('animate', true);
                dragEventNode.style.left = sourceEventNode.style.left;
                dragEventNode.style.top = sourceEventNode.style.top; // let animations finish

                setTimeout(reset, 500);
              }

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "startDragOfEvent",
    /*#__PURE__*/
    function () {
      var _ref10 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_ref9) {
        var e, event, block, blockIdx, dragEvent, _this$props4, sizeEvent, onDragEvent, getDragNode, eventNode, blockNode, dragEventNode, dragBlockNode, dragNode, _eventUtil$clientXY6, clientX, clientY, wrapperLeft, wrapperTop, scrollTop, scrollLeft, offsetY, offsetX;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e = _ref9.e, event = _ref9.event, block = _ref9.block, blockIdx = _ref9.blockIdx;
                //clone the event and render it in the dom
                dragEvent = (0, _cloneDeep.default)(event);
                dragEvent.originalId = dragEvent.id;
                dragEvent.id = "dragging";
                _context2.next = 6;
                return _this.setState({
                  dragEvent: dragEvent
                });

              case 6:
                // make sure the event is the right size
                _this$props4 = _this.props, sizeEvent = _this$props4.sizeEvent, onDragEvent = _this$props4.onDragEvent, getDragNode = _this$props4.getDragNode;
                sizeEvent(dragEvent); // place this event right over the dragged one

                eventNode = _this.getEventNode(event);
                blockNode = _this.getBlockNode(event, blockIdx);
                dragEventNode = _this.getEventNode(dragEvent);
                dragBlockNode = _this.getBlockNode(dragEvent, blockIdx);
                dragEventNode.style.left = eventNode.style.left;
                dragEventNode.style.top = eventNode.style.top;
                dragNode = !getDragNode ? dragEventNode : getDragNode({
                  event: event,
                  block: block,
                  blockIdx: blockIdx,
                  dragEventNode: dragEventNode,
                  dragBlockNode: dragBlockNode
                }); //calculate offset to keep event in proper position relative to the mouse

                _eventUtil$clientXY6 = _event.default.clientXY(e), clientX = _eventUtil$clientXY6.clientX, clientY = _eventUtil$clientXY6.clientY;
                wrapperLeft = _size.default.getLeft(_this.domNodeRef.current);
                wrapperTop = _size.default.getTop(_this.domNodeRef.current);
                scrollTop = _this.domNodeRef.current.scrollTop;
                scrollLeft = _this.domNodeRef.current.scrollLeft;
                offsetY = clientY - _size.default.getTop(dragNode);
                offsetX = clientX - _size.default.getLeft(dragNode);
                _this._activeDrag = {
                  dragEvent: dragEvent,
                  sourceEvent: event,
                  block: block,
                  blockIdx: blockIdx,
                  dragEventNode: dragEventNode,
                  dragBlockNode: dragBlockNode,
                  dragNode: dragNode,
                  dragNodeHeight: _size.default.getHeight(dragEventNode),
                  sourceEventNode: eventNode,
                  sourceBlockNode: blockNode,
                  offsetX: offsetX,
                  offsetY: offsetY,
                  wrapperLeft: wrapperLeft,
                  wrapperTop: wrapperTop,
                  startScrollTop: scrollTop,
                  startScrollLeft: scrollLeft,
                  eMouseDown: e,
                  eMouseMove: e
                };
                _this._handleDragOnScroll = true;
                onDragEvent && onDragEvent(event, _this._activeDrag);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref10.apply(this, arguments);
      };
    }());
    _this.domNodeRef = _react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(DragGrid, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          className = _this$props5.className,
          children = _this$props5.children,
          onScroll = _this$props5.onScroll,
          onMouseDownOnEvent = _this$props5.onMouseDownOnEvent,
          onMouseDownOnView = _this$props5.onMouseDownOnView,
          onSelectEvent = _this$props5.onSelectEvent,
          onDeselectEvent = _this$props5.onDeselectEvent,
          onHighlightEvent = _this$props5.onHighlightEvent,
          onUnHighlightEvent = _this$props5.onUnHighlightEvent,
          dragThreshold = _this$props5.dragThreshold,
          scrollDuringDragMargin = _this$props5.scrollDuringDragMargin,
          dragScrollSpeed = _this$props5.dragScrollSpeed,
          snapEventToNearestValidX = _this$props5.snapEventToNearestValidX,
          snapEventToNearestValidY = _this$props5.snapEventToNearestValidY,
          events = _this$props5.events,
          timezone = _this$props5.timezone,
          onDropEvent = _this$props5.onDropEvent,
          onDragEvent = _this$props5.onDragEvent,
          sizeEvent = _this$props5.sizeEvent,
          getDragNode = _this$props5.getDragNode,
          selectedEvent = _this$props5.selectedEvent,
          highlightedEventAndBlock = _this$props5.highlightedEventAndBlock,
          props = (0, _objectWithoutProperties2.default)(_this$props5, ["className", "children", "onScroll", "onMouseDownOnEvent", "onMouseDownOnView", "onSelectEvent", "onDeselectEvent", "onHighlightEvent", "onUnHighlightEvent", "dragThreshold", "scrollDuringDragMargin", "dragScrollSpeed", "snapEventToNearestValidX", "snapEventToNearestValidY", "events", "timezone", "onDropEvent", "onDragEvent", "sizeEvent", "getDragNode", "selectedEvent", "highlightedEventAndBlock"]);
      var dragEvent = this.state.dragEvent;
      return _react.default.createElement("div", (0, _extends2.default)({
        ref: this.domNodeRef
      }, props, {
        onScroll: this.handleScroll,
        onMouseDown: this.handleMouseDownOnView,
        onTouchStart: this.handleTouchStartOnView,
        className: (0, _classnames.default)('bigcalendar__drag-grid ', className)
      }), children, events.map(function (event) {
        return _react.default.createElement(_Event.default, {
          key: "event-".concat(event.id),
          className: (0, _classnames.default)({
            'is-drag-source': dragEvent && dragEvent.originalId === event.id,
            'is-selected': selectedEvent && selectedEvent.id === event.id,
            'is-highlighted': highlightedEventAndBlock && highlightedEventAndBlock.event.id === event.id
          }),
          onMouseDown: _this2.handleMouseDownOnEvent,
          onTouchStart: _this2.handleTouchStartOnEvent,
          "data-event-id": event.id,
          event: event,
          timezone: timezone
        });
      }), dragEvent && _react.default.createElement(_Event.default, {
        highlightedBlockIdx: highlightedEventAndBlock && highlightedEventAndBlock.blockIdx,
        onTouchStart: this.handleTouchStartOnDragEvent,
        className: "is-active-drag",
        "data-event-id": "dragging",
        event: dragEvent,
        timezone: timezone
      }));
    }
  }]);
  return DragGrid;
}(_react.Component);

(0, _defineProperty2.default)(DragGrid, "defaultProps", {
  dragThreshold: 10,
  scrollDuringDragMargin: 50,
  dragScrollSpeed: 5
});
var _default = DragGrid;
exports.default = _default;