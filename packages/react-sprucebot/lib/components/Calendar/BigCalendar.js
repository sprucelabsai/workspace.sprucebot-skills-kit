'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _es6Tween = require('es6-tween');

var _Avatar = require('../Avatar/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _ControlButton = require('../ControlButton/ControlButton');

var _ControlButton2 = _interopRequireDefault(_ControlButton);

var _DateSelect = require('../DateSelect/DateSelect');

var _DateSelect2 = _interopRequireDefault(_DateSelect);

var _Dialog = require('../Dialog/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _HorizontalWeek = require('./HorizontalWeek');

var _HorizontalWeek2 = _interopRequireDefault(_HorizontalWeek);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Pager = require('../Pager/Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _Tabs = require('../Tabs/Tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _es6Tween.autoPlay)(true);

var getElementWidth = function getElementWidth(element) {
	return element && element.offsetWidth;
};
var getElementHeight = function getElementHeight(element) {
	return element && element.offsetHeight;
};

var BigCalendar = function (_Component) {
	_inherits(BigCalendar, _Component);

	function BigCalendar(props) {
		var _this2 = this;

		_classCallCheck(this, BigCalendar);

		var _this = _possibleConstructorReturn(this, (BigCalendar.__proto__ || Object.getPrototypeOf(BigCalendar)).call(this, props));

		_this.componentDidMount = function () {
			//give things a sec to settle before recording sizes
			_this.refresh();
			setTimeout(function () {}, 250);
			window.addEventListener('resize', _this.handleWindowResize);
		};

		_this.componentWillUnmount = function () {
			window.removeEventListener('resize', _this.handleWindowResize);
		};

		_this.setEvents = function (events) {
			_this.setState({ events: events });
		};

		_this.triggerRefresh = function () {
			_this.refresh();
		};

		_this.events = function () {
			return _this.state.events;
		};

		_this.setView = function (view) {
			_this.handleChangeView(0);
			_this.tabs.setSelected(0, '.0');
		};

		_this.setMode = function (mode) {
			_this.setState({ mode: mode });
		};

		_this.setDate = function (selectedDate) {
			_this.setState({ selectedDate: selectedDate });
		};

		_this.generatePagerTitle = function (page) {
			var auth = _this.props.auth;
			var _this$state = _this.state,
			    view = _this$state.view,
			    selectedDate = _this$state.selectedDate;


			var title = void 0;

			if (view === 'month') {
				title = (0, _moment2.default)(selectedDate).format('MMM YYYY');
			} else if (view === 'week') {
				var startOfWeek = (0, _moment2.default)(selectedDate).startOf('week');
				var endOfWeek = (0, _moment2.default)(selectedDate).endOf('week');

				if (startOfWeek.isSame(endOfWeek, 'month')) {
					title = startOfWeek.format('MMM Do') + ' - ' + endOfWeek.format('Do');
				} else {
					title = startOfWeek.format('MMM Do') + ' - ' + endOfWeek.format('MMM Do');
				}
			} else if (view === 'day') {
				var now = (0, _moment2.default)().tz(auth.Location.timezone).startOf('day');
				var days = _moment2.default.tz(selectedDate, auth.Location.timezone).startOf('day').diff(now, 'days');

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
						title = (0, _moment2.default)(selectedDate).format('ddd, MMM Do');
						break;
				}
			}

			return _react2.default.createElement(
				_ControlButton2.default,
				{
					className: 'sub_control',
					onClick: _this.handleShowScheduleDateDialog
				},
				title,
				' ',
				_react2.default.createElement(
					_Icon2.default,
					null,
					'keyboard_arrow_down'
				)
			);
		};

		_this.getDesiredTeammateWrapperWidth = function () {
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
		};

		_this.getDesiredScrollWidth = function () {
			//act like a normal div until loaded
			if (!_this.calendarWrapper) {
				return '100%';
			}
			var _this$state3 = _this.state,
			    view = _this$state3.view,
			    mode = _this$state3.mode,
			    teammates = _this$state3.teammates,
			    transitioning = _this$state3.transitioning;


			var calendarWrapperWidth = getElementWidth(_this.calendarWrapper);
			var widthOfAllCalendars = 0;
			var minWidthOfAllCalendars = _this.getDesiredTeammateWrapperWidth() * teammates.length;

			document.querySelectorAll('.teammate_calendar__wrapper').forEach(function (wrapper) {
				widthOfAllCalendars += getElementWidth(wrapper);
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
		};

		_this.getDesiredScrollHeight = function () {
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
		};

		_this.handleChange = function () {
			_this.refresh();
		};

		_this.refresh = function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var triggerOnNavigate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var _this$state5, mode, view, teammates, selectedDate, optionsLoaded, _this$props, auth, onNavigate, fetchEvents, currentView, currentUser, startDate, endDate, options, _ref2, storeSchedule, events;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_this$state5 = _this.state, mode = _this$state5.mode, view = _this$state5.view, teammates = _this$state5.teammates, selectedDate = _this$state5.selectedDate, optionsLoaded = _this$state5.optionsLoaded;
								_this$props = _this.props, auth = _this$props.auth, onNavigate = _this$props.onNavigate, fetchEvents = _this$props.fetchEvents;
								currentView = view === 'team_week' ? 'week' : view;
								currentUser = teammates.find(function (teammate) {
									return teammate.User.id === auth.UserId;
								});
								startDate = (0, _moment2.default)(selectedDate).startOf(currentView);
								endDate = (0, _moment2.default)(selectedDate).endOf(currentView);
								options = {
									mode: mode,
									startDate: startDate,
									endDate: endDate,
									view: currentView,
									teammates: mode === 'user' ? currentUser : teammates

									// const eventsLoaded = this.checkOptions(options)

									// if (!eventsLoaded) {
								};
								_this.setState({
									optionsLoaded: [].concat(_toConsumableArray(optionsLoaded), [options]),
									isFetchingEvents: true
								});

								triggerOnNavigate && onNavigate && onNavigate(options);
								_context.prev = 9;
								_context.next = 12;
								return fetchEvents(options);

							case 12:
								_ref2 = _context.sent;
								storeSchedule = _ref2.storeSchedule;
								events = _ref2.events;

								_this.setState({ storeSchedule: storeSchedule, events: events, isFetchingEvents: false });
								_context.next = 22;
								break;

							case 18:
								_context.prev = 18;
								_context.t0 = _context['catch'](9);

								console.log(_context.t0);
								_this.setState({ isFetchingEvents: false });

							case 22:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2, [[9, 18]]);
			}));

			return function () {
				return _ref.apply(this, arguments);
			};
		}();

		_this.checkOptions = function (options) {
			return _this.state.optionsLoaded.find(function (loaded) {
				return (0, _isEqual2.default)(loaded, options);
			});
		};

		_this.handlePagerChange = function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(page) {
				var view, diff, stepType;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, _this2);
			}));

			return function (_x2) {
				return _ref3.apply(this, arguments);
			};
		}();

		_this.handleChangeView = function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(idx) {
				var _this$state6, mode, view, newView, movingToWeek;

				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_this$state6 = _this.state, mode = _this$state6.mode, view = _this$state6.view;
								newView = _this.state.views[idx];
								movingToWeek = mode === 'user' && view !== 'week' && newView === 'week';
								_context3.next = 5;
								return _this.setState({
									view: newView
									// renderFirstCalendar: !movingToWeek
								});

							case 5:

								// because month view does not show all teammates, if we are in team mode jumping OFF month view, lets
								// re-show team wrappers
								if (mode === 'team' && view === 'month' && newView !== 'month') {
									_this.toggleShowOnCalendars();
								} else if (mode === 'user' && view !== 'week' && newView === 'week') {
									//NOTE: Removed this delay as it was causing DOM issues with the calendar not rendering fast enough;
									// Changes to BE data structure and FE should limit render lag that was initially seen
									// week view is heavy, give dom a sec to render before rendering calendar
									// this.delayedRenderWeekView()
								}
								_this.handleChange();
								//trigger a refresh which causes, sizes to be recalculated. 500 delay for css transitions
								setTimeout(function () {
									_this.handleWindowResize();
								}, 500);

							case 8:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, _this2);
			}));

			return function (_x3) {
				return _ref4.apply(this, arguments);
			};
		}();

		_this.delayedRenderWeekView = function () {
			setTimeout(function () {
				_this.setState({ renderFirstCalendar: true });
			}, 100);
		};

		_this.timeRange = function () {
			var _this$state7 = _this.state,
			    selectedDate = _this$state7.selectedDate,
			    storeSchedule = _this$state7.storeSchedule,
			    events = _this$state7.events;


			var adjustedEvents = events.filter(function (event) {
				return !event.allDay;
			}).map(function (event) {
				return {
					startTime: (0, _moment2.default)(event.start).format('HH:mm:ss'),
					endTime: (0, _moment2.default)(event.end).format('HH:mm:ss')
				};
			});

			var day = selectedDate.format('YYYY-MM-DD');
			var combinedTimes = [].concat(_toConsumableArray(storeSchedule), _toConsumableArray(adjustedEvents.filter(function (event) {
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
					var start = (0, _moment2.default)(day + ' ' + event.startTime).startOf('hour').subtract(2, 'hour');
					var end = (0, _moment2.default)(day + ' ' + event.endTime).endOf('hour').add(2, 'hour');

					if (!earliest || earliest.diff(start) > 0) {
						earliest = start;
					}

					if (!latest || latest.diff(end) < 0) {
						latest = end;
					}
				});

				if (!earliest.isSame(day, 'day')) {
					earliest = (0, _moment2.default)(day + ' 00:00:00');
				}

				if (!latest.isSame(day, 'day')) {
					latest = (0, _moment2.default)(day + ' 23:59:59');
				}
			} else {
				earliest = (0, _moment2.default)(selectedDate).hour(7).minutes(0).seconds(0);

				latest = (0, _moment2.default)(selectedDate).hour(18).minutes(0).seconds(0);
			}

			return [earliest.format('YYYY-MM-DD HH:mm:ss'), latest.format('YYYY-MM-DD HH:mm:ss')];
		};

		_this.toggleShowOnCalendars = function () {
			// show teammates calendars one at a time
			var calendars = [].concat(_toConsumableArray(document.querySelectorAll('.teammate_calendar__wrapper')));

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
		};

		_this.jumpToTeamMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							if (!_this.state.transitioning) {
								_context4.next = 2;
								break;
							}

							return _context4.abrupt('return');

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
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this2);
		}));
		_this.jumpToUserMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
			var view;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							if (!_this.state.transitioning) {
								_context5.next = 2;
								break;
							}

							return _context5.abrupt('return');

						case 2:

							//scroll calendar left
							new _es6Tween.Tween({
								y: _this.calendarWrapper.scrollLeft
							}).to({ y: 0 }, 500).on('update', function (_ref7) {
								var y = _ref7.y;

								_this.calendarWrapper.scrollLeft = y;
							}).easing(_es6Tween.Easing.Quadratic.Out).start();

							// when jumping to week view in user mode, delay render because it's heavy
							view = _this.state.view;

							//first give css transitions a sec to adjust the view

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
							}

							// to hard on the client
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
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, _this2);
		}));

		_this.handleToggleMode = function () {
			var mode = _this.state.mode;


			switch (mode) {
				case 'team':
					_this.jumpToUserMode();
					break;
				default:
					_this.jumpToTeamMode();
					break;
			}
		};

		_this.handleWindowResize = function () {
			_this.setState({
				resized: _this.state.resized++
			});
		};

		_this.filterEvents = function (events, teammate) {
			var _this$state8 = _this.state,
			    view = _this$state8.view,
			    mode = _this$state8.mode,
			    transitioning = _this$state8.transitioning;

			// make transitions faster?

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
		};

		_this.applyClassNames = function (event) {
			return { className: '' + (event.className || '') };
		};

		_this.handleClickEvent = function (options, e) {
			var onClickEvent = _this.props.onClickEvent;


			onClickEvent && onClickEvent(options, e);
		};

		_this.handleClickOpenSlot = function (options, e) {
			var onClickOpenSlot = _this.props.onClickOpenSlot;


			onClickOpenSlot && onClickOpenSlot(options, e);
		};

		_this.handleDropEvent = function (_ref8) {
			var event = _ref8.event,
			    start = _ref8.start,
			    end = _ref8.end;
			var onDropEvent = _this.props.onDropEvent;


			onDropEvent && onDropEvent(event, start, end);
		};

		_this.handleResizeEvent = function (resizeType, _ref9) {
			var event = _ref9.event,
			    start = _ref9.start,
			    end = _ref9.end;
			var onResizeEvent = _this.props.onResizeEvent;


			onResizeEvent && onResizeEvent(event, start, end);
		};

		_this.handleCanDrag = function (event) {
			var canDrag = _this.props.canDrag;


			if (canDrag) {
				return canDrag(event);
			}
		};

		_this.handleCanResize = function (event) {
			var canResize = _this.props.canResize;


			if (canResize) {
				return canResize(event);
			}
		};

		_this.handleShowScheduleDateDialog = function () {
			_this.setState({ isSelectingScheduleDate: true });
		};

		_this.handleHideScheduleDateDialog = function () {
			_this.setState({ isSelectingScheduleDate: false });
		};

		_this.handleScheduleDateSelect = function () {
			var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(date) {
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								_context6.next = 2;
								return _this.setState({
									isSelectingScheduleDate: false,
									selectedDate: date
								});

							case 2:
								_this.refresh();

							case 3:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, _this2);
			}));

			return function (_x4) {
				return _ref10.apply(this, arguments);
			};
		}();

		_this.handleSelectToday = function () {
			_this.handleScheduleDateSelect((0, _moment2.default)());
		};

		_this.state = {
			currentPage: 0,
			view: props.defaultView,
			mode: props.defaultMode,
			renderFirstCalendar: true, // the first calendar is always the logged in user
			renderFirstEvents: true, // rendering events is slow, so we may defer loading them until later
			renderAllCalendars: false,
			renderAllEvents: true,
			showAllTeammates: props.defaultMode === 'team',
			transitioning: false,
			selectedDate: (0, _moment2.default)().tz(props.auth.Location.timezone),
			earliestTime: null,
			latestTime: null,
			teammates: props.teammates ? props.teammates : [],
			views: props.supportedViews,
			resized: 0,
			events: [], // All events for current date range
			storeSchedule: [], // Hours store is open for selected date range,
			optionsLoaded: [],
			isFetchingEvents: true,
			isSelectingScheduleDate: false
			// Expected event structure:
			// const event = {
			// 	title: 'My favorite event',
			// 	className: 'shift',
			// 	start: new Date(),
			// 	end: new Date(),
			// 	allDay: true,
			//  userId: id,
			// 	payload: { data preserved in callback }
			// }
		};return _this;
	}

	//the earliest and latest time of all schedules


	/**
  * DATE SELECT METHODS
  */


	_createClass(BigCalendar, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    auth = _props.auth,
			    className = _props.className,
			    supportedViews = _props.supportedViews,
			    timeslots = _props.timeslots,
			    step = _props.step,
			    titleAccessor = _props.titleAccessor;
			var _state = this.state,
			    selectedDate = _state.selectedDate,
			    view = _state.view,
			    teammates = _state.teammates,
			    mode = _state.mode,
			    transitioning = _state.transitioning,
			    renderAllCalendars = _state.renderAllCalendars,
			    showAllTeammates = _state.showAllTeammates,
			    renderFirstCalendar = _state.renderFirstCalendar,
			    events = _state.events,
			    renderAllEvents = _state.renderAllEvents,
			    isFetchingEvents = _state.isFetchingEvents,
			    isSelectingScheduleDate = _state.isSelectingScheduleDate;

			// populate views to take into account team week

			var selectedView = view;
			var views = {};
			supportedViews.forEach(function (view) {
				views[view] = true;
			});

			views.team_week = _HorizontalWeek2.default;

			if (mode === 'team' && view === 'week') {
				selectedView = 'team_week';
			}

			var teammateWrapperWidth = this.getDesiredTeammateWrapperWidth();
			var scrollWidth = this.getDesiredScrollWidth();
			var scrollHeight = this.getDesiredScrollHeight();

			// format times
			var formats = {
				// format times in left column
				timeGutterFormat: function timeGutterFormat(date) {
					return (0, _moment2.default)(date).format('h:mma');
				}

				// setup start and end times
			};
			var _timeRange = this.timeRange(),
			    _timeRange2 = _slicedToArray(_timeRange, 2),
			    min = _timeRange2[0],
			    max = _timeRange2[1];

			// configure react-sprucebot calendar


			var calendarProps = {
				view: selectedView,
				formats: formats,
				toolbar: false,
				date: selectedDate,
				min: min,
				max: max

				// Determine selected date in relation to today
			};var currentDate = _moment2.default.tz(selectedDate, auth.Location.timezone).format('YYYY-MM-DD HH:mm:ss');
			var today = (0, _moment2.default)().tz(auth.Location.timezone).startOf('day');
			var selectedDateStart = _moment2.default.tz(selectedDate, auth.Location.timezone).startOf('day');
			var isToday = today.isSame(selectedDateStart);

			// Optionally passed calendar props
			if (timeslots) {
				calendarProps.timeslots = timeslots;
			}
			if (step) {
				calendarProps.step = step;
			}

			if (titleAccessor) {
				calendarProps.titleAccessor = titleAccessor;
			}
			var classNames = (className || '') + ' ' + (mode === 'team' ? 'team' : 'user') + ' ' + (transitioning ? 'transitioning' : '') + ' ' + view;

			var team = mode === 'team' ? teammates : [auth];

			//filter authed user out and prepend
			if (view === 'month') {
				team = [auth];
			} else if (showAllTeammates) {
				team = team.filter(function (teammate) {
					return teammate.User.id !== auth.User.id;
				});
				team = [auth].concat(_toConsumableArray(team));
			}

			var isFetching = isFetchingEvents || transitioning;
			var isLoaderOutside = view === 'week' && mode === 'user' || view === 'month';

			return _react2.default.createElement(
				'div',
				{ className: 'big_calendar ' + classNames },
				isSelectingScheduleDate && _react2.default.createElement(
					_Dialog2.default,
					{
						title: 'Jump To Day',
						className: 'schedule_calendar_select',
						onTapClose: this.handleHideScheduleDateDialog
					},
					_react2.default.createElement(_DateSelect2.default, {
						defaultDate: selectedDate,
						initialVisibleMonth: function initialVisibleMonth() {
							return selectedDate;
						},
						onDateSelect: this.handleScheduleDateSelect,
						timezone: auth.Location.timezone,
						allowPastDates: true
					}),
					!isToday && _react2.default.createElement(
						_Button2.default,
						{
							primary: true,
							onClick: this.handleSelectToday
						},
						'Jump to Today'
					)
				),
				_react2.default.createElement(
					_Tabs.Tabs,
					{
						ref: function ref(element) {
							return _this3.tabs = element;
						},
						onChange: this.handleChangeView
					},
					_react2.default.createElement(_Tabs.TabPane, { title: 'Day' }),
					_react2.default.createElement(_Tabs.TabPane, { title: 'Week' }),
					_react2.default.createElement(_Tabs.TabPane, { title: 'Month' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'calendar__controls' },
					_react2.default.createElement(_Pager2.default, {
						infinite: true,
						onChange: this.handlePagerChange,
						titles: this.generatePagerTitle,
						jumpAmount: selectedView !== 'month' ? 7 : 1,
						showStep: selectedView === 'day'
					}),
					_react2.default.createElement(
						_Button2.default,
						{ className: 'toggle-mode', onClick: this.handleToggleMode },
						mode === 'team' ? 'show just me' : 'show team'
					)
				),
				_react2.default.createElement(
					'div',
					{
						className: 'calendars__wrapper ' + (isFetching ? 'fetching' : ''),
						ref: function ref(_ref12) {
							_this3.calendarWrapper = _ref12;
						}
					},
					_react2.default.createElement(
						'div',
						{
							className: 'calendar__scroll',
							style: { width: scrollWidth, height: scrollHeight }
						},
						team.map(function (teammate, idx) {
							return _react2.default.createElement(
								'div',
								{
									key: 'calendar-wrapper-' + teammate.User.id,
									className: 'teammate_calendar__wrapper ' + (idx === 0 ? '' : 'hide'),
									style: {
										width: teammateWrapperWidth
									}
								},
								!(view === 'month' && mode === 'team') && _react2.default.createElement(
									'div',
									{ className: 'avatar_wrapper' },
									_react2.default.createElement(
										'span',
										null,
										_react2.default.createElement(_Avatar2.default, { top: true, user: teammate }),
										_react2.default.createElement(
											'span',
											{ className: 'calendar__teammate_name' },
											teammate.User.casualName
										)
									)
								),
								idx === 0 && view === 'month' && mode === 'team' && teammates.map(function (teammate) {
									return _react2.default.createElement(
										'div',
										{ className: 'avatar_wrapper' },
										_react2.default.createElement(
											'span',
											null,
											_react2.default.createElement(_Avatar2.default, { top: true, user: teammate }),
											_react2.default.createElement(
												'span',
												{ className: 'calendar__teammate_name' },
												teammate.User.casualName
											)
										)
									);
								}),
								(idx === 0 && renderFirstCalendar || idx > 0 && renderAllCalendars) && _react2.default.createElement(_Calendar2.default, _extends({
									className: '' + (idx === 0 && !renderFirstCalendar ? 'hide' : ''),
									timezone: auth.Location.timezone,
									currentDate: currentDate,
									views: views,
									events: events ? _this3.filterEvents(events, teammate) : [],
									eventPropGetter: function eventPropGetter(event) {
										return _this3.applyClassNames(event);
									},
									onSelectEvent: function onSelectEvent(event, e) {
										return _this3.handleClickEvent({ event: event, teammate: teammate, view: view, mode: mode }, e);
									},
									onSelectSlot: function onSelectSlot(_ref11, e) {
										var start = _ref11.start,
										    end = _ref11.end,
										    action = _ref11.action;
										return _this3.handleClickOpenSlot({
											start: start,
											end: end,
											action: action,
											teammate: teammate,
											view: view,
											mode: mode
										}, e);
									},
									onEventDrop: _this3.handleDropEvent,
									onEventResize: _this3.handleResizeEvent,
									canDrag: _this3.handleCanDrag,
									canResize: _this3.handleCanResize,
									popup: selectedView === 'month'
								}, calendarProps)),
								isFetching && !isLoaderOutside && _react2.default.createElement(
									'div',
									{ className: 'loader__underlay' },
									_react2.default.createElement(_Loader2.default, null)
								)
							);
						})
					),
					isFetching && isLoaderOutside && _react2.default.createElement(
						'div',
						{ className: 'loader__underlay' },
						_react2.default.createElement(_Loader2.default, null)
					)
				)
			);
		}
	}]);

	return BigCalendar;
}(_react.Component);

exports.default = BigCalendar;


BigCalendar.propTypes = {
	auth: _propTypes2.default.object.isRequired,
	teammates: _propTypes2.default.array,
	supportedViews: _propTypes2.default.array.isRequired, //NOT IMPLEMENTED
	defaultView: _propTypes2.default.string.isRequired,
	supportedModes: _propTypes2.default.array.isRequired, //NOT IMPLEMENTED
	defaultMode: _propTypes2.default.string.isRequired,
	teamDayViewWidth: _propTypes2.default.number,
	onClickEvent: _propTypes2.default.func,
	onClickOpenSlot: _propTypes2.default.func,
	onDropEvent: _propTypes2.default.func,
	onResizeEvent: _propTypes2.default.func,
	timeslots: _propTypes2.default.number,
	step: _propTypes2.default.number
};

BigCalendar.defaultProps = {
	supportedViews: ['day', 'week', 'month'], //NOT IMPLEMENTED
	defaultView: 'day',
	supportedModes: ['user', 'team'], //NOT IMPLEMENTED
	defaultMode: 'user',
	teamDayViewWidth: 250,
	timeslots: 4,
	step: 15
};