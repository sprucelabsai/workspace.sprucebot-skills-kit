"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _ButtonGroup = _interopRequireDefault(require("../ButtonGroup/ButtonGroup"));

var _Toast = _interopRequireDefault(require("./Toast"));

var _ToastWrapper = _interopRequireDefault(require("./components/ToastWrapper/ToastWrapper"));

var stories = (0, _react2.storiesOf)('Toast', module);

var ToastExample =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ToastExample, _Component);

  function ToastExample() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ToastExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ToastExample)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      toasts: []
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "addToast", function (kind) {
      var _this$props = _this.props,
          showUndo = _this$props.showUndo,
          text = _this$props.text,
          headline = _this$props.headline;

      _this.setState(function (prevState) {
        var newToasts = (0, _toConsumableArray2.default)(prevState.toasts);
        newToasts.push({
          headline: headline,
          text: text,
          kind: kind,
          onUndo: showUndo ? function () {
            return console.log('Undo');
          } : null
        });
        return {
          toasts: newToasts
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "removeToast", function (idx) {
      _this.setState(function (prevState) {
        var toasts = (0, _toConsumableArray2.default)(prevState.toasts);
        var removedToast = toasts.splice(idx, 1);
        return {
          toasts: toasts
        };
      });
    });
    return _this;
  }

  (0, _createClass2.default)(ToastExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var children = this.props.children;
      var toasts = this.state.toasts;
      return _react.default.createElement("div", null, _react.default.createElement(_ButtonGroup.default, {
        actions: [{
          kind: 'secondary',
          text: 'Add Toast',
          onClick: function onClick() {
            return _this2.addToast('neutral');
          }
        }, {
          kind: 'secondary',
          text: 'Add Happy Toast',
          onClick: function onClick() {
            return _this2.addToast('positive');
          }
        }, {
          kind: 'secondary',
          text: 'Add Sad Toast',
          onClick: function onClick() {
            return _this2.addToast('negative');
          }
        }]
      }), _react.default.createElement(_ToastWrapper.default, {
        toasts: toasts,
        handleRemove: this.removeToast
      }));
    }
  }]);
  return ToastExample;
}(_react.Component);

stories.addDecorator(_react3.withKnobs);
stories.add('Toast', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(ToastExample, {
    headline: (0, _react3.text)('headline', 'Neat'),
    text: (0, _react3.text)('text', 'Something just happened and it was fine'),
    showUndo: (0, _react3.boolean)('showUndo', false)
  }));
});