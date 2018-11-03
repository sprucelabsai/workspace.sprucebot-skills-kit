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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ModalHeader = _interopRequireDefault(require("./components/ModalHeader/ModalHeader"));

var _ModalBody = _interopRequireDefault(require("./components/ModalBody/ModalBody"));

var _ModalFooter = _interopRequireDefault(require("./components/ModalFooter/ModalFooter"));

var Modal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Modal, _Component);

  function Modal() {
    (0, _classCallCheck2.default)(this, Modal);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Modal).apply(this, arguments));
  }

  (0, _createClass2.default)(Modal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isOpen = _this$props.isOpen,
          isSmall = _this$props.isSmall,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["isOpen", "isSmall"]);
      var modalClassName = (0, _classnames.default)('modal', {
        'modal-small': isSmall
      });
      return _react.default.createElement(_reactModal.default, (0, _extends2.default)({
        isOpen: isOpen,
        overlayClassName: "modal-overlay",
        className: modalClassName
      }, rest));
    }
  }]);
  return Modal;
}(_react.Component);

exports.default = Modal;
(0, _defineProperty2.default)(Modal, "Header", _ModalHeader.default);
(0, _defineProperty2.default)(Modal, "Body", _ModalBody.default);
(0, _defineProperty2.default)(Modal, "Footer", _ModalFooter.default);
(0, _defineProperty2.default)(Modal, "defaultProps", {
  isSmall: false
});