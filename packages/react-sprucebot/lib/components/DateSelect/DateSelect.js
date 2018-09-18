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

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDates = require("react-dates");

var _Loader = _interopRequireDefault(require("../Loader/Loader"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var DateSelect =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DateSelect, _Component);

  function DateSelect() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DateSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DateSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      defaultDateSet: false,
      focused: 1,
      today: _this.props.timezone ? (0, _moment.default)().tz(_this.props.timezone).format('YYYY-MM-DD') : (0, _moment.default)().format('YYYY-MM-DD')
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentDidMount", function () {
      var defaultDateSet = _this.state.defaultDateSet;

      if (!defaultDateSet) {
        _this.setDefaultDate();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isDayBlocked", function (date) {
      var availableDates = _this.props.availableDates;

      if (!availableDates) {
        return false;
      }

      var thisDate = date.format('YYYY-MM-DD');
      var match = availableDates.find(function (day) {
        return day === thisDate;
      });

      if (match) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDateChange", function (date) {
      var _this$props$onDateSel = _this.props.onDateSelect,
          onDateSelect = _this$props$onDateSel === void 0 ? function () {
        console.log({
          date: date
        });
      } : _this$props$onDateSel;
      onDateSelect(date);

      _this.setState({
        date: date
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setDefaultDate", function () {
      var defaultDate = _this.props.defaultDate;

      _this.setState({
        date: defaultDate,
        defaultDateSet: true
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DateSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var date = this.state.date;
      var _this$props = this.props,
          initialVisibleMonth = _this$props.initialVisibleMonth,
          _onPrevMonthClick = _this$props.onPrevMonthClick,
          _onNextMonthClick = _this$props.onNextMonthClick,
          loading = _this$props.loading;
      return _react.default.createElement("div", {
        className: "date_picker date_select__wrapper ".concat(loading ? 'loading' : '')
      }, _react.default.createElement("div", {
        className: "date_select__loader ".concat(loading ? 'loading' : '')
      }, _react.default.createElement(_Loader.default, null)), _react.default.createElement(_reactDates.DayPickerSingleDateController, {
        date: date || null,
        onDateChange: this.handleDateChange,
        focused: !loading,
        onFocusChange: function onFocusChange(_ref) {
          var focused = _ref.focused;
          return _this2.setState({
            focused: focused
          });
        },
        numberOfMonths: 1,
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
        }, "chevron_left"),
        navNext: _react.default.createElement(_Icon.default, {
          className: "date_select__icon ".concat(loading ? 'loading' : '')
        }, "chevron_right"),
        keepOpenOnDateSelect: true,
        hideKeyboardShortcutsPanel: true,
        noBorder: true
      }));
    }
  }, {
    key: "value",
    get: function get() {
      return this.state.date;
    }
  }]);
  return DateSelect;
}(_react.Component);

var _default = DateSelect;
exports.default = _default;
DateSelect.propTypes = {
  availableDates: _propTypes.default.array,
  allowPastDates: _propTypes.default.bool,
  onDateSelect: _propTypes.default.func.isRequired,
  setDefaultDate: _propTypes.default.bool,
  defaultDate: _propTypes.default.any,
  initialVisibleMonth: _propTypes.default.func,
  onNextMonthClick: _propTypes.default.func,
  onPrevMonthClick: _propTypes.default.func,
  loading: _propTypes.default.bool,
  highlightDates: _propTypes.default.array
};
DateSelect.defaultProps = {
  allowPastDates: false,
  loading: false
};