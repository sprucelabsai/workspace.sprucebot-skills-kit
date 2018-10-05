"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _LinkPile = _interopRequireDefault(require("./LinkPile"));

var _enzyme = require("enzyme");

describe('LinkPile tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_LinkPile.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});