'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactBigCalendar = require('react-big-calendar');

var _reactBigCalendar2 = _interopRequireDefault(_reactBigCalendar);

var _dragAndDrop = require('react-big-calendar/lib/addons/dragAndDrop');

var _dragAndDrop2 = _interopRequireDefault(_dragAndDrop);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const React = require('react')
// const styled = require('styled-components')
// const moment = require('moment')
// const HTML5Backend = require('react-dnd-html5-backend')
// const DragDropContext = require('react-dnd').DragDropContext
// const BigCalendar = require('react-big-calendar')
// const withDragAndDrop = require('react-big-calendar/lib/addons/dragAndDrop')

_reactBigCalendar2.default.setLocalizer(_reactBigCalendar2.default.momentLocalizer(_moment2.default)); // or globalizeLocalizer
var CalendarComponent = (0, _dragAndDrop2.default)(_reactBigCalendar2.default);
// This is simply the default stylesheet from 'react-big-calendar/lib/css/react-big-calendar.css'
// Under normal circumstances this stylesheet would simply be imported at the top of the file.
// But we don't have a intra-skill css-loader available, so we're applying those default styles here.

var StyledReactBigCalendar = (0, _styledComponents2.default)(CalendarComponent).withConfig({
	displayName: 'Calendar__StyledReactBigCalendar',
	componentId: 's1m313xp-0'
})(['height:', ';', ';.rbc-btn{color:inherit;font:inherit;margin:0;}button.rbc-btn{overflow:visible;text-transform:none;-webkit-appearance:button;cursor:pointer;}button[disabled].rbc-btn{cursor:not-allowed;}button.rbc-input::-moz-focus-inner{border:0;padding:0;}.rbc-calendar{box-sizing:border-box;height:100%;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;}.rbc-calendar *,.rbc-calendar *:before,.rbc-calendar *:after{box-sizing:inherit;}.rbc-abs-full,.rbc-row-bg{overflow:hidden;position:absolute;top:0;left:0;right:0;bottom:0;}.rbc-ellipsis,.rbc-event-label,.rbc-row-segment .rbc-event-content,.rbc-show-more{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.rbc-rtl{direction:rtl;}.rbc-off-range{color:#999999;}.rbc-off-range-bg{background:#e5e5e5;}.rbc-header{overflow:hidden;-webkit-flex:1 0 0%;-ms-flex:1 0 0%;flex:1 0 0%;text-overflow:ellipsis;white-space:nowrap;padding:0 3px;text-align:center;vertical-align:middle;font-weight:bold;font-size:90%;min-height:0;border-bottom:1px solid #ddd;}.rbc-header + .rbc-header{border-left:1px solid #ddd;}.rbc-rtl .rbc-header + .rbc-header{border-left-width:0;border-right:1px solid #ddd;}.rbc-header > a,.rbc-header > a:active,.rbc-header > a:visited{color:inherit;text-decoration:none;}.rbc-row-content{position:relative;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none;z-index:4;}.rbc-today{background-color:#fafafa;}.rbc-toolbar{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-bottom:10px;font-size:16px;flex-wrap:wrap;}.rbc-toolbar .rbc-toolbar-label{-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding:0 10px;text-align:center;}.rbc-toolbar button{color:#373a3c;display:inline-block;margin:0;width:auto;text-align:center;vertical-align:middle;background:none;background-image:none;border:1px solid #ccc;padding:0.375rem 1rem;border-radius:4px;line-height:normal;white-space:nowrap;}.rbc-toolbar button:active,.rbc-toolbar button.rbc-active{background-image:none;box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);background-color:#e6e6e6;border-color:#adadad;}.rbc-toolbar button:active:hover,.rbc-toolbar button.rbc-active:hover,.rbc-toolbar button:active:focus,.rbc-toolbar button.rbc-active:focus{color:#373a3c;background-color:#d4d4d4;border-color:#8c8c8c;}.rbc-toolbar button:focus{color:#373a3c;background-color:#e6e6e6;border-color:#adadad;}.rbc-toolbar button:hover{color:#373a3c;background-color:#e6e6e6;border-color:#adadad;}.rbc-btn-group{display:inline-block;white-space:nowrap;}.rbc-btn-group > button:first-child:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0;}.rbc-btn-group > button:last-child:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0;}.rbc-rtl .rbc-btn-group > button:first-child:not(:last-child){border-radius:4px;border-top-left-radius:0;border-bottom-left-radius:0;}.rbc-rtl .rbc-btn-group > button:last-child:not(:first-child){border-radius:4px;border-top-right-radius:0;border-bottom-right-radius:0;}.rbc-btn-group > button:not(:first-child):not(:last-child){border-radius:0;}.rbc-btn-group button + button{margin-left:-1px;}.rbc-rtl .rbc-btn-group button + button{margin-left:0;margin-right:-1px;}.rbc-btn-group + .rbc-btn-group,.rbc-btn-group + button{margin-left:10px;}.rbc-event{padding:2px 5px;background-color:#dbeff3;color:#4cadc1;cursor:pointer;}.rbc-slot-selecting .rbc-event{cursor:inherit;pointer-events:none;}.rbc-event.rbc-selected{background-color:#1baac5;color:#fff;}.rbc-event-label{font-size:80%;}.rbc-event-overlaps{box-shadow:-1px 1px 5px 0px rgba(51,51,51,0.5);}.rbc-event-continues-prior{border-top-left-radius:0;border-bottom-left-radius:0;}.rbc-event-continues-after{border-top-right-radius:0;border-bottom-right-radius:0;}.rbc-event-continues-earlier{border-top-left-radius:0;border-top-right-radius:0;}.rbc-event-continues-later{border-bottom-left-radius:0;border-bottom-right-radius:0;}.rbc-event-continues-day-after{border-bottom-left-radius:0;border-bottom-right-radius:0;}.rbc-event-continues-day-prior{border-top-left-radius:0;border-top-right-radius:0;}.rbc-row{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}.rbc-row-segment{padding:0 1px 1px 1px;}.rbc-selected-cell{background-color:rgba(0,0,0,0.1);}.rbc-show-more{background-color:rgba(255,255,255,0.3);z-index:4;font-weight:bold;font-size:85%;height:auto;line-height:normal;white-space:nowrap;}.rbc-month-view{position:relative;border:1px solid #ddd;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-flex:1 0 0;-ms-flex:1 0 0px;flex:1 0 0;width:100%;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none;height:100%;}.rbc-month-header{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}.rbc-month-row{display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-flex:1 0 0;-ms-flex:1 0 0px;flex:1 0 0;-webkit-flex-basis:0px;-ms-flex-preferred-size:0px;flex-basis:0px;overflow:hidden;height:100%;}.rbc-month-row + .rbc-month-row{border-top:1px solid #ddd;}.rbc-date-cell{-webkit-flex:1 1 0;-ms-flex:1 1 0px;flex:1 1 0;min-width:0;padding-right:5px;text-align:right;}.rbc-date-cell.rbc-now{font-weight:bold;}.rbc-date-cell > a,.rbc-date-cell > a:active,.rbc-date-cell > a:visited{color:inherit;text-decoration:none;}.rbc-row-bg{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex:1 0 0;-ms-flex:1 0 0px;flex:1 0 0;overflow:hidden;}.rbc-day-bg{-webkit-flex:1 0 0%;-ms-flex:1 0 0%;flex:1 0 0%;}.rbc-day-bg + .rbc-day-bg{border-left:1px solid #ddd;}.rbc-rtl .rbc-day-bg + .rbc-day-bg{border-left-width:0;border-right:1px solid #ddd;}.rbc-overlay{position:absolute;z-index:5;border:1px solid #e5e5e5;background-color:#fff;box-shadow:0 5px 15px rgba(0,0,0,0.25);padding:10px;}.rbc-overlay > * + *{margin-top:1px;}.rbc-overlay-header{border-bottom:1px solid #e5e5e5;margin:-10px -10px 5px -10px;padding:2px 10px;}.rbc-agenda-view{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-flex:1 0 0;-ms-flex:1 0 0px;flex:1 0 0;overflow:auto;}.rbc-agenda-view table.rbc-agenda-table{width:100%;border:1px solid #ddd;border-spacing:0;border-collapse:collapse;}.rbc-agenda-view table.rbc-agenda-table tbody > tr > td{padding:5px 10px;vertical-align:top;}.rbc-agenda-view table.rbc-agenda-table .rbc-agenda-time-cell{padding-left:15px;padding-right:15px;text-transform:lowercase;}.rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td{border-left:1px solid #ddd;}.rbc-rtl .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td{border-left-width:0;border-right:1px solid #ddd;}.rbc-agenda-view table.rbc-agenda-table tbody > tr + tr{border-top:1px solid #ddd;}.rbc-agenda-view table.rbc-agenda-table thead > tr > th{padding:3px 5px;text-align:left;border-bottom:1px solid #ddd;}.rbc-rtl .rbc-agenda-view table.rbc-agenda-table thead > tr > th{text-align:right;}.rbc-agenda-time-cell{text-transform:lowercase;}.rbc-agenda-time-cell .rbc-continues-after:after{content:\' \xBB\';}.rbc-agenda-time-cell .rbc-continues-prior:before{content:\'\xAB \';}.rbc-agenda-date-cell,.rbc-agenda-time-cell{white-space:nowrap;}.rbc-agenda-event-cell{width:100%;}.rbc-time-column{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;min-height:100%;}.rbc-time-column .rbc-timeslot-group{-webkit-flex:1;-ms-flex:1;flex:1;}.rbc-timeslot-group{border-bottom:1px solid #b2b3b7;min-height:40px;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;}.rbc-time-gutter,.rbc-header-gutter{-webkit-flex:none;-ms-flex:none;flex:none;}.rbc-label{padding:0 5px;}.rbc-day-slot{position:relative;}.rbc-day-slot .rbc-events-container{bottom:0;left:0;position:absolute;right:10px;top:0;}.rbc-day-slot .rbc-events-container.rbc-is-rtl{left:10px;right:0;}.rbc-day-slot .rbc-event{border:1px solid #fff;display:-webkit-flex;display:-ms-flexbox;display:flex;max-height:100%;min-height:20px;-webkit-flex-flow:column wrap;-ms-flex-flow:column wrap;flex-flow:column wrap;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;overflow:hidden;position:absolute;}.rbc-day-slot .rbc-event-label{-webkit-flex:none;-ms-flex:none;flex:none;padding-right:5px;width:auto;}.rbc-day-slot .rbc-event-content{width:100%;-webkit-flex:1 1 0;-ms-flex:1 1 0px;flex:1 1 0;word-wrap:break-word;line-height:1;font-weight:600;height:100%;min-height:1em;}.rbc-day-slot .rbc-time-slot{border-top:1px solid #f7f7f7;}.rbc-time-slot{-webkit-flex:1 0 0;-ms-flex:1 0 0px;flex:1 0 0;}.rbc-time-slot.rbc-now{font-weight:bold;}.rbc-day-header{text-align:center;}.rbc-slot-selection{z-index:10;position:absolute;background-color:rgba(0,0,0,0.5);color:white;font-size:75%;width:100%;padding:3px;}.rbc-slot-selecting{cursor:move;}.rbc-time-view{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-flex:1;-ms-flex:1;flex:1;width:100%;border:1px solid #ddd;height:100%;min-height:0;}.rbc-time-view .rbc-time-gutter{white-space:nowrap;}.rbc-time-view .rbc-allday-cell{box-sizing:content-box;width:100%;position:relative;}.rbc-time-view .rbc-allday-events{position:relative;z-index:4;}.rbc-time-view .rbc-row{box-sizing:border-box;min-height:20px;}.rbc-time-header{display:-webkit-flex;display:-ms-flexbox;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}.rbc-time-header-gutter:before{font-size:0.8em;content:\'All day\';}.rbc-time-header-cell{', ';}.rbc-time-header.rbc-overflowing{border-right:1px solid #ddd;}.rbc-rtl .rbc-time-header.rbc-overflowing{border-right-width:0;border-left:1px solid #ddd;}.rbc-time-header > .rbc-row:first-child{border-bottom:1px solid #ddd;}.rbc-time-header > .rbc-row.rbc-row-resource{border-bottom:1px solid #ddd;}.rbc-time-header-content{-webkit-flex:1;-ms-flex:1;flex:1;min-width:0;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;border-left:1px solid #ddd;}.rbc-rtl .rbc-time-header-content{border-left-width:0;border-right:1px solid #ddd;}.rbc-time-content{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex:1 0 0%;-ms-flex:1 0 0%;flex:1 0 0%;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:100%;border-top:2px solid #ddd;overflow-y:auto;position:relative;}.rbc-time-content > .rbc-time-gutter{-webkit-flex:none;-ms-flex:none;flex:none;}.rbc-time-content > * + * > *{border-left:1px solid #ddd;}.rbc-rtl .rbc-time-content > * + * > *{border-left-width:0;border-right:1px solid #ddd;}.rbc-time-content > .rbc-day-slot{width:100%;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none;}.rbc-current-time-indicator{position:absolute;z-index:999;height:1px;background-color:#74ad31;pointer-events:none;}.rbc-addons-dnd .rbc-row-content{pointer-events:none;}.rbc-addons-dnd .rbc-row-content .rbc-show-more,.rbc-addons-dnd .rbc-row-content .rbc-event{pointer-events:all;}.rbc-addons-dnd .rbc-addons-dnd-over{background-color:rgba(0,0,0,0.3);}.rbc-addons-dnd .rbc-events-container{pointer-events:none;}.rbc-addons-dnd .rbc-event{transition:opacity 150ms;pointer-events:all;}.rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ns-icon,.rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ew-icon{display:block;}.rbc-addons-dnd.rbc-addons-dnd-is-dragging .rbc-event{pointer-events:none;opacity:0.5;}.rbc-addons-dnd .rbc-addons-dnd-resizable{position:relative;width:100%;height:100%;}.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor{width:100%;text-align:center;position:absolute;}.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:first-child{top:0;}.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:last-child{bottom:0;}.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor .rbc-addons-dnd-resize-ns-icon{display:none;border-top:3px double;margin:0 auto;width:10px;cursor:ns-resize;}.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor{position:absolute;top:4px;bottom:0;}.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:first-child{left:0;}.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:last-child{right:0;}.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor .rbc-addons-dnd-resize-ew-icon{display:none;border-left:3px double;margin-top:auto;margin-bottom:auto;height:10px;cursor:ew-resize;}'], function (props) {
	return props.height;
}, function (props) {
	return props.defaultView === 'week' && 'position: absolute; width: 1000px;';
}, function (props) {
	return props.defaultView === 'day' && 'display: none';
});

