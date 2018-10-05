"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ContextMenu = _interopRequireDefault(require("./ContextMenu"));

(0, _react2.storiesOf)('Context Menu', module).add('Example', function () {
  return _react.default.createElement(_ContextMenu.default, {
    actions: [{
      text: 'one'
    }],
    leftAlign: true
  });
});