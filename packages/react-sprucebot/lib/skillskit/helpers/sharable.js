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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _default = function _default(config, Sharable) {
  var actionGo = function actionGo(_ref) {
    var actions = _ref.actions,
        _ref$internal = _ref.internal,
        internal = _ref$internal === void 0 ? false : _ref$internal;
    var newActions = false;

    if (!internal && config && config.actionsToEvents) {
      newActions = {};
      Object.keys(config.actionsToEvents).map(function (namespace) {
        //build namespace
        newActions[namespace] = {};
        Object.keys(config.actionsToEvents[namespace]).map(function (action) {
          //save event
          var event = config.actionsToEvents[namespace][action];

          newActions[namespace][action] =
          /*#__PURE__*/
          function () {
            var _ref2 = (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee(payload) {
              var response;
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return actions.sharable.emitEvent(event, payload);

                    case 2:
                      response = _context.sent;
                      return _context.abrupt("return", response.results);

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }();

          return {
            event: event,
            action: action
          };
        });
      });
    }

    return (0, _objectSpread2.default)({}, actions, {}, newActions);
  };

  return (
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(SharableWrapper, _Component);

      function SharableWrapper() {
        (0, _classCallCheck2.default)(this, SharableWrapper);
        return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SharableWrapper).apply(this, arguments));
      }

      (0, _createClass2.default)(SharableWrapper, [{
        key: "render",
        value: function render() {
          var props = (0, _extends2.default)({}, this.props);
          return _react.default.createElement(Sharable, (0, _extends2.default)({}, props, {
            actions: actionGo(props)
          }));
        }
      }]);
      return SharableWrapper;
    }(_react.Component)
  );
};

exports.default = _default;