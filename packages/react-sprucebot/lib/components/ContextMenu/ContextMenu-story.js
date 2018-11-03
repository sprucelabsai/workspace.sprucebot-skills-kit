"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _ContextMenu = _interopRequireDefault(require("./ContextMenu"));

var stories = (0, _react2.storiesOf)('Context Menu', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Example', function () {
  return _react.default.createElement(_ContextMenu.default, {
    actions: (0, _react3.object)('actions', [{
      text: 'one'
    }]),
    isLeftAligned: (0, _react3.boolean)('isLeftAligned', true),
    size: (0, _react3.text)('size', ''),
    isSimple: (0, _react3.boolean)('isSimple', false)
  });
});