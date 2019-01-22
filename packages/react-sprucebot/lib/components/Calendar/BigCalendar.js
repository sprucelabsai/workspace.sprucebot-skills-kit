"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _es6Tween = require("es6-tween");

var _Avatar = _interopRequireDefault(require("../Avatar/Avatar"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _Calendar = _interopRequireDefault(require("./Calendar"));

var _ControlButton = _interopRequireDefault(require("../ControlButton/ControlButton"));

var _DateSelect = _interopRequireDefault(require("../DateSelect/DateSelect"));

var _Dialog = _interopRequireDefault(require("../Dialog/Dialog"));

var _HorizontalWeek = _interopRequireDefault(require("./HorizontalWeek"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var _Loader = _interopRequireDefault(require("../Loader/Loader"));

var _Pager = _interopRequireDefault(require("../Pager/Pager"));

var _Tabs = require("../Tabs/Tabs");

(0, _es6Tween.autoPlay)(true);

var getElementWidth = function getElementWidth(element) {
  return element && element.offsetWidth;
};

var getElementHeight = function getElementHeight(element) {
  return element && element.offsetHeight;
};

var BigCalendar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BigCalendar, _Component);

  function BigCalendar(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, BigCalendar);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BigCalendar).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentDidMount", function () {
      //give things a sec to settle before recording sizes
      _this.refresh();

      setTimeout(function () {}, 250);
      window.addEventListener('resize', _this.handleWindowResize);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentWillUnmount", function () {
      window.removeEventListener('resize', _this.handleWindowResize);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setEvents", function (events) {
      _this.setState({
        events: events
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "triggerRefresh", function () {
      _this.refresh();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "events", function () {
      return _this.state.events;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setView", function (view) {
      _this.handleChangeView(0);

      _this.tabs.setSelected(0, '.0');
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setMode", function (mode) {
      _this.setState({
        mode: mode
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setDate", function (selectedDate) {
      _this.setState({
        selectedDate: selectedDate
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "generatePagerTitle", function (page) {
      var auth = _this.props.auth;
      var _this$state = _this.state,
          view = _this$state.view,
          selectedDate = _this$state.selectedDate;
      var title;

      if (view === 'month') {
        title = (0, _momentTimezone.default)(selectedDate).format('MMM YYYY');
      } else if (view === 'week') {
        var startOfWeek = (0, _momentTimezone.default)(selectedDate).startOf('week');
        var endOfWeek = (0, _momentTimezone.default)(selectedDate).endOf('week');

        if (startOfWeek.isSame(endOfWeek, 'month')) {
          title = "".concat(startOfWeek.format('MMM Do'), " - ").concat(endOfWeek.format('Do'));
        } else {
          title = "".concat(startOfWeek.format('MMM Do'), " - ").concat(endOfWeek.format('MMM Do'));
        }
      } else if (view === 'day') {
        var now = (0, _momentTimezone.default)().tz(auth.Location.timezone).startOf('day');

        var days = _momentTimezone.default.tz(selectedDate, auth.Location.timezone).startOf('day').diff(now, 'days');

        switch (days) {
          case -1:
            title = 'Yesterday';
            break;

          case 0:
            title = 'Today';
            break;

          case 1:
            title = 'Tomorrow';
            break;

          default:
            title = (0, _momentTimezone.default)(selectedDate).format('ddd, MMM Do');
            break;
        }
      }

      return _react.default.createElement(_ControlButton.default, {
        className: "sub_control",
        onClick: _this.handleShowScheduleDateDialog
      }, title, " ", _react.default.createElement(_Icon.default, null, "keyboard_arrow_down"));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getDesiredTeammateWrapperWidth", function () {
      if (!_this.calendarWrapper) {
        return '100%';
      }

      var _this$state2 = _this.state,
          view = _this$state2.view,
          mode = _this$state2.mode;
      var teamDayViewWidth = _this.props.teamDayViewWidth;
      var calendarWrapperWidth = getElementWidth(_this.calendarWrapper);

      if (mode === 'team' && view === 'day') {
        // make it a little thinner than the screen
        return Math.min(calendarWrapperWidth - 20, teamDayViewWidth);
      } else if (mode === 'team' && view === 'week') {
        return '100%';
      } else if (mode === 'team' && view === 'month') {
        return '100%';
      } else if (mode === 'user') {
        return calendarWrapperWidth;
      }

      return 'auto';
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getDesiredScrollWidth", function () {
      //act like a normal div until loaded
      if (!_this.calendarWrapper) {
        return '100%';
      }

      var _this$state3 = _this.state,
          view = _this$state3.view,
          mode = _this$state3.mode,
          transitioning = _this$state3.transitioning;

      var teammates = _this.getTeammates();

      var calendarWrapperWidth = getElementWidth(_this.calendarWrapper);
      var widthOfAllCalendars = 0;
      var minWidthOfAllCalendars = _this.getDesiredTeammateWrapperWidth() * teammates.length;
      document.querySelectorAll('.teammate_calendar__wrapper').forEach(function (wrapper, idx) {
        if (idx < teammates.length) {
          widthOfAllCalendars += getElementWidth(wrapper);
        }
      });
      widthOfAllCalendars = Math.max(minWidthOfAllCalendars, widthOfAllCalendars);

      if (transitioning && view === 'day') {
        return widthOfAllCalendars;
      }

      if (mode === 'team' && view == 'day') {
        return widthOfAllCalendars;
      } else if (view === 'week') {
        return calendarWrapperWidth;
      } else if (view === 'month') {
        return calendarWrapperWidth;
      } else if (mode === 'user') {
        return calendarWrapperWidth;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getDesiredScrollHeight", function () {
      //act like a normal div until loaded
      if (!_this.calendarWrapper) {
        return 'auto';
      }

      var _this$state4 = _this.state,
          mode = _this$state4.mode,
          view = _this$state4.view;

      if (mode === 'team' && view === 'week') {
        return 'auto';
      } else if (view === 'month') {
        return 'auto';
      }

      var firstTeammateWrapper = document.querySelector('.teammate_calendar__wrapper');

      if (!firstTeammateWrapper) {
        return 'auto';
      }

      return getElementHeight(firstTeammateWrapper) || 'auto';
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "getTeammates", function () {
      var _this$state5 = _this.state,
          teammates = _this$state5.teammates,
          workingTeammates = _this$state5.workingTeammates,
          mode = _this$state5.mode,
          view = _this$state5.view,
          showOnlyWorking = _this$state5.showOnlyWorking,
          selectedTeammate = _this$state5.selectedTeammate,
          showAllTeammates = _this$state5.showAllTeammates,
          teamSchedule = _this$state5.teamSchedule;
      var auth = _this.props.auth;
      var team = mode === 'team' ? teammates : [auth]; //filter authed user out and prepend

      if (selectedTeammate) {
        team = [selectedTeammate];
      } else if (teamSchedule && mode === 'team' && view === 'day' && showOnlyWorking) {
        return [auth].concat((0, _toConsumableArray2.default)(workingTeammates.filter(function (teammate) {
          return teammate.User.id !== auth.User.id;
        })));
      } else if (view === 'month') {
        team = [auth];
      } else if (showAllTeammates) {
        team = team.filter(function (teammate) {
          return teammate.User.id !== auth.User.id;
        });
        team = [auth].concat((0, _toConsumableArray2.default)(team));
      }

      return team;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function () {
      _this.refresh();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refresh",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var triggerOnNavigate,
          _this$state6,
          mode,
          view,
          teammates,
          selectedDate,
          optionsLoaded,
          selectedTeammate,
          _this$props,
          auth,
          onNavigate,
          fetchEvents,
          currentView,
          currentUser,
          startDate,
          endDate,
          options,
          _ref2,
          teamSchedule,
          storeSchedule,
          events,
          _args = arguments;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              triggerOnNavigate = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
              _this$state6 = _this.state, mode = _this$state6.mode, view = _this$state6.view, teammates = _this$state6.teammates, selectedDate = _this$state6.selectedDate, optionsLoaded = _this$state6.optionsLoaded, selectedTeammate = _this$state6.selectedTeammate;
              _this$props = _this.props, auth = _this$props.auth, onNavigate = _this$props.onNavigate, fetchEvents = _this$props.fetchEvents;
              currentView = view === 'team_week' ? 'week' : view;
              currentUser = selectedTeammate ? selectedTeammate : teammates.find(function (teammate) {
                return teammate.User.id === auth.UserId;
              });
              startDate = (0, _momentTimezone.default)(selectedDate).startOf(currentView);
              endDate = (0, _momentTimezone.default)(selectedDate).endOf(currentView);
              options = {
                mode: mode,
                startDate: startDate,
                endDate: endDate,
                view: currentView,
                teammates: mode === 'user' ? [currentUser] : teammates // const eventsLoaded = this.checkOptions(options)
                // if (!eventsLoaded) {

              };

              _this.setState({
                optionsLoaded: [].concat((0, _toConsumableArray2.default)(optionsLoaded), [options]),
                isFetchingEvents: true
              });

              triggerOnNavigate && onNavigate && onNavigate(options);
              _context.prev = 10;
              _context.next = 13;
              return fetchEvents(options);

            case 13:
              _ref2 = _context.sent;
              teamSchedule = _ref2.teamSchedule;
              storeSchedule = _ref2.storeSchedule;
              events = _ref2.events;

              _this.setState({
                workingTeammates: _this.workingTeammates({
                  schedule: teamSchedule
                }),
                storeSchedule: storeSchedule,
                events: events,
                teamSchedule: teamSchedule,
                isFetchingEvents: false
              });

              _this.toggleShowOnCalendars();

              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](10);
              console.log(_context.t0);

              _this.setState({
                isFetchingEvents: false
              });

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[10, 21]]);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "checkOptions", function (options) {
      return _this.state.optionsLoaded.find(function (loaded) {
        return (0, _isEqual.default)(loaded, options);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePagerChange",
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(page) {
        var view, diff, stepType;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                view = _this.state.view;
                diff = page - _this.state.currentPage;
                stepType = view !== 'month' ? 'days' : 'months';
                _context2.next = 5;
                return _this.setState(function (prevState) {
                  return {
                    currentPage: page,
                    selectedDate: prevState.selectedDate.add(diff, stepType)
                  };
                });

              case 5:
                _this.handleChange();

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChangeView",
    /*#__PURE__*/
    function () {
      var _ref4 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(idx) {
        var _this$state7, mode, view, newView, movingToWeek;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$state7 = _this.state, mode = _this$state7.mode, view = _this$state7.view;
                newView = _this.state.views[idx];
                movingToWeek = mode === 'user' && view !== 'week' && newView === 'week';
                _context3.next = 5;
                return _this.setState({
                  view: newView // renderFirstCalendar: !movingToWeek

                });

              case 5:
                // because month view does not show all teammates, if we are in team mode jumping OFF month view, lets
                // re-show team wrappers
                if (mode === 'team' && view === 'month' && newView !== 'month') {
                  _this.toggleShowOnCalendars();
                } else if (mode === 'user' && view !== 'week' && newView === 'week') {//NOTE: Removed this delay as it was causing DOM issues with the calendar not rendering fast enough;
                  // Changes to BE data structure and FE should limit render lag that was initially seen
                  // week view is heavy, give dom a sec to render before rendering calendar
                  // this.delayedRenderWeekView()
                }

                _this.handleChange(); //trigger a refresh which causes, sizes to be recalculated. 500 delay for css transitions


                setTimeout(function () {
                  _this.handleWindowResize();
                }, 500);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "delayedRenderWeekView", function () {
      setTimeout(function () {
        _this.setState({
          renderFirstCalendar: true
        });
      }, 100);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "timeRange", function () {
      var _this$state8 = _this.state,
          selectedDate = _this$state8.selectedDate,
          storeSchedule = _this$state8.storeSchedule,
          events = _this$state8.events;
      var adjustedEvents = events.filter(function (event) {
        return !event.allDay;
      }).map(function (event) {
        return {
          startTime: (0, _momentTimezone.default)(event.start).format('HH:mm:ss'),
          endTime: (0, _momentTimezone.default)(event.end).format('HH:mm:ss')
        };
      });
      var day = selectedDate.format('YYYY-MM-DD');
      var combinedTimes = [].concat((0, _toConsumableArray2.default)(storeSchedule), (0, _toConsumableArray2.default)(adjustedEvents.filter(function (event) {
        if (event.startTime && event.endTime) {
          return event;
        }
      }).map(function (event) {
        return {
          startTime: event.startTime,
          endTime: event.endTime
        };
      })));
      var earliest = false;
      var latest = false;

      if (combinedTimes.length !== 0) {
        combinedTimes.forEach(function (event) {
          var start = (0, _momentTimezone.default)("".concat(day, " ").concat(event.startTime)).startOf('hour').subtract(2, 'hour');
          var end = (0, _momentTimezone.default)("".concat(day, " ").concat(event.endTime)).endOf('hour').add(2, 'hour');

          if (!earliest || earliest.diff(start) > 0) {
            earliest = start;
          }

          if (!latest || latest.diff(end) < 0) {
            latest = end;
          }
        });

        if (!earliest.isSame(day, 'day')) {
          earliest = (0, _momentTimezone.default)("".concat(day, " 00:00:00"));
        }

        if (!latest.isSame(day, 'day')) {
          latest = (0, _momentTimezone.default)("".concat(day, " 23:59:59"));
        }
      } else {
        earliest = (0, _momentTimezone.default)(selectedDate).hour(7).minutes(0).seconds(0);
        latest = (0, _momentTimezone.default)(selectedDate).hour(18).minutes(0).seconds(0);
      }

      return [earliest.format('YYYY-MM-DD HH:mm:ss'), latest.format('YYYY-MM-DD HH:mm:ss')];
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleShowOnCalendars", function () {
      // show teammates calendars one at a time
      var calendars = (0, _toConsumableArray2.default)(document.querySelectorAll('.teammate_calendar__wrapper'));

      if (_this.props.auth) {
        calendars.shift();
      }

      var delay = 100;
      var delayBump = 200;
      calendars.forEach(function (element) {
        setTimeout(function () {
          element.classList.toggle('hide', false);
        }, delay);
        delay += delayBump;
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "jumpToTeamMode",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4() {
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!_this.state.transitioning) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return");

            case 2:
              _context4.next = 4;
              return _this.setState({
                transitioning: true,
                mode: 'team',
                showAllTeammates: true,
                renderAllCalendars: true
              });

            case 4:
              _this.toggleShowOnCalendars();

              setTimeout(function () {
                _this.handleChange();

                _this.setState({
                  transitioning: false
                });
              }, 1000);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "jumpToUserMode",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5() {
      var view;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!_this.state.transitioning) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              //scroll calendar left
              new _es6Tween.Tween({
                y: _this.calendarWrapper.scrollLeft
              }).to({
                y: 0
              }, 500).on('update', function (_ref7) {
                var y = _ref7.y;
                _this.calendarWrapper.scrollLeft = y;
              }).easing(_es6Tween.Easing.Quadratic.Out).start(); // when jumping to week view in user mode, delay render because it's heavy

              view = _this.state.view; //first give css transitions a sec to adjust the view

              _context5.next = 6;
              return _this.setState({
                transitioning: true,
                mode: 'user',
                renderFirstCalendar: view !== 'week',
                showAllTeammates: view !== 'week'
              });

            case 6:
              if (view === 'week') {
                _this.delayedRenderWeekView();
              } // to hard on the client


              _this.toggleShowOnCalendars();

              setTimeout(function () {
                _this.handleChange();

                _this.setState({
                  renderAllCalendars: false,
                  showAllTeammates: false,
                  transitioning: false
                });
              }, 1000);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleToggleMode",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6() {
      var _this$state9, mode, selectedTeammate;

      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this$state9 = _this.state, mode = _this$state9.mode, selectedTeammate = _this$state9.selectedTeammate;
              _context6.t0 = mode;
              _context6.next = _context6.t0 === 'team' ? 4 : 6;
              break;

            case 4:
              _this.jumpToUserMode();

              return _context6.abrupt("break", 8);

            case 6:
              _this.jumpToTeamMode();

              return _context6.abrupt("break", 8);

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleWindowResize", function () {
      _this.setState({
        resized: _this.state.resized++
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "filterEvents", function (events, teammate) {
      var _this$state10 = _this.state,
          view = _this$state10.view,
          mode = _this$state10.mode,
          transitioning = _this$state10.transitioning; // make transitions faster?

      if (transitioning) {
        return [];
      }

      if (mode === 'team' && view === 'month') {
        return events;
      }

      var filteredEvents = events.filter(function (event) {
        return event.isUniversalEvent || event.userId === teammate.User.id;
      });
      return filteredEvents;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "eventPropGetter", function (event) {
      return {
        className: "".concat(event.className || '')
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dayPropGetter", function (teammate, date) {
      var teamSchedule = _this.state.teamSchedule;
      var _this$props$dayPropGe = _this.props.dayPropGetter,
          dayPropGetter = _this$props$dayPropGe === void 0 ? function (teammate, date, props) {
        return props;
      } : _this$props$dayPropGe; // if no team schedule, then no need to render on/off

      if (!teamSchedule) {
        return dayPropGetter(teammate, date, {});
      }

      var theDate = (0, _momentTimezone.default)(date);
      var today = theDate.format('YYYY-MM-DD');

      var _ref9 = teamSchedule[teammate.UserId] && teamSchedule[teammate.UserId][today] ? teamSchedule[teammate.UserId][today] : {},
          startTime = _ref9.startTime,
          endTime = _ref9.endTime;

      return {
        className: startTime && endTime ? 'working' : 'not-working'
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "slotPropGetter", function (teammate, date) {
      var teamSchedule = _this.state.teamSchedule;
      var _this$props$slotPropG = _this.props.slotPropGetter,
          slotPropGetter = _this$props$slotPropG === void 0 ? function (teammate, date, props) {
        return props;
      } : _this$props$slotPropG;
      var className = []; // if no team schedule, then no need to render on/off

      if (!teamSchedule) {
        return slotPropGetter(teammate, date, {});
      } // pull hours out for today


      var theDate = (0, _momentTimezone.default)(date);
      var today = theDate.format('YYYY-MM-DD');

      var _ref10 = teamSchedule[teammate.UserId] && teamSchedule[teammate.UserId][today] ? teamSchedule[teammate.UserId][today] : {},
          startTime = _ref10.startTime,
          endTime = _ref10.endTime; // since a team schedule is passed, if any start/end times are missing, assume not working


      if (!startTime || !endTime) {
        className.push('not-working');
      } else {
        startTime = parseInt(startTime.replace(/[^0-9]/g, ''));
        endTime = parseInt(endTime.replace(/[^0-9]/g, ''));
        var nowTime = parseInt((0, _momentTimezone.default)(date).format('HHmmss'));
        className.push(nowTime >= startTime && nowTime < endTime ? 'working' : 'not-working');
      }

      if ((0, _momentTimezone.default)().isBefore(date)) {
        className.push('is_clickable');
      }

      return {
        className: className.join(' ')
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClickEvent", function (options, e) {
      var onClickEvent = _this.props.onClickEvent;
      onClickEvent && onClickEvent(options, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClickOpenSlot", function (options, e) {
      var onClickOpenSlot = _this.props.onClickOpenSlot;
      onClickOpenSlot && onClickOpenSlot(options, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropEvent", function (_ref11) {
      var event = _ref11.event,
          start = _ref11.start,
          end = _ref11.end;
      var onDropEvent = _this.props.onDropEvent;
      onDropEvent && onDropEvent(event, start, end);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleResizeEvent", function (resizeType, _ref12) {
      var event = _ref12.event,
          start = _ref12.start,
          end = _ref12.end;
      var onResizeEvent = _this.props.onResizeEvent;
      onResizeEvent && onResizeEvent(event, start, end);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleCanDrag", function (event) {
      var _this$state11 = _this.state,
          view = _this$state11.view,
          mode = _this$state11.mode;
      var canDrag = _this.props.canDrag;

      if (view === 'month' || view === 'week' && mode === 'team') {
        return false;
      } else if (canDrag) {
        return canDrag(event);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleCanResize", function (event) {
      var _this$state12 = _this.state,
          view = _this$state12.view,
          mode = _this$state12.mode;
      var canResize = _this.props.canResize;

      if (view === 'month' || view === 'week' && mode === 'team') {
        return false;
      } else if (canResize) {
        return canResize(event);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleShowScheduleDateDialog", function () {
      _this.setState({
        isSelectingScheduleDate: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleHideScheduleDateDialog", function () {
      _this.setState({
        isSelectingScheduleDate: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleScheduleDateSelect",
    /*#__PURE__*/
    function () {
      var _ref13 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(date) {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this.setState({
                  isSelectingScheduleDate: false,
                  selectedDate: date
                });

              case 2:
                _this.refresh();

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function (_x3) {
        return _ref13.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSelectToday", function () {
      _this.handleScheduleDateSelect((0, _momentTimezone.default)());
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSelectTeammate",
    /*#__PURE__*/
    function () {
      var _ref14 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8(selectedTeammate) {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this.setState({
                  selectedTeammate: selectedTeammate,
                  showAllTeammates: false
                });

              case 2:
                _this.jumpToUserMode();

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function (_x4) {
        return _ref14.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClearSelectedTeammate", function () {
      _this.setState({
        selectedTeammate: null
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleToggleUserMode", function () {
      _this.handleClearSelectedTeammate();

      _this.jumpToUserMode();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleToggleTeamMode", function () {
      _this.handleClearSelectedTeammate();

      _this.jumpToTeamMode();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleToggleShowWorking",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee9() {
      var oldShowOnlyWorking, showOnlyWorking;
      return _regenerator.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              oldShowOnlyWorking = _this.state.showOnlyWorking;
              showOnlyWorking = !oldShowOnlyWorking;
              _context9.next = 4;
              return _this.setState({
                showOnlyWorking: showOnlyWorking,
                workingTeammates: _this.workingTeammates()
              });

            case 4:
              _this.toggleShowOnCalendars();

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "workingTeammates", function () {
      var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          schedule = _ref16.schedule,
          date = _ref16.date;

      var _this$state13 = _this.state,
          teamSchedule = _this$state13.teamSchedule,
          selectedDate = _this$state13.selectedDate,
          teammates = _this$state13.teammates;
      var formattedDate = (date || selectedDate).format('YYYY-MM-DD');

      if (!schedule && !teamSchedule) {
        return teammates;
      }

      return teammates.filter(function (teammate) {
        return (schedule || teamSchedule)[teammate.UserId] && (schedule || teamSchedule)[teammate.UserId][formattedDate];
      });
    });
    _this.state = {
      currentPage: 0,
      view: _props.defaultView,
      mode: _props.defaultMode,
      renderFirstCalendar: true,
      // the first calendar is always the logged in user
      renderFirstEvents: true,
      // rendering events is slow, so we may defer loading them until later
      renderAllCalendars: _props.defaultMode === 'team',
      renderAllEvents: true,
      showAllTeammates: _props.defaultMode === 'team',
      transitioning: false,
      selectedDate: (0, _momentTimezone.default)().tz(_props.auth.Location.timezone),
      earliestTime: null,
      latestTime: null,
      teammates: _props.teammates ? _props.teammates : [],
      views: _props.supportedViews,
      resized: 0,
      events: [],
      // All events for current date range
      storeSchedule: [],
      // Hours store is open for selected date range,
      selectedTeammate: null,
      optionsLoaded: [],
      isFetchingEvents: true,
      isSelectingScheduleDate: false,
      teamSchedule: false,
      // if a team schedule is supplied (keyed by user id, then date), then we render on/off hours
      showOnlyWorking: true // if a team schedule is show, we unlock new ability to filter by working/not working
      // Expected event structure:
      // const event = {
      // 	title: 'My favorite event',
      // 	className: 'shift',
      // 	start: new Date(),
      //  end: new Date(),
      // 	allDay: true,
      //  userId: id,
      // 	payload: { data preserved in callback }
      // }

    };
    return _this;
  }

  (0, _createClass2.default)(BigCalendar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          auth = _this$props2.auth,
          className = _this$props2.className,
          supportedViews = _this$props2.supportedViews,
          timeslots = _this$props2.timeslots,
          step = _this$props2.step,
          titleAccessor = _this$props2.titleAccessor;
      var _this$state14 = this.state,
          selectedDate = _this$state14.selectedDate,
          view = _this$state14.view,
          mode = _this$state14.mode,
          transitioning = _this$state14.transitioning,
          renderAllCalendars = _this$state14.renderAllCalendars,
          renderFirstCalendar = _this$state14.renderFirstCalendar,
          events = _this$state14.events,
          isFetchingEvents = _this$state14.isFetchingEvents,
          isSelectingScheduleDate = _this$state14.isSelectingScheduleDate,
          selectedTeammate = _this$state14.selectedTeammate,
          teamSchedule = _this$state14.teamSchedule,
          showOnlyWorking = _this$state14.showOnlyWorking; // populate views to take into account team week

      var selectedView = view;
      var views = {};
      supportedViews.forEach(function (view) {
        views[view] = true;
      });
      views.team_week = _HorizontalWeek.default;

      if (mode === 'team' && view === 'week') {
        selectedView = 'team_week';
      }

      var teammateWrapperWidth = this.getDesiredTeammateWrapperWidth();
      var scrollWidth = this.getDesiredScrollWidth();
      var scrollHeight = this.getDesiredScrollHeight(); // format times

      var formats = {
        // format times in left column
        timeGutterFormat: function timeGutterFormat(date) {
          return (0, _momentTimezone.default)(date).format('h:mma');
        } // setup start and end times

      };

      var _this$timeRange = this.timeRange(),
          _this$timeRange2 = (0, _slicedToArray2.default)(_this$timeRange, 2),
          min = _this$timeRange2[0],
          max = _this$timeRange2[1]; // configure react-sprucebot calendar


      var calendarProps = {
        view: selectedView,
        formats: formats,
        toolbar: false,
        min: min,
        max: max // Optionally passed calendar props

      };

      if (timeslots) {
        calendarProps.timeslots = timeslots;
      }

      if (step) {
        calendarProps.step = step;
      }

      if (titleAccessor) {
        calendarProps.titleAccessor = titleAccessor;
      } // Determine selected date in relation to today


      var currentDate = _momentTimezone.default.tz(selectedDate, auth.Location.timezone).format('YYYY-MM-DD HH:mm:ss');

      var today = (0, _momentTimezone.default)().tz(auth.Location.timezone).startOf('day');

      var selectedDateStart = _momentTimezone.default.tz(selectedDate, auth.Location.timezone).startOf('day');

      var isToday = today.isSame(selectedDateStart);
      var classNames = "".concat(className || '', " ").concat(mode === 'team' ? 'team' : 'user', " ").concat(transitioning ? 'transitioning' : '', " ").concat(view);
      var team = this.getTeammates();
      var isFetching = isFetchingEvents || transitioning;
      var isLoaderOutside = view === 'week' && mode === 'user' || view === 'month';
      return _react.default.createElement("div", {
        className: "big_calendar ".concat(classNames)
      }, isSelectingScheduleDate && _react.default.createElement(_Dialog.default, {
        title: "Choose Date",
        className: "schedule_calendar_select",
        onTapClose: this.handleHideScheduleDateDialog
      }, _react.default.createElement(_DateSelect.default, {
        defaultDate: selectedDate,
        initialVisibleMonth: function initialVisibleMonth() {
          return selectedDate;
        },
        onDateSelect: this.handleScheduleDateSelect,
        timezone: auth.Location.timezone,
        allowPastDates: true
      }), !isToday && _react.default.createElement(_Button.default, {
        primary: true,
        onClick: this.handleSelectToday
      }, "Jump to Today")), _react.default.createElement(_Tabs.Tabs, {
        ref: function ref(element) {
          return _this2.tabs = element;
        },
        onChange: this.handleChangeView
      }, _react.default.createElement(_Tabs.TabPane, {
        title: "Day"
      }), _react.default.createElement(_Tabs.TabPane, {
        title: "Week"
      }), _react.default.createElement(_Tabs.TabPane, {
        title: "Month"
      })), _react.default.createElement("div", {
        className: "calendar__controls ".concat(selectedTeammate ? 'selected-teammate-controls' : '')
      }, _react.default.createElement(_Pager.default, {
        infinite: true,
        onChange: this.handlePagerChange,
        titles: this.generatePagerTitle,
        jumpAmount: selectedView !== 'month' ? 7 : 1,
        showStep: selectedView === 'day'
      }), !selectedTeammate && _react.default.createElement(_Button.default, {
        className: "toggle-mode",
        onClick: this.handleToggleMode
      }, !selectedTeammate && mode === 'team' ? 'show just me' : 'show team'), selectedTeammate && _react.default.createElement("div", {
        className: "selected-teammate-wrapper"
      }, _react.default.createElement(_Button.default, {
        className: "toggle-mode",
        onClick: this.handleToggleUserMode
      }, 'show me'), _react.default.createElement(_Button.default, {
        className: "toggle-mode",
        onClick: this.handleToggleTeamMode
      }, 'show team')), mode === 'team' && view === 'day' && teamSchedule && _react.default.createElement(_Button.default, {
        className: "toggle-mode toggle-show-working",
        onClick: this.handleToggleShowWorking
      }, showOnlyWorking ? 'show everyone' : 'show only working')), _react.default.createElement("div", {
        className: "calendars__wrapper ".concat(isFetching ? 'fetching' : ''),
        ref: function ref(_ref18) {
          _this2.calendarWrapper = _ref18;
        }
      }, _react.default.createElement("div", {
        className: "calendar__scroll",
        style: {
          width: scrollWidth,
          height: scrollHeight
        }
      }, team.map(function (teammate, idx) {
        return _react.default.createElement("div", {
          key: "calendar-wrapper-".concat(teammate.User.id),
          className: "teammate_calendar__wrapper ".concat(idx === 0 ? '' : 'hide'),
          style: {
            width: teammateWrapperWidth
          }
        }, !(view === 'month' && mode === 'team') && _react.default.createElement("div", {
          className: "avatar_wrapper",
          onClick: function onClick() {
            return idx !== 0 && _this2.handleSelectTeammate(teammate);
          }
        }, _react.default.createElement("span", null, _react.default.createElement(_Avatar.default, {
          top: true,
          user: teammate
        }), _react.default.createElement("span", {
          className: "calendar__teammate_name"
        }, teammate.User.name))), idx === 0 && view === 'month' && mode === 'team' && team.map(function (teammate) {
          return _react.default.createElement("div", {
            className: "avatar_wrapper"
          }, _react.default.createElement("span", null, _react.default.createElement(_Avatar.default, {
            top: true,
            user: teammate
          }), _react.default.createElement("span", {
            className: "calendar__teammate_name"
          }, teammate.User.casualName)));
        }), (idx === 0 && renderFirstCalendar || idx > 0 && renderAllCalendars) && _react.default.createElement(_Calendar.default, (0, _extends2.default)({
          className: "".concat(idx === 0 && !renderFirstCalendar ? 'hide' : ''),
          currentDate: currentDate,
          views: views,
          events: events ? _this2.filterEvents(events, teammate) : [],
          eventPropGetter: function eventPropGetter(event) {
            return _this2.eventPropGetter(event);
          },
          onSelectEvent: function onSelectEvent(event, e) {
            return _this2.handleClickEvent({
              event: event,
              teammate: teammate,
              view: view,
              mode: mode
            }, e);
          },
          onSelectSlot: function onSelectSlot(_ref17, e) {
            var start = _ref17.start,
                end = _ref17.end,
                action = _ref17.action;
            return _this2.handleClickOpenSlot({
              start: start,
              end: end,
              action: action,
              teammate: teammate,
              view: view,
              mode: mode
            }, e);
          },
          onEventDrop: _this2.handleDropEvent,
          onEventResize: _this2.handleResizeEvent,
          canDrag: _this2.handleCanDrag,
          canResize: _this2.handleCanResize,
          popup: selectedView === 'month',
          slotPropGetter: function slotPropGetter(date) {
            return _this2.slotPropGetter(teammate, date);
          },
          dayPropGetter: function dayPropGetter(date) {
            return _this2.dayPropGetter(teammate, date);
          }
        }, calendarProps)), isFetching && !isLoaderOutside && _react.default.createElement("div", {
          className: "loader__underlay"
        }, _react.default.createElement(_Loader.default, null)));
      })), isFetching && isLoaderOutside && _react.default.createElement("div", {
        className: "loader__underlay"
      }, _react.default.createElement(_Loader.default, null))));
    }
  }]);
  return BigCalendar;
}(_react.Component);

exports.default = BigCalendar;
BigCalendar.propTypes = {
  auth: _propTypes.default.object.isRequired,
  teammates: _propTypes.default.array,
  supportedViews: _propTypes.default.array.isRequired,
  //NOT IMPLEMENTED
  defaultView: _propTypes.default.string.isRequired,
  supportedModes: _propTypes.default.array.isRequired,
  //NOT IMPLEMENTED
  defaultMode: _propTypes.default.string.isRequired,
  teamDayViewWidth: _propTypes.default.number,
  onClickEvent: _propTypes.default.func,
  onClickOpenSlot: _propTypes.default.func,
  onDropEvent: _propTypes.default.func,
  onResizeEvent: _propTypes.default.func,
  timeslots: _propTypes.default.number,
  step: _propTypes.default.number,
  slotPropGetter: _propTypes.default.func,
  dayPropGetter: _propTypes.default.func
};
BigCalendar.defaultProps = {
  supportedViews: ['day', 'week', 'month'],
  //NOT IMPLEMENTED
  defaultView: 'day',
  supportedModes: ['user', 'team'],
  //NOT IMPLEMENTED
  defaultMode: 'user',
  teamDayViewWidth: 250,
  timeslots: 4,
  step: 15
};