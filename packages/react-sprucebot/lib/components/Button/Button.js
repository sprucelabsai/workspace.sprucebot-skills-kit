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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _Loader = _interopRequireDefault(require("../Loader/Loader"));

var _router = _interopRequireDefault(require("next/router"));

var _link = _interopRequireDefault(require("next/link"));

var Button =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Button, _Component);

  function Button(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Button);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Button).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClick", function (e) {
      var busy = _this.state.busy;
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick,
          href = _this$props.href,
          target = _this$props.target,
          router = _this$props.router;

      if (busy || disabled) {
        return;
      }

      if (onClick) {
        onClick(e);
      } else if (href && (!target || target === 'self')) {
        _this.setState({
          busy: true
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderView", function () {
      var busy = _this.state.busy;
      var _this$props2 = _this.props,
          hideLoader = _this$props2.hideLoader,
          loaderDark = _this$props2.loaderDark,
          loaderStyle = _this$props2.loaderStyle,
          children = _this$props2.children;

      if (busy && !hideLoader) {
        return _react.default.createElement(_Loader.default, {
          dark: loaderDark ? true : false,
          fullWidth: false,
          loaderStyle: loaderStyle
        });
      }

      return children;
    });
    _this.state = {
      busy: !!props.busy
    };
    return _this;
  }

  (0, _createClass2.default)(Button, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (typeof nextProps.busy !== 'undefined') {
        this.setState({
          busy: nextProps.busy
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          tag = _this$props3.tag,
          disabled = _this$props3.disabled,
          primary = _this$props3.primary,
          secondary = _this$props3.secondary,
          alt = _this$props3.alt,
          link = _this$props3.link,
          caution = _this$props3.caution,
          className = _this$props3.className,
          children = _this$props3.children,
          submit = _this$props3.submit,
          remove = _this$props3.remove,
          toggle = _this$props3.toggle,
          router = _this$props3.router,
          loaderDark = _this$props3.loaderDark,
          loaderStyle = _this$props3.loaderStyle,
          propBusy = _this$props3.busy,
          hideLoader = _this$props3.hideLoader,
          left = _this$props3.left,
          right = _this$props3.right,
          href = _this$props3.href,
          type = _this$props3.type,
          props = (0, _objectWithoutProperties2.default)(_this$props3, ["tag", "disabled", "primary", "secondary", "alt", "link", "caution", "className", "children", "submit", "remove", "toggle", "router", "loaderDark", "loaderStyle", "busy", "hideLoader", "left", "right", "href", "type"]);
      var busy = this.state.busy;

      if (primary && secondary) {
        return _react.default.createElement("button", {
          className: "btn__primary"
        }, "'primary' and 'secondary' are mutually exclusive.");
      } else if (primary && alt) {
        return _react.default.createElement("button", {
          className: "btn__primary"
        }, "'primary' and 'alt' are mutually exclusive.");
      }

      var btnClass = primary ? 'btn__primary' : '';
      btnClass += secondary ? 'btn__secondary' : '';
      btnClass += alt && btnClass.length > 0 ? '__alt' : '';
      btnClass += alt && btnClass.length === 0 ? 'btn__alt' : '';
      btnClass += disabled ? ' btn__disabled' : '';
      btnClass += caution ? ' btn__caution' : '';
      btnClass += link ? ' btn__link' : '';
      btnClass += toggle ? 'btn__toggle' : '';

      if (remove) {
        btnClass = 'btn__remove';
      } // if this button has a href or is a "remove" button, make it an anchor


      var Tag;
      var usingLink = false;

      if (href || remove) {
        Tag = _router.default.router ? _link.default : 'a';
        usingLink = _router.default.router;
      } else if (tag === 'button') {
        Tag = 'button';
      } else {
        Tag = tag;
      }

      if (usingLink) {
        return _react.default.createElement(_link.default, (0, _extends2.default)({
          href: href
        }, props), _react.default.createElement("a", {
          onClick: this.onClick,
          className: "btn ".concat(btnClass, " ").concat(className || '')
        }, _react.default.createElement("span", {
          className: "wrapper"
        }, this.renderView())));
      }

      return _react.default.createElement(Tag, (0, _extends2.default)({
        className: "btn ".concat(btnClass, " ").concat(className || ''),
        onClick: this.onClick,
        disabled: disabled,
        busy: busy,
        href: href
      }, props, {
        type: type
      }), _react.default.createElement("span", {
        className: "wrapper"
      }, this.renderView()));
    }
  }]);
  return Button;
}(_react.Component);

exports.default = Button;
(0, _defineProperty2.default)(Button, "defaultProps", {
  tag: 'button',
  primary: false,
  alt: false,
  secondary: false,
  busy: false,
  remove: false,
  toggle: false,
  type: 'button'
});