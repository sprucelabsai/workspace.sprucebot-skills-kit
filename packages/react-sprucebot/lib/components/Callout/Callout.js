"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Callout =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Callout, _Component);

  function Callout() {
    (0, _classCallCheck2.default)(this, Callout);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Callout).apply(this, arguments));
  }

  (0, _createClass2.default)(Callout, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tag = _this$props.tag,
          children = _this$props.children,
          className = _this$props.className,
          on = _this$props.on,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["tag", "children", "className", "on"]);
      var Tag = tag;
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "callout_underlay ".concat(on ? 'on' : 'off')
      }), _react.default.createElement(Tag, (0, _extends2.default)({
        className: "callout ".concat(className || '', " ").concat(on ? 'on' : 'off')
      }, props), children));
    }
  }]);
  return Callout;
}(_react.Component);

exports.default = Callout;
Callout.propTypes = {
  tag: _propTypes.default.string,
  on: _propTypes.default.bool
};
Callout.defaultProps = {
  tag: 'div',
  on: true
};