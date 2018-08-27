'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactBigCalendar = require('react-big-calendar');

var _reactBigCalendar2 = _interopRequireDefault(_reactBigCalendar);

var _dragAndDrop = require('react-big-calendar/lib/addons/dragAndDrop');

var _dragAndDrop2 = _interopRequireDefault(_dragAndDrop);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _reactDndTouchBackend = require('react-dnd-touch-backend');

var _reactDndTouchBackend2 = _interopRequireDefault(_reactDndTouchBackend);

var _reactDnd = require('react-dnd');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_reactBigCalendar2.default.setLocalizer(_reactBigCalendar2.default.momentLocalizer(_moment2.default)); // or globalizeLocalizer

var CalendarComponent = (0, _dragAndDrop2.default)(_reactBigCalendar2.default);

var Calendar = function (_Component) {
	_inherits(Calendar, _Component);

	function Calendar() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Calendar);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			today: null
		}, _this.onNavigate = function (e) {
			// Not fired with current build but causes error if omitted
			console.log('onNavigate', e);
		}, _this.startAccessor = function (event) {
			return (0, _moment2.default)(event.start).toDate();
		}, _this.endAccessor = function (event) {
			return (0, _moment2.default)(event.end).toDate();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Calendar, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var currentDate = this.props.currentDate;


			this.setState({ today: (0, _moment2.default)(currentDate).toDate() });
		}
	}, {
		key: 'render',
		value: function render() {
			var today = this.state.today;

			var _props = this.props,
			    currentDate = _props.currentDate,
			    canDrag = _props.canDrag,
			    canResize = _props.canResize,
			    min = _props.min,
			    max = _props.max,
			    props = _objectWithoutProperties(_props, ['currentDate', 'canDrag', 'canResize', 'min', 'max']);

			var formattedDate = (0, _moment2.default)(currentDate).toDate();
			var formattedMin = (0, _moment2.default)(min).toDate();
			var formattedMax = (0, _moment2.default)(max).toDate();

			return _react2.default.createElement(
				'div',
				_extends({}, props, { className: 'calendar__wrapper' }),
				_react2.default.createElement(CalendarComponent, _extends({
					onNavigate: this.onNavigate,
					draggableAccessor: canDrag,
					resizableAccessor: canResize,
					startAccessor: this.startAccessor,
					endAccessor: this.endAccessor,
					defaultDate: today,
					date: formattedDate,
					getNow: function getNow() {
						return today;
					},
					selectable: props.onSelectSlot ? true : '',
					min: formattedMin,
					max: formattedMax
				}, props))
			);
		}
	}]);

	return Calendar;
}(_react.Component);

var backend = _is_js2.default.mobile() || _is_js2.default.tablet() || _is_js2.default.touchDevice() ? _reactDndTouchBackend2.default : _reactDndHtml5Backend2.default;

exports.default = (0, _reactDnd.DragDropContext)(backend)(Calendar);


Calendar.propTypes = {
	canDrag: _propTypes2.default.func,
	canResize: _propTypes2.default.func,
	onSelectSlot: _propTypes2.default.func,
	titleAccessor: _propTypes2.default.func
};