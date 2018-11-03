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
    currentPage: (0, _react3.number)('currentPage', 0),
    totalPages: (0, _react3.number)('totalPages', 100),
    showPages: (0, _react3.boolean)('showPages', false),
    showJump: (0, _react3.boolean)('showJump', false),
    onClickNext: function onClickNext() {
      return console.log('You clicked next');
    },
    onClickBack: function onClickBack() {
      return console.log('You clicked back');
    },
    onPageButtonClick: function onPageButtonClick(page) {
      return console.log('You clicked ', page);
    },
    onJump: function onJump(value) {
      return console.log('Use jump: ', value);
    }
  });
});