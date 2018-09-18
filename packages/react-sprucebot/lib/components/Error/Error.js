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

var _Dialog = _interopRequireDefault(require("../Dialog/Dialog"));

var _BotText = _interopRequireDefault(require("../BotText/BotText"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Error =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Error, _Component);

  function Error() {
    (0, _classCallCheck2.default)(this, Error);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Error).apply(this, arguments));
  }

  (0, _createClass2.default)(Error, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          errorMessage = _this$props.errorMessage,
          closeErrorDialog = _this$props.closeErrorDialog,
          closeErrorDialogTxt = _this$props.closeErrorDialogTxt;
      return _react.default.createElement(_Dialog.default, {
        show: !!errorMessage,
        onTapClose: closeErrorDialog
      }, _react.default.createElement(_BotText.default, null, errorMessage), _react.default.createElement(_Button.default, {
        onClick: closeErrorDialog
      }, closeErrorDialogTxt));
    }
  }]);
  return Error;
}(_react.Component);

exports.default = Error;
Error.propTypes = {
  errorMessage: _propTypes.default.string,
  closeErrorDialog: _propTypes.default.func.isRequired,
  closeErrorDialogTxt: _propTypes.default.string.isRequired
};