"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var ButtonGroup = function ButtonGroup(props) {
  var actions = props.actions,
      kind = props.kind;
  var parentClass = (0, _classnames.default)('button-group', {
    'button-group-segmented': kind === 'segmented',
    'button-group-floating': kind === 'floating'
  });
  return _react.default.createElement("ul", {
    className: parentClass
  }, actions.map(function (action) {
    var btnKindKey = {
      default: action.kind,
      segmented: 'secondary',
      floating: 'simple'
    };
    return _react.default.createElement("li", {
      key: action.text,
      className: "button-group__item"
    }, _react.default.createElement(_Button.default, (0, _extends2.default)({
      kind: kind ? btnKindKey[kind] : '',
      isFullWidth: kind === 'floating'
    }, action, {
      kind: kind === 'floating' ? 'simple' : kind === 'segmented' ? 'secondary' : action.kind
    })));
  }));
};

ButtonGroup.defaultProps = {
  kind: 'default'
};
var _default = ButtonGroup;
exports.default = _default;