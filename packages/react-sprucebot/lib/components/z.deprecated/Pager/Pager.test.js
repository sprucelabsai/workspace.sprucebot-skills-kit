"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Pager = _interopRequireDefault(require("./Pager"));

var _enzyme = require("enzyme");

describe('Pager tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Pager.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});