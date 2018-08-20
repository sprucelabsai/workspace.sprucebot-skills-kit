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

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wrapper = _styledComponents2.default.div.withConfig({
	displayName: 'DateRangeSelect__Wrapper',
	componentId: 's1jyof5c-0'
})(['.PresetDateRangePicker_panel{padding:0 22px 11px;}.PresetDateRangePicker_button{position:relative;height:100%;text-align:center;background:0 0;border:2px solid #00a699;color:#00a699;padding:4px 12px;margin-right:8px;font:inherit;font-weight:700;line-height:normal;overflow:visible;-moz-box-sizing:border-box;box-sizing:border-box;cursor:pointer;}.PresetDateRangePicker_button:active{outline:0;}.PresetDateRangePicker_button__selected{color:#fff;background:#00a699;}.SingleDatePickerInput{display:inline-block;background-color:#fff;}.SingleDatePickerInput__withBorder{border-radius:2px;border:1px solid #dbdbdb;}.SingleDatePickerInput__rtl{direction:rtl;}.SingleDatePickerInput__disabled{background-color:#f2f2f2;}.SingleDatePickerInput__block{display:block;}.SingleDatePickerInput__showClearDate{padding-right:30px;}.SingleDatePickerInput_clearDate{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;padding:10px;margin:0 10px 0 5px;position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);}.SingleDatePickerInput_clearDate__default:focus,.SingleDatePickerInput_clearDate__default:hover{background:#dbdbdb;border-radius:50%;}.SingleDatePickerInput_clearDate__small{padding:6px;}.SingleDatePickerInput_clearDate__hide{visibility:hidden;}.SingleDatePickerInput_clearDate_svg{fill:#82888a;height:12px;width:15px;vertical-align:middle;}.SingleDatePickerInput_clearDate_svg__small{height:9px;}.SingleDatePickerInput_calendarIcon{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;display:inline-block;vertical-align:middle;padding:10px;margin:0 5px 0 10px;}.SingleDatePickerInput_calendarIcon_svg{fill:#82888a;height:15px;width:14px;vertical-align:middle;}.SingleDatePicker{position:relative;display:inline-block;}.SingleDatePicker__block{display:block;}.SingleDatePicker_picker{z-index:1;background-color:#fff;position:absolute;}.SingleDatePicker_picker__rtl{direction:rtl;}.SingleDatePicker_picker__directionLeft{left:0;}.SingleDatePicker_picker__directionRight{right:0;}.SingleDatePicker_picker__portal{background-color:rgba(0,0,0,0.3);position:fixed;top:0;left:0;height:100%;width:100%;}.SingleDatePicker_picker__fullScreenPortal{background-color:#fff;}.SingleDatePicker_closeButton{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;position:absolute;top:0;right:0;padding:15px;z-index:2;}.SingleDatePicker_closeButton:focus,.SingleDatePicker_closeButton:hover{color:darken(#cacccd,10%);text-decoration:none;}.SingleDatePicker_closeButton_svg{height:15px;width:15px;fill:#cacccd;}.DayPickerKeyboardShortcuts_buttonReset{background:0 0;border:0;border-radius:0;color:inherit;font:inherit;line-height:normal;overflow:visible;padding:0;cursor:pointer;font-size:14px;}.DayPickerKeyboardShortcuts_buttonReset:active{outline:0;}.DayPickerKeyboardShortcuts_show{width:22px;position:absolute;z-index:2;}.DayPickerKeyboardShortcuts_show__bottomRight{border-top:26px solid transparent;border-right:33px solid #00a699;bottom:0;right:0;}.DayPickerKeyboardShortcuts_show__bottomRight:hover{border-right:33px solid #008489;}.DayPickerKeyboardShortcuts_show__topRight{border-bottom:26px solid transparent;border-right:33px solid #00a699;top:0;right:0;}.DayPickerKeyboardShortcuts_show__topRight:hover{border-right:33px solid #008489;}.DayPickerKeyboardShortcuts_show__topLeft{border-bottom:26px solid transparent;border-left:33px solid #00a699;top:0;left:0;}.DayPickerKeyboardShortcuts_show__topLeft:hover{border-left:33px solid #008489;}.DayPickerKeyboardShortcuts_showSpan{color:#fff;position:absolute;}.DayPickerKeyboardShortcuts_showSpan__bottomRight{bottom:0;right:-28px;}.DayPickerKeyboardShortcuts_showSpan__topRight{top:1px;right:-28px;}.DayPickerKeyboardShortcuts_showSpan__topLeft{top:1px;left:-28px;}.DayPickerKeyboardShortcuts_panel{overflow:auto;background:#fff;border:1px solid #dbdbdb;border-radius:2px;position:absolute;top:0;bottom:0;right:0;left:0;z-index:2;padding:22px;margin:33px;}.DayPickerKeyboardShortcuts_title{font-size:16px;font-weight:700;margin:0;}.DayPickerKeyboardShortcuts_list{list-style:none;padding:0;font-size:14px;}.DayPickerKeyboardShortcuts_close{position:absolute;right:22px;top:22px;z-index:2;}.DayPickerKeyboardShortcuts_close:active{outline:0;}.DayPickerKeyboardShortcuts_closeSvg{height:15px;width:15px;fill:#cacccd;}.DayPickerKeyboardShortcuts_closeSvg:focus,.DayPickerKeyboardShortcuts_closeSvg:hover{fill:#82888a;}.CalendarDay{-moz-box-sizing:border-box;box-sizing:border-box;cursor:pointer;font-size:14px;text-align:center;}.CalendarDay:active{outline:0;}.CalendarDay__defaultCursor{cursor:default;}.CalendarDay__default{border:1px solid #e4e7e7;color:#484848;background:#fff;}.CalendarDay__default:hover{background:#e4e7e7;border:1px double #e4e7e7;color:inherit;}.CalendarDay__hovered_offset{background:#f4f5f5;border:1px double #e4e7e7;color:inherit;}.CalendarDay__outside{border:0;background:#fff;color:#484848;}.CalendarDay__outside:hover{border:0;}.CalendarDay__blocked_minimum_nights{background:#fff;border:1px solid #eceeee;color:#cacccd;}.CalendarDay__blocked_minimum_nights:active,.CalendarDay__blocked_minimum_nights:hover{background:#fff;color:#cacccd;}.CalendarDay__highlighted_calendar{background:#ffe8bc;color:#484848;}.CalendarDay__highlighted_calendar:active,.CalendarDay__highlighted_calendar:hover{background:#ffce71;color:#484848;}.CalendarDay__selected_span{background:#66e2da;border:1px solid #33dacd;color:#fff;}.CalendarDay__selected_span:active,.CalendarDay__selected_span:hover{background:#33dacd;border:1px solid #33dacd;color:#fff;}.CalendarDay__last_in_range{border-right:#00a699;}.CalendarDay__selected,.CalendarDay__selected:active,.CalendarDay__selected:hover{background:#00a699;border:1px solid #00a699;color:#fff;}.CalendarDay__hovered_span,.CalendarDay__hovered_span:hover{background:#b2f1ec;border:1px solid #80e8e0;color:#007a87;}.CalendarDay__hovered_span:active{background:#80e8e0;border:1px solid #80e8e0;color:#007a87;}.CalendarDay__blocked_calendar,.CalendarDay__blocked_calendar:active,.CalendarDay__blocked_calendar:hover{background:#cacccd;border:1px solid #cacccd;color:#82888a;}.CalendarDay__blocked_out_of_range,.CalendarDay__blocked_out_of_range:active,.CalendarDay__blocked_out_of_range:hover{background:#fff;border:1px solid #e4e7e7;color:#cacccd;}.CalendarMonth{background:#fff;text-align:center;padding:0 13px;vertical-align:top;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.CalendarMonth_table{border-collapse:collapse;border-spacing:0;}.CalendarMonth_verticalSpacing{border-collapse:separate;}.CalendarMonth_caption{color:#484848;font-size:18px;text-align:center;padding-top:22px;padding-bottom:37px;caption-side:initial;}.CalendarMonth_caption__verticalScrollable{padding-top:12px;padding-bottom:7px;}.CalendarMonthGrid{background:#fff;text-align:left;z-index:0;}.CalendarMonthGrid__animating{z-index:1;}.CalendarMonthGrid__horizontal{position:absolute;left:9px;}.CalendarMonthGrid__vertical{margin:0 auto;}.CalendarMonthGrid__vertical_scrollable{margin:0 auto;overflow-y:scroll;}.CalendarMonthGrid_month__horizontal{display:inline-block;vertical-align:top;min-height:100%;}.CalendarMonthGrid_month__hideForAnimation{position:absolute;z-index:-1;opacity:0;pointer-events:none;}.CalendarMonthGrid_month__hidden{visibility:hidden;}.DayPickerNavigation{position:relative;z-index:2;}.DayPickerNavigation__verticalDefault{position:absolute;width:100%;height:52px;bottom:0;left:0;}.DayPickerNavigation__verticalScrollableDefault{position:relative;}.DayPickerNavigation_button{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:0;padding:0;margin:0;}.DayPickerNavigation_button__default{border:1px solid #e4e7e7;background-color:#fff;color:#757575;}.DayPickerNavigation_button__default:focus,.DayPickerNavigation_button__default:hover{border:1px solid #c4c4c4;}.DayPickerNavigation_button__default:active{background:#f2f2f2;}.DayPickerNavigation_button__horizontalDefault{position:absolute;top:18px;line-height:0.78;border-radius:3px;padding:6px 9px;}.DayPickerNavigation_leftButton__horizontalDefault{left:22px;}.DayPickerNavigation_rightButton__horizontalDefault{right:22px;}.DayPickerNavigation_button__verticalDefault{padding:5px;background:#fff;box-shadow:0 0 5px 2px rgba(0,0,0,0.1);position:relative;display:inline-block;height:100%;width:50%;}.DayPickerNavigation_nextButton__verticalDefault{border-left:0;}.DayPickerNavigation_nextButton__verticalScrollableDefault{width:100%;}.DayPickerNavigation_svg__horizontal{height:19px;width:19px;fill:#82888a;}.DayPickerNavigation_svg__vertical{height:42px;width:42px;fill:#484848;}.DayPicker{background:#fff;position:relative;text-align:left;}.DayPicker__horizontal{background:#fff;}.DayPicker__verticalScrollable{height:100%;}.DayPicker__hidden{visibility:hidden;}.DayPicker__withBorder{box-shadow:0 2px 6px rgba(0,0,0,0.05),0 0 0 1px rgba(0,0,0,0.07);border-radius:3px;}.DayPicker_portal__horizontal{box-shadow:none;position:absolute;left:50%;top:50%;}.DayPicker_portal__vertical{position:initial;}.DayPicker_focusRegion{outline:0;}.DayPicker_calendarInfo__horizontal,.DayPicker_wrapper__horizontal{display:inline-block;vertical-align:top;}.DayPicker_weekHeaders{position:relative;}.DayPicker_weekHeaders__horizontal{margin-left:9px;}.DayPicker_weekHeader{color:#757575;position:absolute;top:62px;z-index:2;padding:0 13px;text-align:left;}.DayPicker_weekHeader__vertical{left:50%;}.DayPicker_weekHeader__verticalScrollable{top:0;display:table-row;border-bottom:1px solid #dbdbdb;background:#fff;margin-left:0;left:0;width:100%;text-align:center;}.DayPicker_weekHeader_ul{list-style:none;margin:1px 0;padding-left:0;padding-right:0;font-size:14px;}.DayPicker_weekHeader_li{display:inline-block;text-align:center;}.DayPicker_transitionContainer{position:relative;overflow:hidden;border-radius:3px;}.DayPicker_transitionContainer__horizontal{-webkit-transition:height 0.2s ease-in-out;-moz-transition:height 0.2s ease-in-out;transition:height 0.2s ease-in-out;}.DayPicker_transitionContainer__vertical{width:100%;}.DayPicker_transitionContainer__verticalScrollable{padding-top:20px;height:100%;position:absolute;top:0;bottom:0;right:0;left:0;overflow-y:scroll;}.DateInput{margin:0;padding:0;background:#fff;position:relative;display:inline-block;width:130px;vertical-align:middle;}.DateInput__small{width:97px;}.DateInput__block{width:100%;}.DateInput__disabled{background:#f2f2f2;color:#dbdbdb;}.DateInput_input{font-weight:200;font-size:19px;line-height:24px;color:#484848;background-color:#fff;width:100%;padding:11px 11px 9px;border:0;border-top:0;border-right:0;border-bottom:2px solid transparent;border-left:0;border-radius:0;}.DateInput_input__small{font-size:15px;line-height:18px;letter-spacing:0.2px;padding:7px 7px 5px;}.DateInput_input__regular{font-weight:auto;}.DateInput_input__readOnly{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.DateInput_input__focused{outline:0;background:#fff;border:0;border-top:0;border-right:0;border-bottom:2px solid #008489;border-left:0;}.DateInput_input__disabled{background:#f2f2f2;font-style:italic;}.DateInput_screenReaderMessage{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;}.DateInput_fang{position:absolute;width:20px;height:10px;left:22px;z-index:2;}.DateInput_fangShape{fill:#fff;}.DateInput_fangStroke{stroke:#dbdbdb;fill:transparent;}.DateRangePickerInput{background-color:#fff;display:inline-block;}.DateRangePickerInput__disabled{background:#f2f2f2;}.DateRangePickerInput__withBorder{border-radius:2px;border:1px solid #dbdbdb;}.DateRangePickerInput__rtl{direction:rtl;}.DateRangePickerInput__block{display:block;}.DateRangePickerInput__showClearDates{padding-right:30px;}.DateRangePickerInput_arrow{display:inline-block;vertical-align:middle;color:#484848;}.DateRangePickerInput_arrow_svg{vertical-align:middle;fill:#484848;height:24px;width:24px;}.DateRangePickerInput_clearDates{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;padding:10px;margin:0 10px 0 5px;position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);}.DateRangePickerInput_clearDates__small{padding:6px;}.DateRangePickerInput_clearDates_default:focus,.DateRangePickerInput_clearDates_default:hover{background:#dbdbdb;border-radius:50%;}.DateRangePickerInput_clearDates__hide{visibility:hidden;}.DateRangePickerInput_clearDates_svg{fill:#82888a;height:12px;width:15px;vertical-align:middle;}.DateRangePickerInput_clearDates_svg__small{height:9px;}.DateRangePickerInput_calendarIcon{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;display:inline-block;vertical-align:middle;padding:10px;margin:0 5px 0 10px;}.DateRangePickerInput_calendarIcon_svg{fill:#82888a;height:15px;width:14px;vertical-align:middle;}.DateRangePicker{position:relative;display:inline-block;}.DateRangePicker__block{display:block;}.DateRangePicker_picker{z-index:1;background-color:#fff;position:absolute;}.DateRangePicker_picker__rtl{direction:rtl;}.DateRangePicker_picker__directionLeft{left:0;}.DateRangePicker_picker__directionRight{right:0;}.DateRangePicker_picker__portal{background-color:rgba(0,0,0,0.3);position:fixed;top:0;left:0;height:100%;width:100%;}.DateRangePicker_picker__fullScreenPortal{background-color:#fff;}.DateRangePicker_closeButton{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;cursor:pointer;position:absolute;top:0;right:0;padding:15px;z-index:2;}.DateRangePicker_closeButton:focus,.DateRangePicker_closeButton:hover{color:darken(#cacccd,10%);text-decoration:none;}.DateRangePicker_closeButton_svg{height:15px;width:15px;fill:#cacccd;}']);

