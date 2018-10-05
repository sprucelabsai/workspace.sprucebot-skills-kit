"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _Loader = _interopRequireDefault(require("./Loader"));

(0, _react2.storiesOf)('Loader', module).add('Loader', function () {
  return _react.default.createElement(_Loader.default, null);
});