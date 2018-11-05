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

var _classnames = _interopRequireDefault(require("classnames"));

var _UserAvatar = _interopRequireDefault(require("../../../Avatar/UserAvatar"));

var TeammateHeader =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TeammateHeader, _Component);

  function TeammateHeader(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TeammateHeader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TeammateHeader).call(this, props));
    _this.domNodeRef = _react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(TeammateHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          users = _this$props.users,
          onScroll = _this$props.onScroll,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["users", "onScroll"]);
      return _react.default.createElement("div", (0, _extends2.default)({
        className: "bigcalendar__teammate-header"
      }, props), _react.default.createElement("div", {
        className: "inner",
        ref: this.domNodeRef,
        onScroll: onScroll
      }, users.map(function (u) {
        return _react.default.createElement("div", {
          key: "teammate-".concat(u.id),
          className: "teammate"
        }, _react.default.createElement(_UserAvatar.default, {
          user: u
        }), _react.default.createElement("div", {
          className: ""
        }, _react.default.createElement("p", null, u.name)));
      })));
    }
  }]);
  return TeammateHeader;
}(_react.Component);

var _default = TeammateHeader;
exports.default = _default;