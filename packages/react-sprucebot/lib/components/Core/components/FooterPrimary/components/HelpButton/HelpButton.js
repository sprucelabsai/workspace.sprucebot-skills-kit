"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../../../../../Button/Button"));

var HelpIcon = function HelpIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M7 7a2 2 0 1 1 2.667 1.886A1 1 0 0 0 9 9.829V10M9 12a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M1.5 3A1.5 1.5 0 0 1 3 1.5h12A1.5 1.5 0 0 1 16.5 3v12a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 15V3z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

HelpIcon.defaultProps = {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  xmlns: "http://www.w3.org/2000/svg"
};

var HelpButton = function HelpButton(props) {
  var className = props.className,
      iconClassName = props.iconClassName,
      textClassName = props.textClassName;
  return _react.default.createElement("a", {
    className: className,
    href: "#",
    target: "_blank",
    rel: "noopener noreferrer"
  }, _react.default.createElement(HelpIcon, {
    className: iconClassName
  }), _react.default.createElement("span", {
    className: textClassName
  }, "Help"));
};

var _default = HelpButton;
exports.default = _default;