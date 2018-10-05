"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _SubmitWrapper = _interopRequireDefault(require("./SubmitWrapper"));

var _enzyme = require("enzyme");

describe('SubmitWrapper tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_SubmitWrapper.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});