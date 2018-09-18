"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("../Input/Input"));

var Select =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Select, _Component);

  function Select() {
    (0, _classCallCheck2.default)(this, Select);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Select).apply(this, arguments));
  }

  (0, _createClass2.default)(Select, [{
    key: "render",
    value: function render() {
      var _this = this;

      var p = (0, _objectSpread2.default)({}, this.props); // set the proper tag

      p.tag = 'select'; // build the class

      p.className = "custom_dropdown ".concat(p.className || '', " ");

      if (p.label) {
        p.className += ' with_label';
      }

      return _react.default.createElement(_Input.default, (0, _extends2.default)({
        ref: function ref(input) {
          _this.input = input;
        }
      }, p));
    }
  }, {
    key: "value",
    get: function get() {
      return this.input.value;
    }
  }]);
  return Select;
}(_react.Component);

exports.default = Select;