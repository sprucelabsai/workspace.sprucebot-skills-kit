"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("jsdom-global/register");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Pagination = _interopRequireDefault(require("../../../components/Pagination/Pagination"));

describe('Pagination tests', function () {
  var renderedComponent;
  var nextButton;
  var backButton;
  var onClickNext;
  var onClickBack;
  var props;
  beforeEach(function () {
    onClickNext = jest.fn();
    onClickBack = jest.fn();
    props = {
      isSimple: true,
      onClickNext: onClickNext,
      onClickBack: onClickBack,
      currentPage: 0,
      totalPages: 3
    };
    renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Pagination.default, props));
    nextButton = renderedComponent.find('Button').at(1);
    backButton = renderedComponent.find('Button').at(0);
  });
  it('Renders', function () {
    expect(renderedComponent).toBeDefined();
    expect(renderedComponent.exists()).toEqual(true);
    expect(nextButton.exists()).toEqual(true);
    expect(backButton.exists()).toEqual(true);
  });
  it("Calls the 'click next' handler", function () {
    nextButton.simulate('click');
    expect(onClickNext).toHaveBeenCalled();
  });
  it("Calls the 'click back' handler", function () {
    backButton.simulate('click');
    expect(onClickBack).toHaveBeenCalled();
  });
});
describe('When on the first page', function () {
  var renderedComponent;
  var nextButton;
  var backButton;
  var onClickNext;
  var onClickBack;
  var props;
  beforeEach(function () {
    onClickNext = jest.fn();
    onClickBack = jest.fn();
    props = {
      isSimple: true,
      onClickNext: onClickNext,
      onClickBack: onClickBack,
      currentPage: 0,
      totalPages: 3
    };
    renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Pagination.default, props));
    nextButton = renderedComponent.find('Button').at(1);
    backButton = renderedComponent.find('Button').at(0);
  });
  it('Back buttons is disabled', function () {
    expect(backButton.prop('disabled')).toEqual(true);
    expect(nextButton.prop('disabled')).toEqual(false);
  });
});
describe('When between the first and last page', function () {
  var renderedComponent;
  var nextButton;
  var backButton;
  var onClickNext;
  var onClickBack;
  var props;
  beforeEach(function () {
    onClickNext = jest.fn();
    onClickBack = jest.fn();
    props = {
      isSimple: true,
      onClickNext: onClickNext,
      onClickBack: onClickBack,
      currentPage: 1,
      totalPages: 3
    };
    renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Pagination.default, props));
    nextButton = renderedComponent.find('Button').at(1);
    backButton = renderedComponent.find('Button').at(0);
  });
  it('Both pager buttons are enabled', function () {
    expect(backButton.prop('disabled')).toEqual(false);
    expect(nextButton.prop('disabled')).toEqual(false);
  });
});
describe('When on the last page', function () {
  var renderedComponent;
  var nextButton;
  var backButton;
  var onClickNext;
  var onClickBack;
  var props;
  beforeEach(function () {
    onClickNext = jest.fn();
    onClickBack = jest.fn();
    props = {
      isSimple: true,
      onClickNext: onClickNext,
      onClickBack: onClickBack,
      currentPage: 3,
      totalPages: 3
    };
    renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Pagination.default, props));
    nextButton = renderedComponent.find('Button').at(1);
    backButton = renderedComponent.find('Button').at(0);
  });
  it('Next button is disabled', function () {
    expect(backButton.prop('disabled')).toEqual(false);
    expect(nextButton.prop('disabled')).toEqual(true);
  });
});