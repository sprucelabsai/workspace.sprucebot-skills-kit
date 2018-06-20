'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('react-dates/initialize');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRequiredIf = require('react-required-if');

var _reactRequiredIf2 = _interopRequireDefault(_reactRequiredIf);

var _reactDates = require('react-dates');

var _IconButton = require('../IconButton/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wrapper = _styledComponents2.default.div.withConfig({
	displayName: 'DateSelect__Wrapper',
	componentId: 's1u7vvps-0'
})(['.PresetDateRangePicker_panel{padding:0 22px 11px;}.PresetDateRangePicker_button{position:relative;height:100%;text-align:center;background:0 0;border:2px solid #00a699;color:#00a699;padding:4px 12px;margin-right:8px;font:inherit;font-weight:700;line-height:normal;overflow:visible;-moz-box-sizing:border-box;box-sizing:border-box;cursor:pointer;}.PresetDateRangePicker_button:active{outline:0;}.PresetDateRangePicker_button__selected{color:#fff;background:#00a699;}.SingleDatePickerInput{display:inline-block;background-color:#fff;}.SingleDatePickerInput__withBorder{border:1px solid #dbdbdb;}.SingleDatePickerInput__rtl{direction:rtl;}.SingleDatePickerInput__disabled{background-color:#f2f2f2;}.SingleDatePickerInput__block{display:block;}.SingleDatePickerInput__showClearDate{padding-right:30px;}.SingleDatePickerInput_clearDate{display:flex;justify-content:flex-end;background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;padding:10px;margin:0 10px 0 5px;position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);}.SingleDatePickerInput_clearDate__default:focus,.SingleDatePickerInput_clearDate__default:hover{background:#dbdbdb;border-radius:50%;}.SingleDatePickerInput_clearDate__small{padding:6px;}.SingleDatePickerInput_clearDate__hide{visibility:hidden;}.SingleDatePickerInput_clearDate_svg{fill:#82888a;height:12px;width:15px;vertical-align:middle;}.SingleDatePickerInput_clearDate_svg__small{height:9px;}.SingleDatePickerInput_calendarIcon{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;display:inline-block;vertical-align:middle;padding:10px;margin:0 5px 0 10px;}.SingleDatePickerInput_calendarIcon_svg{fill:#82888a;height:15px;width:14px;vertical-align:middle;}.SingleDatePicker{position:relative;display:inline-block;}.SingleDatePicker__block{display:block;}.SingleDatePicker_picker{background-color:#fff;}.SingleDatePicker_picker__rtl{direction:rtl;}.SingleDatePicker_picker__directionLeft{left:0;}.SingleDatePicker_picker__directionRight{right:0;}.SingleDatePicker_picker__portal{background-color:rgba(0,0,0,0.3);position:fixed;top:0;left:0;height:100%;width:100%;}.SingleDatePicker_picker__fullScreenPortal{background-color:#fff;}.SingleDatePicker_closeButton{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;position:absolute;top:0;right:0;padding:15px;z-index:2;}.SingleDatePicker_closeButton:focus,.SingleDatePicker_closeButton:hover{color:darken(#cacccd,10%);text-decoration:none;}.SingleDatePicker_closeButton_svg{height:15px;width:15px;fill:#cacccd;}.DayPickerKeyboardShortcuts_buttonReset{background:0 0;border:0;border-radius:0;color:inherit;font:inherit;line-height:normal;overflow:visible;padding:0;cursor:pointer;font-size:14px;}.DayPickerKeyboardShortcuts_buttonReset:active{outline:0;}.DayPickerKeyboardShortcuts_show{width:22px;position:absolute;z-index:2;}.DayPickerKeyboardShortcuts_show__bottomRight{border-top:26px solid transparent;border-right:33px solid #00a699;bottom:0;right:0;}.DayPickerKeyboardShortcuts_show__bottomRight:hover{border-right:33px solid #008489;}.DayPickerKeyboardShortcuts_show__topRight{border-bottom:26px solid transparent;border-right:33px solid #00a699;top:0;right:0;}.DayPickerKeyboardShortcuts_show__topRight:hover{border-right:33px solid #008489;}.DayPickerKeyboardShortcuts_show__topLeft{border-bottom:26px solid transparent;border-left:33px solid #00a699;top:0;left:0;}.DayPickerKeyboardShortcuts_show__topLeft:hover{border-left:33px solid #008489;}.DayPickerKeyboardShortcuts_showSpan{color:#fff;position:absolute;}.DayPickerKeyboardShortcuts_showSpan__bottomRight{bottom:0;right:-28px;}.DayPickerKeyboardShortcuts_showSpan__topRight{top:1px;right:-28px;}.DayPickerKeyboardShortcuts_showSpan__topLeft{top:1px;left:-28px;}.DayPickerKeyboardShortcuts_panel{overflow:auto;background:#fff;border:1px solid #dbdbdb;border-radius:2px;position:absolute;top:0;bottom:0;right:0;left:0;z-index:2;padding:22px;margin:33px;}.DayPickerKeyboardShortcuts_title{font-size:16px;font-weight:700;margin:0;}.DayPickerKeyboardShortcuts_list{list-style:none;padding:0;font-size:14px;}.DayPickerKeyboardShortcuts_close{position:absolute;right:22px;top:22px;z-index:2;}.DayPickerKeyboardShortcuts_close:active{outline:0;}.DayPickerKeyboardShortcuts_closeSvg{height:15px;width:15px;fill:#cacccd;}.DayPickerKeyboardShortcuts_closeSvg:focus,.DayPickerKeyboardShortcuts_closeSvg:hover{fill:#82888a;}.CalendarDay{-moz-box-sizing:border-box;box-sizing:border-box;cursor:pointer;font-size:14px;text-align:center;}.CalendarDay:active{outline:0;}.CalendarDay__defaultCursor{cursor:default;}.CalendarDay__default{border:1px solid #e4e7e7;color:#565a5c;background:#fff;}.CalendarDay__default:hover{background:#e4e7e7;border:1px double #e4e7e7;color:inherit;}.CalendarDay__hovered_offset{background:#f4f5f5;border:1px double #e4e7e7;color:inherit;}.CalendarDay__outside{border:0;background:#fff;color:#565a5c;}.CalendarDay__blocked_minimum_nights{background:#fff;border:1px solid #eceeee;color:#cacccd;}.CalendarDay__blocked_minimum_nights:active,.CalendarDay__blocked_minimum_nights:hover{background:#fff;color:#cacccd;}.CalendarDay__highlighted_calendar{background:#ffe8bc;color:#565a5c;}.CalendarDay__highlighted_calendar:active,.CalendarDay__highlighted_calendar:hover{background:#ffce71;color:#565a5c;}.CalendarDay__selected_span{background:#66e2da;border:1px solid #33dacd;color:#fff;}.CalendarDay__selected_span:active,.CalendarDay__selected_span:hover{background:#33dacd;border:1px solid #33dacd;color:#fff;}.CalendarDay__last_in_range{border-right:#00a699;}.CalendarDay__selected,.CalendarDay__selected:active,.CalendarDay__selected:hover{background:#00aac7;border:1px solid #00aac7;color:#fff;}.CalendarDay__hovered_span,.CalendarDay__hovered_span:hover{background:#b2f1ec;border:1px solid #80e8e0;color:#007a87;}.CalendarDay__hovered_span:active{background:#80e8e0;border:1px solid #80e8e0;color:#007a87;}.CalendarDay__blocked_calendar,.CalendarDay__blocked_calendar:active,.CalendarDay__blocked_calendar:hover{background:#cacccd;border:1px solid #cacccd;color:#82888a;}.CalendarDay__blocked_out_of_range,.CalendarDay__blocked_out_of_range:active,.CalendarDay__blocked_out_of_range:hover{background:#fff;border:1px solid #e4e7e7;color:#cacccd;}.CalendarMonth{background:#fff;text-align:center;padding:0 13px;vertical-align:top;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.CalendarMonth_table{border-collapse:collapse;border-spacing:0;}.CalendarMonth_verticalSpacing{border-collapse:separate;}.CalendarMonth_caption{color:#565a5c;font-size:18px;text-align:center;padding-top:22px;padding-bottom:37px;caption-side:initial;}.CalendarMonth_caption__verticalScrollable{padding-top:12px;padding-bottom:7px;}.CalendarMonthGrid{background:#fff;text-align:left;z-index:0;}.CalendarMonthGrid__animating{z-index:1;}.CalendarMonthGrid__horizontal{position:absolute;left:9px;}.CalendarMonthGrid__vertical{margin:0 auto;}.CalendarMonthGrid__vertical_scrollable{margin:0 auto;overflow-y:scroll;}.CalendarMonthGrid_month__horizontal{display:inline-block;vertical-align:top;min-height:100%;}.CalendarMonthGrid_month__hideForAnimation{position:absolute;z-index:-1;opacity:0;pointer-events:none;}.CalendarMonthGrid_month__hidden{visibility:hidden;}.DayPickerNavigation_container{position:absolute;display:flex;justify-content:space-between;width:100%;padding:0 1.75em;z-index:2;}.DayPickerNavigation_container__vertical{background:#fff;box-shadow:0 0 5px 2px rgba(0,0,0,0.1);position:absolute;bottom:0;left:0;height:52px;width:100%;}.DayPickerNavigation_container__verticalScrollable{position:relative;}.DayPickerNavigation_button{cursor:pointer;line-height:0.78;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.DayPickerNavigation_button__default{background-color:#fff;color:#757575;}.DayPickerNavigation_button__default:focus,.DayPickerNavigation_button__default:hover{}.DayPickerNavigation_button__default:active{background:#f2f2f2;}.DayPickerNavigation_button__horizontal{display:flex;justify-content:center;padding:0;border-radius:50%;}.DayPickerNavigation_leftButton__horizontal{height:28px;width:28px;}.DayPickerNavigation_rightButton__horizontal{height:28px;width:28px;}.DayPickerNavigation_button__vertical{display:inline-block;position:relative;height:100%;width:50%;}.DayPickerNavigation_button__vertical__default{padding:5px;}.DayPickerNavigation_nextButton__vertical__default{border-left:0;}.DayPickerNavigation_nextButton__verticalScrollable{width:100%;}.DayPickerNavigation_svg__horizontal{height:19px;width:19px;fill:#82888a;}.DayPickerNavigation_svg__vertical{height:42px;width:42px;fill:#565a5c;}.DayPicker{background:#fff;position:relative;text-align:left;}.DayPicker__horizontal{background:#fff;}.DayPicker__verticalScrollable{height:100%;}.DayPicker__hidden{visibility:hidden;}.DayPicker_portal__horizontal{box-shadow:none;position:absolute;left:50%;top:50%;}.DayPicker_portal__vertical{position:initial;}.DayPicker_focusRegion{outline:0;}.DayPicker_calendarInfo__horizontal,.DayPicker_wrapper__horizontal{display:inline-block;vertical-align:top;}.DayPicker_weekHeaders{position:relative;}.DayPicker_weekHeaders__horizontal{margin-left:9px;}.DayPicker_weekHeader{color:#757575;position:absolute;top:55px;z-index:2;padding:0 13px;text-align:left;}.DayPicker_weekHeader__vertical{left:50%;}.DayPicker_weekHeader__verticalScrollable{top:0;display:table-row;border-bottom:1px solid #dbdbdb;background:#fff;margin-left:0;left:0;width:100%;text-align:center;}.DayPicker_weekHeader_ul{list-style:none;margin:1px 0;padding-left:0;padding-right:0;font-size:14px;}.DayPicker_weekHeader_li{display:inline-block;text-align:center;}.DayPicker_transitionContainer{position:relative;overflow:hidden;border-radius:3px;}.DayPicker_transitionContainer__horizontal{-webkit-transition:height 0.2s ease-in-out;-moz-transition:height 0.2s ease-in-out;transition:height 0.2s ease-in-out;}.DayPicker_transitionContainer__vertical{width:100%;}.DayPicker_transitionContainer__verticalScrollable{padding-top:20px;height:100%;position:absolute;top:0;bottom:0;right:0;left:0;overflow-y:scroll;}.DateInput{margin:0;padding:0;background:#fff;position:relative;display:inline-block;width:130px;vertical-align:middle;}.DateInput__small{width:90px;}.DateInput__block{width:100%;}.DateInput__disabled{background:#f2f2f2;color:#dbdbdb;}.DateInput_input{font-weight:200;font-size:18px;line-height:24px;color:#565a5c;background-color:#fff;width:100%;padding:13px 12px 11px;border:0;border-top:0;border-right:0;border-bottom:2px solid transparent;border-left:0;}.DateInput_input__small{font-size:14px;line-height:18px;padding:8px 8px 6px;}.DateInput_input__regular{font-weight:auto;}.DateInput_input__readOnly{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.DateInput_input__focused{outline:0;background:#fff;border:0;border-top:0;border-right:0;border-bottom:2px solid #1baac5;border-left:0;}.DateInput_input__disabled{background:#f2f2f2;font-style:italic;}.DateInput_screenReaderMessage{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;}.DateInput_fang{display:none;position:absolute;width:20px;height:10px;left:22px;z-index:2;}.DateInput_fangShape{fill:#fff;}.DateInput_fangStroke{stroke:#dbdbdb;fill:transparent;}.DateRangePickerInput{background-color:#fff;display:inline-block;}.DateRangePickerInput__disabled{background:#f2f2f2;}.DateRangePickerInput__withBorder{border:1px solid #cacccd;}.DateRangePickerInput__rtl{direction:rtl;}.DateRangePickerInput__block{display:block;}.DateRangePickerInput__showClearDates{padding-right:30px;}.DateRangePickerInput_arrow{display:inline-block;vertical-align:middle;}.DateRangePickerInput_arrow_svg{vertical-align:middle;fill:#565a5c;height:24px;width:24px;}.DateRangePickerInput_arrow_svg__small{height:19px;width:19px;}.DateRangePickerInput_clearDates{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;padding:10px;margin:0 10px 0 5px;position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);}.DateRangePickerInput_clearDates__small{padding:6px;}.DateRangePickerInput_clearDates_default:focus,.DateRangePickerInput_clearDates_default:hover{background:#dbdbdb;border-radius:50%;}.DateRangePickerInput_clearDates__hide{visibility:hidden;}.DateRangePickerInput_clearDates_svg{fill:#82888a;height:12px;width:15px;vertical-align:middle;}.DateRangePickerInput_clearDates_svg__small{height:9px;}.DateRangePickerInput_calendarIcon{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;display:inline-block;vertical-align:middle;padding:10px;margin:0 5px 0 10px;}.DateRangePickerInput_calendarIcon_svg{fill:#82888a;height:15px;width:14px;vertical-align:middle;}.DateRangePicker{position:relative;display:inline-block;}.DateRangePicker__block{display:block;}.DateRangePicker_picker{z-index:1;background-color:#fff;position:absolute;}.DateRangePicker_picker__rtl{direction:rtl;}.DateRangePicker_picker__directionLeft{left:0;}.DateRangePicker_picker__directionRight{right:0;}.DateRangePicker_picker__portal{background-color:rgba(0,0,0,0.3);position:fixed;top:0;left:0;height:100%;width:100%;}.DateRangePicker_picker__fullScreenPortal{background-color:#fff;}.DateRangePicker_closeButton{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;position:absolute;top:0;right:0;padding:15px;z-index:2;}.DateRangePicker_closeButton:focus,.DateRangePicker_closeButton:hover{color:darken(#cacccd,10%);text-decoration:none;}.DateRangePicker_closeButton_svg{height:15px;width:15px;fill:#cacccd;}']);

