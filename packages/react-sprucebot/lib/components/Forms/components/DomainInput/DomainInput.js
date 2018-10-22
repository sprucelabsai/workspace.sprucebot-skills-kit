"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _TextInput = _interopRequireDefault(require("../TextInput/TextInput"));

// TODO: May be better as a stateful component in order to trim itself
var DomainInput = function DomainInput(props) {
  var id = props.id,
      rest = (0, _objectWithoutProperties2.default)(props, ["id"]);
  return _react.default.createElement(_TextInput.default, (0, _extends2.default)({
    id: id
  }, rest));
};

var _default = DomainInput;
exports.default = _default;