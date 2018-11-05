"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Icon = _interopRequireDefault(require("./Icon"));

var options = {
  Add: 'add',
  Close: 'close',
  Date: 'date',
  Delete: 'delete',
  Edit: 'edit'
};
var stories = (0, _react2.storiesOf)('Icon', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Icon', function () {
  return _react.default.createElement(_Icon.default, {
    icon: (0, _react3.select)('icon', options, 'edit'),
    isLineIcon: (0, _react3.boolean)('isLineIcon', true)
  });
});