var NavButton = (0, _styledComponents2.default)(_IconButton2.default).withConfig({
	displayName: 'DateSelect__NavButton',
	componentId: 's1u7vvps-1'
})(['color:#fff;']);

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
			defaultDateSet: false
		}, _this.isDayBlocked = function (date) {
			var _this$props = _this.props,
			    availableDays = _this$props.availableDays,
			    bypassDaysBlocked = _this$props.bypassDaysBlocked;


			if (bypassDaysBlocked) {
				return false;
			}

			var match = availableDays.find(function (day) {
				return day === date.format('YYYY-MM-DD');
			});

			if (match) {
				return false;
			}
			return true;
		}, _this.isOutsideRange = function (date) {
			var allowPastDates = _this.props.allowPastDates;

			var today = (0, _moment2.default)();
			var pastDate = date.isBefore(today);

			if (allowPastDates) {
				return false;
			}

			if (date.format('YYYY-MM-DD') === today.format('YYYY-MM-DD')) {
				return false;
			}

			if (pastDate) {
				return true;
			}

			return false;
		}, _this.handleDateChange = function (date) {
			var onDateSelect = _this.props.onDateSelect;


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

			var _state = this.state,
			    date = _state.date,
			    defaultDateSet = _state.defaultDateSet;
			var _props = this.props,
			    placeholder = _props.placeholder,
			    setDefaultDate = _props.setDefaultDate,
			    initialVisibleMonth = _props.initialVisibleMonth;


			return _react2.default.createElement(
				Wrapper,
				null,
				_react2.default.createElement(_reactDates.DayPickerSingleDateController, {
					date: date || null,
					placeholder: placeholder || null,
					onDateChange: function onDateChange(date) {
						return _this2.handleDateChange(date);
					},
					focused: true,
					onFocusChange: function onFocusChange(_ref2) {
						var focused = _ref2.focused;
						return _this2.setState({ focused: focused });
					},
					numberOfMonths: 1,
					isDayBlocked: this.isDayBlocked,
					isOutsideRange: this.isOutsideRange,
					setDefaultDate: setDefaultDate && !defaultDateSet && this.setDefaultDate(),
					initialVisibleMonth: initialVisibleMonth // PropTypes.func
					, navPrev: _react2.default.createElement(
						NavButton,
						{ fontSize: '1.5em' },
						'chevron_left'
					),
					navNext: _react2.default.createElement(
						NavButton,
						{ fontSize: '1.5em' },
						'chevron_right'
					),
					keepOpenOnDateSelect: true,
					hideKeyboardShortcutsPanel: true
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
	availableDays: (0, _reactRequiredIf2.default)(_propTypes2.default.array, function (props) {
		return !props.bypassDaysBlocked;
	}),
	bypassDaysBlocked: _propTypes2.default.bool,
	allowPastDates: _propTypes2.default.bool,
	onDateSelect: _propTypes2.default.func.isRequired,
	placeholder: _propTypes2.default.string,
	setDefaultDate: _propTypes2.default.bool,
	defaultDate: momentPropTypes.momentObj,
	initialVisibleMonth: _propTypes2.default.func
};