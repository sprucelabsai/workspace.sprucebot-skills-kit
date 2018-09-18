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

require("react-dates/initialize");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRequiredIf = _interopRequireDefault(require("react-required-if"));

var _reactDates = require("react-dates");

var _Loader = _interopRequireDefault(require("../Loader/Loader"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var DateRangeSelect =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DateRangeSelect, _Component);

  function DateRangeSelect() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DateRangeSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DateRangeSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      focusedInput: 'startDate',
      defaultDateSet: false,
      today: _this.props.timezone ? (0, _moment.default)().tz(_this.props.timezone).format('YYYY-MM-DD') : (0, _moment.default)().format('YYYY-MM-DD')
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentDidMount", function () {
      var setDefaultDates = _this.props.setDefaultDates;
      var defaultDateSet = _this.state.defaultDateSet;

      if (setDefaultDates && !defaultDateSet) {
        _this.setDefaultDates();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isDayBlocked", function (date) {
      var availableDates = _this.props.availableDates;

      if (!availableDates) {
        return false;
      }

      var match = (availableDates || []).find(function (day) {
        return day === date.format('YYYY-MM-DD');
      });
      var lastDate = (0, _moment.default)(availableDates[availableDates.length - 1]).endOf('month');

      if (match || date.isAfter(lastDate) || date.isSame(lastDate)) {
        return false;
      }

      return true;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isOutsideRange", function (date) {
      var today = _this.state.today;
      var allowPastDates = _this.props.allowPastDates;
      var pastDate = (0, _moment.default)(date.format('YYYY-MM-DD')).isBefore(today);

      if (allowPastDates) {
        return false;
      }

      if (date.format('YYYY-MM-DD') === today) {
        return false;
      }

      if (pastDate) {
        return true;
      }

      return false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setDefaultDates", function () {
      var _this$props = _this.props,
          defaultStartDate = _this$props.defaultStartDate,
          defaultEndDate = _this$props.defaultEndDate;

      _this.setState({
        startDate: defaultStartDate,
        endDate: defaultEndDate,
        defaultDateSet: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDateChange", function (selectedStart, selectedEnd) {
      var _this$props2 = _this.props,
          _this$props2$onDatesC = _this$props2.onDatesChange,
          onDatesChange = _this$props2$onDatesC === void 0 ? function () {} : _this$props2$onDatesC,
          weekSelection = _this$props2.weekSelection;

      if (weekSelection) {
        var startOfWeek = (0, _moment.default)(selectedStart).startOf('week');
        var endOfWeek = (0, _moment.default)(selectedStart).endOf('week');
        onDatesChange(startOfWeek, endOfWeek);

        _this.setState({
          startDate: startOfWeek,
          endDate: endOfWeek,
          focusedInput: 'startDate'
        });
      } else {
        var _this$getNextState = _this.getNextState(selectedStart, selectedEnd),
            startDate = _this$getNextState.startDate,
            endDate = _this$getNextState.endDate;

        onDatesChange(startDate, endDate);

        _this.setState({
          startDate: startDate,
          endDate: endDate
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getNextState", function (selectedStart, selectedEnd) {
      var _this$state = _this.state,
          startDate = _this$state.startDate,
          endDate = _this$state.endDate;

      if (selectedEnd && selectedEnd.isSame(endDate)) {
        return {
          startDate: selectedStart,
          endDate: null
        };
      } else if (startDate && endDate) {
        return {
          startDate: selectedEnd || selectedStart,
          endDate: null
        };
      } else {
        return {
          startDate: selectedStart,
          endDate: selectedEnd
        };
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleFocusChange", function (focusedInput) {
      _this.setState({
        focusedInput: focusedInput || 'startDate'
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DateRangeSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          startDate = _this$state2.startDate,
          endDate = _this$state2.endDate,
          focusedInput = _this$state2.focusedInput;
      var _this$props3 = this.props,
          numberOfMonths = _this$props3.numberOfMonths,
          weekSelection = _this$props3.weekSelection,
          enableOutsideDays = _this$props3.enableOutsideDays,
          initialVisibleMonth = _this$props3.initialVisibleMonth,
          _onPrevMonthClick = _this$props3.onPrevMonthClick,
          _onNextMonthClick = _this$props3.onNextMonthClick,
          orientation = _this$props3.orientation,
          loading = _this$props3.loading;
      var wrapperClass = (0, _classnames.default)('date_picker', 'date_select__wrapper', {
        loading: loading,
        outside_days: enableOutsideDays,
        week_selection: weekSelection
      });
      return _react.default.createElement("div", {
        className: wrapperClass
      }, _react.default.createElement("div", {
        className: "date_select__loader ".concat(loading ? 'loading' : '')
      }, _react.default.createElement(_Loader.default, null)), _react.default.createElement(_reactDates.DayPickerRangeController, {
        startDate: startDate,
        endDate: endDate,
        onDatesChange: function onDatesChange(_ref) {
          var startDate = _ref.startDate,
              endDate = _ref.endDate;
          return _this2.handleDateChange(startDate, endDate);
        },
        focusedInput: loading ? null : focusedInput,
        onFocusChange: function onFocusChange(focusedInput) {
          return _this2.handleFocusChange(focusedInput);
        },
        numberOfMonths: numberOfMonths || 1,
        isDayBlocked: this.isDayBlocked,
        isOutsideRange: this.isOutsideRange,
        initialVisibleMonth: initialVisibleMonth,
        onPrevMonthClick: function onPrevMonthClick(prevMonth) {
          return _onPrevMonthClick && _onPrevMonthClick(prevMonth);
        },
        onNextMonthClick: function onNextMonthClick(nextMonth) {
          return _onNextMonthClick && _onNextMonthClick(nextMonth);
        },
        navPrev: _react.default.createElement(_Icon.default, {
          className: "date_select__icon ".concat(loading ? 'loading' : '')
        }, orientation === 'vertical' ? 'keyboard_arrow_up' : 'chevron_left'),
        navNext: _react.default.createElement(_Icon.default, {
          className: "date_select__icon ".concat(loading ? 'loading' : '')
        }, orientation === 'vertical' ? 'keyboard_arrow_down' : 'chevron_right'),
        enableOutsideDays: enableOutsideDays,
        keepOpenOnDateSelect: true,
        hideKeyboardShortcutsPanel: true,
        orientation: orientation
      }));
    }
  }]);
  return DateRangeSelect;
}(_react.Component);

var _default = DateRangeSelect;
exports.default = _default;
DateRangeSelect.propTypes = {
  availableDates: _propTypes.default.array,
  allowPastDates: _propTypes.default.bool,
  onDatesChange: _propTypes.default.func.isRequired,
  numberOfMonths: _propTypes.default.number,
  weekSelection: _propTypes.default.bool,
  enableOutsideDays: _propTypes.default.bool,
  setDefaultDates: _propTypes.default.bool,
  defaultStartDate: _propTypes.default.any,
  defaultEndDate: _propTypes.default.any,
  initialVisibleMonth: _propTypes.default.func,
  onPrevMonthClick: _propTypes.default.func,
  onNextMonthClick: _propTypes.default.func,
  orientation: _propTypes.default.sting,
  loading: _propTypes.default.bool
};
DateRangeSelect.defaultProps = {
  allowPastDates: false,
  loading: false
};