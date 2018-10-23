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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _Hamburger = _interopRequireDefault(require("./components/Hamburger/Hamburger"));

var _DefaultLockup = _interopRequireDefault(require("./components/DefaultLockup/DefaultLockup"));

var _UserMenu = _interopRequireDefault(require("./components/UserMenu/UserMenu"));

var _Forms = require("../../../Forms");

var _Button = _interopRequireDefault(require("../../../Button/Button"));

// TODO: The Autosuggest used here will need to be updated to hook up to the API
// and render userful results. This should probably be done as its own component
var HeaderPrimary =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(HeaderPrimary, _Component);

  function HeaderPrimary() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, HeaderPrimary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(HeaderPrimary)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isMenuExpanded: false,
      isUserMenuVisible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "hideUserMenu", function (e) {
      if (e.key === 'Escape' || e.target.contains(_this.ref)) {
        _this.setState({
          isUserMenuVisible: false
        }, function () {
          return _this.manageListeners();
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleUserMenuVisibility", function () {
      _this.setState(function (prevState) {
        return {
          isUserMenuVisible: !prevState.isUserMenuVisible
        };
      }, function () {
        return _this.manageListeners();
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "manageListeners", function () {
      if (typeof window !== 'undefined') {
        if (_this.state.isUserMenuVisible) {
          window.addEventListener('click', _this.hideUserMenu, false);
          window.addEventListener('keyup', _this.hideUserMenu, false);
        } else {
          window.removeEventListener('click', _this.hideUserMenu, false);
          window.removeEventListener('keyup', _this.hideUserMenu, false);
        }
      }
    });
    return _this;
  }

  (0, _createClass2.default)(HeaderPrimary, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isMenuExpanded = _this$state.isMenuExpanded,
          isUserMenuVisible = _this$state.isUserMenuVisible;
      var _this$props = this.props,
          user = _this$props.user,
          business = _this$props.business,
          toggleSidebarVisibility = _this$props.toggleSidebarVisibility,
          sidebarIsVisible = _this$props.sidebarIsVisible;
      return _react.default.createElement("header", {
        className: "header-primary",
        ref: function ref(_ref) {
          return _this2.ref = _ref;
        }
      }, _react.default.createElement("div", {
        className: "header-primary__left"
      }, _react.default.createElement(_Hamburger.default, {
        onClick: toggleSidebarVisibility,
        isSidebarVisible: sidebarIsVisible
      }), business ? _react.default.createElement("div", null, _react.default.createElement("p", {
        className: "header-primary__text"
      }, business.name), business.address && _react.default.createElement("p", {
        className: "header-primary__text header-primary__address"
      }, _react.default.createElement("a", {
        href: "#"
      }, business.address))) : _react.default.createElement(_DefaultLockup.default, null)), _react.default.createElement("div", {
        className: "header-primary__right"
      }, user ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Forms.Autosuggest, {
        className: "text-input-small",
        placeholder: "Search anything\u2026",
        isSmall: true,
        wrapperClassName: "header-primary__autosuggest"
      }), _react.default.createElement(_UserMenu.default, (0, _extends2.default)({
        menuIsVisible: isUserMenuVisible,
        toggleMenu: this.toggleUserMenuVisibility
      }, user))) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Button.default, {
        kind: "primary",
        isSmall: true,
        text: "Log In"
      }), _react.default.createElement(_Button.default, {
        isSmall: true,
        text: "Sign Up"
      }))));
    }
  }]);
  return HeaderPrimary;
}(_react.Component);

exports.default = HeaderPrimary;