var WhiteLabel = (0, _styledComponents2.default)(Wrapper).withConfig({
	displayName: 'DateRangeSelect__WhiteLabel',
	componentId: 's1jyof5c-1'
})(['', ';position:relative;.CalendarDay__selected,.CalendarDay__selected:active,.CalendarDay__selected:hover{background:#00aac7;border:1px solid #00aac7;}.DateInput_fang{display:none;}.DayPickerNavigation{position:absolute;display:flex;justify-content:space-between;width:100%;padding:1em;z-index:2;}.DayPickerNavigation_button{display:flex;justify-content:center;height:28px;width:28px;padding:0;border-radius:50%;', ';}', ';', ';'], function (props) {
	return props.hide && 'display: none';
}, function (props) {
	return props.loading && '\n\t\t\tpointer-events: none;\n\t\t\t';
}, function (props) {
	return props.weekSelection && '\n\t.CalendarDay__selected_span,\n\t.CalendarDay__selected_span:active,\n\t.CalendarDay__selected_span:hover {\n\t\tbackground: #00aac7;\n\t\tcolor: #fff;\n\t}\n\t.CalendarDay__selected_start,\n\t.CalendarDay__selected_end {\n\t\tborder: 1px solid #33dacd;\n\t\tcolor: #fff;\n\t}\n';
}, function (props) {
	return props.enableOutsideDays && '\n\t.CalendarDay__outside {\n\t\tcolor: #c4c4c4;\n\t}\n';
});

