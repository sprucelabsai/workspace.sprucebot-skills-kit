"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;
exports.default = withStore;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _nextReduxWrapper = _interopRequireDefault(require("next-redux-wrapper"));

var _actions = _interopRequireDefault(require("./actions"));

var _reducers = _interopRequireDefault(require("./reducers"));

var _apiClient = _interopRequireDefault(require("./apiClient"));

var _clientApiMiddleware = _interopRequireDefault(require("./middleware/clientApiMiddleware"));

var _loggerMiddleware = _interopRequireDefault(require("./middleware/loggerMiddleware"));

var required = function required(name) {
  throw new Error("".concat(name, " is required to createStore"));
};

function createStore(_ref) {
  var _ref$reducers = _ref.reducers,
      reducers = _ref$reducers === void 0 ? {} : _ref$reducers,
      config = _ref.config;
  return function (initialState) {
    // Allow for redux debugger
    // https://github.com/zalmoxisus/redux-devtools-extension#usage
    var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
    var client = (0, _apiClient.default)(config.SERVER_HOST, {
      allowSelfSignedCerts: config.INTERFACE_SSL_ALLOW_SELF_SIGNED
    });
    var enhancer = composeEnhancers((0, _redux.applyMiddleware)((0, _clientApiMiddleware.default)(client), (0, _loggerMiddleware.default)()));
    var allReducers = (0, _objectSpread2.default)({}, _reducers.default, reducers);
    var store = (0, _redux.createStore)((0, _redux.combineReducers)(allReducers), (0, _objectSpread2.default)({}, initialState, {
      config: config
    }), enhancer);

    if (module.hot) {
      // Enable hot module replacement for reducers
      module.hot.accept(function () {
        var nextRootReducer = require('./reducers/index').default;

        store.replaceReducer(nextRootReducer);
      });
    }

    return store;
  };
}

var mapStateToProps = function mapStateToProps(state) {
  var map = {};

  for (var k in state) {
    map[k] = state[k] || {};
  }

  return map;
};
/**
 * Higher order component
 * Decorates Component with props
 *  {store, client}
 *
 * @export
 * @param {any} Component
 * @returns
 */


function withStore(Component, _ref2) {
  var actions = _ref2.actions,
      reducers = _ref2.reducers,
      config = _ref2.config;
  var unboundActions = (0, _objectSpread2.default)({}, _actions.default, actions);

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    var map = {};

    for (var k in unboundActions) {
      map[k] = (0, _redux.bindActionCreators)(unboundActions[k], dispatch);
    }

    return {
      actions: map
    };
  };

  return (0, _nextReduxWrapper.default)({
    createStore: createStore({
      reducers: reducers,
      config: config
    }),
    storeKey: '__SPRUCEBOT_SKILL_STORE__',
    debug: false,
    mapStateToProps: mapStateToProps,
    mapDispatchToProps: mapDispatchToProps
  })(Component);
}