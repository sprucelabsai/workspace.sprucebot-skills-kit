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

      if (_this._activeDrag) {
        _this.handleDragOfEvent(_this._activeDrag.eMouseMove, false);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDownOfView", function (e) {
      var clientX = e.clientX,
          clientY = e.clientY,
          target = e.target;
      _this._dragOffset = {
        startingScrollLeft: _this.getScrollLeft(),
        startingScrollTop: _this.getScrollTop(),
        startingClientX: clientX,
        startingClientY: clientY
      };
      e.preventDefault();
      window.addEventListener('mousemove', _this.handleMouseDragOfView);
      window.addEventListener('mouseup', _this.handleMouseUp);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseDragOfView", function (e) {
      var clientX = e.clientX,
          clientY = e.clientY;
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
          blockIdx = _ref3.blockIdx;
      var _this$props$onMouseDo = _this.props.onMouseDownOnEvent,
          onMouseDownOnEvent = _this$props$onMouseDo === void 0 ? function (args) {
        return blockIdx === 0 ? args : false;
      } : _this$props$onMouseDo;
      var results = onMouseDownOnEvent({
        e: e,
        event: event,
        block: block,
        blockIdx: blockIdx
      });

      if (results) {
        e.preventDefault();
        e.stopPropagation();
        _this._pendingDrag = results;
        _this._startingDragPoint = {
          x: e.clientX,
          y: e.clientY
        };
        window.addEventListener('mousemove', _this.handleDragOfEvent);
        window.addEventListener('mouseup', _this.handleMouseUpOfEvent);
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDragOfEvent", function (e) {
      var autoScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var dragEvent = _this.state.dragEvent;

      if (dragEvent) {
        var clientX = e.clientX,
            clientY = e.clientY;
        var _this$props = _this.props,
            scrollDuringDragMargin = _this$props.scrollDuringDragMargin,
            dragScrollSpeed = _this$props.dragScrollSpeed,
            onDragEvent = _this$props.onDragEvent;
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
          var _clientX = e.clientX,
              _clientY = e.clientY;
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseUp", function (e) {
      window.removeEventListener('mousemove', _this.handleMouseDragOfView);
      window.removeEventListener('mouseup', _this.handleMouseUp);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseUpOfEvent", function (e) {
      if (!_this.state.dragEvent) {
        alert('SELECTED');
      } else {
        _this.handleDropOfEvent();
      }

      window.removeEventListener('mousemove', _this.handleDragOfEvent);
      window.removeEventListener('mouseup', _this.handleMouseUpOfEvent);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropOfEvent",
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
      var _ref6 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_ref5) {
        var e, event, block, blockIdx, dragEvent, _this$props2, sizeEvent, onDragEvent, getDragNode, eventNode, blockNode, dragEventNode, dragBlockNode, dragNode, clientX, clientY, wrapperLeft, wrapperTop, scrollTop, scrollLeft, offsetY, offsetX;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e = _ref5.e, event = _ref5.event, block = _ref5.block, blockIdx = _ref5.blockIdx;
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
                _this$props2 = _this.props, sizeEvent = _this$props2.sizeEvent, onDragEvent = _this$props2.onDragEvent, getDragNode = _this$props2.getDragNode;
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

                clientX = e.clientX, clientY = e.clientY;
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
                onDragEvent && onDragEvent(event, _this._activeDrag);

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }());
    _this.domNodeRef = _react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(DragGrid, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          className = _this$props3.className,
          children = _this$props3.children,
          onScroll = _this$props3.onScroll,
          onMouseDownOnEvent = _this$props3.onMouseDownOnEvent,
          dragThreshold = _this$props3.dragThreshold,
          scrollDuringDragMargin = _this$props3.scrollDuringDragMargin,
          dragScrollSpeed = _this$props3.dragScrollSpeed,
          snapEventToNearestValidX = _this$props3.snapEventToNearestValidX,
          snapEventToNearestValidY = _this$props3.snapEventToNearestValidY,
          events = _this$props3.events,
          timezone = _this$props3.timezone,
          onDropEvent = _this$props3.onDropEvent,
          onDragEvent = _this$props3.onDragEvent,
          sizeEvent = _this$props3.sizeEvent,
          getDragNode = _this$props3.getDragNode,
          props = (0, _objectWithoutProperties2.default)(_this$props3, ["className", "children", "onScroll", "onMouseDownOnEvent", "dragThreshold", "scrollDuringDragMargin", "dragScrollSpeed", "snapEventToNearestValidX", "snapEventToNearestValidY", "events", "timezone", "onDropEvent", "onDragEvent", "sizeEvent", "getDragNode"]);
      var dragEvent = this.state.dragEvent;
      return _react.default.createElement("div", (0, _extends2.default)({
        ref: this.domNodeRef
      }, props, {
        onScroll: this.handleScroll,
        onMouseDown: this.handleMouseDownOfView,
        className: (0, _classnames.default)('bigcalendar__drag-grid ', className)
      }), children, events.map(function (event) {
        return _react.default.createElement(_Event.default, {
          key: "event-".concat(event.id),
          className: dragEvent && dragEvent.originalId === event.id ? 'is-drag-source' : '',
          onMouseDown: _this2.handleMouseDownOnEvent,
          "data-event-id": event.id,
          event: event,
          timezone: timezone
        });
      }), dragEvent && _react.default.createElement(_Event.default, {
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