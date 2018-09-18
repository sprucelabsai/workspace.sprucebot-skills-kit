"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _InputField = _interopRequireDefault(require("./InputField"));

var _enzyme = require("enzyme");

describe('InputField tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_InputField.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});