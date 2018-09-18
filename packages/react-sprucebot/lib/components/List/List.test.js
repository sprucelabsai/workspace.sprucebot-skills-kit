"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _List = require("./List");

var _enzyme = require("enzyme");

describe('List tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_List.List, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});