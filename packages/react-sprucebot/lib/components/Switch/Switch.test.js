"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Switch = _interopRequireDefault(require("./Switch"));

var _enzyme = require("enzyme");

describe('Switch tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Switch.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});