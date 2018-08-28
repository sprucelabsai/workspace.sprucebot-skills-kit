'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('react-dates/initialize');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDates = require('react-dates');

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateSelect = function (_Component) {
	_inherits(DateSelect, _Component);

	function DateSelect() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DateSelect);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateSelect.__proto__ || Object.getPrototypeOf(DateSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			defaultDateSet: false,
			focused: 1,
			today: _this.props.timezone ? (0, _moment2.default)().tz(_this.props.timezone).format('YYYY-MM-DD') : (0, _moment2.default)().format('YYYY-MM-DD')
		}, _this.componentDidMount = function () {
			var defaultDateSet = _this.state.defaultDateSet;


			if (!defaultDateSet) {
				_this.setDefaultDate();
			}
		}, _this.isDayBlocked = function (date) {
			var availableDates = _this.props.availableDates;


			if (!availableDates) {
				return false;
			}

			var thisDate = date.format('YYYY-MM-DD');
			var match = availableDates.find(function (day) {
				return day === thisDate;
			});

			if (match) {
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
		}, _this.handleDateChange = function (date) {
			var _this$props$onDateSel = _this.props.onDateSelect,
			    onDateSelect = _this$props$onDateSel === undefined ? function () {
				console.log({ date: date });
			} : _this$props$onDateSel;


			onDateSelect(date);
			_this.setState({ date: date });
		}, _this.setDefaultDate = function () {
			var defaultDate = _this.props.defaultDate;


			_this.setState({ date: defaultDate, defaultDateSet: true });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(DateSelect, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var date = this.state.date;
			var _props = this.props,
			    initialVisibleMonth = _props.initialVisibleMonth,
			    _onPrevMonthClick = _props.onPrevMonthClick,
			    _onNextMonthClick = _props.onNextMonthClick,
			    loading = _props.loading;


			return _react2.default.createElement(
				'div',
				{
					className: 'date_select__wrapper ' + (loading ? 'loading' : ''),
					hide: hide,
					loading: loading
				},
				_react2.default.createElement(
					'div',
					{ className: 'date_select__loader ' + (loading ? 'loading' : '') },
					_react2.default.createElement(_Loader2.default, null)
				),
				_react2.default.createElement(_reactDates.DayPickerSingleDateController, {
					date: date || null,
					onDateChange: this.handleDateChange,
					focused: !loading,
					onFocusChange: function onFocusChange(_ref2) {
						var focused = _ref2.focused;
						return _this2.setState({ focused: focused });
					},
					numberOfMonths: 1,
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
						'chevron_left'
					),
					navNext: _react2.default.createElement(
						_Icon2.default,
						{ className: 'date_select__icon ' + (loading ? 'loading' : '') },
						'chevron_right'
					),
					keepOpenOnDateSelect: true,
					hideKeyboardShortcutsPanel: true,
					noBorder: true
				})
			);
		}
	}, {
		key: 'value',
		get: function get() {
			return this.state.date;
		}
	}]);

	return DateSelect;
}(_react.Component);

exports.default = DateSelect;


DateSelect.propTypes = {
	availableDates: _propTypes2.default.array,
	allowPastDates: _propTypes2.default.bool,
	onDateSelect: _propTypes2.default.func.isRequired,
	setDefaultDate: _propTypes2.default.bool,
	defaultDate: _propTypes2.default.any,
	initialVisibleMonth: _propTypes2.default.func,
	onNextMonthClick: _propTypes2.default.func,
	onPrevMonthClick: _propTypes2.default.func,
	hide: _propTypes2.default.bool,
	loading: _propTypes2.default.bool,
	highlightDates: _propTypes2.default.array
};

DateSelect.defaultProps = {
	allowPastDates: false,
	loading: false
};