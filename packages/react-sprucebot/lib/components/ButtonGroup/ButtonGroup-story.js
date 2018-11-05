"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _ButtonGroup = _interopRequireDefault(require("./ButtonGroup"));

var stories = (0, _react2.storiesOf)('ButtonGroup', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Button Group', function () {
  return _react.default.createElement(_ButtonGroup.default, {
    kind: (0, _react3.text)('kind', ''),
    actions: (0, _react3.object)('actions', [{
      text: 'Confirm Changes',
      kind: 'primary'
    }, {
      text: 'Cancel',
      kind: 'secondary'
    }])
  });
});