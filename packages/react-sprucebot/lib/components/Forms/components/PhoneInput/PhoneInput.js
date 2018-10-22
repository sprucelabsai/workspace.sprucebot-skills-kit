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

var _reactPhoneNumberInput = _interopRequireDefault(require("react-phone-number-input"));

var _FormPartials = require("../../FormPartials");

var PhoneInput =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PhoneInput, _Component);

  function PhoneInput() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, PhoneInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(PhoneInput)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      phone: '',
      error: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (phoneNumber) {
      _this.setState({
        phone: phoneNumber
      });
    });
    return _this;
  }

  (0, _createClass2.default)(PhoneInput, [{
    key: "render",
    value: function render() {
      var phone = this.state.phone;
      var _this$props = this.props,
          label = _this$props.label,
          error = _this$props.error,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["label", "error"]);
      return _react.default.createElement("div", {
        className: "text-input"
      }, _react.default.createElement(_FormPartials.InputPre, {
        label: label
      }), _react.default.createElement(_reactPhoneNumberInput.default, (0, _extends2.default)({
        inputClassName: "text-input__input",
        value: phone,
        countries: ['US', 'GB', 'CA'],
        country: "US",
        labels: {
          US: 'United States',
          GB: 'Great Britain',
          CA: 'Canada'
        },
        onChange: this.handleChange,
        international: false
      }, rest)), error && _react.default.createElement(_FormPartials.InputHelper, {
        error: error
      }));
    }
  }]);
  return PhoneInput;
}(_react.Component);

exports.default = PhoneInput;