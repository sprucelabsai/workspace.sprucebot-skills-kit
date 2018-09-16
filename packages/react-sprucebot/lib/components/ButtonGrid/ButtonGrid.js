"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridButton = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var GridButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(GridButton, _Component);

  function GridButton() {
    (0, _classCallCheck2.default)(this, GridButton);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GridButton).apply(this, arguments));
  }

  (0, _createClass2.default)(GridButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          selected = _this$props.selected,
          children = _this$props.children,
          subtitle = _this$props.subtitle,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["className", "selected", "children", "subtitle"]);
      return _react.default.createElement("a", (0, _extends2.default)({
        className: "btn ".concat(className || '', " ").concat(selected ? 'selected' : '')
      }, rest), _react.default.createElement("span", null, children, subtitle && _react.default.createElement("br", null), subtitle && _react.default.createElement("small", null, subtitle)));
    }
  }]);
  return GridButton;
}(_react.Component);

exports.GridButton = GridButton;
GridButton.propTypes = {
  selected: _propTypes.default.bool,
  subtitle: _propTypes.default.string
};
GridButton.defaultProps = {
  selected: false
};