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

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _BotText = _interopRequireDefault(require("../BotText/BotText"));

var _index = _interopRequireDefault(require("../../skillskit/index"));

// what is the correct way to add functionality like this?
function height(elm) {
  var elmHeight, elmMargin;

  if (document.all) {
    // IE
    elmHeight = elm.currentStyle.height;
    elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10);
  } else {
    // Mozilla
    elmHeight = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('height'), 10);
    elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top'), 10) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'), 10);
  }

  return elmHeight + elmMargin;
}

var TrainingGuide =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TrainingGuide, _Component);

  function TrainingGuide(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TrainingGuide);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TrainingGuide).call(this, props)); // every steps' dom node so we can calc heights

    _this.stepDomNodes = [];
    _this.state = {
      currentStep: 0,
      stepHeights: props.steps.map(function () {
        return 0;
      }),
      stepWidths: props.steps.map(function () {
        return 0;
      }),
      transitioning: false
    };
    return _this;
  }

  (0, _createClass2.default)(TrainingGuide, [{
    key: "next",
    value: function next() {
      this.setState(function (prevState, props) {
        if (prevState.currentStep < props.steps.length - 1) {
          return {
            currentStep: prevState.currentStep + 1
          };
        }

        return {};
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      // Scroll to next/done buttons if the current step has changed
      if (this.state.currentStep !== prevState.currentStep) {
        this.setState({
          transitioning: true
        });
        setTimeout(function () {
          _index.default.scrollTo(_reactDom.default.findDOMNode(_this2.button).offsetTop);

          _this2.setState({
            transitioning: false
          });
        }, 1500);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          steps = _this$props.steps,
          onboardingComplete = _this$props.onboardingComplete;
      var currentStep = this.state.currentStep; // calculate height of first element in each step

      var stepHeights = this.stepDomNodes.map(function (node) {
        var first = node.children[0];
        return height(first);
      }); // also set div widths so text doesn't wrap weird on animations

      var stepWidths = this.stepDomNodes.map(function (node) {
        var span = node.children[0].children[0];
        return span.offsetWidth;
      });
      this.setState({
        stepHeights: stepHeights,
        stepWidths: stepWidths,
        currentStep: onboardingComplete ? steps.length - 1 : currentStep
      });
    }
  }, {
    key: "onComplete",
    value: function onComplete() {
      this.setState({
        transitioning: true
      }); // just show progress until done

      this.props.onComplete();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          steps = _this$props2.steps,
          nextButtonLabel = _this$props2.nextButtonLabel,
          doneButtonLabel = _this$props2.doneButtonLabel,
          onboardingComplete = _this$props2.onboardingComplete;
      var _this$state = this.state,
          currentStep = _this$state.currentStep,
          stepHeights = _this$state.stepHeights,
          stepWidths = _this$state.stepWidths,
          transitioning = _this$state.transitioning;
      var last = currentStep === steps.length - 1;
      return _react.default.createElement("div", {
        className: "training_guide"
      }, steps.map(function (step, idx) {
        var stepStyle = stepWidths[idx] ? {
          width: stepWidths[idx]
        } : {};
        return _react.default.createElement("div", {
          className: "training_guide__step ".concat(idx <= currentStep ? 'on' : 'off', " ").concat(idx === 0 ? 'first' : ''),
          style: {
            height: idx <= currentStep ? stepHeights[idx] : 0
          },
          ref: function ref(node) {
            return _this3.stepDomNodes[idx] = node;
          },
          key: "step-".concat(idx)
        }, _react.default.createElement(_BotText.default, null, _react.default.createElement("span", {
          style: stepStyle
        }, step)));
      }), _react.default.createElement("div", null, !last && _react.default.createElement(_Button.default, {
        alt: true,
        busy: transitioning,
        ref: function ref(_ref) {
          _this3.button = _ref;
        },
        onClick: function onClick() {
          if (!transitioning) _this3.next();
        }
      }, nextButtonLabel), last && _react.default.createElement(_Button.default, {
        primary: true,
        busy: transitioning,
        ref: function ref(_ref2) {
          _this3.button = _ref2;
        },
        onClick: function onClick() {
          if (!transitioning) _this3.onComplete();
        }
      }, doneButtonLabel)));
    }
  }]);
  return TrainingGuide;
}(_react.Component);

exports.default = TrainingGuide;
TrainingGuide.propTypes = {
  steps: _propTypes.default.array.isRequired,
  nextButtonLabel: _propTypes.default.string.isRequired,
  doneButtonLabel: _propTypes.default.string.isRequired,
  onComplete: _propTypes.default.func.isRequired,
  onboardingComplete: _propTypes.default.bool.isRequired
};
TrainingGuide.defaultProps = {
  nextButtonLabel: 'Next',
  doneButtonLabel: 'Done',
  onboardingComplete: false
};