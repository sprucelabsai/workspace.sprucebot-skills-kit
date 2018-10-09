"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button/Button"));

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

var ToastHeader = function ToastHeader(props) {
  var headline = props.headline,
      onRemove = props.onRemove;
  return _react.default.createElement("div", {
    className: "toast__header"
  }, _react.default.createElement("p", null, headline), _react.default.createElement(_Button.default, {
    icon: _react.default.createElement(CloseIcon, null),
    onClick: onRemove
  }));
};

var Toast = function Toast(props) {
  var headline = props.headline,
      kind = props.kind,
      text = props.text,
      onUndo = props.onUndo,
      onRemove = props.onRemove;
  var toastClass = (0, _classnames.default)('toast', {
    'toast-positive': kind === 'positive',
    'toast-negative': kind === 'negative'
  });
  return _react.default.createElement("div", {
    className: toastClass
  }, _react.default.createElement(ToastHeader, {
    headline: headline,
    onRemove: onRemove
  }), _react.default.createElement("div", {
    className: "toast__body"
  }, _react.default.createElement("p", null, text)), onUndo && _react.default.createElement(_Button.default, {
    text: "Undo",
    onClick: onUndo
  }));
};

Toast.defaultProps = {
  kind: 'neutral'
};
var _default = Toast;
exports.default = _default;