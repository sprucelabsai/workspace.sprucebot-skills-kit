"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _SelectField = _interopRequireDefault(require("./SelectField"));

var _enzyme = require("enzyme");

describe('SelectField tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_SelectField.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});