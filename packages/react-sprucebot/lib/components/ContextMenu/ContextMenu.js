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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var ContextMenu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ContextMenu, _Component);

  function ContextMenu() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ContextMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ContextMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isVisible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleToggle", function () {
      _this.setState(function (prevState) {
        return {
          isVisible: !prevState.isVisible
        };
      });
    });
    return _this;
  }

  (0, _createClass2.default)(ContextMenu, [{
    key: "render",
    value: function render() {
      var isVisible = this.state.isVisible;
      var _this$props = this.props,
          actions = _this$props.actions,
          leftAlign = _this$props.leftAlign;
      var buttonClass = (0, _classnames.default)('context-menu', {
        'context-menu--is-visible': isVisible
      });
      var menuClass = (0, _classnames.default)('context-menu__menu', {
        'context-menu__menu-left': leftAlign
      });
      return _react.default.createElement("div", {
        className: buttonClass
      }, _react.default.createElement(_Button.default, {
        kind: "simple",
        className: "context-menu__button",
        onClick: this.handleToggle,
        text: isVisible ? 'Hide' : 'Show'
      }), isVisible && _react.default.createElement("div", {
        className: menuClass
      }, actions.map(function (action) {
        return _react.default.createElement(_Button.default, {
          key: action.text,
          kind: "simple",
          text: action.text
        });
      })));
    }
  }]);
  return ContextMenu;
}(_react.Component);

exports.default = ContextMenu;
(0, _defineProperty2.default)(ContextMenu, "defaultProps", {
  leftAlign: false
});