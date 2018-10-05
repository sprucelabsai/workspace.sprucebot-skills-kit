"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var Loader = function Loader() {
  return _react.default.createElement("span", {
    className: "loader"
  }, _react.default.createElement("span", {
    className: "loader__dot"
  }), _react.default.createElement("span", {
    className: "loader__dot"
  }), _react.default.createElement("span", {
    className: "loader__dot"
  }));
};

var _default = Loader;
exports.default = _default;