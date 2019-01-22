"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Loader =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Loader, _Component);

  function Loader() {
    (0, _classCallCheck2.default)(this, Loader);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Loader).apply(this, arguments));
  }

  (0, _createClass2.default)(Loader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dark = _this$props.dark,
          fullWidth = _this$props.fullWidth,
          margin = _this$props.margin;
      var dotClassName = dark ? 'loader_dot_dark' : 'loader_dot';
      var fullWidthStyle = fullWidth ? {
        display: 'block',
        margin: '20px',
        textAlign: 'center'
      } : {
        margin: margin ? "".concat(margin) : 'unset'
      };
      return _react.default.createElement("span", {
        className: "loader_wrapper",
        style: (0, _objectSpread2.default)({}, fullWidthStyle, {}, this.props.loaderStyle)
      }, _react.default.createElement("span", {
        className: dotClassName
      }), _react.default.createElement("span", {
        className: dotClassName
      }), _react.default.createElement("span", {
        className: dotClassName
      }));
    }
  }]);
  return Loader;
}(_react.Component);

exports.default = Loader;
Loader.propTypes = {
  dark: _propTypes.default.bool,
  fullWidth: _propTypes.default.bool,
  loaderStyle: _propTypes.default.object
};
Loader.defaultProps = {
  dark: true,
  fullWidth: true,
  loaderStyle: {}
};