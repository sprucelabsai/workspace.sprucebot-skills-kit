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

var _IconButton = _interopRequireDefault(require("../IconButton/IconButton"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var HelpButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(HelpButton, _Component);

  function HelpButton() {
    (0, _classCallCheck2.default)(this, HelpButton);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HelpButton).apply(this, arguments));
  }

  (0, _createClass2.default)(HelpButton, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          title = _this$props.title,
          _this$props$body = _this$props.body,
          body = _this$props$body === void 0 ? '' : _this$props$body;
      return React.createElement(_IconButton.default, {
        onClick: function onClick() {
          _this.props.skill.showHelp({
            title: title,
            body: body
          });
        }
      }, "help");
    }
  }]);
  return HelpButton;
}(_react.Component);

exports.default = HelpButton;
HelpButton.propTypes = {
  title: _propTypes.default.string.isRequired,
  body: _propTypes.default.string
};