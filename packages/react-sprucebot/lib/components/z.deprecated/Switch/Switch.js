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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Switch =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Switch, _Component);

  function Switch(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Switch);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Switch).call(this, props));
    _this.state = {
      on: !!props.on
    };
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(Switch, [{
    key: "onChange",
    value: function onChange(e) {
      var _this2 = this;

      // toggle on state of button
      this.setState(function (prevState, props) {
        // new 'on' state
        var on = !prevState.on; // let any callbacks know of state change

        if (_this2.props.onChange) {
          _this2.props.onChange(on, e);
        }

        return {
          on: on
        };
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        on: nextProps.on
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement("div", {
        className: "switch switch".concat(this.props.on ? ' on' : '')
      }, _react.default.createElement("button", {
        onClick: function onClick() {
          return _this3.onChange();
        },
        type: "button"
      }, _react.default.createElement("span", null, this.props.on ? 'Enabled' : 'Disabled')));
    }
  }]);
  return Switch;
}(_react.Component);

exports.default = Switch;
Switch.propTypes = {
  on: _propTypes.default.bool,
  onChange: _propTypes.default.func
};
Switch.defaultProps = {
  on: false
};