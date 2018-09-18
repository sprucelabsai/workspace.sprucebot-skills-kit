"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Stars = _interopRequireDefault(require("./Stars"));

var _enzyme = require("enzyme");

describe('Stars tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Stars.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});