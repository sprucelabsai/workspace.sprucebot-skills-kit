"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var StarIcon = function StarIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M11.551 5.745a.5.5 0 0 1 .9 0L14.3 9.483l4.144.6a.5.5 0 0 1 .276.854l-3 2.9.708 4.1a.5.5 0 0 1-.724.528L12 16.531 8.289 18.47a.5.5 0 0 1-.724-.528l.708-4.1-3-2.9a.5.5 0 0 1 .276-.854l4.145-.6 1.857-3.743z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

StarIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var Stars = function Stars(props) {
  return _react.default.createElement("div", {
    className: "stars"
  }, _react.default.createElement("label", {
    className: "star-input__wrapper"
  }, _react.default.createElement("input", {
    className: "star-input",
    type: "radio",
    name: "stars",
    value: "1"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  })), _react.default.createElement("label", {
    className: "star-input__wrapper"
  }, _react.default.createElement("input", {
    className: "star-input",
    type: "radio",
    name: "stars",
    value: "2"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  })), _react.default.createElement("label", {
    className: "star-input__wrapper"
  }, _react.default.createElement("input", {
    className: "star-input",
    type: "radio",
    name: "stars",
    value: "3"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  })), _react.default.createElement("label", {
    className: "star-input__wrapper"
  }, _react.default.createElement("input", {
    className: "star-input",
    type: "radio",
    name: "stars",
    value: "4"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  })), _react.default.createElement("label", {
    className: "star-input__wrapper"
  }, _react.default.createElement("input", {
    className: "star-input",
    type: "radio",
    name: "stars",
    value: "5"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  }), _react.default.createElement(StarIcon, {
    className: "star"
  })));
};

var _default = Stars;
exports.default = _default;