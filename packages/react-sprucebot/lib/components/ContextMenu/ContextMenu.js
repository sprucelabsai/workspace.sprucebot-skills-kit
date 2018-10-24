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

var _velocityReact = require("velocity-react");

var _Button = _interopRequireWildcard(require("../Button/Button"));

var _ButtonGroup = _interopRequireDefault(require("../ButtonGroup/ButtonGroup"));

var Icon = function Icon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M3.375 14.648a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25zM20.625 14.648a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25zM12 14.648a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

Icon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var ContextMenu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ContextMenu, _Component);

  function ContextMenu() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ContextMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ContextMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isVisible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClickOutside", function (e) {
      if (e.target.contains(_this.ref)) {
        _this.setState({
          isVisible: false
        }, function () {
          return _this.manageListeners();
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleEscape", function (e) {
      if (e.key === 'Escape') {
        _this.setState({
          isVisible: false
        }, function () {
          return _this.manageListeners();
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleToggle", function () {
      _this.setState(function (prevState) {
        return {
          isVisible: !prevState.isVisible
        };
      }, function () {
        return _this.manageListeners();
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "manageListeners", function () {
      if (typeof window !== 'undefined') {
        if (_this.state.isVisible) {
          window.addEventListener('click', _this.handleClickOutside, false);
          window.addEventListener('keyup', _this.handleEscape, false);
        } else {
          window.removeEventListener('click', _this.handleClickOutside, false);
          window.removeEventListener('keyup', _this.handleEscape, false);
        }
      }
    });
    return _this;
  }

  (0, _createClass2.default)(ContextMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var isVisible = this.state.isVisible;
      var _this$props = this.props,
          actions = _this$props.actions,
          isLeftAligned = _this$props.isLeftAligned,
          isSimple = _this$props.isSimple,
          size = _this$props.size,
          icon = _this$props.icon;
      var buttonClass = (0, _classnames.default)('context-menu', {
        'context-menu--is-visible': isVisible
      });
      var menuClass = (0, _classnames.default)('context-menu__menu', {
        'context-menu__menu-left': isLeftAligned,
        'context-menu__menu-large': size === 'large'
      });
      return _react.default.createElement("div", {
        className: buttonClass,
        ref: function ref(_ref) {
          return _this2.ref = _ref;
        }
      }, _react.default.createElement(_Button.default, {
        kind: isSimple ? 'simple' : '',
        className: "context-menu__button",
        onClick: this.handleToggle,
        icon: icon ? _react.default.cloneElement(icon, {
          className: 'btn__line-icon'
        }) : _react.default.createElement(Icon, {
          className: "btn__line-icon"
        })
      }), _react.default.createElement(_velocityReact.VelocityTransitionGroup, {
        enter: {
          animation: {
            opacity: 1,
            translateY: '4px'
          },
          duration: 200
        },
        leave: {
          animation: {
            opacity: 0,
            translateY: '12px'
          },
          duration: 200
        }
      }, isVisible && _react.default.createElement("div", {
        className: menuClass
      }, _react.default.createElement(_ButtonGroup.default, {
        kind: "floating",
        actions: actions.map(function (action) {
          var btnAction = Object.assign({}, action);
          btnAction.className = 'context-menu__item-btn';
          return btnAction;
        })
      }))));
    }
  }]);
  return ContextMenu;
}(_react.Component);

exports.default = ContextMenu;
(0, _defineProperty2.default)(ContextMenu, "defaultProps", {
  isLeftAligned: false
});