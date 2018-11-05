"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _moment = _interopRequireDefault(require("moment"));

var _HeaderControls = _interopRequireDefault(require("../../../components/BigCalendar/components/HeaderControls/HeaderControls"));

describe('HeaderControl tests', function () {
  var renderedComponent;
  var pagination;
  var selectedDateButton;
  var calendarIconButton;
  var viewSelect;
  beforeEach(function () {
    renderedComponent = (0, _enzyme.shallow)(_react.default.createElement(_HeaderControls.default, {
      onChangeView: function onChangeView() {},
      onBackDate: function onBackDate() {},
      onNextDate: function onNextDate() {}
    }));
    pagination = renderedComponent.find('Pagination');
    selectedDateButton = renderedComponent.find('.bigcalendar__selectedDate-button');
    calendarIconButton = renderedComponent.find('.bigcalendar__calendarIcon-button');
    viewSelect = renderedComponent.find('Select');
  });
  it('Renders', function () {
    expect(renderedComponent.exists()).toEqual(true);
    expect(selectedDateButton.exists()).toEqual(true);
    expect(calendarIconButton.exists()).toEqual(true);
    expect(pagination.exists()).toEqual(true);
  });
});