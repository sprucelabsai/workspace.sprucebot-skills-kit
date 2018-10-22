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

var _Button = _interopRequireDefault(require("../../../Button/Button"));

var _FormPartials = require("../../FormPartials");

var ClearIcon = function ClearIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
  }));
};

ClearIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
var theme = {
  container: 'text-input',
  input: 'text-input__inner text-input__input',
  suggestionsContainer: 'autosuggest',
  suggestionsContainerOpen: 'autosuggest--show-suggestions',
  suggestionsList: 'autosuggest__list',
  suggestion: 'autosuggest__list-item'
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
      suggestions: _this.props.defaultSuggestions || [],
      showClearButton: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function (event, _ref) {
      var newValue = _ref.newValue;

      _this.setState({
        value: newValue
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onBlur", function () {
      _this.setState(function (prevState) {
        return {
          showClearButton: prevState.value && prevState.value.length > 0 ? true : false
        };
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClearInput", function () {
      _this.setState({
        value: '',
        showClearButton: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Autosuggest, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          value = _this$state.value,
          suggestions = _this$state.suggestions,
          showClearButton = _this$state.showClearButton;
      var _this$props = this.props,
          getSuggestionValue = _this$props.getSuggestionValue,
          renderSuggestion = _this$props.renderSuggestion,
          placeholder = _this$props.placeholder,
          inputPre = _this$props.inputPre,
          inputHelper = _this$props.inputHelper,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["getSuggestionValue", "renderSuggestion", "placeholder", "inputPre", "inputHelper"]);
      var inputProps = {
        placeholder: placeholder || '',
        value: value,
        onChange: this.onChange,
        onBlur: this.onBlur
      };
      return _react.default.createElement(_react.Fragment, null, inputPre && _react.default.createElement(_FormPartials.InputPre, inputPre), _react.default.createElement("div", {
        className: "autosuggest__wrapper"
      }, _react.default.createElement(_reactAutosuggest.default, (0, _extends2.default)({
        suggestions: suggestions,
        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
        getSuggestionValue: getSuggestionValue,
        renderSuggestion: renderSuggestion,
        inputProps: inputProps,
        theme: theme
      }, rest)), showClearButton && _react.default.createElement(_Button.default, {
        isSmall: true,
        className: "text-input__clear-btn",
        icon: _react.default.createElement(ClearIcon, null),
        onClick: this.handleClearInput
      })), inputHelper && _react.default.createElement(_FormPartials.InputHelper, inputHelper));
    }
  }]);
  return Autosuggest;
}(_react.Component);

exports.default = Autosuggest;
(0, _defineProperty2.default)(Autosuggest, "defaultProps", {
  defaultSuggestions: []
});