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

var _FormPartials = require("../../FormPartials");

var TextInput = function TextInput(props) {
  var id = props.id,
      className = props.className,
      label = props.label,
      postLabel = props.postLabel,
      kind = props.kind,
      iconBefore = props.iconBefore,
      iconAfter = props.iconAfter,
      appendix = props.appendix,
      error = props.error,
      helper = props.helper,
      rest = (0, _objectWithoutProperties2.default)(props, ["id", "className", "label", "postLabel", "kind", "iconBefore", "iconAfter", "appendix", "error", "helper"]);
  var parentClass = (0, _classnames.default)('text-input', {
    className: className,
    'text-input--has-error': error
  });
  return _react.default.createElement("div", {
    className: parentClass
  }, label && _react.default.createElement(_FormPartials.InputPre, {
    label: label,
    id: id,
    postLabel: postLabel
  }), _react.default.createElement(_FormPartials.InputInner, (0, _extends2.default)({
    kind: kind,
    iconBefore: iconBefore,
    iconAfter: iconAfter,
    appendix: appendix
  }, rest)), (helper || error) && _react.default.createElement(_FormPartials.InputHelper, {
    helper: helper,
    error: error
  }));
};

var _default = TextInput;
exports.default = _default;