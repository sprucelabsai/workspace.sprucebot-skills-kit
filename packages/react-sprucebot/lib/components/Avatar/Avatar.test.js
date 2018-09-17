"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _enzyme = require("enzyme");

describe('Avatar tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Avatar.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});