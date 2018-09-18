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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var BotText =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BotText, _Component);

  function BotText() {
    (0, _classCallCheck2.default)(this, BotText);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BotText).apply(this, arguments));
  }

  (0, _createClass2.default)(BotText, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.default.createElement("div", {
        className: "bot__text"
      }, children);
    }
  }]);
  return BotText;
}(_react.Component);

exports.default = BotText;