var Calendar = function (_Component) {
	_inherits(Calendar, _Component);

	function Calendar(props) {
		_classCallCheck(this, Calendar);

		var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

		_this.resizeEvent = function (resizeType, _ref) {
			var event = _ref.event,
			    start = _ref.start,
			    end = _ref.end;
			var events = _this.state.events;


			var nextEvents = events.map(function (existingEvent) {
				return existingEvent.id == event.id ? _extends({}, existingEvent, { start: start, end: end }) : existingEvent;
			});

			_this.setState({
				events: nextEvents
			});

			alert(event.title + ' was resized to ' + start + '-' + end);
		};

		_this.onNavigate = function (e) {
			console.log('onNavigate');
			console.log(e);
		};

		_this.onEventDrop = function (e) {
			console.log('onEventDrop');
			console.log(e);
		};

		_this.onEventResize = function (e) {
			console.log('onEventResize');
			console.log(e);
		};

		_this.selectEvent = function (e) {
			console.log('selectEvent');
			console.log(e);
		};

		_this.state = {
			events: props.events
		};
		_this.moveEvent = _this.moveEvent.bind(_this);
		return _this;
	}

	_createClass(Calendar, [{
		key: 'moveEvent',
		value: function moveEvent(_ref2) {
			var event = _ref2.event,
			    start = _ref2.start,
			    end = _ref2.end;
			var events = this.state.events;


			var idx = events.indexOf(event);
			var updatedEvent = _extends({}, event, { start: start, end: end });

			var nextEvents = [].concat(_toConsumableArray(events));
			nextEvents.splice(idx, 1, updatedEvent);

			this.setState({
				events: nextEvents
			});

			alert(event.title + ' was dropped onto ' + event.start);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    height = _props.height,
			    date = _props.date,
			    toolbar = _props.toolbar,
			    events = _props.events,
			    defaultView = _props.defaultView,
			    views = _props.views,
			    selectable = _props.selectable,
			    step = _props.step,
			    timeslots = _props.timeslots,
			    min = _props.min,
			    max = _props.max,
			    onSelectSlot = _props.onSelectSlot,
			    onSelectEvent = _props.onSelectEvent,
			    formats = _props.formats,
			    titleAccessor = _props.titleAccessor,
			    startAccessor = _props.startAccessor,
			    endAccessor = _props.endAccessor,
			    allDayAccessor = _props.allDayAccessor,
			    dragAndDrop = _props.dragAndDrop;


			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('div', {
					dangerouslySetInnerHTML: {
						__html: '<style>\n\t\t\twidth: 100%;\n\n\t\t\t.rbc-btn {\n\t\t\t\tcolor: inherit;\n\t\t\t\tfont: inherit;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\t\t\tbutton.rbc-btn {\n\t\t\t\toverflow: visible;\n\t\t\t\ttext-transform: none;\n\t\t\t\t-webkit-appearance: button;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\tbutton[disabled].rbc-btn {\n\t\t\t\tcursor: not-allowed;\n\t\t\t}\n\t\t\tbutton.rbc-input::-moz-focus-inner {\n\t\t\t\tborder: 0;\n\t\t\t\tpadding: 0;\n\t\t\t}\n\t\t\t.rbc-calendar {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\theight: 100%;\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex-direction: column;\n\t\t\t\t-ms-flex-direction: column;\n\t\t\t\tflex-direction: column;\n\t\t\t\t-webkit-align-items: stretch;\n\t\t\t\t-ms-flex-align: stretch;\n\t\t\t\talign-items: stretch;\n\t\t\t}\n\t\t\t.rbc-calendar *,\n\t\t\t.rbc-calendar *:before,\n\t\t\t.rbc-calendar *:after {\n\t\t\t\tbox-sizing: inherit;\n\t\t\t}\n\t\t\t.rbc-abs-full,\n\t\t\t.rbc-row-bg {\n\t\t\t\toverflow: hidden;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\tright: 0;\n\t\t\t\tbottom: 0;\n\t\t\t}\n\t\t\t.rbc-ellipsis,\n\t\t\t.rbc-event-label,\n\t\t\t.rbc-row-segment .rbc-event-content,\n\t\t\t.rbc-show-more {\n\t\t\t\tdisplay: block;\n\t\t\t\toverflow: hidden;\n\t\t\t\ttext-overflow: ellipsis;\n\t\t\t\twhite-space: nowrap;\n\t\t\t}\n\t\t\t.rbc-rtl {\n\t\t\t\tdirection: rtl;\n\t\t\t}\n\t\t\t.rbc-off-range {\n\t\t\t\tcolor: #999999;\n\t\t\t}\n\t\t\t.rbc-off-range-bg {\n\t\t\t\tbackground: #e5e5e5;\n\t\t\t}\n\t\t\t.rbc-header {\n\t\t\t\toverflow: hidden;\n\t\t\t\t-webkit-flex: 1 0 0%;\n\t\t\t\t-ms-flex: 1 0 0%;\n\t\t\t\tflex: 1 0 0%;\n\t\t\t\ttext-overflow: ellipsis;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\tpadding: 0 3px;\n\t\t\t\ttext-align: center;\n\t\t\t\tvertical-align: middle;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tfont-size: 90%;\n\t\t\t\tmin-height: 0;\n\t\t\t\tborder-bottom: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-header + .rbc-header {\n\t\t\t\tborder-left: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-header + .rbc-header {\n\t\t\t\tborder-left-width: 0;\n\t\t\t\tborder-right: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-header > a,\n\t\t\t.rbc-header > a:active,\n\t\t\t.rbc-header > a:visited {\n\t\t\t\tcolor: inherit;\n\t\t\t\ttext-decoration: none;\n\t\t\t}\n\t\t\t.rbc-row-content {\n\t\t\t\tposition: relative;\n\t\t\t\t-moz-user-select: none;\n\t\t\t\t-ms-user-select: none;\n\t\t\t\tuser-select: none;\n\t\t\t\t-webkit-user-select: none;\n\t\t\t\tz-index: 4;\n\t\t\t}\n\t\t\t.rbc-today {\n\t\t\t\tbackground-color: #fafafa;\n\t\t\t}\n\t\t\t.rbc-toolbar {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-align-items: center;\n\t\t\t\t-ms-flex-align: center;\n\t\t\t\talign-items: center;\n\t\t\t\tmargin-bottom: 10px;\n\t\t\t\tfont-size: 16px;\n\t\t\t\tflex-wrap: wrap;\n\t\t\t}\n\t\t\t.rbc-toolbar .rbc-toolbar-label {\n\t\t\t\t-webkit-flex-grow: 1;\n\t\t\t\t-ms-flex-positive: 1;\n\t\t\t\tflex-grow: 1;\n\t\t\t\tpadding: 0 10px;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\t\t\t.rbc-toolbar button {\n\t\t\t\tcolor: #373a3c;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tmargin: 0;\n\t\t\t\twidth: auto;\n\t\t\t\ttext-align: center;\n\t\t\t\tvertical-align: middle;\n\t\t\t\tbackground: none;\n\t\t\t\tbackground-image: none;\n\t\t\t\tborder: 1px solid #ccc;\n\t\t\t\tpadding: 0.375rem 1rem;\n\t\t\t\tborder-radius: 4px;\n\t\t\t\tline-height: normal;\n\t\t\t\twhite-space: nowrap;\n\t\t\t}\n\t\t\t.rbc-toolbar button:active,\n\t\t\t.rbc-toolbar button.rbc-active {\n\t\t\t\tbackground-image: none;\n\t\t\t\tbox-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n\t\t\t\tbackground-color: #e6e6e6;\n\t\t\t\tborder-color: #adadad;\n\t\t\t}\n\t\t\t.rbc-toolbar button:active:hover,\n\t\t\t.rbc-toolbar button.rbc-active:hover,\n\t\t\t.rbc-toolbar button:active:focus,\n\t\t\t.rbc-toolbar button.rbc-active:focus {\n\t\t\t\tcolor: #373a3c;\n\t\t\t\tbackground-color: #d4d4d4;\n\t\t\t\tborder-color: #8c8c8c;\n\t\t\t}\n\t\t\t.rbc-toolbar button:focus {\n\t\t\t\tcolor: #373a3c;\n\t\t\t\tbackground-color: #e6e6e6;\n\t\t\t\tborder-color: #adadad;\n\t\t\t}\n\t\t\t.rbc-toolbar button:hover {\n\t\t\t\tcolor: #373a3c;\n\t\t\t\tbackground-color: #e6e6e6;\n\t\t\t\tborder-color: #adadad;\n\t\t\t}\n\t\t\t.rbc-btn-group {\n\t\t\t\tdisplay: inline-block;\n\t\t\t\twhite-space: nowrap;\n\t\t\t}\n\t\t\t.rbc-btn-group > button:first-child:not(:last-child) {\n\t\t\t\tborder-top-right-radius: 0;\n\t\t\t\tborder-bottom-right-radius: 0;\n\t\t\t}\n\t\t\t.rbc-btn-group > button:last-child:not(:first-child) {\n\t\t\t\tborder-top-left-radius: 0;\n\t\t\t\tborder-bottom-left-radius: 0;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-btn-group > button:first-child:not(:last-child) {\n\t\t\t\tborder-radius: 4px;\n\t\t\t\tborder-top-left-radius: 0;\n\t\t\t\tborder-bottom-left-radius: 0;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-btn-group > button:last-child:not(:first-child) {\n\t\t\t\tborder-radius: 4px;\n\t\t\t\tborder-top-right-radius: 0;\n\t\t\t\tborder-bottom-right-radius: 0;\n\t\t\t}\n\t\t\t.rbc-btn-group > button:not(:first-child):not(:last-child) {\n\t\t\t\tborder-radius: 0;\n\t\t\t}\n\t\t\t.rbc-btn-group button + button {\n\t\t\t\tmargin-left: -1px;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-btn-group button + button {\n\t\t\t\tmargin-left: 0;\n\t\t\t\tmargin-right: -1px;\n\t\t\t}\n\t\t\t.rbc-btn-group + .rbc-btn-group,\n\t\t\t.rbc-btn-group + button {\n\t\t\t\tmargin-left: 10px;\n\t\t\t}\n\t\t\t.rbc-event {\n\t\t\t\tpadding: 2px 5px;\n\t\t\t\tbackground-color: #dbeff3;\n\t\t\t\tcolor: #4cadc1;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.rbc-slot-selecting .rbc-event {\n\t\t\t\tcursor: inherit;\n\t\t\t\tpointer-events: none;\n\t\t\t}\n\t\t\t.rbc-event.rbc-selected {\n\t\t\t\tbackground-color: #1baac5;\n\t\t\t\tcolor: #fff;\n\t\t\t}\n\t\t\t.rbc-event-label {\n\t\t\t\tfont-size: 80%;\n\t\t\t}\n\t\t\t.rbc-event-overlaps {\n\t\t\t\tbox-shadow: -1px 1px 5px 0px rgba(51, 51, 51, 0.5);\n\t\t\t}\n\t\t\t.rbc-event-continues-prior {\n\t\t\t\tborder-top-left-radius: 0;\n\t\t\t\tborder-bottom-left-radius: 0;\n\t\t\t}\n\t\t\t.rbc-event-continues-after {\n\t\t\t\tborder-top-right-radius: 0;\n\t\t\t\tborder-bottom-right-radius: 0;\n\t\t\t}\n\t\t\t.rbc-event-continues-earlier {\n\t\t\t\tborder-top-left-radius: 0;\n\t\t\t\tborder-top-right-radius: 0;\n\t\t\t}\n\t\t\t.rbc-event-continues-later {\n\t\t\t\tborder-bottom-left-radius: 0;\n\t\t\t\tborder-bottom-right-radius: 0;\n\t\t\t}\n\t\t\t.rbc-event-continues-day-after {\n\t\t\t\tborder-bottom-left-radius: 0;\n\t\t\t\tborder-bottom-right-radius: 0;\n\t\t\t}\n\t\t\t.rbc-event-continues-day-prior {\n\t\t\t\tborder-top-left-radius: 0;\n\t\t\t\tborder-top-right-radius: 0;\n\t\t\t}\n\t\t\t.rbc-row {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex-direction: row;\n\t\t\t\t-ms-flex-direction: row;\n\t\t\t\tflex-direction: row;\n\t\t\t}\n\t\t\t.rbc-row-segment {\n\t\t\t\tpadding: 0 1px 1px 1px;\n\t\t\t}\n\t\t\t.rbc-selected-cell {\n\t\t\t\tbackground-color: rgba(0, 0, 0, 0.1);\n\t\t\t}\n\t\t\t.rbc-show-more {\n\t\t\t\tbackground-color: rgba(255, 255, 255, 0.3);\n\t\t\t\tz-index: 4;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tfont-size: 85%;\n\t\t\t\theight: auto;\n\t\t\t\tline-height: normal;\n\t\t\t\twhite-space: nowrap;\n\t\t\t}\n\t\t\t.rbc-month-view {\n\t\t\t\tposition: relative;\n\t\t\t\tborder: 1px solid #ddd;\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex-direction: column;\n\t\t\t\t-ms-flex-direction: column;\n\t\t\t\tflex-direction: column;\n\t\t\t\t-webkit-flex: 1 0 0;\n\t\t\t\t-ms-flex: 1 0 0px;\n\t\t\t\tflex: 1 0 0;\n\t\t\t\twidth: 100%;\n\t\t\t\t-moz-user-select: none;\n\t\t\t\t-ms-user-select: none;\n\t\t\t\tuser-select: none;\n\t\t\t\t-webkit-user-select: none;\n\t\t\t\theight: 100%;\n\t\t\t}\n\t\t\t.rbc-month-header {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex-direction: row;\n\t\t\t\t-ms-flex-direction: row;\n\t\t\t\tflex-direction: row;\n\t\t\t}\n\t\t\t.rbc-month-row {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\tposition: relative;\n\t\t\t\t-webkit-flex-direction: column;\n\t\t\t\t-ms-flex-direction: column;\n\t\t\t\tflex-direction: column;\n\t\t\t\t-webkit-flex: 1 0 0;\n\t\t\t\t-ms-flex: 1 0 0px;\n\t\t\t\tflex: 1 0 0;\n\t\t\t\t-webkit-flex-basis: 0px;\n\t\t\t\t-ms-flex-preferred-size: 0px;\n\t\t\t\tflex-basis: 0px;\n\t\t\t\toverflow: hidden;\n\t\t\t\theight: 100%;\n\t\t\t}\n\t\t\t.rbc-month-row + .rbc-month-row {\n\t\t\t\tborder-top: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-date-cell {\n\t\t\t\t-webkit-flex: 1 1 0;\n\t\t\t\t-ms-flex: 1 1 0px;\n\t\t\t\tflex: 1 1 0;\n\t\t\t\tmin-width: 0;\n\t\t\t\tpadding-right: 5px;\n\t\t\t\ttext-align: right;\n\t\t\t}\n\t\t\t.rbc-date-cell.rbc-now {\n\t\t\t\tfont-weight: bold;\n\t\t\t}\n\t\t\t.rbc-date-cell > a,\n\t\t\t.rbc-date-cell > a:active,\n\t\t\t.rbc-date-cell > a:visited {\n\t\t\t\tcolor: inherit;\n\t\t\t\ttext-decoration: none;\n\t\t\t}\n\t\t\t.rbc-row-bg {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex-direction: row;\n\t\t\t\t-ms-flex-direction: row;\n\t\t\t\tflex-direction: row;\n\t\t\t\t-webkit-flex: 1 0 0;\n\t\t\t\t-ms-flex: 1 0 0px;\n\t\t\t\tflex: 1 0 0;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\t\t\t.rbc-day-bg {\n\t\t\t\t-webkit-flex: 1 0 0%;\n\t\t\t\t-ms-flex: 1 0 0%;\n\t\t\t\tflex: 1 0 0%;\n\t\t\t}\n\t\t\t.rbc-day-bg + .rbc-day-bg {\n\t\t\t\tborder-left: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-day-bg + .rbc-day-bg {\n\t\t\t\tborder-left-width: 0;\n\t\t\t\tborder-right: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\tz-index: 5;\n\t\t\t\tborder: 1px solid #e5e5e5;\n\t\t\t\tbackground-color: #fff;\n\t\t\t\tbox-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);\n\t\t\t\tpadding: 10px;\n\t\t\t}\n\t\t\t.rbc-overlay > * + * {\n\t\t\t\tmargin-top: 1px;\n\t\t\t}\n\t\t\t.rbc-overlay-header {\n\t\t\t\tborder-bottom: 1px solid #e5e5e5;\n\t\t\t\tmargin: -10px -10px 5px -10px;\n\t\t\t\tpadding: 2px 10px;\n\t\t\t}\n\t\t\t.rbc-agenda-view {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex-direction: column;\n\t\t\t\t-ms-flex-direction: column;\n\t\t\t\tflex-direction: column;\n\t\t\t\t-webkit-flex: 1 0 0;\n\t\t\t\t-ms-flex: 1 0 0px;\n\t\t\t\tflex: 1 0 0;\n\t\t\t\toverflow: auto;\n\t\t\t}\n\t\t\t.rbc-agenda-view table.rbc-agenda-table {\n\t\t\t\twidth: 100%;\n\t\t\t\tborder: 1px solid #ddd;\n\t\t\t\tborder-spacing: 0;\n\t\t\t\tborder-collapse: collapse;\n\t\t\t}\n\t\t\t.rbc-agenda-view table.rbc-agenda-table tbody > tr > td {\n\t\t\t\tpadding: 5px 10px;\n\t\t\t\tvertical-align: top;\n\t\t\t}\n\t\t\t.rbc-agenda-view table.rbc-agenda-table .rbc-agenda-time-cell {\n\t\t\t\tpadding-left: 15px;\n\t\t\t\tpadding-right: 15px;\n\t\t\t\ttext-transform: lowercase;\n\t\t\t}\n\t\t\t.rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {\n\t\t\t\tborder-left: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {\n\t\t\t\tborder-left-width: 0;\n\t\t\t\tborder-right: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-agenda-view table.rbc-agenda-table tbody > tr + tr {\n\t\t\t\tborder-top: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-agenda-view table.rbc-agenda-table thead > tr > th {\n\t\t\t\tpadding: 3px 5px;\n\t\t\t\ttext-align: left;\n\t\t\t\tborder-bottom: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-agenda-view table.rbc-agenda-table thead > tr > th {\n\t\t\t\ttext-align: right;\n\t\t\t}\n\t\t\t.rbc-agenda-time-cell {\n\t\t\t\ttext-transform: lowercase;\n\t\t\t}\n\t\t\t.rbc-agenda-time-cell .rbc-continues-after:after {\n\t\t\t\tcontent: \' \xBB\';\n\t\t\t}\n\t\t\t.rbc-agenda-time-cell .rbc-continues-prior:before {\n\t\t\t\tcontent: \'\xAB \';\n\t\t\t}\n\t\t\t.rbc-agenda-date-cell,\n\t\t\t.rbc-agenda-time-cell {\n\t\t\t\twhite-space: nowrap;\n\t\t\t}\n\t\t\t.rbc-agenda-event-cell {\n\t\t\t\twidth: 100%;\n\t\t\t}\n\t\t\t.rbc-time-column {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex-direction: column;\n\t\t\t\t-ms-flex-direction: column;\n\t\t\t\tflex-direction: column;\n\t\t\t\tmin-height: 100%;\n\t\t\t}\n\t\t\t.rbc-time-column .rbc-timeslot-group {\n\t\t\t\t-webkit-flex: 1;\n\t\t\t\t-ms-flex: 1;\n\t\t\t\tflex: 1;\n\t\t\t}\n\t\t\t.rbc-timeslot-group {\n\t\t\t\tborder-bottom: 1px solid #b2b3b7;\n\t\t\t\tmin-height: 40px;\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex-flow: column nowrap;\n\t\t\t\t-ms-flex-flow: column nowrap;\n\t\t\t\tflex-flow: column nowrap;\n\t\t\t}\n\t\t\t.rbc-time-gutter,\n\t\t\t.rbc-header-gutter {\n\t\t\t\t-webkit-flex: none;\n\t\t\t\t-ms-flex: none;\n\t\t\t\tflex: none;\n\t\t\t}\n\t\t\t.rbc-label {\n\t\t\t\tpadding: 0 5px;\n\t\t\t}\n\t\t\t.rbc-day-slot {\n\t\t\t\tposition: relative;\n\t\t\t}\n\t\t\t.rbc-day-slot .rbc-events-container {\n\t\t\t\tbottom: 0;\n\t\t\t\tleft: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 10px;\n\t\t\t\ttop: 0;\n\t\t\t}\n\t\t\t.rbc-day-slot .rbc-events-container.rbc-is-rtl {\n\t\t\t\tleft: 10px;\n\t\t\t\tright: 0;\n\t\t\t}\n\t\t\t.rbc-day-slot .rbc-event {\n\t\t\t\tborder: 1px solid #fff;\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\tmax-height: 100%;\n\t\t\t\tmin-height: 20px;\n\t\t\t\t-webkit-flex-flow: column wrap;\n\t\t\t\t-ms-flex-flow: column wrap;\n\t\t\t\tflex-flow: column wrap;\n\t\t\t\t-webkit-align-items: flex-start;\n\t\t\t\t-ms-flex-align: start;\n\t\t\t\talign-items: flex-start;\n\t\t\t\toverflow: hidden;\n\t\t\t\tposition: absolute;\n\t\t\t}\n\t\t\t.rbc-day-slot .rbc-event-label {\n\t\t\t\t-webkit-flex: none;\n\t\t\t\t-ms-flex: none;\n\t\t\t\tflex: none;\n\t\t\t\tpadding-right: 5px;\n\t\t\t\twidth: auto;\n\t\t\t}\n\t\t\t.rbc-day-slot .rbc-event-content {\n\t\t\t\twidth: 100%;\n\t\t\t\t-webkit-flex: 1 1 0;\n\t\t\t\t-ms-flex: 1 1 0px;\n\t\t\t\tflex: 1 1 0;\n\t\t\t\tword-wrap: break-word;\n\t\t\t\tline-height: 1;\n\t\t\t\tfont-weight: 600;\n\t\t\t\theight: 100%;\n\t\t\t\tmin-height: 1em;\n\t\t\t}\n\t\t\t.rbc-day-slot .rbc-time-slot {\n\t\t\t\tborder-top: 1px solid #f7f7f7;\n\t\t\t}\n\t\t\t.rbc-time-slot {\n\t\t\t\t-webkit-flex: 1 0 0;\n\t\t\t\t-ms-flex: 1 0 0px;\n\t\t\t\tflex: 1 0 0;\n\t\t\t}\n\t\t\t.rbc-time-slot.rbc-now {\n\t\t\t\tfont-weight: bold;\n\t\t\t}\n\t\t\t.rbc-day-header {\n\t\t\t\ttext-align: center;\n\t\t\t}\n\t\t\t.rbc-slot-selection {\n\t\t\t\tz-index: 10;\n\t\t\t\tposition: absolute;\n\t\t\t\tbackground-color: rgba(0, 0, 0, 0.5);\n\t\t\t\tcolor: white;\n\t\t\t\tfont-size: 75%;\n\t\t\t\twidth: 100%;\n\t\t\t\tpadding: 3px;\n\t\t\t}\n\t\t\t.rbc-slot-selecting {\n\t\t\t\tcursor: move;\n\t\t\t}\n\t\t\t.rbc-time-view {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex-direction: column;\n\t\t\t\t-ms-flex-direction: column;\n\t\t\t\tflex-direction: column;\n\t\t\t\t-webkit-flex: 1;\n\t\t\t\t-ms-flex: 1;\n\t\t\t\tflex: 1;\n\t\t\t\twidth: 100%;\n\t\t\t\tborder: 1px solid #ddd;\n\t\t\t\theight: 100%;\n\t\t\t\tmin-height: 0;\n\t\t\t}\n\t\t\t.rbc-time-view .rbc-time-gutter {\n\t\t\t\twhite-space: nowrap;\n\t\t\t}\n\t\t\t.rbc-time-view .rbc-allday-cell {\n\t\t\t\tbox-sizing: content-box;\n\t\t\t\twidth: 100%;\n\t\t\t\tposition: relative;\n\t\t\t}\n\t\t\t.rbc-time-view .rbc-allday-events {\n\t\t\t\tposition: relative;\n\t\t\t\tz-index: 4;\n\t\t\t}\n\t\t\t.rbc-time-view .rbc-row {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tmin-height: 20px;\n\t\t\t}\n\t\t\t.rbc-time-header {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: none;\n\t\t\t\t-webkit-flex: 0 0 auto;\n\t\t\t\t-ms-flex: 0 0 auto;\n\t\t\t\tflex: 0 0 auto;\n\t\t\t\t-webkit-flex-direction: row;\n\t\t\t\t-ms-flex-direction: row;\n\t\t\t\tflex-direction: row;\n\t\t\t}\n\t\t\t.rbc-time-header.rbc-overflowing {\n\t\t\t\tborder-right: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-time-header.rbc-overflowing {\n\t\t\t\tborder-right-width: 0;\n\t\t\t\tborder-left: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-time-header > .rbc-row:first-child {\n\t\t\t\tborder-bottom: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-time-header > .rbc-row.rbc-row-resource {\n\t\t\t\tborder-bottom: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-time-header-content {\n\t\t\t\t-webkit-flex: 1;\n\t\t\t\t-ms-flex: 1;\n\t\t\t\tflex: 1;\n\t\t\t\tmin-width: 0;\n\t\t\t\t-webkit-flex-direction: column;\n\t\t\t\t-ms-flex-direction: column;\n\t\t\t\tflex-direction: column;\n\t\t\t\tborder-left: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-time-header-content {\n\t\t\t\tborder-left-width: 0;\n\t\t\t\tborder-right: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-time-content {\n\t\t\t\tdisplay: -webkit-flex;\n\t\t\t\tdisplay: -ms-flexbox;\n\t\t\t\tdisplay: flex;\n\t\t\t\t-webkit-flex: 1 0 0%;\n\t\t\t\t-ms-flex: 1 0 0%;\n\t\t\t\tflex: 1 0 0%;\n\t\t\t\t-webkit-align-items: flex-start;\n\t\t\t\t-ms-flex-align: start;\n\t\t\t\talign-items: flex-start;\n\t\t\t\twidth: 100%;\n\t\t\t\tborder-top: 2px solid #ddd;\n\t\t\t\toverflow-y: auto;\n\t\t\t\tposition: relative;\n\t\t\t}\n\t\t\t.rbc-time-content > .rbc-time-gutter {\n\t\t\t\t-webkit-flex: none;\n\t\t\t\t-ms-flex: none;\n\t\t\t\tflex: none;\n\t\t\t}\n\t\t\t.rbc-time-content > * + * > * {\n\t\t\t\tborder-left: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-rtl .rbc-time-content > * + * > * {\n\t\t\t\tborder-left-width: 0;\n\t\t\t\tborder-right: 1px solid #ddd;\n\t\t\t}\n\t\t\t.rbc-time-content > .rbc-day-slot {\n\t\t\t\twidth: 100%;\n\t\t\t\t-moz-user-select: none;\n\t\t\t\t-ms-user-select: none;\n\t\t\t\tuser-select: none;\n\t\t\t\t-webkit-user-select: none;\n\t\t\t}\n\t\t\t.rbc-current-time-indicator {\n\t\t\t\tposition: absolute;\n\t\t\t\tz-index: 999;\n\t\t\t\theight: 1px;\n\t\t\t\tbackground-color: #74ad31;\n\t\t\t\tpointer-events: none;\n\t\t\t}\n\t\t\t.rbc-addons-dnd .rbc-row-content {\n\t\t\t\tpointer-events: none;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-row-content .rbc-show-more,\n\t\t\t  .rbc-addons-dnd .rbc-row-content .rbc-event {\n\t\t\t\tpointer-events: all;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-over {\n\t\t\t\tbackground-color: rgba(0, 0, 0, 0.3);\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-events-container {\n\t\t\t\tpointer-events: none;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-event {\n\t\t\t\ttransition: opacity 150ms;\n\t\t\t\tpointer-events: all;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ns-icon,\n\t\t\t  .rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ew-icon {\n\t\t\t\tdisplay: block;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd.rbc-addons-dnd-is-dragging .rbc-event {\n\t\t\t\tpointer-events: none;\n\t\t\t\topacity: .50;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-resizable {\n\t\t\t\tposition: relative;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor {\n\t\t\t\twidth: 100%;\n\t\t\t\ttext-align: center;\n\t\t\t\tposition: absolute;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:first-child {\n\t\t\t\ttop: 0;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:last-child {\n\t\t\t\tbottom: 0;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor .rbc-addons-dnd-resize-ns-icon {\n\t\t\t\tdisplay: none;\n\t\t\t\tborder-top: 3px double;\n\t\t\t\tmargin: 0 auto;\n\t\t\t\twidth: 10px;\n\t\t\t\tcursor: ns-resize;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 4px;\n\t\t\t\tbottom: 0;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:first-child {\n\t\t\t\tleft: 0;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:last-child {\n\t\t\t\tright: 0;\n\t\t\t  }\n\t\t\t  .rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor .rbc-addons-dnd-resize-ew-icon {\n\t\t\t\tdisplay: none;\n\t\t\t\tborder-left: 3px double;\n\t\t\t\tmargin-top: auto;\n\t\t\t\tmargin-bottom: auto;\n\t\t\t\theight: 10px;\n\t\t\t\tcursor: ew-resize;\n\t\t\t  }\n\n\t\t\t</style>\n\t\t\t'
					}
				}),
				_react2.default.createElement(CalendarComponent, _defineProperty({
					height: height,
					date: date || new Date(),
					toolbar: toolbar // PropTypes.bool
					, events: this.state.events // PropTypes.array
					, defaultView: defaultView // PropTypes.string
					, views: views // PropTypes.array
					, selectable: selectable // PropTypes.string || PropTypes.bool (passing 'ignoreEvents' allows for custom event click/drag logic)
					, resizeable: true,
					step: step // PropTypes.number
					, timeslots: timeslots // PropTypes.number
					, min: min // PropTypes.object (ie new Date('1/1/1970 08:00:00'))
					, max: max // PropTypes.object (ie new Date('1/1/1970 20:00:00'))
					, onSelectSlot: onSelectSlot // PropTypes.func.isRequired
					, onSelectEvent: onSelectEvent // PropTypes.func.isRequired
					, formats: formats // PropTypes.object
					, titleAccessor: titleAccessor // PropTypes.string
					, startAccessor: startAccessor // PropTypes.string
					, endAccessor: endAccessor // PropTypes.string
					, onNavigate: this.onNavigate,
					onEventDrop: this.onEventDrop,
					onEventResize: this.onEventResize
				}, 'onSelectEvent', this.selectEvent))
			);
		}
	}]);

	return Calendar;
}(_react.Component);

exports.default = Calendar;