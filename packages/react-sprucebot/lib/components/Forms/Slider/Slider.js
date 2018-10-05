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

var _FormPartials = require("../FormPartials");

var Slider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Slider, _Component);

  function Slider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Slider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      valueState: _this.props.value
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (e) {
      var newVal = e.target.value;

      _this.setState({
        valueState: newVal
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Slider, [{
    key: "render",
    value: function render() {
      var valueState = this.state.valueState;
      var _this$props = this.props,
          label = _this$props.label,
          id = _this$props.id,
          postLabel = _this$props.postLabel,
          min = _this$props.min,
          max = _this$props.max,
          value = _this$props.value,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["label", "id", "postLabel", "min", "max", "value"]);
      return _react.default.createElement("div", {
        className: "slider-wrapper slider--split-color"
      }, label && _react.default.createElement(_FormPartials.InputPre, {
        id: id,
        label: label,
        postLabel: postLabel
      }), _react.default.createElement("input", (0, _extends2.default)({
        type: "range",
        min: min,
        max: max,
        value: valueState,
        className: "slider",
        style: {
          '--min': min,
          '--max': max,
          '--val': valueState
        },
        onChange: this.handleChange
      }, rest)));
    }
  }]);
  return Slider;
}(_react.Component);

exports.default = Slider;