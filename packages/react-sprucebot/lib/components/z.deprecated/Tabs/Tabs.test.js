"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Tabs = require("./Tabs");

var _enzyme = require("enzyme");

describe('Tabs tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Tabs.Tabs, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});