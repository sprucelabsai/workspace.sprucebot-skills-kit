"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Select = _interopRequireDefault(require("../Select/Select"));

var DevControls =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DevControls, _Component);

  function DevControls(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DevControls);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DevControls).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChangeRole", function (role) {
      window.location.href = "/dev/".concat(role, "/redirect");
    });
    _this.state = {
      loaded: false
    };
    return _this;
  }

  (0, _createClass2.default)(DevControls, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        loaded: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      // don't render until loaded
      if (!this.state.loaded) {
        return null;
      }

      var className = this.props.className;
      var props = Object.assign({}, this.props);
      var auth = props.auth; // cleanup props

      delete props.auth; //easy bail if not auth'ed

      if (!auth || auth.error || !auth.role) {
        return _react.default.createElement("div", (0, _extends2.default)({}, props, {
          className: "dev_controls__no_auth ".concat(className || '')
        }), _react.default.createElement("div", {
          className: "error"
        }, "You're gonna wanna be logged in for this. \uD83D\uDE4F"));
      }

      return _react.default.createElement("div", (0, _extends2.default)({}, props, {
        className: "dev_controls ".concat(className || '')
      }), _react.default.createElement(_Select.default, {
        className: "select",
        label: "Jump to Role",
        onChange: this.onChangeRole
      }, _react.default.createElement("option", {
        value: ""
      }, "Current: ".concat(auth.role)), _react.default.createElement("option", {
        value: "owner"
      }, "Owner"), _react.default.createElement("option", {
        value: "teammate"
      }, "Teammate"), _react.default.createElement("option", {
        value: "guest"
      }, "Guest")));
    }
  }]);
  return DevControls;
}(_react.Component);

DevControls.propTypes = {
  auth: _propTypes.default.object
};
var _default = DevControls;
exports.default = _default;