"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clientMiddleware;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

function clientMiddleware(client) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    // eslint-disable-line
    return function (next) {
      return function (action) {
        var _getState = getState(),
            auth = _getState.auth;

        if (auth && auth.jwt) {
          client.setJwt(auth.jwt);
        }

        if (typeof action === 'function') {
          return action(dispatch, getState, next, client);
        }

        var promise = action.promise,
            types = action.types,
            rest = (0, _objectWithoutProperties2.default)(action, ["promise", "types"]);

        if (!promise) {
          return next(action);
        }

        var _types = (0, _slicedToArray2.default)(types, 3),
            REQUEST = _types[0],
            SUCCESS = _types[1],
            FAILURE = _types[2];

        next((0, _objectSpread2.default)({}, rest, {
          type: REQUEST
        }));
        var actionPromise = promise(client, auth);
        actionPromise.then(function (result) {
          return next((0, _objectSpread2.default)({}, rest, {
            result: result,
            type: SUCCESS
          }));
        }, function (error) {
          return next((0, _objectSpread2.default)({}, rest, {
            error: error,
            type: FAILURE
          }));
        }).catch(function (error) {
          console.log('MIDDLEWARE ERROR:', error);
          next((0, _objectSpread2.default)({}, rest, {
            error: error,
            type: FAILURE
          }));
        });
        return actionPromise;
      };
    };
  };
}