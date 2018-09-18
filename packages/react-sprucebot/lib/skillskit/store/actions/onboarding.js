"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.didOnboarding = didOnboarding;
exports.finishOnboarding = finishOnboarding;
exports.FINISH_ONBOARDING_ERROR = exports.FINISH_ONBOARDING_SUCCESS = exports.FINISH_ONBOARDING_REQUEST = exports.DID_ONBOARDING_ERROR = exports.DID_ONBOARDING_SUCCESS = exports.DID_ONBOARDING_REQUEST = void 0;
var DID_ONBOARDING_REQUEST = 'onboarding/DID_ONBOARDING_REQUEST';
exports.DID_ONBOARDING_REQUEST = DID_ONBOARDING_REQUEST;
var DID_ONBOARDING_SUCCESS = 'onboarding/DID_ONBOARDING_SUCCESS';
exports.DID_ONBOARDING_SUCCESS = DID_ONBOARDING_SUCCESS;
var DID_ONBOARDING_ERROR = 'onboarding/DID_ONBOARDING_ERROR';
exports.DID_ONBOARDING_ERROR = DID_ONBOARDING_ERROR;
var FINISH_ONBOARDING_REQUEST = 'onboarding/FINISH_ONBOARDING_REQUEST';
exports.FINISH_ONBOARDING_REQUEST = FINISH_ONBOARDING_REQUEST;
var FINISH_ONBOARDING_SUCCESS = 'onboarding/FINISH_ONBOARDING_SUCCESS';
exports.FINISH_ONBOARDING_SUCCESS = FINISH_ONBOARDING_SUCCESS;
var FINISH_ONBOARDING_ERROR = 'onboarding/FINISH_ONBOARDING_ERROR';
exports.FINISH_ONBOARDING_ERROR = FINISH_ONBOARDING_ERROR;

function didOnboarding() {
  return {
    types: [DID_ONBOARDING_REQUEST, DID_ONBOARDING_SUCCESS, DID_ONBOARDING_ERROR],
    promise: function promise(client, auth) {
      return client.get("/api/1.0/guest/onboarding.json");
    }
  };
}

function finishOnboarding() {
  return {
    types: [FINISH_ONBOARDING_REQUEST, FINISH_ONBOARDING_SUCCESS, FINISH_ONBOARDING_ERROR],
    promise: function promise(client, auth) {
      return client.post("/api/1.0/guest/onboarding.json");
    }
  };
}