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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var TimeGutter =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TimeGutter, _Component);

  function TimeGutter(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TimeGutter);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TimeGutter).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentDidUpdate", function () {
      _this.domNodeRef.current.scrollTop = _this.props.scrollTop;
    });
    _this.domNodeRef = _react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(TimeGutter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          calendarBodyHeight = _this$props.calendarBodyHeight,
          hours = _this$props.hours,
          className = _this$props.className,
          scrollTop = _this$props.scrollTop,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["calendarBodyHeight", "hours", "className", "scrollTop"]);
      return _react.default.createElement("div", (0, _extends2.default)({
        className: (0, _classnames.default)('bigcalendar__time-gutter', className),
        ref: this.domNodeRef,
        style: {
          height: calendarBodyHeight
        }
      }, props), _react.default.createElement("div", {
        className: "inner"
      }, hours.map(function (hour, idx) {
        return _react.default.createElement("div", {
          key: hour.label,
          className: "hour-block"
        }, idx > 0 && _react.default.createElement("p", null, hour.label));
      })));
    }
  }]);
  return TimeGutter;
}(_react.Component);

var _default = TimeGutter;
exports.default = _default;