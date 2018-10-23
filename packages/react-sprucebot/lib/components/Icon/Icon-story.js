"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Icon = _interopRequireDefault(require("./Icon"));

var stories = (0, _react2.storiesOf)('Icon', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Icon', function () {
  return _react.default.createElement(_Icon.default, {
    icon: (0, _react3.text)('Icon', 'edit'),
    className: (0, _classnames.default)((0, _react3.text)('Class', ''), {
      'u-icon__no-fill u-icon__stroke': (0, _react3.boolean)('Is Line Icon', true)
    })
  });
});