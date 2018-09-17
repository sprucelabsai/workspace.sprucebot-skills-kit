"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _ControlButton = _interopRequireDefault(require("./ControlButton"));

var _enzyme = require("enzyme");

describe('ControlButton tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_ControlButton.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});