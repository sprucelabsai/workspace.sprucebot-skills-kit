"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionHeading = exports.A = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.Paragraph = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var Paragraph = function Paragraph(_ref) {
  var className = _ref.className,
      fine = _ref.fine,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "fine"]);
  return _react.default.createElement("p", (0, _extends2.default)({}, props, {
    className: "".concat(fine ? 'fine__print' : '', " ").concat(className || '')
  }));
};

exports.Paragraph = Paragraph;

var H1 = function H1(_ref2) {
  var className = _ref2.className,
      with_subheader = _ref2.with_subheader,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["className", "with_subheader"]);
  return _react.default.createElement("h1", (0, _extends2.default)({}, props, {
    className: "".concat(with_subheader ? 'with__subheader' : '', " ").concat(className || '')
  }));
};

exports.H1 = H1;

var H2 = function H2(_ref3) {
  var className = _ref3.className,
      subheader = _ref3.subheader,
      props = (0, _objectWithoutProperties2.default)(_ref3, ["className", "subheader"]);
  return _react.default.createElement("h2", (0, _extends2.default)({}, props, {
    className: "".concat(subheader ? 'is__subheader' : '', " ").concat(className || '')
  }));
};

exports.H2 = H2;

var H3 = function H3(_ref4) {
  var className = _ref4.className,
      props = (0, _objectWithoutProperties2.default)(_ref4, ["className"]);
  return _react.default.createElement("h3", (0, _extends2.default)({}, props, {
    className: "".concat(className || '')
  }));
};

exports.H3 = H3;

var H4 = function H4(_ref5) {
  var className = _ref5.className,
      props = (0, _objectWithoutProperties2.default)(_ref5, ["className"]);
  return _react.default.createElement("h4", (0, _extends2.default)({}, props, {
    className: "".concat(className || '')
  }));
};

exports.H4 = H4;

var H5 = function H5(_ref6) {
  var className = _ref6.className,
      props = (0, _objectWithoutProperties2.default)(_ref6, ["className"]);
  return _react.default.createElement("h5", (0, _extends2.default)({}, props, {
    className: "".concat(className || '')
  }));
};

exports.H5 = H5;

var H6 = function H6(_ref7) {
  var className = _ref7.className,
      props = (0, _objectWithoutProperties2.default)(_ref7, ["className"]);
  return _react.default.createElement("h6", (0, _extends2.default)({}, props, {
    className: "".concat(className || '')
  }));
};

exports.H6 = H6;

var A = function A(_ref8) {
  var className = _ref8.className,
      props = (0, _objectWithoutProperties2.default)(_ref8, ["className"]);
  return _react.default.createElement("a", (0, _extends2.default)({}, props, {
    className: "".concat(className || '')
  }));
};

exports.A = A;

var SectionHeading = function SectionHeading(_ref9) {
  var className = _ref9.className,
      props = (0, _objectWithoutProperties2.default)(_ref9, ["className"]);
  return _react.default.createElement("h2", (0, _extends2.default)({}, props, {
    className: "profile__subtitle ".concat(className || '')
  }));
};

exports.SectionHeading = SectionHeading;