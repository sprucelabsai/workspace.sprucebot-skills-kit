"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Loader = _interopRequireDefault(require("./Loader"));

var _enzyme = require("enzyme");

describe('Loader tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Loader.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});