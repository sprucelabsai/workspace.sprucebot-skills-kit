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
});