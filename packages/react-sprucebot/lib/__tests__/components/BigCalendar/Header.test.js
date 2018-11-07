"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _moment = _interopRequireDefault(require("moment"));

var _Header = _interopRequireDefault(require("../../../components/BigCalendar/components/Header/Header"));

describe('Header tests', function () {
  var renderedComponent;
  var monthHeader;
  var controls;
  var dayOfWeek;
  var numericalDate;
  var pagination;
  var props;
  beforeEach(function () {
    props = {
      dateFormat: 'MMMM YYYY',
      selectedDate: (0, _moment.default)(),
      selectedView: 'Team',
      onChangeView: jest.fn(),
      onBackDate: jest.fn(),
      onNextDate: jest.fn()
    };
    renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_Header.default, props));
    monthHeader = renderedComponent.find('H2');
    controls = renderedComponent.find('HeaderControls');
    dayOfWeek = renderedComponent.find('.dow');
    numericalDate = renderedComponent.find('.day');
    pagination = renderedComponent.find('Pagination');
  });
  it('Renders', function () {
    expect(renderedComponent.exists()).toEqual(true);
    expect(monthHeader.exists()).toEqual(true);
    expect(controls.exists()).toEqual(true);
    expect(dayOfWeek.exists()).toEqual(true);
    expect(numericalDate.exists()).toEqual(true);
    expect(pagination.exists()).toEqual(true);
  });
  it('Displays the correct date', function () {
    expect(monthHeader.children().text()).toEqual((0, _moment.default)().format('MMMM YYYY'));
    expect(dayOfWeek.text()).toEqual((0, _moment.default)().format('dd'));
    expect(numericalDate.text()).toEqual((0, _moment.default)().format('D'));
  });
});