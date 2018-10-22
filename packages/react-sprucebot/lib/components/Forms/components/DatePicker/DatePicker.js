"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

require("react-dates/initialize");

require("react-dates/lib/css/_datepicker.css");

var _reactDates = require("react-dates");

var _moment = _interopRequireDefault(require("moment"));

var DatePicker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DatePicker, _Component);

  function DatePicker() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DatePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DatePicker)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isFocused: false,
      date: (0, _moment.default)()
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleFocus", function () {
      _this.setState(function (prevState) {
        return {
          isFocused: !prevState.isFocused
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDateChange", function (date) {
      _this.setState({
        date: date
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DatePicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isFocused = _this$state.isFocused,
          date = _this$state.date;
      var rest = (0, _extends2.default)({}, this.props);
      return _react.default.createElement(_reactDates.SingleDatePicker, (0, _extends2.default)({
        date: date,
        focused: isFocused,
        onDateChange: function onDateChange(date) {
          return _this2.handleDateChange(date);
        },
        onFocusChange: this.toggleFocus
      }, rest));
    }
  }]);
  return DatePicker;
}(_react.Component);

exports.default = DatePicker;