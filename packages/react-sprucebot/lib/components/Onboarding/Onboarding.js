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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Typography = require("../Typography/Typography");

var _TrainingGuide = _interopRequireDefault(require("../TrainingGuide/TrainingGuide"));

var Onboarding =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Onboarding, _Component);

  function Onboarding() {
    (0, _classCallCheck2.default)(this, Onboarding);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Onboarding).apply(this, arguments));
  }

  (0, _createClass2.default)(Onboarding, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          heading = _this$props.heading,
          steps = _this$props.steps,
          onComplete = _this$props.onComplete,
          doneButtonLabel = _this$props.doneButtonLabel,
          onboardingComplete = _this$props.onboardingComplete;
      return _react.default.createElement("div", null, _react.default.createElement(_Typography.H1, null, heading), _react.default.createElement(_TrainingGuide.default, {
        steps: steps,
        onComplete: onComplete,
        doneButtonLabel: doneButtonLabel,
        onboardingComplete: onboardingComplete
      }));
    }
  }]);
  return Onboarding;
}(_react.Component);

exports.default = Onboarding;
Onboarding.propTypes = {
  heading: _propTypes.default.string.isRequired,
  steps: _propTypes.default.array.isRequired,
  onComplete: _propTypes.default.func.isRequired,
  doneButtonLabel: _propTypes.default.string.isRequired
};