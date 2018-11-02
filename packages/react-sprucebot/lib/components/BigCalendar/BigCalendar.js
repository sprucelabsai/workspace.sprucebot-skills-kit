"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _jsCookies = _interopRequireDefault(require("js-cookies"));

var _es6Tween = require("es6-tween");

var _size = _interopRequireDefault(require("./utils/size"));

var _Views = _interopRequireDefault(require("./components/Views"));

var _Header = _interopRequireDefault(require("./components/Header/Header"));

(0, _es6Tween.autoPlay)(true);

var BigCalendar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BigCalendar, _Component);

  function BigCalendar(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BigCalendar);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BigCalendar).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      selectedView: _this.props.defaultView,
      minTime: _this.props.defaultMinTime,
      maxTime: _this.props.defaultMaxTime,
      startTime: _this.props.defaultStartTime,
      endTime: _this.props.defaultEndTime,
      currentUsers: _this.props.allUsers,
      bodyWidth: _size.default.bodyWidth(),
      bodyHeight: _size.default.bodyHeight(),
      calendarBodyHeight: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentDidMount", function () {
      window.addEventListener('resize', _this.handleSizing);

      _this.handleSizing(); //TODO better way to detect everything is rendered and sized correctly


      setTimeout(_this.handleSizing, 1000);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentWillUnmount", function () {
      window.removeEventListener('resize', _this.handleSizing);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getDefaultStartDate", function () {
      var defaultStartDate;

      if (_jsCookies.default.getItem('bigcalendarDate') && (0, _momentTimezone.default)(_jsCookies.default.getItem('bigcalendarDate')).isValid()) {
        defaultStartDate = (0, _momentTimezone.default)(_jsCookies.default.getItem('bigcalendarDate'));
      } else if (_this.props.startDate && (0, _momentTimezone.default)(_this.props.startDate).isValid()) {
        defaultStartDate = (0, _momentTimezone.default)(_this.props.startDate);
      } else {
        defaultStartDate = _momentTimezone.default.tz(new Date(), _this.props.timezone);
      }

      return defaultStartDate;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSizing", function () {
      // can sometimes fire too early (before the ref is set)
      if (!_this.domNodeRef.current) {
        return;
      } //get node for scroll wrapper


      var scrollNode = _this.domNodeRef.current.querySelectorAll('.bigcalendar__drag-grid')[0]; // calc positions


      var scrollTop = _size.default.getTop(scrollNode);

      var width = _size.default.bodyWidth();

      var height = _size.default.bodyHeight();

      var calendarBodyHeight = height - scrollTop;

      _this.setState({
        bodyWidth: width,
        bodyHeight: height,
        calendarBodyHeight: calendarBodyHeight
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChangeView", function (view) {
      console.log('change view!');
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleBackDate", function () {
      var _this$getViewDetails$ = (0, _slicedToArray2.default)(_this.getViewDetails().pageAmount, 2),
          amount = _this$getViewDetails$[0],
          unit = _this$getViewDetails$[1];

      var nextDate = (0, _momentTimezone.default)(_this.state.startDate).subtract(amount, unit);

      _this.setState({
        startDate: nextDate
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleNextDate", function () {
      var _this$getViewDetails$2 = (0, _slicedToArray2.default)(_this.getViewDetails().pageAmount, 2),
          amount = _this$getViewDetails$2[0],
          unit = _this$getViewDetails$2[1];

      var nextDate = (0, _momentTimezone.default)(_this.state.startDate).add(amount, unit);

      _this.setState({
        startDate: nextDate
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "preserveState", function () {
      var dateToSave = _this.state.startDate.format('YYYY-MM-DD');

      return _jsCookies.default.setItem('bigcalendarDate', dateToSave);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getViewDetails", function (view) {
      var v = view || _this.state.selectedView;
      return _Views.default[v];
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getViewProps", function () {
      return _this.props.viewProps[_this.state.selectedView] || {};
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "generateTimeGutterHours", (0, _memoizeOne.default)(function (startDate, min, max) {
      var times = [];
      var timezone = _this.props.timezone;

      var current = _momentTimezone.default.tz("".concat(startDate.format('YYYY-MM-DD'), " ").concat(min, ":00"), timezone);

      var end = _momentTimezone.default.tz("".concat(startDate.format('YYYY-MM-DD'), " ").concat(max, ":00"), timezone);

      do {
        times.push({
          label: current.format('ha'),
          date: current.toDate(),
          hour: parseInt(current.format('h'), 10),
          timestamp: parseInt(current.format('X'), 10)
        });
        current.add(1, 'hours');
      } while (current.toDate() < end.toDate());

      return times;
    }));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleUpdateHorizontalPagerDetails", function (_ref) {
      var currentPage = _ref.currentPage,
          totalPages = _ref.totalPages;

      _this.setState({
        currentHorizontalPage: currentPage,
        totalHorizontalPages: totalPages
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleHorizontalPageNext", function () {
      _this.selectedViewRef.current.handleHorizontalPageNext && _this.selectedViewRef.current.handleHorizontalPageNext();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleHorizontalPageBack", function () {
      _this.selectedViewRef.current.handleHorizontalPageBack && _this.selectedViewRef.current.handleHorizontalPageBack();
    });
    _this.domNodeRef = _react.default.createRef();
    _this.selectedViewRef = _react.default.createRef();
    _this.state.startDate = _this.getDefaultStartDate();
    return _this;
  }

  (0, _createClass2.default)(BigCalendar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.preserveState();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          headerDateFormat = _this$props.headerDateFormat,
          slotsPerHour = _this$props.slotsPerHour,
          allEvents = _this$props.allEvents,
          onDropEvent = _this$props.onDropEvent,
          timezone = _this$props.timezone,
          eventRightMargin = _this$props.eventRightMargin;
      var _this$state = this.state,
          selectedView = _this$state.selectedView,
          minTime = _this$state.minTime,
          maxTime = _this$state.maxTime,
          startTime = _this$state.startTime,
          endTime = _this$state.endTime,
          startDate = _this$state.startDate,
          currentUsers = _this$state.currentUsers,
          bodyWidth = _this$state.bodyWidth,
          bodyHeight = _this$state.bodyHeight,
          calendarBodyHeight = _this$state.calendarBodyHeight,
          currentHorizontalPage = _this$state.currentHorizontalPage,
          totalHorizontalPages = _this$state.totalHorizontalPages;
      var parentClass = (0, _classnames.default)('bigcalendar', className, {});
      var hours = this.generateTimeGutterHours(startDate, minTime, maxTime); // load the view

      var View = this.getViewDetails().View;
      var viewProps = this.getViewProps();
      return _react.default.createElement("div", {
        className: parentClass,
        ref: this.domNodeRef,
        style: {
          width: bodyWidth,
          height: bodyHeight
        }
      }, _react.default.createElement(_Header.default, {
        dateFormat: headerDateFormat,
        selectedDate: startDate,
        selectedView: selectedView,
        onChangeView: this.handleChangeView,
        onBackDate: this.handleBackDate,
        onNextDate: this.handleNextDate,
        fullScreenNodeRef: this.domNodeRef,
        currentHorizontalPage: currentHorizontalPage,
        totalHorizontalPages: totalHorizontalPages,
        onHorizontalPageNext: this.handleHorizontalPageNext,
        onHorizontalPageBack: this.handleHorizontalPageBack
      }), _react.default.createElement("div", {
        className: "bigcalendar__view-wrapper"
      }, _react.default.createElement(View, (0, _extends2.default)({}, viewProps, {
        ref: this.selectedViewRef,
        onUpdateHorizontalPagerDetails: this.handleUpdateHorizontalPagerDetails,
        startDate: startDate,
        events: allEvents,
        slotsPerHour: slotsPerHour,
        onScroll: this.handleViewScroll,
        calendarBodyHeight: calendarBodyHeight,
        hours: hours,
        users: currentUsers,
        minTime: minTime,
        maxTime: maxTime,
        startTime: startTime,
        endTime: endTime,
        timezone: timezone,
        onDropEvent: onDropEvent
      }))));
    }
  }]);
  return BigCalendar;
}(_react.Component);

(0, _defineProperty2.default)(BigCalendar, "defaultProps", {
  defaultView: 'day',
  slotsPerHour: 4,
  // every 15 minutes
  defaultMinTime: '00:00',
  defaultMaxTime: '23:59',
  defaultStartTime: '07:00',
  defaultEndTime: '20:00',
  headerDateFormat: 'MMMM YYYY',
  allEvents: [],
  viewProps: {}
});
var _default = BigCalendar;
exports.default = _default;