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

var _HeaderPrimary = _interopRequireDefault(require("../Core/components/HeaderPrimary/HeaderPrimary"));

var _Sidebar = _interopRequireDefault(require("../Core/components/Sidebar/Sidebar"));

var View =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(View, _Component);

  function View() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, View);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(View)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      sidebarIsVisible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleSidebarVisibility", function () {
      _this.setState(function (prevState) {
        return {
          sidebarIsVisible: !prevState.sidebarIsVisible
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "forceCloseSidebar", function () {
      _this.setState({
        sidebarIsVisible: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(View, [{
    key: "render",
    value: function render() {
      var sidebarIsVisible = this.state.sidebarIsVisible;
      var _this$props = this.props,
          sidebarItems = _this$props.sidebarItems,
          user = _this$props.user,
          business = _this$props.business;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('l-page-wrapper', {
          'menu--is-visible': sidebarIsVisible
        })
      }, _react.default.createElement(_Sidebar.default, {
        items: sidebarItems,
        sidebarIsVisible: sidebarIsVisible,
        forceCloseSidebar: this.forceCloseSidebar
      }), _react.default.createElement(_HeaderPrimary.default, {
        user: user,
        business: business,
        toggleSidebarVisibility: this.toggleSidebarVisibility,
        sidebarIsVisible: sidebarIsVisible
      }));
    }
  }]);
  return View;
}(_react.Component);

exports.default = View;