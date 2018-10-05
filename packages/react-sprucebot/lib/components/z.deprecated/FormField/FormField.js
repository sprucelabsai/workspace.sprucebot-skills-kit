"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Field;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

var _Typography = require("../Typography/Typography");

function Field(_ref) {
  var _ref$input = _ref.input,
      value = _ref$input.value,
      onChange = _ref$input.onChange,
      name = _ref$input.name,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      type = _ref.type,
      finePrint = _ref.finePrint,
      label = _ref.label,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? label : _ref$placeholder,
      children = _ref.children;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('InputField', 'input__wrapper')
  }, label && value && _react.default.createElement("span", {
    className: (0, _classnames.default)('FieldLabel', 'input__mini__label', 'js-show-label')
  }, label), _react.default.cloneElement(children, {
    className: (0, _classnames.default)({
      with_label: !!label
    }),
    name: name,
    value: value,
    onChange: onChange,
    type: type,
    placeholder: placeholder
  }), touched && error && _react.default.createElement("span", {
    className: (0, _classnames.default)('FieldError', 'input__error', 'error-is-visible')
  }, error), finePrint && _react.default.createElement(_Typography.Paragraph, {
    fine: true
  }, finePrint));
}

Field.propTypes = {
  input: _propTypes.default.shape({
    value: _propTypes.default.any.isRequired,
    onChange: _propTypes.default.func
  }).isRequired,
  meta: _propTypes.default.shape({
    touched: _propTypes.default.bool,
    error: _propTypes.default.string
  }).isRequired,
  children: _propTypes.default.element.isRequired
};