"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

require("jsdom-global/register");

var _enzyme = require("enzyme");

var _moment = _interopRequireDefault(require("moment"));

var _DragGrid = _interopRequireDefault(require("../../../components/BigCalendar/components/DragGrid/DragGrid"));

var _location = _interopRequireDefault(require("../../../__mocks__/stubs/location"));

var _events = _interopRequireDefault(require("../../../__mocks__/stubs/events"));

describe('DragGrid behavior', function () {
  var renderedComponent;
  var props;
  var startDate;
  var eventsForDay;
  beforeEach(function () {
    startDate = (0, _moment.default)();
    eventsForDay = _events.default.filter(function (e) {
      var eventStart = _moment.default.tz(e.startAt, _location.default.timezone);

      return eventStart.format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD');
    });
    props = {
      snapEventToNearestValidX: jest.fn(),
      snapEventToNearestValidY: jest.fn(),
      onScroll: jest.fn(),
      events: eventsForDay,
      sizeEvent: jest.fn(),
      timezone: _location.default.timezone,
      onDragEvent: jest.fn(),
      onDropEvent: jest.fn(),
      style: {
        height: 1500
      }
    };
    renderedComponent = (0, _enzyme.mount)(_react.default.createElement(_DragGrid.default, props));
  });
  it('Renders', function () {
    expect(renderedComponent.exists()).toEqual(true);
  });
  it('Includes all the correct propTypes', function () {
    expect(renderedComponent.prop('snapEventToNearestValidX')).toBeType('function');
    expect(renderedComponent.prop('snapEventToNearestValidY')).toBeType('function');
    expect(renderedComponent.prop('onScroll')).toBeType('function');
    expect(renderedComponent.prop('events')).toBeType('array');
    expect(renderedComponent.prop('sizeEvent')).toBeType('function');
    expect(renderedComponent.prop('timezone')).toBeType('string');
    expect(renderedComponent.prop('onDragEvent')).toBeType('function');
    expect(renderedComponent.prop('onDropEvent')).toBeType('function');
    expect(renderedComponent.prop('style')).toBeType('object');
  });
});