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

var _reactAutosuggest = _interopRequireDefault(require("react-autosuggest"));

var renderSuggestion = function renderSuggestion(suggestion) {
  return _react.default.createElement("div", null, suggestion);
};

var Autosuggest =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Autosuggest, _Component);

  function Autosuggest() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Autosuggest);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Autosuggest)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      value: '',
      suggestions: _this.props.defaultSuggestions || []
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function (event, _ref) {
      var newValue = _ref.newValue;

      _this.setState({
        value: newValue
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSuggestionsFetchRequested", function (_ref2) {
      var value = _ref2.value;
      // Do some stuff to get suggestions
      // May be async/passed by parent
      var getSuggestions = _this.props.getSuggestions;
      var suggestions = getSuggestions(value);

      _this.setState({
        suggestions: suggestions
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSuggestionsClearRequested", function () {
      var defaultSuggestions = _this.props.defaultSuggestions;

      _this.setState({
        suggestions: defaultSuggestions
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Autosuggest, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          value = _this$state.value,
          suggestions = _this$state.suggestions;
      var _this$props = this.props,
          getSuggestionValue = _this$props.getSuggestionValue,
          placeholder = _this$props.placeholder,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["getSuggestionValue", "placeholder"]);
      var inputProps = {
        placeholder: placeholder || '',
        value: value,
        onChange: this.onChange
      };
      return _react.default.createElement(_reactAutosuggest.default, (0, _extends2.default)({
        suggestions: suggestions,
        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
        getSuggestionValue: getSuggestionValue,
        renderSuggestion: renderSuggestion,
        inputProps: inputProps
      }, rest));
    }
  }]);
  return Autosuggest;
}(_react.Component);

exports.default = Autosuggest;
(0, _defineProperty2.default)(Autosuggest, "defaultProps", {
  defaultSuggestions: []
});