"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _Pagination = _interopRequireDefault(require("./Pagination"));

var stories = (0, _react2.storiesOf)('Pagination', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Pagination', function () {
  return _react.default.createElement(_Pagination.default, {
    currentPage: (0, _react3.number)('Current Page', 1),
    totalPages: (0, _react3.number)('Total Pages', 100),
    showPages: (0, _react3.boolean)('Show Pages', false),
    showJump: (0, _react3.boolean)('Show Jump', false)
  });
});