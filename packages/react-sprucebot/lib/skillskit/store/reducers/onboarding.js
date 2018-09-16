"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _onboarding = require("../actions/onboarding");

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _onboarding.DID_ONBOARDING_REQUEST:
      return (0, _objectSpread2.default)({}, state, {
        onboardingError: undefined,
        onboardingLoading: true,
        onboardingLoaded: false
      });

    case _onboarding.DID_ONBOARDING_SUCCESS:
      return (0, _objectSpread2.default)({}, state, {
        onboardingComplete: action.result.finishedOnboarding,
        onboardingError: undefined,
        onboardingLoading: false,
        onboardingLoaded: true
      });

    case _onboarding.DID_ONBOARDING_ERROR:
      return (0, _objectSpread2.default)({}, state, {
        onboardingError: action.error,
        onboardingLoading: false,
        onboardingLoaded: false
      });

    case _onboarding.FINISH_ONBOARDING_REQUEST:
      return (0, _objectSpread2.default)({}, state, {
        onboardingError: undefined,
        onboardingSaving: true,
        onboardingSaved: false
      });

    case _onboarding.FINISH_ONBOARDING_SUCCESS:
      return (0, _objectSpread2.default)({}, state, {
        onboardingComplete: action.result.finishedOnboarding,
        onboardingError: undefined,
        onboardingSaving: false,
        onboardingSaved: true
      });

    case _onboarding.FINISH_ONBOARDING_ERROR:
      return (0, _objectSpread2.default)({}, state, {
        onboardingError: action.error,
        onboardingSaving: false,
        onboardingSaved: false
      });

    default:
      return state;
  }
}