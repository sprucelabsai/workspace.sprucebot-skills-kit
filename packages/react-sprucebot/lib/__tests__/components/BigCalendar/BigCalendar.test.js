"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("jsdom-global/register");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _moment = _interopRequireDefault(require("moment"));

var _BigCalendar = _interopRequireDefault(require("../../../components/BigCalendar/BigCalendar"));

var _users = _interopRequireDefault(require("../../../__mocks__/stubs/users"));

var _events = _interopRequireDefault(require("../../../__mocks__/stubs/events"));

var _location = _interopRequireDefault(require("../../../__mocks__/stubs/location"));

describe('BigCalendar tests', function () {
  var renderedComponent;
  var header;
  var datePagination;
  var teamPagination;
  var viewWrapper;
  var props;
  describe('Day View tests', function () {
    var dayView;
    beforeEach(function () {
      props = {
        allUsers: _users.default,
        location: _location.default,
        allEvents: _events.default
      };
      renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_BigCalendar.default, props));
      renderedComponent.setState({
        selectedView: 'day'
      });
      header = renderedComponent.find('Header');
      datePagination = renderedComponent.find('Pagination').at(0);
      teamPagination = renderedComponent.find('Pagination').at(1);
      viewWrapper = renderedComponent.find('.bigcalendar__view-wrapper');
      dayView = renderedComponent.find('Day');
    });
    it('Renders', function () {
      expect(renderedComponent.exists()).toEqual(true);
      expect(header.exists()).toEqual(true);
      expect(datePagination.exists()).toEqual(true);
      expect(teamPagination.exists()).toEqual(true);
      expect(viewWrapper.exists()).toEqual(true);
      expect(dayView.exists()).toEqual(true);
    });
    it('Sets the date back one day when the back date button is clicked', function () {
      var backButton = datePagination.find('button').at(0);
      expect(backButton.exists()).toEqual(true);
      var startDate = renderedComponent.state('startDate');
      backButton.simulate('click');
      var expectedBack = startDate.subtract(1, 'day');
      expect(renderedComponent.state('startDate')).toEqual(expectedBack);
    });
    it('Sets the date forward one day when the next date button is clicked', function () {
      var nextButton = datePagination.find('button').at(1);
      expect(nextButton.exists()).toEqual(true);
      var startDate = renderedComponent.state('startDate');
      nextButton.simulate('click');
      var expectedNext = startDate.add(1, 'day');
      expect(renderedComponent.state('startDate')).toEqual(expectedNext);
    });
    it('Renders a column for each user', function () {
      expect(renderedComponent.find('DayCol').length).toEqual(_users.default.length);
    });
  });
});