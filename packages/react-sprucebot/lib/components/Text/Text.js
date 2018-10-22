"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Anchor = exports.Span = exports.Text = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var H1 = function H1(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties2.default)(props, ["children"]);

  if (typeof children === 'string') {
    return _react.default.createElement("h1", (0, _extends2.default)({}, rest, {
      dangerouslySetInnerHTML: {
        __html: children
      }
    }));
  }

  return _react.default.createElement("h1", rest, props.children);
};

exports.H1 = H1;

var H2 = function H2(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties2.default)(props, ["children"]);

  if (typeof children === 'string') {
    return _react.default.createElement("h2", (0, _extends2.default)({}, rest, {
      dangerouslySetInnerHTML: {
        __html: children
      }
    }));
  }

  return _react.default.createElement("h2", rest, props.children);
};

exports.H2 = H2;

var H3 = function H3(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties2.default)(props, ["children"]);

  if (typeof children === 'string') {
    return _react.default.createElement("h3", (0, _extends2.default)({}, rest, {
      dangerouslySetInnerHTML: {
        __html: children
      }
    }));
  }

  return _react.default.createElement("h3", rest, props.children);
};

exports.H3 = H3;

var H4 = function H4(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties2.default)(props, ["children"]);

  if (typeof children === 'string') {
    return _react.default.createElement("h4", (0, _extends2.default)({}, rest, {
      dangerouslySetInnerHTML: {
        __html: children
      }
    }));
  }

  return _react.default.createElement("h4", rest, props.children);
};

exports.H4 = H4;

var H5 = function H5(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties2.default)(props, ["children"]);

  if (typeof children === 'string') {
    return _react.default.createElement("h5", (0, _extends2.default)({}, rest, {
      dangerouslySetInnerHTML: {
        __html: children
      }
    }));
  }

  return _react.default.createElement("h5", rest, props.children);
};

exports.H5 = H5;

var H6 = function H6(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties2.default)(props, ["children"]);

  if (typeof children === 'string') {
    return _react.default.createElement("h6", (0, _extends2.default)({}, rest, {
      dangerouslySetInnerHTML: {
        __html: children
      }
    }));
  }

  return _react.default.createElement("h6", rest, props.children);
};

exports.H6 = H6;

var Text = function Text(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties2.default)(props, ["children"]);

  if (typeof children === 'string') {
    return _react.default.createElement("p", (0, _extends2.default)({}, rest, {
      dangerouslySetInnerHTML: {
        __html: children
      }
    }));
  }

  return _react.default.createElement("p", rest, children);
};

exports.Text = Text;

var Span = function Span(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties2.default)(props, ["children"]);

  if (typeof children === 'string') {
    return _react.default.createElement("span", (0, _extends2.default)({}, rest, {
      dangerouslySetInnerHTML: {
        __html: children
      }
    }));
  }

  return _react.default.createElement("span", rest, children);
};

exports.Span = Span;

var Anchor = function Anchor(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties2.default)(props, ["children"]);

  if (typeof children === 'string') {
    return _react.default.createElement("a", (0, _extends2.default)({}, rest, {
      dangerouslySetInnerHTML: {
        __html: children
      }
    }));
  }

  return _react.default.createElement("a", rest, children);
};

exports.Anchor = Anchor;