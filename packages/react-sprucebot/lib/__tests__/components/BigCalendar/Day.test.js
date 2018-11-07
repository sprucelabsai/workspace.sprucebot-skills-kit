"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

require("jsdom-global/register");

var _enzyme = require("enzyme");

var _moment = _interopRequireDefault(require("moment"));

var _Day = _interopRequireDefault(require("../../../components/BigCalendar/components/Views/Day"));

var _users = _interopRequireDefault(require("../../../__mocks__/stubs/users"));

var _location = _interopRequireDefault(require("../../../__mocks__/stubs/location"));

var _events = _interopRequireDefault(require("../../../__mocks__/stubs/events"));

describe('Day View tests', function () {
  var renderedComponent;
  var props;
  var teammateHeader;
  var timeGutter;
  var dragGrid;
  beforeEach(function () {
    props = {
      onScroll: jest.fn(),
      viewHeight: 0,
      hours: [],
      users: _users.default,
      location: _location.default,
      minTime: '00:00',
      maxTime: '23:59',
      events: _events.default,
      dragThreshold: 10,
      showRightProps: false,
      startTime: '07:00:00',
      endTime: '20:00:00',
      slotsPerHour: 4,
      onUpdateHorizontalPagerDetails: jest.fn(),
      startDate: (0, _moment.default)(),
      onDropEvent: jest.fn()
    };
    renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_Day.default, props));
    teammateHeader = renderedComponent.find('TeammateHeader');
    timeGutter = renderedComponent.find('TimeGutter');
    dragGrid = renderedComponent.find('DragGrid');
  });
  it('Renders', function () {
    expect(renderedComponent.exists()).toEqual(true);
    expect(teammateHeader.exists()).toEqual(true);
    expect(timeGutter.exists()).toEqual(true);
    expect(dragGrid.exists()).toEqual(true);
  });
  it('Includes all the correct propTypes', function () {
    expect(renderedComponent.prop('onScroll')).toBeType('function');
    expect(renderedComponent.prop('viewHeight')).toBeType('number');
    expect(renderedComponent.prop('hours')).toBeType('array');
    expect(renderedComponent.prop('location')).toBeType('object');
    expect(renderedComponent.prop('minTime')).toBeType('string');
    expect(renderedComponent.prop('maxTime')).toBeType('string');
    expect(renderedComponent.prop('events')).toBeType('array');
    expect(renderedComponent.prop('dragThreshold')).toBeType('number');
    expect(renderedComponent.prop('showRightProps')).toBeType('boolean');
    expect(renderedComponent.prop('startTime')).toBeType('string');
    expect(renderedComponent.prop('endTime')).toBeType('string');
    expect(renderedComponent.prop('slotsPerHour')).toBeType('number');
    expect(renderedComponent.prop('onUpdateHorizontalPagerDetails')).toBeType('function');
    expect(renderedComponent.prop('startDate')).toBeType('object');
    expect(renderedComponent.prop('onDropEvent')).toBeType('function');
  });
});