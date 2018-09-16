"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Pre = _interopRequireDefault(require("./Pre"));

var _enzyme = require("enzyme");

describe('Pre tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Pre.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});