"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _StatsSlider = _interopRequireDefault(require("./StatsSlider"));

var _enzyme = require("enzyme");

describe('StatsSlider tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_StatsSlider.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});