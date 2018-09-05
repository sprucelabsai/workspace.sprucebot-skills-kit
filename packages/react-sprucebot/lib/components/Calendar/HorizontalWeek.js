'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeamWeek = function (_Component) {
	_inherits(TeamWeek, _Component);

	function TeamWeek() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, TeamWeek);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TeamWeek.__proto__ || Object.getPrototypeOf(TeamWeek)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnClick = function (event, e) {
			var onSelectEvent = _this.props.onSelectEvent;


			onSelectEvent && onSelectEvent(event, e);
		}, _this.renderDayEvents = function (events, date) {
			var _this$props = _this.props,
			    max = _this$props.max,
			    min = _this$props.min;


			return events.filter(function (event) {
				return (0, _moment2.default)(event.start).isSame((0, _moment2.default)(date), 'day');
			}).map(function (event, index) {
				var start = event.start,
				    end = event.end;


				var totalMinutes = (0, _moment2.default)(max).diff((0, _moment2.default)(min), 'minutes');

				var startOfDay = (0, _moment2.default)(date.format('YYYY-MM-DD') + ' ' + (0, _moment2.default)(min).format('HH:mm:ss'));

				var endOfDay = (0, _moment2.default)(date.format('YYYY-MM-DD') + ' ' + (0, _moment2.default)(max).format('HH:mm:ss'));

				var left = Math.round((0, _moment2.default)(start).diff(startOfDay, 'minutes') / totalMinutes * 100);
				var right = Math.round((0, _moment2.default)(endOfDay).diff(end, 'minutes') / totalMinutes * 100);

				return _react2.default.createElement(
					'div',
					{
						key: event.userId + '_' + event.start,
						onClick: function onClick(e) {
							return _this.handleOnClick(event, e);
						},
						className: 'rbc-event event-' + index + ' ' + (event.className || ''),
						style: {
							left: left + '%',
							right: right + '%'
						}
					},
					event.title
				);
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(TeamWeek, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    _props$className = _props.className,
			    className = _props$className === undefined ? '' : _props$className,
			    date = _props.date,
			    dayFormat = _props.dayFormat,
			    events = _props.events;


			var currentDate = (0, _moment2.default)(date).startOf('week');
			var end = (0, _moment2.default)(currentDate).endOf('week');

			var dates = [];

			do {
				dates.push((0, _moment2.default)(currentDate));
				currentDate.add(1, 'day');
			} while (currentDate <= end);

			return _react2.default.createElement(
				'div',
				{ className: 'team_week ' + className },
				_react2.default.createElement(
					'div',
					{ className: 'rbc-time-header' },
					_react2.default.createElement(
						'div',
						{ className: 'rbc-row rbc-time-header-cell' },
						dates.map(function (date) {
							return _react2.default.createElement(
								'div',
								{ key: 'header-for-' + date.format(), className: 'rbc-header' },
								date.format(dayFormat)
							);
						})
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'rbc-time-content' },
					_react2.default.createElement(
						'div',
						{ className: 'rbc-row rbc-time-content-cell' },
						dates.map(function (date) {
							return _react2.default.createElement(
								'div',
								{
									key: 'content-for-' + date.format(),
									className: 'rbc-day-slot rbc-day-column'
								},
								_react2.default.createElement(
									'div',
									{ className: 'rbc-allday-cell' },
									events.filter(function (event) {
										return event.allDay && (0, _moment2.default)(event.start).isSame((0, _moment2.default)(date), 'day');
									}).map(function (event) {
										return _react2.default.createElement(
											'div',
											{
												key: event.title + '_' + event.start,
												className: 'rbc-event ' + (event.className || ''),
												onClick: function onClick(e) {
													return _this2.handleOnClick(event, e);
												}
											},
											event.title
										);
									})
								),
								_react2.default.createElement(
									'div',
									{ className: 'rbc-events-wrapper' },
									_this2.renderDayEvents(events, date)
								)
							);
						})
					)
				)
			);
		}
	}], [{
		key: 'title',
		value: function title(date) {
			return 'TEST';
		}
	}, {
		key: 'navigate',
		value: function navigate(date) {
			console.log('TEAM WEEK', date);
		}
	}]);

	return TeamWeek;
}(_react.Component);

exports.default = TeamWeek;