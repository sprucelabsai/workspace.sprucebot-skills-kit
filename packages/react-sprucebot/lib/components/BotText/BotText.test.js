"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _BotText = _interopRequireDefault(require("./BotText"));

var _enzyme = require("enzyme");

describe('BotText tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_BotText.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});