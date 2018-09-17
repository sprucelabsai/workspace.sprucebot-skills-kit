"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Form = _interopRequireDefault(require("./Form"));

var _enzyme = require("enzyme");

describe('Form tests', function () {
  it('Should match the snapshot', function () {
    var renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Form.default, null));
    expect(renderedComponent).toMatchSnapshot();
  });
});