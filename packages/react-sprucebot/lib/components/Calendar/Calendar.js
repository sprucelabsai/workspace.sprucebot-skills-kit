"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _reactBigCalendar = _interopRequireDefault(require("react-big-calendar"));

var _dragAndDrop = _interopRequireDefault(require("react-big-calendar/lib/addons/dragAndDrop"));

var _is_js = _interopRequireDefault(require("is_js"));

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _reactDndTouchBackend = _interopRequireDefault(require("react-dnd-touch-backend"));

var _reactDnd = require("react-dnd");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _events = require("events");

_reactBigCalendar.default.setLocalizer(_reactBigCalendar.default.momentLocalizer(_moment.default)); // or globalizeLocalizer


var CalendarComponent = (0, _dragAndDrop.default)(_reactBigCalendar.default);

var Calendar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Calendar, _Component);

  function Calendar() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Calendar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Calendar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      today: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onNavigate", function (e) {
      // Not fired with current build but causes error if omitted
      console.log('onNavigate', e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "startAccessor", function (event) {
      return (0, _moment.default)(event.start).toDate();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "endAccessor", function (event) {
      return (0, _moment.default)(event.end).toDate();
    });
    return _this;
  }

  (0, _createClass2.default)(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var currentDate = this.props.currentDate;
      this.setState({
        today: (0, _moment.default)(currentDate).toDate()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var today = this.state.today;
      var _this$props = this.props,
          currentDate = _this$props.currentDate,
          canDrag = _this$props.canDrag,
          canResize = _this$props.canResize,
          min = _this$props.min,
          max = _this$props.max,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["currentDate", "canDrag", "canResize", "min", "max"]);
      var formattedDate = (0, _moment.default)(currentDate).toDate();
      var formattedMin = (0, _moment.default)(min).toDate();
      var formattedMax = (0, _moment.default)(max).toDate();
      return _react.default.createElement("div", (0, _extends2.default)({}, props, {
        className: "calendar__wrapper"
      }), _react.default.createElement(CalendarComponent, (0, _extends2.default)({
        onNavigate: this.onNavigate,
        draggableAccessor: canDrag,
        resizableAccessor: canResize,
        startAccessor: this.startAccessor,
        endAccessor: this.endAccessor,
        defaultDate: today,
        date: formattedDate,
        getNow: function getNow() {
          return today;
        },
        selectable: props.onSelectSlot ? true : '',
        min: formattedMin,
        max: formattedMax
      }, props)));
    }
  }]);
  return Calendar;
}(_react.Component);

var backend = _is_js.default.mobile() || _is_js.default.tablet() || _is_js.default.touchDevice() ? _reactDndTouchBackend.default : _reactDndHtml5Backend.default;

var _default = (0, _reactDnd.DragDropContext)(backend)(Calendar);

exports.default = _default;
Calendar.propTypes = {
  canDrag: _propTypes.default.func,
  canResize: _propTypes.default.func,
  onSelectSlot: _propTypes.default.func,
  titleAccessor: _propTypes.default.func
};