"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../../../Button/Button"));

var ArrowBack = function ArrowBack(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
  }));
};

ArrowBack.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var CloseIcon = function CloseIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
  }));
};

CloseIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var ModalHeader = function ModalHeader(props) {
  var title = props.title,
      onRequestClose = props.onRequestClose,
      handleGoBack = props.handleGoBack;
  return _react.default.createElement("div", {
    className: "modal-header"
  }, _react.default.createElement("div", {
    className: "modal-header__title-wrapper"
  }, handleGoBack && _react.default.createElement(_Button.default, {
    isSmall: true,
    icon: _react.default.createElement(ArrowBack, null)
  }), _react.default.createElement("h2", {
    className: "modal-header__title"
  }, title)), _react.default.createElement(_Button.default, {
    isSmall: true,
    icon: _react.default.createElement(CloseIcon, null),
    onClick: onRequestClose
  }));
};

var _default = ModalHeader;
exports.default = _default;