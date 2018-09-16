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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Typography = require("../Typography/Typography");

var Input =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Input, _Component);

  function Input(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Input).call(this, props));
    _this.state = {
      hasValue: !!(props.value || props.defaultValue)
    };
    return _this;
  }

  (0, _createClass2.default)(Input, [{
    key: "onChange",
    value: function onChange(e) {
      this.setState({
        hasValue: this.input.value.length > 0
      });

      if (this.props.onChange) {
        this.props.onChange(this.input.value, e);
      }

      if (this.props.multiline) {
        this.sizeTextarea();
      }
    }
  }, {
    key: "sizeTextarea",
    value: function sizeTextarea() {
      var _this2 = this;

      if (typeof window !== 'undefined') {
        var style = window.getComputedStyle(this.input);
        var heightOffset = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom); // Fix when a textarea is not on document body and heightOffset is Not a Number

        if (isNaN(heightOffset)) {
          heightOffset = 0;
        }

        var height = style.height;
        this.input.style.transition = 'none';
        this.input.style.height = '1px';
        var scrollHeight = this.input.scrollHeight;
        this.input.style.height = height;

        if (this._sizeTimeout) {
          clearTimeout(this._sizeTimeout);
        }

        this._sizeTimeout = setTimeout(function () {
          if (_this2.input) {
            _this2.input.style.transition = _this2._textAreaTransition;
            _this2.input.style.height = scrollHeight + heightOffset + 'px';
          }
        }, 250);
      }
    }
  }, {
    key: "handleMultiline",
    value: function handleMultiline(props) {
      if (props.multiline) {
        this._textAreaTransition = this.input.style.transition;
        this.sizeTextarea();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      setTimeout(function () {
        _this3.handleMultiline(_this3.props);
      }, 10);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.handleMultiline(this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var props = Object.assign({}, this.props);
      var error = props.error,
          label = props.label,
          finePrint = props.finePrint,
          multiline = props.multiline,
          placeholder = props.placeholder;
      var tag = props.tag;
      var labelClass = label && !placeholder || label && this.state.hasValue ? 'js-show-label' : '';
      delete props.error;
      delete props.label;
      delete props.onChange;
      delete props.finePrint;
      delete props.tag;
      delete props.multiline; // inputs cannot have children

      if (multiline) {
        tag = 'textarea';
      } else if (tag === 'input') {
        delete props.children;
      } // if this is an empty input, has a label, but no placeholder
      // make the placeholder match the label and hide the label


      if (tag === 'input' && label && !props.placeholder && !this.state.hasValue) {
        props.placeholder = label;
        labelClass = '';
      }

      var Tag = tag;
      return _react.default.createElement("div", {
        className: "input__wrapper"
      }, label && _react.default.createElement("span", {
        className: 'input__mini__label ' + labelClass
      }, label), _react.default.createElement(Tag, (0, _extends2.default)({}, props, {
        onChange: this.onChange.bind(this),
        ref: function ref(_ref) {
          _this4.input = _ref;
        }
      })), error && _react.default.createElement("span", {
        className: "input__error error-is-visible"
      }, error), finePrint && _react.default.createElement(_Typography.Paragraph, {
        fine: true
      }, finePrint));
    }
  }, {
    key: "value",
    get: function get() {
      return this.input.value;
    }
  }]);
  return Input;
}(_react.Component);

exports.default = Input;
Input.propTypes = {
  finePrint: _propTypes.default.string,
  label: _propTypes.default.string,
  error: _propTypes.default.string,
  tag: _propTypes.default.string,
  multiline: _propTypes.default.bool
};
Input.defaultProps = {
  tag: 'input',
  multiline: false
};