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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var CheckIconYes = function CheckIconYes(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
  }));
};

CheckIconYes.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var CheckIconNo = function CheckIconNo(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19 5v14H5V5h14zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
  }));
};

CheckIconNo.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var CheckIconMaybe = function CheckIconMaybe(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
  }));
};

CheckIconMaybe.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var Checkbox =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Checkbox, _Component);

  function Checkbox() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Checkbox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Checkbox)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isIndeterminateState: _this.props.isIndeterminate
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function () {
      _this.setState(function (prevState) {
        if (prevState.isIndeterminateState) {
          return {
            isIndeterminateState: false
          };
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Checkbox, [{
    key: "render",
    value: function render() {
      var isIndeterminateState = this.state.isIndeterminateState;
      var _this$props = this.props,
          id = _this$props.id,
          label = _this$props.label,
          postText = _this$props.postText,
          className = _this$props.className,
          isIndeterminate = _this$props.isIndeterminate,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["id", "label", "postText", "className", "isIndeterminate"]);
      var parentClass = (0, _classnames.default)('checkbox-item', className);
      return _react.default.createElement("div", {
        className: parentClass
      }, _react.default.createElement("div", {
        className: "checkbox-item__inner"
      }, _react.default.createElement("input", (0, _extends2.default)({
        className: "checkbox-item__input",
        type: "checkbox",
        id: id,
        indeterminate: isIndeterminateState ? 'true' : null,
        onChange: this.handleChange
      }, rest)), _react.default.createElement("label", {
        className: "checkbox-item__label",
        htmlFor: id
      }, label), _react.default.createElement("div", {
        className: "checkbox-item__icons"
      }, _react.default.createElement(CheckIconYes, {
        className: "checkbox-item__icon checkbox-item__icon-yes"
      }), _react.default.createElement(CheckIconNo, {
        className: "checkbox-item__icon checkbox-item__icon-no"
      }), _react.default.createElement(CheckIconMaybe, {
        className: "checkbox-item__icon checkbox-item__icon-maybe"
      }))), postText && _react.default.createElement("p", {
        className: "checkbox-item__post-text"
      }, postText));
    }
  }]);
  return Checkbox;
}(_react.Component);

exports.default = Checkbox;
(0, _defineProperty2.default)(Checkbox, "defaultProps", {
  isIndeterminate: false
});