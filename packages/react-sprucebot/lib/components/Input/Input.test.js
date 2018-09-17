"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("./Input"));

var _enzyme = require("enzyme");

describe('Input tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Input.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});