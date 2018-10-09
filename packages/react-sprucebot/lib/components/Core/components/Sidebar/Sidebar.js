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

var _classnames = _interopRequireDefault(require("classnames"));

var _SidebarExpander = _interopRequireDefault(require("./components/SidebarExpander/SidebarExpander"));

var _SidebarItem = _interopRequireWildcard(require("./components/SidebarItem/SidebarItem"));

var _SidebarFooter = _interopRequireDefault(require("./components/SidebarFooter/SidebarFooter"));

var Sidebar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Sidebar, _Component);

  function Sidebar() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Sidebar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Sidebar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isExpanded: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleExpanded", function () {
      _this.setState(function (prevState) {
        return {
          isExpanded: !prevState.isExpanded
        };
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Sidebar, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      // NOTE: Make sure the sidebar is expanded when the Hamburger is used
      if (newProps.sidebarIsVisible && !this.props.sidebarIsVisible) {
        this.setState({
          isExpanded: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isExpanded = this.state.isExpanded;
      var _this$props = this.props,
          items = _this$props.items,
          forceCloseSidebar = _this$props.forceCloseSidebar;
      return _react.default.createElement("aside", {
        className: (0, _classnames.default)('sidebar', {
          'sidebar--is-collapsed': !isExpanded
        })
      }, _react.default.createElement(_SidebarExpander.default, {
        toggleExpanded: this.toggleExpanded,
        isExpanded: isExpanded,
        forceCloseSidebar: forceCloseSidebar
      }), _react.default.createElement("ul", {
        className: "sidebar__inner"
      }, items.map(function (item, idx) {
        return _react.default.createElement(_SidebarItem.default, (0, _extends2.default)({
          key: idx
        }, item));
      })), _react.default.createElement(_SidebarFooter.default, null));
    }
  }]);
  return Sidebar;
}(_react.Component);

exports.default = Sidebar;
(0, _defineProperty2.default)(Sidebar, "defaultProps", {
  sidebarIsVisible: false
});