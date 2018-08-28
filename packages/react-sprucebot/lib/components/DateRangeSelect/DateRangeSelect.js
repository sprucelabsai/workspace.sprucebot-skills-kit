'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('react-dates/initialize');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRequiredIf = require('react-required-if');

var _reactRequiredIf2 = _interopRequireDefault(_reactRequiredIf);

var _reactDates = require('react-dates');

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRangeSelect = function (_Component) {
	_inherits(DateRangeSelect, _Component);

	function DateRangeSelect() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DateRangeSelect);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateRangeSelect.__proto__ || Object.getPrototypeOf(DateRangeSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			focusedInput: 'startDate',
			defaultDateSet: false,
			today: _this.props.timezone ? (0, _moment2.default)().tz(_this.props.timezone).format('YYYY-MM-DD') : (0, _moment2.default)().format('YYYY-MM-DD')
		}, _this.componentDidMount = function () {
			var setDefaultDates = _this.props.setDefaultDates;
			var defaultDateSet = _this.state.defaultDateSet;


			if (setDefaultDates && !defaultDateSet) {
				_this.setDefaultDates();
			}
		}, _this.isDayBlocked = function (date) {
			var availableDates = _this.props.availableDates;


			if (!availableDates) {
				return false;
			}

			var match = (availableDates || []).find(function (day) {
				return day === date.format('YYYY-MM-DD');
			});
			var lastDate = (0, _moment2.default)(availableDates[availableDates.length - 1]).endOf('month');

			if (match || date.isAfter(lastDate) || date.isSame(lastDate)) {
				return false;
			}
			return true;
		}, _this.isOutsideRange = function (date) {
			var today = _this.state.today;
			var allowPastDates = _this.props.allowPastDates;


			var pastDate = (0, _moment2.default)(date.format('YYYY-MM-DD')).isBefore(today);

			if (allowPastDates) {
				return false;
			}

			if (date.format('YYYY-MM-DD') === today) {
				return false;
			}

			if (pastDate) {
				return true;
			}

			return false;
		}, _this.setDefaultDates = function () {
			var _this$props = _this.props,
			    defaultStartDate = _this$props.defaultStartDate,
			    defaultEndDate = _this$props.defaultEndDate;


			_this.setState({
				startDate: defaultStartDate,
				endDate: defaultEndDate,
				defaultDateSet: true
			});
		}, _this.handleDateChange = function (selectedStart, selectedEnd) {
			var _this$props2 = _this.props,
			    _this$props2$onDatesC = _this$props2.onDatesChange,
			    onDatesChange = _this$props2$onDatesC === undefined ? function () {} : _this$props2$onDatesC,
			    weekSelection = _this$props2.weekSelection;


			if (weekSelection) {
				var startOfWeek = (0, _moment2.default)(selectedStart).startOf('week');
				var endOfWeek = (0, _moment2.default)(selectedStart).endOf('week');

				onDatesChange(startOfWeek, endOfWeek);
				_this.setState({
					startDate: startOfWeek,
					endDate: endOfWeek,
					focusedInput: 'startDate'
				});
			} else {
				var _this$getNextState = _this.getNextState(selectedStart, selectedEnd),
				    startDate = _this$getNextState.startDate,
				    endDate = _this$getNextState.endDate;

				onDatesChange(startDate, endDate);
				_this.setState({ startDate: startDate, endDate: endDate });
			}
		}, _this.getNextState = function (selectedStart, selectedEnd) {
			var _this$state = _this.state,
			    startDate = _this$state.startDate,
			    endDate = _this$state.endDate;

			if (selectedEnd && selectedEnd.isSame(endDate)) {
				return {
					startDate: selectedStart,
					endDate: null
				};
			} else if (startDate && endDate) {
				return {
					startDate: selectedEnd || selectedStart,
					endDate: null
				};
			} else {
				return {
					startDate: selectedStart,
					endDate: selectedEnd
				};
			}
		}, _this.handleFocusChange = function (focusedInput) {
			_this.setState({ focusedInput: focusedInput || 'startDate' });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(DateRangeSelect, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    startDate = _state.startDate,
			    endDate = _state.endDate,
			    focusedInput = _state.focusedInput;
			var _props = this.props,
			    numberOfMonths = _props.numberOfMonths,
			    weekSelection = _props.weekSelection,
			    enableOutsideDays = _props.enableOutsideDays,
			    initialVisibleMonth = _props.initialVisibleMonth,
			    _onPrevMonthClick = _props.onPrevMonthClick,
			    _onNextMonthClick = _props.onNextMonthClick,
			    orientation = _props.orientation,
			    loading = _props.loading;


			var wrapperClass = classnames('date_picker', 'date_select__wrapper', {
				loading: loading,
				outside_days: enableOutsideDays,
				week_selection: weekSelection
			});

			return _react2.default.createElement(
				'div',
				{ className: wrapperClass },
				_react2.default.createElement(
					'div',
					{ className: 'date_select__loader ' + (loading ? 'loading' : '') },
					_react2.default.createElement(_Loader2.default, null)
				),
				_react2.default.createElement(_reactDates.DayPickerRangeController, {
					startDate: startDate,
					endDate: endDate,
					onDatesChange: function onDatesChange(_ref2) {
						var startDate = _ref2.startDate,
						    endDate = _ref2.endDate;
						return _this2.handleDateChange(startDate, endDate);
					},
					focusedInput: loading ? null : focusedInput,
					onFocusChange: function onFocusChange(focusedInput) {
						return _this2.handleFocusChange(focusedInput);
					},
					numberOfMonths: numberOfMonths || 1,
					isDayBlocked: this.isDayBlocked,
					isOutsideRange: this.isOutsideRange,
					initialVisibleMonth: initialVisibleMonth,
					onPrevMonthClick: function onPrevMonthClick(prevMonth) {
						return _onPrevMonthClick && _onPrevMonthClick(prevMonth);
					},
					onNextMonthClick: function onNextMonthClick(nextMonth) {
						return _onNextMonthClick && _onNextMonthClick(nextMonth);
					},
					navPrev: _react2.default.createElement(
						_Icon2.default,
						{ className: 'date_select__icon ' + (loading ? 'loading' : '') },
						orientation === 'vertical' ? 'keyboard_arrow_up' : 'chevron_left'
					),
					navNext: _react2.default.createElement(
						_Icon2.default,
						{ className: 'date_select__icon ' + (loading ? 'loading' : '') },
						orientation === 'vertical' ? 'keyboard_arrow_down' : 'chevron_right'
					),
					enableOutsideDays: enableOutsideDays,
					keepOpenOnDateSelect: true,
					hideKeyboardShortcutsPanel: true,
					orientation: orientation
				})
			);
		}
	}]);

	return DateRangeSelect;
}(_react.Component);

exports.default = DateRangeSelect;


DateRangeSelect.propTypes = {
	availableDates: _propTypes2.default.array,
	allowPastDates: _propTypes2.default.bool,
	onDatesChange: _propTypes2.default.func.isRequired,
	numberOfMonths: _propTypes2.default.number,
	weekSelection: _propTypes2.default.bool,
	enableOutsideDays: _propTypes2.default.bool,
	setDefaultDates: _propTypes2.default.bool,
	defaultStartDate: _propTypes2.default.any,
	defaultEndDate: _propTypes2.default.any,
	initialVisibleMonth: _propTypes2.default.func,
	onPrevMonthClick: _propTypes2.default.func,
	onNextMonthClick: _propTypes2.default.func,
	orientation: _propTypes2.default.sting,
	loading: _propTypes2.default.bool
};

DateRangeSelect.defaultProps = {
	allowPastDates: false,
	loading: false
};