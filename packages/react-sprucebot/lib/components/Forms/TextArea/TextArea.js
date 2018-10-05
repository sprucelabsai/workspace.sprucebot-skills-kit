"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FormPartials = require("../FormPartials");

var TextArea = function TextArea(props) {
  var id = props.id,
      className = props.className,
      label = props.label,
      postLabel = props.postLabel,
      error = props.error,
      helper = props.helper,
      resizeable = props.resizeable,
      rest = (0, _objectWithoutProperties2.default)(props, ["id", "className", "label", "postLabel", "error", "helper", "resizeable"]);
  var parentClass = (0, _classnames.default)('text-input', {
    className: className,
    'text-input--has-error': error
  });
  var inputClass = (0, _classnames.default)('text-area__input', {
    'text-area__input-no-resize': !resizeable
  });
  return _react.default.createElement("div", {
    className: parentClass
  }, label && _react.default.createElement(_FormPartials.InputPre, {
    label: label,
    id: id,
    postLabel: postLabel
  }), _react.default.createElement("textarea", (0, _extends2.default)({
    className: inputClass
  }, rest)), (helper || error) && _react.default.createElement(_FormPartials.InputHelper, {
    helper: helper,
    error: error
  }));
};

TextArea.defaultProps = {
  resizeable: false
};
var _default = TextArea;
exports.default = _default;