var NavButton = (0, _styledComponents2.default)(_Icon2.default).withConfig({
	displayName: 'DateRangeSelect__NavButton',
	componentId: 's1jyof5c-2'
})(['display:flex;justify-content:center;padding:0;margin:0;margin-right:0;border-radius:50%;color:#fff;background-color:#00aac7;font-size:1.5em;']);

var LoadingContainer = _styledComponents2.default.div.withConfig({
	displayName: 'DateRangeSelect__LoadingContainer',
	componentId: 's1jyof5c-3'
})(['position:absolute;display:flex;justify-content:center;align-items:center;width:100%;height:100%;background-color:rgba(255,255,255,0.8);opacity:', ';z-index:', ';transition:opacity 0.25s ease-in-out,z-index 0.1s ease-in-out;'], function (props) {
	return props.loading ? '1' : '0';
}, function (props) {
	return props.loading ? '3' : '0';
});

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
			today: _this.props.timezone ? (0, _moment2.default)().tz(_this.props.timezone) : (0, _moment2.default)()
		}, _this.componentDidMount = function () {
			var setDefaultDates = _this.props.setDefaultDates;
			var defaultDateSet = _this.state.defaultDateSet;


			if (setDefaultDates && !defaultDateSet) {
				_this.setDefaultDates();
			}
		}, _this.isDayBlocked = function (date) {
			var _this$props = _this.props,
			    availableDates = _this$props.availableDates,
			    timezone = _this$props.timezone;

			var formattedDate = timezone ? date.tz(timezone) : date;

			if (!availableDates) {
				return false;
			}

			var match = (availableDates || []).find(function (day) {
				return day === formattedDate.format('YYYY-MM-DD');
			});
			var lastDate = (0, _moment2.default)(availableDates[availableDates.length - 1]).endOf('month');

			if (match || formattedDate.isAfter(lastDate) || formattedDate.isSame(lastDate)) {
				return false;
			}
			return true;
		}, _this.isOutsideRange = function (date) {
			var today = _this.state.today;
			var _this$props2 = _this.props,
			    allowPastDates = _this$props2.allowPastDates,
			    timezone = _this$props2.timezone;


			var formattedDate = timezone ? date.tz(timezone) : date;
			var pastDate = formattedDate.isBefore(today);

			if (allowPastDates) {
				return false;
			}

			if (formattedDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD')) {
				return false;
			}

			if (pastDate) {
				return true;
			}

			return false;
		}, _this.setDefaultDates = function () {
			var _this$props3 = _this.props,
			    defaultStartDate = _this$props3.defaultStartDate,
			    defaultEndDate = _this$props3.defaultEndDate;


			_this.setState({
				startDate: defaultStartDate,
				endDate: defaultEndDate,
				defaultDateSet: true
			});
		}, _this.handleDateChange = function (selectedStart, selectedEnd) {
			var _this$props4 = _this.props,
			    _this$props4$onDatesC = _this$props4.onDatesChange,
			    onDatesChange = _this$props4$onDatesC === undefined ? function () {} : _this$props4$onDatesC,
			    weekSelection = _this$props4.weekSelection;


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
			    hide = _props.hide,
			    loading = _props.loading;


			return _react2.default.createElement(
				WhiteLabel,
				{
					weekSelection: weekSelection,
					enableOutsideDays: enableOutsideDays,
					hide: hide,
					loading: loading
				},
				_react2.default.createElement(
					LoadingContainer,
					{ loading: loading },
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
					focusedInput: focusedInput,
					onFocusChange: function onFocusChange(focusedInput) {
						return _this2.handleFocusChange(focusedInput);
					},
					numberOfMonths: numberOfMonths || 1,
					isDayBlocked: function isDayBlocked(date) {
						return _this2.isDayBlocked(date);
					},
					isOutsideRange: function isOutsideRange(date) {
						return _this2.isOutsideRange(date);
					},
					initialVisibleMonth: initialVisibleMonth,
					onPrevMonthClick: function onPrevMonthClick(prevMonth) {
						return _onPrevMonthClick && _onPrevMonthClick(prevMonth);
					},
					onNextMonthClick: function onNextMonthClick(nextMonth) {
						return _onNextMonthClick && _onNextMonthClick(nextMonth);
					},
					navPrev: _react2.default.createElement(
						NavButton,
						null,
						orientation === 'vertical' ? 'keyboard_arrow_up' : 'chevron_left'
					),
					navNext: _react2.default.createElement(
						NavButton,
						null,
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
	hide: _propTypes2.default.bool,
	loading: _propTypes2.default.bool
};

DateRangeSelect.defaultProps = {
	allowPastDates: false
};