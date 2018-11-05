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

var _Card = _interopRequireDefault(require("../Card"));

var _CardHeader = _interopRequireDefault(require("./CardHeader"));

var _CardBody = _interopRequireDefault(require("./CardBody"));

var _CardFooter = _interopRequireDefault(require("./CardFooter"));

var _Button = _interopRequireDefault(require("../../Button/Button"));

var _Tabs = _interopRequireDefault(require("../../Tabs/Tabs"));

var getCurrentStep = function getCurrentStep(steps) {
  // Find the first step that is not complete
  if (steps && steps.length > 0) {
    for (var i = 0; i < steps.length; i++) {
      if (!steps[i].isComplete) {
        return i;
      }
    }
  }

  return 0;
};

var OnboardingCard =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(OnboardingCard, _Component);

  function OnboardingCard() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, OnboardingCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(OnboardingCard)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      currentStep: getCurrentStep(_this.props.steps)
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (idx) {
      _this.setState({
        currentStep: idx
      });
    });
    return _this;
  }

  (0, _createClass2.default)(OnboardingCard, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var currentStep = this.state.currentStep;
      var _this$props = this.props,
          title = _this$props.title,
          steps = _this$props.steps,
          className = _this$props.className;
      var tabs = steps.map(function (step, idx) {
        return {
          text: step.tabTitle,
          icon: step.tabIcon,
          isCurrent: idx === currentStep,
          onClick: function onClick() {
            return _this2.handleClick(idx);
          },
          className: step.isComplete && 'tab--is-complete'
        };
      });
      return _react.default.createElement(_Card.default, {
        className: "onboarding-card"
      }, _react.default.createElement("div", {
        className: "onboarding-card__header"
      }, _react.default.createElement("p", {
        className: "onboarding-card__title"
      }, title), tabs && _react.default.createElement(_Tabs.default, {
        tabs: tabs
      })), _react.default.createElement(_CardHeader.default, {
        title: steps[currentStep].panelTitle
      }), _react.default.createElement(_CardBody.default, null, steps[currentStep].panelCopy), _react.default.createElement(_CardFooter.default, null, _react.default.createElement(_Button.default, (0, _extends2.default)({
        kind: "primary"
      }, steps[currentStep].panelCTA))));
    }
  }]);
  return OnboardingCard;
}(_react.Component);

exports.default = OnboardingCard;