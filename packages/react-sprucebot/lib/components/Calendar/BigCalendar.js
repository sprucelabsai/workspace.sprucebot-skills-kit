'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
		_classCallCheck(this, BigCalendar);

		var _this = _possibleConstructorReturn(this, (BigCalendar.__proto__ || Object.getPrototypeOf(BigCalendar)).call(this, props));

		_initialiseProps.call(_this);

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
			selectedDate: (0, _momentTimezone2.default)().tz(props.auth.Location.timezone),
			earliestTime: null,
			latestTime: null,
			teammates: props.teammates ? props.teammates : [],
			views: props.supportedViews,
			resized: 0,
			events: [], // All events for current date range
			storeSchedule: [], // Hours store is open for selected date range,
			selectedTeammate: null,
			optionsLoaded: [],
			isFetchingEvents: true,
			isSelectingScheduleDate: false,
			teamSchedule: false, // if a team schedule is supplied (keyed by user id, then date), then we render on/off hours
			showOnlyWorking: true // if a team schedule is show, we unlock new ability to filter by working/not working

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
			var _this2 = this;

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
			    mode = _state.mode,
			    transitioning = _state.transitioning,
			    renderAllCalendars = _state.renderAllCalendars,
			    renderFirstCalendar = _state.renderFirstCalendar,
			    events = _state.events,
			    isFetchingEvents = _state.isFetchingEvents,
			    isSelectingScheduleDate = _state.isSelectingScheduleDate,
			    selectedTeammate = _state.selectedTeammate,
			    teamSchedule = _state.teamSchedule,
			    showOnlyWorking = _state.showOnlyWorking;

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
					return (0, _momentTimezone2.default)(date).format('h:mma');
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
				min: min,
				max: max

				// Optionally passed calendar props
			};if (timeslots) {
				calendarProps.timeslots = timeslots;
			}
			if (step) {
				calendarProps.step = step;
			}

			if (titleAccessor) {
				calendarProps.titleAccessor = titleAccessor;
			}

			// Determine selected date in relation to today
			var currentDate = _momentTimezone2.default.tz(selectedDate, auth.Location.timezone).format('YYYY-MM-DD HH:mm:ss');
			var today = (0, _momentTimezone2.default)().tz(auth.Location.timezone).startOf('day');
			var selectedDateStart = _momentTimezone2.default.tz(selectedDate, auth.Location.timezone).startOf('day');
			var isToday = today.isSame(selectedDateStart);

			var classNames = (className || '') + ' ' + (mode === 'team' ? 'team' : 'user') + ' ' + (transitioning ? 'transitioning' : '') + ' ' + view;

			var team = this.getTeammates();

			var isFetching = isFetchingEvents || transitioning;
			var isLoaderOutside = view === 'week' && mode === 'user' || view === 'month';

			return _react2.default.createElement(
				'div',
				{ className: 'big_calendar ' + classNames },
				isSelectingScheduleDate && _react2.default.createElement(
					_Dialog2.default,
					{
						title: 'Choose Date',
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
							return _this2.tabs = element;
						},
						onChange: this.handleChangeView
					},
					_react2.default.createElement(_Tabs.TabPane, { title: 'Day' }),
					_react2.default.createElement(_Tabs.TabPane, { title: 'Week' }),
					_react2.default.createElement(_Tabs.TabPane, { title: 'Month' })
				),
				_react2.default.createElement(
					'div',
					{
						className: 'calendar__controls ' + (selectedTeammate ? 'selected-teammate-controls' : '')
					},
					_react2.default.createElement(_Pager2.default, {
						infinite: true,
						onChange: this.handlePagerChange,
						titles: this.generatePagerTitle,
						jumpAmount: selectedView !== 'month' ? 7 : 1,
						showStep: selectedView === 'day'
					}),
					!selectedTeammate && _react2.default.createElement(
						_Button2.default,
						{ className: 'toggle-mode', onClick: this.handleToggleMode },
						!selectedTeammate && mode === 'team' ? 'show just me' : 'show team'
					),
					selectedTeammate && _react2.default.createElement(
						'div',
						{ className: 'selected-teammate-wrapper' },
						_react2.default.createElement(
							_Button2.default,
							{
								className: 'toggle-mode',
								onClick: this.handleToggleUserMode
							},
							'show me'
						),
						_react2.default.createElement(
							_Button2.default,
							{
								className: 'toggle-mode',
								onClick: this.handleToggleTeamMode
							},
							'show team'
						)
					),
					mode === 'team' && view === 'day' && teamSchedule && _react2.default.createElement(
						_Button2.default,
						{
							className: 'toggle-mode toggle-show-working',
							onClick: this.handleToggleShowWorking
						},
						showOnlyWorking ? 'show everyone' : 'show only working'
					)
				),
				_react2.default.createElement(
					'div',
					{
						className: 'calendars__wrapper ' + (isFetching ? 'fetching' : ''),
						ref: function ref(_ref2) {
							_this2.calendarWrapper = _ref2;
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
									{
										className: 'avatar_wrapper',
										onClick: function onClick() {
											return idx !== 0 && _this2.handleSelectTeammate(teammate);
										}
									},
									_react2.default.createElement(
										'span',
										null,
										_react2.default.createElement(_Avatar2.default, { top: true, user: teammate }),
										_react2.default.createElement(
											'span',
											{ className: 'calendar__teammate_name' },
											teammate.User.name
										)
									)
								),
								idx === 0 && view === 'month' && mode === 'team' && team.map(function (teammate) {
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
									currentDate: currentDate,
									views: views,
									events: events ? _this2.filterEvents(events, teammate) : [],
									eventPropGetter: function eventPropGetter(event) {
										return _this2.eventPropGetter(event);
									},
									onSelectEvent: function onSelectEvent(event, e) {
										return _this2.handleClickEvent({ event: event, teammate: teammate, view: view, mode: mode }, e);
									},
									onSelectSlot: function onSelectSlot(_ref, e) {
										var start = _ref.start,
										    end = _ref.end,
										    action = _ref.action;
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

var _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.componentDidMount = function () {
		//give things a sec to settle before recording sizes
		_this3.refresh();
		setTimeout(function () {}, 250);
		window.addEventListener('resize', _this3.handleWindowResize);
	};

	this.componentWillUnmount = function () {
		window.removeEventListener('resize', _this3.handleWindowResize);
	};

	this.setEvents = function (events) {
		_this3.setState({ events: events });
	};

	this.triggerRefresh = function () {
		_this3.refresh();
	};

	this.events = function () {
		return _this3.state.events;
	};

	this.setView = function (view) {
		_this3.handleChangeView(0);
		_this3.tabs.setSelected(0, '.0');
	};

	this.setMode = function (mode) {
		_this3.setState({ mode: mode });
	};

	this.setDate = function (selectedDate) {
		_this3.setState({ selectedDate: selectedDate });
	};

	this.generatePagerTitle = function (page) {
		var auth = _this3.props.auth;
		var _state2 = _this3.state,
		    view = _state2.view,
		    selectedDate = _state2.selectedDate;


		var title = void 0;

		if (view === 'month') {
			title = (0, _momentTimezone2.default)(selectedDate).format('MMM YYYY');
		} else if (view === 'week') {
			var startOfWeek = (0, _momentTimezone2.default)(selectedDate).startOf('week');
			var endOfWeek = (0, _momentTimezone2.default)(selectedDate).endOf('week');

			if (startOfWeek.isSame(endOfWeek, 'month')) {
				title = startOfWeek.format('MMM Do') + ' - ' + endOfWeek.format('Do');
			} else {
				title = startOfWeek.format('MMM Do') + ' - ' + endOfWeek.format('MMM Do');
			}
		} else if (view === 'day') {
			var now = (0, _momentTimezone2.default)().tz(auth.Location.timezone).startOf('day');
			var days = _momentTimezone2.default.tz(selectedDate, auth.Location.timezone).startOf('day').diff(now, 'days');

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
					title = (0, _momentTimezone2.default)(selectedDate).format('ddd, MMM Do');
					break;
			}
		}

		return _react2.default.createElement(
			_ControlButton2.default,
			{
				className: 'sub_control',
				onClick: _this3.handleShowScheduleDateDialog
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

	this.getDesiredTeammateWrapperWidth = function () {
		if (!_this3.calendarWrapper) {
			return '100%';
		}
		var _state3 = _this3.state,
		    view = _state3.view,
		    mode = _state3.mode;
		var teamDayViewWidth = _this3.props.teamDayViewWidth;


		var calendarWrapperWidth = getElementWidth(_this3.calendarWrapper);

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

	this.getDesiredScrollWidth = function () {
		//act like a normal div until loaded
		if (!_this3.calendarWrapper) {
			return '100%';
		}
		var _state4 = _this3.state,
		    view = _state4.view,
		    mode = _state4.mode,
		    transitioning = _state4.transitioning;

		var teammates = _this3.getTeammates();

		var calendarWrapperWidth = getElementWidth(_this3.calendarWrapper);
		var widthOfAllCalendars = 0;
		var minWidthOfAllCalendars = _this3.getDesiredTeammateWrapperWidth() * teammates.length;

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
	};

	this.getDesiredScrollHeight = function () {
		//act like a normal div until loaded
		if (!_this3.calendarWrapper) {
			return 'auto';
		}

		var _state5 = _this3.state,
		    mode = _state5.mode,
		    view = _state5.view;


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

	this.getTeammates = function () {
		var _state6 = _this3.state,
		    teammates = _state6.teammates,
		    workingTeammates = _state6.workingTeammates,
		    mode = _state6.mode,
		    view = _state6.view,
		    showOnlyWorking = _state6.showOnlyWorking,
		    selectedTeammate = _state6.selectedTeammate,
		    showAllTeammates = _state6.showAllTeammates,
		    teamSchedule = _state6.teamSchedule;
		var auth = _this3.props.auth;


		var team = mode === 'team' ? teammates : [auth];

		//filter authed user out and prepend
		if (selectedTeammate) {
			team = [selectedTeammate];
		} else if (teamSchedule && mode === 'team' && view === 'day' && showOnlyWorking) {
			return [auth].concat(_toConsumableArray(workingTeammates.filter(function (teammate) {
				return teammate.User.id !== auth.User.id;
			})));
		} else if (view === 'month') {
			team = [auth];
		} else if (showAllTeammates) {
			team = team.filter(function (teammate) {
				return teammate.User.id !== auth.User.id;
			});
			team = [auth].concat(_toConsumableArray(team));
		}

		return team;
	};

	this.handleChange = function () {
		_this3.refresh();
	};

	this.refresh = function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var triggerOnNavigate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var _state7, mode, view, teammates, selectedDate, optionsLoaded, selectedTeammate, _props2, auth, onNavigate, fetchEvents, currentView, currentUser, startDate, endDate, options, _ref4, teamSchedule, storeSchedule, events;

			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_state7 = _this3.state, mode = _state7.mode, view = _state7.view, teammates = _state7.teammates, selectedDate = _state7.selectedDate, optionsLoaded = _state7.optionsLoaded, selectedTeammate = _state7.selectedTeammate;
							_props2 = _this3.props, auth = _props2.auth, onNavigate = _props2.onNavigate, fetchEvents = _props2.fetchEvents;
							currentView = view === 'team_week' ? 'week' : view;
							currentUser = selectedTeammate ? selectedTeammate : teammates.find(function (teammate) {
								return teammate.User.id === auth.UserId;
							});
							startDate = (0, _momentTimezone2.default)(selectedDate).startOf(currentView);
							endDate = (0, _momentTimezone2.default)(selectedDate).endOf(currentView);
							options = {
								mode: mode,
								startDate: startDate,
								endDate: endDate,
								view: currentView,
								teammates: mode === 'user' ? [currentUser] : teammates

								// const eventsLoaded = this.checkOptions(options)

								// if (!eventsLoaded) {
							};
							_this3.setState({
								optionsLoaded: [].concat(_toConsumableArray(optionsLoaded), [options]),
								isFetchingEvents: true
							});

							triggerOnNavigate && onNavigate && onNavigate(options);
							_context.prev = 9;
							_context.next = 12;
							return fetchEvents(options);

						case 12:
							_ref4 = _context.sent;
							teamSchedule = _ref4.teamSchedule;
							storeSchedule = _ref4.storeSchedule;
							events = _ref4.events;


							_this3.setState({
								workingTeammates: _this3.workingTeammates({ schedule: teamSchedule }),
								storeSchedule: storeSchedule,
								events: events,
								teamSchedule: teamSchedule,
								isFetchingEvents: false
							});

							_this3.toggleShowOnCalendars();
							_context.next = 24;
							break;

						case 20:
							_context.prev = 20;
							_context.t0 = _context['catch'](9);

							console.log(_context.t0);
							_this3.setState({ isFetchingEvents: false });

						case 24:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this3, [[9, 20]]);
		}));

		return function () {
			return _ref3.apply(this, arguments);
		};
	}();

	this.checkOptions = function (options) {
		return _this3.state.optionsLoaded.find(function (loaded) {
			return (0, _isEqual2.default)(loaded, options);
		});
	};

	this.handlePagerChange = function () {
		var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(page) {
			var view, diff, stepType;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							view = _this3.state.view;
							diff = page - _this3.state.currentPage;
							stepType = view !== 'month' ? 'days' : 'months';
							_context2.next = 5;
							return _this3.setState(function (prevState) {
								return {
									currentPage: page,
									selectedDate: prevState.selectedDate.add(diff, stepType)
								};
							});

						case 5:

							_this3.handleChange();

						case 6:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this3);
		}));

		return function (_x2) {
			return _ref5.apply(this, arguments);
		};
	}();

	this.handleChangeView = function () {
		var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(idx) {
			var _state8, mode, view, newView, movingToWeek;

			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_state8 = _this3.state, mode = _state8.mode, view = _state8.view;
							newView = _this3.state.views[idx];
							movingToWeek = mode === 'user' && view !== 'week' && newView === 'week';
							_context3.next = 5;
							return _this3.setState({
								view: newView
								// renderFirstCalendar: !movingToWeek
							});

						case 5:

							// because month view does not show all teammates, if we are in team mode jumping OFF month view, lets
							// re-show team wrappers
							if (mode === 'team' && view === 'month' && newView !== 'month') {
								_this3.toggleShowOnCalendars();
							} else if (mode === 'user' && view !== 'week' && newView === 'week') {
								//NOTE: Removed this delay as it was causing DOM issues with the calendar not rendering fast enough;
								// Changes to BE data structure and FE should limit render lag that was initially seen
								// week view is heavy, give dom a sec to render before rendering calendar
								// this.delayedRenderWeekView()
							}
							_this3.handleChange();
							//trigger a refresh which causes, sizes to be recalculated. 500 delay for css transitions
							setTimeout(function () {
								_this3.handleWindowResize();
							}, 500);

						case 8:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3);
		}));

		return function (_x3) {
			return _ref6.apply(this, arguments);
		};
	}();

	this.delayedRenderWeekView = function () {
		setTimeout(function () {
			_this3.setState({ renderFirstCalendar: true });
		}, 100);
	};

	this.timeRange = function () {
		var _state9 = _this3.state,
		    selectedDate = _state9.selectedDate,
		    storeSchedule = _state9.storeSchedule,
		    events = _state9.events;


		var adjustedEvents = events.filter(function (event) {
			return !event.allDay;
		}).map(function (event) {
			return {
				startTime: (0, _momentTimezone2.default)(event.start).format('HH:mm:ss'),
				endTime: (0, _momentTimezone2.default)(event.end).format('HH:mm:ss')
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
				var start = (0, _momentTimezone2.default)(day + ' ' + event.startTime).startOf('hour').subtract(2, 'hour');
				var end = (0, _momentTimezone2.default)(day + ' ' + event.endTime).endOf('hour').add(2, 'hour');

				if (!earliest || earliest.diff(start) > 0) {
					earliest = start;
				}

				if (!latest || latest.diff(end) < 0) {
					latest = end;
				}
			});

			if (!earliest.isSame(day, 'day')) {
				earliest = (0, _momentTimezone2.default)(day + ' 00:00:00');
			}

			if (!latest.isSame(day, 'day')) {
				latest = (0, _momentTimezone2.default)(day + ' 23:59:59');
			}
		} else {
			earliest = (0, _momentTimezone2.default)(selectedDate).hour(7).minutes(0).seconds(0);

			latest = (0, _momentTimezone2.default)(selectedDate).hour(18).minutes(0).seconds(0);
		}

		return [earliest.format('YYYY-MM-DD HH:mm:ss'), latest.format('YYYY-MM-DD HH:mm:ss')];
	};

	this.toggleShowOnCalendars = function () {
		// show teammates calendars one at a time
		var calendars = [].concat(_toConsumableArray(document.querySelectorAll('.teammate_calendar__wrapper')));

		if (_this3.props.auth) {
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

	this.jumpToTeamMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						if (!_this3.state.transitioning) {
							_context4.next = 2;
							break;
						}

						return _context4.abrupt('return');

					case 2:
						_context4.next = 4;
						return _this3.setState({
							transitioning: true,
							mode: 'team',
							showAllTeammates: true,
							renderAllCalendars: true
						});

					case 4:

						_this3.toggleShowOnCalendars();

						setTimeout(function () {
							_this3.handleChange();
							_this3.setState({
								transitioning: false
							});
						}, 1000);

					case 6:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, _this3);
	}));
	this.jumpToUserMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
		var view;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						if (!_this3.state.transitioning) {
							_context5.next = 2;
							break;
						}

						return _context5.abrupt('return');

					case 2:

						//scroll calendar left
						new _es6Tween.Tween({
							y: _this3.calendarWrapper.scrollLeft
						}).to({ y: 0 }, 500).on('update', function (_ref9) {
							var y = _ref9.y;

							_this3.calendarWrapper.scrollLeft = y;
						}).easing(_es6Tween.Easing.Quadratic.Out).start();

						// when jumping to week view in user mode, delay render because it's heavy
						view = _this3.state.view;

						//first give css transitions a sec to adjust the view

						_context5.next = 6;
						return _this3.setState({
							transitioning: true,
							mode: 'user',
							renderFirstCalendar: view !== 'week',
							showAllTeammates: view !== 'week'
						});

					case 6:

						if (view === 'week') {
							_this3.delayedRenderWeekView();
						}

						// to hard on the client
						_this3.toggleShowOnCalendars();

						setTimeout(function () {
							_this3.handleChange();
							_this3.setState({
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
		}, _callee5, _this3);
	}));
	this.handleToggleMode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
		var _state10, mode, selectedTeammate;

		return regeneratorRuntime.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_state10 = _this3.state, mode = _state10.mode, selectedTeammate = _state10.selectedTeammate;
						_context6.t0 = mode;
						_context6.next = _context6.t0 === 'team' ? 4 : 6;
						break;

					case 4:
						_this3.jumpToUserMode();
						return _context6.abrupt('break', 8);

					case 6:
						_this3.jumpToTeamMode();
						return _context6.abrupt('break', 8);

					case 8:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, _this3);
	}));

	this.handleWindowResize = function () {
		_this3.setState({
			resized: _this3.state.resized++
		});
	};

	this.filterEvents = function (events, teammate) {
		var _state11 = _this3.state,
		    view = _state11.view,
		    mode = _state11.mode,
		    transitioning = _state11.transitioning;

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

	this.eventPropGetter = function (event) {
		return { className: '' + (event.className || '') };
	};

	this.dayPropGetter = function (teammate, date) {
		var teamSchedule = _this3.state.teamSchedule;
		var _props$dayPropGetter = _this3.props.dayPropGetter,
		    dayPropGetter = _props$dayPropGetter === undefined ? function (teammate, date, props) {
			return props;
		} : _props$dayPropGetter;

		// if no team schedule, then no need to render on/off

		if (!teamSchedule) {
			return dayPropGetter(teammate, date, {});
		}

		var theDate = (0, _momentTimezone2.default)(date);
		var today = theDate.format('YYYY-MM-DD');

		var _ref11 = teamSchedule[teammate.UserId] && teamSchedule[teammate.UserId][today] ? teamSchedule[teammate.UserId][today] : {},
		    startTime = _ref11.startTime,
		    endTime = _ref11.endTime;

		return {
			className: startTime && endTime ? 'working' : 'not-working'
		};
	};

	this.slotPropGetter = function (teammate, date) {
		var teamSchedule = _this3.state.teamSchedule;
		var _props$slotPropGetter = _this3.props.slotPropGetter,
		    slotPropGetter = _props$slotPropGetter === undefined ? function (teammate, date, props) {
			return props;
		} : _props$slotPropGetter;

		// if no team schedule, then no need to render on/off

		if (!teamSchedule) {
			return slotPropGetter(teammate, date, {});
		}

		// pull hours out for today
		var theDate = (0, _momentTimezone2.default)(date);
		var today = theDate.format('YYYY-MM-DD');

		var _ref12 = teamSchedule[teammate.UserId] && teamSchedule[teammate.UserId][today] ? teamSchedule[teammate.UserId][today] : {},
		    startTime = _ref12.startTime,
		    endTime = _ref12.endTime;

		// since a team schedule is passed, if any start/end times are missing, assume not working


		if (!startTime || !endTime) {
			return slotPropGetter(teammate, date, {
				className: 'not-working'
			});
		}

		startTime = parseInt(startTime.replace(/[^0-9]/g, ''));
		endTime = parseInt(endTime.replace(/[^0-9]/g, ''));

		var nowTime = parseInt(theDate.format('HHmmss'));

		return slotPropGetter(teammate, date, {
			title: theDate.format('h:mma'),
			className: nowTime >= startTime && nowTime < endTime ? 'working' : 'not-working'
		});
	};

	this.handleClickEvent = function (options, e) {
		var onClickEvent = _this3.props.onClickEvent;


		onClickEvent && onClickEvent(options, e);
	};

	this.handleClickOpenSlot = function (options, e) {
		var onClickOpenSlot = _this3.props.onClickOpenSlot;


		onClickOpenSlot && onClickOpenSlot(options, e);
	};

	this.handleDropEvent = function (_ref13) {
		var event = _ref13.event,
		    start = _ref13.start,
		    end = _ref13.end;
		var onDropEvent = _this3.props.onDropEvent;


		onDropEvent && onDropEvent(event, start, end);
	};

	this.handleResizeEvent = function (resizeType, _ref14) {
		var event = _ref14.event,
		    start = _ref14.start,
		    end = _ref14.end;
		var onResizeEvent = _this3.props.onResizeEvent;


		onResizeEvent && onResizeEvent(event, start, end);
	};

	this.handleCanDrag = function (event) {
		var _state12 = _this3.state,
		    view = _state12.view,
		    mode = _state12.mode;
		var canDrag = _this3.props.canDrag;


		if (view === 'month' || view === 'week' && mode === 'team') {
			return false;
		} else if (canDrag) {
			return canDrag(event);
		}
	};

	this.handleCanResize = function (event) {
		var _state13 = _this3.state,
		    view = _state13.view,
		    mode = _state13.mode;
		var canResize = _this3.props.canResize;


		if (view === 'month' || view === 'week' && mode === 'team') {
			return false;
		} else if (canResize) {
			return canResize(event);
		}
	};

	this.handleShowScheduleDateDialog = function () {
		_this3.setState({ isSelectingScheduleDate: true });
	};

	this.handleHideScheduleDateDialog = function () {
		_this3.setState({ isSelectingScheduleDate: false });
	};

	this.handleScheduleDateSelect = function () {
		var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(date) {
			return regeneratorRuntime.wrap(function _callee7$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							_context7.next = 2;
							return _this3.setState({
								isSelectingScheduleDate: false,
								selectedDate: date
							});

						case 2:
							_this3.refresh();

						case 3:
						case 'end':
							return _context7.stop();
					}
				}
			}, _callee7, _this3);
		}));

		return function (_x4) {
			return _ref15.apply(this, arguments);
		};
	}();

	this.handleSelectToday = function () {
		_this3.handleScheduleDateSelect((0, _momentTimezone2.default)());
	};

	this.handleSelectTeammate = function () {
		var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(selectedTeammate) {
			return regeneratorRuntime.wrap(function _callee8$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							_context8.next = 2;
							return _this3.setState({ selectedTeammate: selectedTeammate, showAllTeammates: false });

						case 2:
							_this3.jumpToUserMode();

						case 3:
						case 'end':
							return _context8.stop();
					}
				}
			}, _callee8, _this3);
		}));

		return function (_x5) {
			return _ref16.apply(this, arguments);
		};
	}();

	this.handleClearSelectedTeammate = function () {
		_this3.setState({ selectedTeammate: null });
	};

	this.handleToggleUserMode = function () {
		_this3.handleClearSelectedTeammate();
		_this3.jumpToUserMode();
	};

	this.handleToggleTeamMode = function () {
		_this3.handleClearSelectedTeammate();
		_this3.jumpToTeamMode();
	};

	this.handleToggleShowWorking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
		var oldShowOnlyWorking, showOnlyWorking;
		return regeneratorRuntime.wrap(function _callee9$(_context9) {
			while (1) {
				switch (_context9.prev = _context9.next) {
					case 0:
						oldShowOnlyWorking = _this3.state.showOnlyWorking;
						showOnlyWorking = !oldShowOnlyWorking;
						_context9.next = 4;
						return _this3.setState({
							showOnlyWorking: showOnlyWorking,
							workingTeammates: _this3.workingTeammates()
						});

					case 4:

						_this3.toggleShowOnCalendars();

					case 5:
					case 'end':
						return _context9.stop();
				}
			}
		}, _callee9, _this3);
	}));

	this.workingTeammates = function () {
		var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    schedule = _ref18.schedule,
		    date = _ref18.date;

		var _state14 = _this3.state,
		    teamSchedule = _state14.teamSchedule,
		    selectedDate = _state14.selectedDate,
		    teammates = _state14.teammates;


		var formattedDate = (date || selectedDate).format('YYYY-MM-DD');

		if (!schedule && !teamSchedule) {
			return teammates;
		}

		return teammates.filter(function (teammate) {
			return (schedule || teamSchedule)[teammate.UserId] && (schedule || teamSchedule)[teammate.UserId][formattedDate];
		});
	};
};

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
	step: _propTypes2.default.number,
	slotPropGetter: _propTypes2.default.func,
	dayPropGetter: _propTypes2.default.func
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