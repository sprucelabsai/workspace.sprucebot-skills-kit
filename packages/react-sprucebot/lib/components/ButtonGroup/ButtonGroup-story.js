"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ButtonGroup = _interopRequireDefault(require("./ButtonGroup"));

(0, _react2.storiesOf)('ButtonGroup', module).add('Default', function () {
  return _react.default.createElement(_ButtonGroup.default, {
    actions: [{
      text: 'Confirm Changes',
      kind: 'primary'
    }, {
      text: 'Cancel',
      kind: 'secondary'
    }]
  });
}).add('Segmented', function () {
  return _react.default.createElement(_ButtonGroup.default, {
    kind: "segmented",
    actions: [{
      text: 'Option One'
    }, {
      text: 'Option Two'
    }, {
      text: 'Option Three'
    }]
  });
}).add('Floating', function () {
  return _react.default.createElement(_ButtonGroup.default, {
    kind: "floating",
    actions: [{
      text: 'Edit Service'
    }, {
      text: 'Hide Service'
    }, {
      text: 'Move to Category'
    }]
  });
});