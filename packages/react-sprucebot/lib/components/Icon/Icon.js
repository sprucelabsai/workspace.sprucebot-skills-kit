"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

// NOTE: This component should only include a few of the most commonly
// used icons for developer convenience
var Add = function Add(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
  }));
};

Add.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var CalendarDate = function CalendarDate(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M6.75 12.75h.75a.75.75 0 0 1 .75.75v5.25M6.75 18.75h3M13.832 12.75h1.918a.75.75 0 0 1 .7 1.014l-1.87 4.986",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M.75 5.25a1.5 1.5 0 0 1 1.5-1.5h19.5a1.5 1.5 0 0 1 1.5 1.5v16.5a1.5 1.5 0 0 1-1.5 1.5H2.25a1.5 1.5 0 0 1-1.5-1.5V5.25z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M.75 9.75h22.5M6.75 6V.75M17.25 6V.75",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

CalendarDate.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var Close = function Close(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
  }));
};

Close.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var Delete = function Delete(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M17.25 21H6.75a1.5 1.5 0 0 1-1.5-1.5V6h13.5v13.5a1.5 1.5 0 0 1-1.5 1.5z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M9.75 16.5v-6M14.25 16.5v-6M2.25 6h19.5",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M14.25 3h-4.5a1.5 1.5 0 0 0-1.5 1.5V6h7.5V4.5a1.5 1.5 0 0 0-1.5-1.5z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

Delete.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var Edit = function Edit(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M13.045 15.135l-3.712.531.53-3.713 9.546-9.546a2.25 2.25 0 0 1 3.182 3.182l-9.546 9.546z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M18.348 3.469L21.53 6.65M18.75 15.25v7.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5h7.5",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

Edit.defaultProps = {
  width: "24",
  height: "25",
  viewBox: "0 0 24 25",
  xmlns: "http://www.w3.org/2000/svg"
};
var key = {
  add: Add,
  close: Close,
  date: CalendarDate,
  delete: Delete,
  edit: Edit
};

var Icon = function Icon(props) {
  var icon = props.icon,
      rest = (0, _objectWithoutProperties2.default)(props, ["icon"]);

  if (!icon || !key[icon.toLowerCase()]) {
    return null;
  }

  var Handler = key[icon.toLowerCase()];
  return _react.default.createElement(Handler, rest);
};

var _default = Icon;
exports.default = _default;