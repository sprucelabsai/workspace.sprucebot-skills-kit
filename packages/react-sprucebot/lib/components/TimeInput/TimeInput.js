'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n\t.rc-time-picker {\n\t\tdisplay: inline-block;\n\t\tbox-sizing: border-box;\n\t}\n\t.rc-time-picker * {\n\t\tbox-sizing: border-box;\n\t}\n\t.rc-time-picker-input {\n\t\tflex: 2;\n\t\tbackground-color: transparent;\n\t\tborder: none;\n\t\tcolor: #808080;\n\t\tfont-size: 1.2em;\n\t\tmargin: 0.5em;\n\t\tpadding: 0;\n\t\twidth: 100%;\n\t\tposition: relative;\n\t\tdisplay: inline-block;\n\t\theight: 28px;\n\t\tcursor: text;\n\t\tline-height: 1.5;\n\t\tborder-radius: 4px;\n\t\ttext-align: center;\n\t\ttransition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),\n\t\t\tbackground 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),\n\t\t\tbox-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n\t}\n\t.rc-time-picker-input[disabled] {\n\t\tcolor: #ccc;\n\t\tbackground: #f7f7f7;\n\t\tcursor: not-allowed;\n\t}\n\t.rc-time-picker-panel {\n\t\tz-index: 1070;\n\t\twidth: 170px;\n\t\tposition: absolute;\n\t\tbox-sizing: border-box;\n\t}\n\t.rc-time-picker-panel * {\n\t\tbox-sizing: border-box;\n\t}\n\t.rc-time-picker-panel-inner {\n\t\tdisplay: inline-block;\n\t\tposition: relative;\n\t\toutline: none;\n\t\tlist-style: none;\n\t\tfont-size: 12px;\n\t\ttext-align: left;\n\t\tbackground-color: #fff;\n\t\tborder-radius: 4px;\n\t\tbox-shadow: 0 1px 5px #ccc;\n\t\tbackground-clip: padding-box;\n\t\tborder: 1px solid #ccc;\n\t\tline-height: 1.5;\n\t}\n\t.rc-time-picker-panel-narrow {\n\t\tmax-width: 113px;\n\t}\n\t.rc-time-picker-panel-input {\n\t\tcolor: #808080;\n\t\tfont-size: 1.2em;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\twidth: 100%;\n\t\tcursor: auto;\n\t\tline-height: 1.5;\n\t\toutline: 0;\n\t\tborder: 1px solid transparent;\n\t}\n\t.rc-time-picker-panel-input-wrap {\n\t\tbox-sizing: border-box;\n\t\tposition: relative;\n\t\tpadding: 6px;\n\t\tborder-bottom: 1px solid #e9e9e9;\n\t}\n\t.rc-time-picker-panel-input-invalid {\n\t\tborder-color: red;\n\t}\n\t.rc-time-picker-panel-clear-btn {\n\t\tposition: absolute;\n\t\tright: 6px;\n\t\tcursor: pointer;\n\t\toverflow: hidden;\n\t\twidth: 20px;\n\t\theight: 20px;\n\t\ttext-align: center;\n\t\tline-height: 20px;\n\t\ttop: 6px;\n\t\tmargin: 0;\n\t}\n\t.rc-time-picker-panel-clear-btn:after {\n\t\tcontent: \'x\';\n\t\tfont-size: 12px;\n\t\tcolor: #aaa;\n\t\tdisplay: inline-block;\n\t\tline-height: 1;\n\t\twidth: 20px;\n\t\ttransition: color 0.3s ease;\n\t}\n\t.rc-time-picker-panel-clear-btn:hover:after {\n\t\tcolor: #666;\n\t}\n\t.rc-time-picker-panel-select {\n\t\tfloat: left;\n\t\tfont-size: 12px;\n\t\tborder: 1px solid #e9e9e9;\n\t\tborder-width: 0 1px;\n\t\tmargin-left: -1px;\n\t\tbox-sizing: border-box;\n\t\twidth: 56px;\n\t\tmax-height: 144px;\n\t\toverflow-y: auto;\n\t\tposition: relative;\n\t}\n\t.rc-time-picker-panel-select-active {\n\t\toverflow-y: auto;\n\t}\n\t.rc-time-picker-panel-select:first-child {\n\t\tborder-left: 0;\n\t\tmargin-left: 0;\n\t}\n\t.rc-time-picker-panel-select:last-child {\n\t\tborder-right: 0;\n\t}\n\t.rc-time-picker-panel-select ul {\n\t\tlist-style: none;\n\t\tbox-sizing: border-box;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\twidth: 100%;\n\t\toverflow-x: hidden;\n\t}\n\t.rc-time-picker-panel-select li {\n\t\tcolor: #808080;\n\t\tfont-size: 1.2em;\n\t\tlist-style: none;\n\t\tbox-sizing: content-box;\n\t\tmargin: 0;\n\t\tpadding: 0 0 0 16px;\n\t\twidth: 100%;\n\t\theight: 24px;\n\t\tline-height: 24px;\n\t\ttext-align: left;\n\t\tcursor: pointer;\n\t\t-webkit-user-select: none;\n\t\t-moz-user-select: none;\n\t\t-ms-user-select: none;\n\t\tuser-select: none;\n\t}\n\t.rc-time-picker-panel-select li:hover {\n\t\tbackground: #edfaff;\n\t}\n\tli.rc-time-picker-panel-select-option-selected {\n\t\tbackground: #f7f7f7;\n\t\tfont-weight: bold;\n\t}\n\tli.rc-time-picker-panel-select-option-disabled {\n\t\tcolor: #ccc;\n\t}\n\tli.rc-time-picker-panel-select-option-disabled:hover {\n\t\tbackground: transparent;\n\t\tcursor: not-allowed;\n\t}\n'], ['\n\t.rc-time-picker {\n\t\tdisplay: inline-block;\n\t\tbox-sizing: border-box;\n\t}\n\t.rc-time-picker * {\n\t\tbox-sizing: border-box;\n\t}\n\t.rc-time-picker-input {\n\t\tflex: 2;\n\t\tbackground-color: transparent;\n\t\tborder: none;\n\t\tcolor: #808080;\n\t\tfont-size: 1.2em;\n\t\tmargin: 0.5em;\n\t\tpadding: 0;\n\t\twidth: 100%;\n\t\tposition: relative;\n\t\tdisplay: inline-block;\n\t\theight: 28px;\n\t\tcursor: text;\n\t\tline-height: 1.5;\n\t\tborder-radius: 4px;\n\t\ttext-align: center;\n\t\ttransition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),\n\t\t\tbackground 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),\n\t\t\tbox-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n\t}\n\t.rc-time-picker-input[disabled] {\n\t\tcolor: #ccc;\n\t\tbackground: #f7f7f7;\n\t\tcursor: not-allowed;\n\t}\n\t.rc-time-picker-panel {\n\t\tz-index: 1070;\n\t\twidth: 170px;\n\t\tposition: absolute;\n\t\tbox-sizing: border-box;\n\t}\n\t.rc-time-picker-panel * {\n\t\tbox-sizing: border-box;\n\t}\n\t.rc-time-picker-panel-inner {\n\t\tdisplay: inline-block;\n\t\tposition: relative;\n\t\toutline: none;\n\t\tlist-style: none;\n\t\tfont-size: 12px;\n\t\ttext-align: left;\n\t\tbackground-color: #fff;\n\t\tborder-radius: 4px;\n\t\tbox-shadow: 0 1px 5px #ccc;\n\t\tbackground-clip: padding-box;\n\t\tborder: 1px solid #ccc;\n\t\tline-height: 1.5;\n\t}\n\t.rc-time-picker-panel-narrow {\n\t\tmax-width: 113px;\n\t}\n\t.rc-time-picker-panel-input {\n\t\tcolor: #808080;\n\t\tfont-size: 1.2em;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\twidth: 100%;\n\t\tcursor: auto;\n\t\tline-height: 1.5;\n\t\toutline: 0;\n\t\tborder: 1px solid transparent;\n\t}\n\t.rc-time-picker-panel-input-wrap {\n\t\tbox-sizing: border-box;\n\t\tposition: relative;\n\t\tpadding: 6px;\n\t\tborder-bottom: 1px solid #e9e9e9;\n\t}\n\t.rc-time-picker-panel-input-invalid {\n\t\tborder-color: red;\n\t}\n\t.rc-time-picker-panel-clear-btn {\n\t\tposition: absolute;\n\t\tright: 6px;\n\t\tcursor: pointer;\n\t\toverflow: hidden;\n\t\twidth: 20px;\n\t\theight: 20px;\n\t\ttext-align: center;\n\t\tline-height: 20px;\n\t\ttop: 6px;\n\t\tmargin: 0;\n\t}\n\t.rc-time-picker-panel-clear-btn:after {\n\t\tcontent: \'x\';\n\t\tfont-size: 12px;\n\t\tcolor: #aaa;\n\t\tdisplay: inline-block;\n\t\tline-height: 1;\n\t\twidth: 20px;\n\t\ttransition: color 0.3s ease;\n\t}\n\t.rc-time-picker-panel-clear-btn:hover:after {\n\t\tcolor: #666;\n\t}\n\t.rc-time-picker-panel-select {\n\t\tfloat: left;\n\t\tfont-size: 12px;\n\t\tborder: 1px solid #e9e9e9;\n\t\tborder-width: 0 1px;\n\t\tmargin-left: -1px;\n\t\tbox-sizing: border-box;\n\t\twidth: 56px;\n\t\tmax-height: 144px;\n\t\toverflow-y: auto;\n\t\tposition: relative;\n\t}\n\t.rc-time-picker-panel-select-active {\n\t\toverflow-y: auto;\n\t}\n\t.rc-time-picker-panel-select:first-child {\n\t\tborder-left: 0;\n\t\tmargin-left: 0;\n\t}\n\t.rc-time-picker-panel-select:last-child {\n\t\tborder-right: 0;\n\t}\n\t.rc-time-picker-panel-select ul {\n\t\tlist-style: none;\n\t\tbox-sizing: border-box;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\twidth: 100%;\n\t\toverflow-x: hidden;\n\t}\n\t.rc-time-picker-panel-select li {\n\t\tcolor: #808080;\n\t\tfont-size: 1.2em;\n\t\tlist-style: none;\n\t\tbox-sizing: content-box;\n\t\tmargin: 0;\n\t\tpadding: 0 0 0 16px;\n\t\twidth: 100%;\n\t\theight: 24px;\n\t\tline-height: 24px;\n\t\ttext-align: left;\n\t\tcursor: pointer;\n\t\t-webkit-user-select: none;\n\t\t-moz-user-select: none;\n\t\t-ms-user-select: none;\n\t\tuser-select: none;\n\t}\n\t.rc-time-picker-panel-select li:hover {\n\t\tbackground: #edfaff;\n\t}\n\tli.rc-time-picker-panel-select-option-selected {\n\t\tbackground: #f7f7f7;\n\t\tfont-weight: bold;\n\t}\n\tli.rc-time-picker-panel-select-option-disabled {\n\t\tcolor: #ccc;\n\t}\n\tli.rc-time-picker-panel-select-option-disabled:hover {\n\t\tbackground: transparent;\n\t\tcursor: not-allowed;\n\t}\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _rcTimePicker = require('rc-time-picker');

var _rcTimePicker2 = _interopRequireDefault(_rcTimePicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Input = _styledComponents2.default.input.withConfig({
	displayName: 'TimeInput__Input',
	componentId: 'he8dve-0'
})(['width:unset;flex:2;background-color:transparent;border:none;color:#808080;font-size:1.2em;margin:0.5em;padding:0;text-align:center;&::-webkit-clear-button{display:none;}&::-ms-clear{display:none;}']);

(0, _styledComponents.injectGlobal)(_templateObject);

var TimeInput = function (_Component) {
	_inherits(TimeInput, _Component);

	function TimeInput(props) {
		var _this2 = this;

		_classCallCheck(this, TimeInput);

		var _this = _possibleConstructorReturn(this, (TimeInput.__proto__ || Object.getPrototypeOf(TimeInput)).call(this, props));

		_this.onChange = function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
				var onChange;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								onChange = _this.props.onChange;
								_context.next = 3;
								return _this.setState({
									value: _this.input.value
								});

							case 3:
								if (onChange) {
									onChange(_this.input.value);
								}

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2);
			}));

			return function (_x) {
				return _ref.apply(this, arguments);
			};
		}();

		_this.onKeyDown = function (e) {
			var _this$props = _this.props,
			    disableEnter = _this$props.disableEnter,
			    onKeyDown = _this$props.onKeyDown;

			if (disableEnter && e.key === 'Enter') {
				e.preventDefault();
			}

			if (onKeyDown) {
				onKeyDown(e);
			}
		};

		_this.onTimePickerChange = function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(momentTime) {
				var onChange, time;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								onChange = _this.props.onChange;
								time = momentTime.format('HH:mm');
								_context2.next = 4;
								return _this.setState({
									value: time
								});

							case 4:
								if (onChange) {
									onChange(time);
								}

							case 5:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, _this2);
			}));

			return function (_x2) {
				return _ref2.apply(this, arguments);
			};
		}();

		var defaultValue = props.defaultValue,
		    rest = _objectWithoutProperties(props, ['defaultValue']);

		_this.state = {
			value: defaultValue || '',
			time: defaultValue ? (0, _moment2.default)('2017-04-01 ' + defaultValue) : '',
			rest: rest
		};
		return _this;
	}

	_createClass(TimeInput, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.value) {
				this.setState({
					value: nextProps.value
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    onChange = _props.onChange,
			    onKeyDown = _props.onKeyDown,
			    defaultValue = _props.defaultValue,
			    value = _props.value,
			    disableEnter = _props.disableEnter,
			    usePicker = _props.usePicker,
			    rest = _objectWithoutProperties(_props, ['onChange', 'onKeyDown', 'defaultValue', 'value', 'disableEnter', 'usePicker']);

			return _react2.default.createElement(
				_react.Fragment,
				null,
				(_is_js2.default.chrome() || _is_js2.default.safari()) && _is_js2.default.mobile() && !usePicker ? _react2.default.createElement(Input, _extends({
					type: 'time',
					value: this.state.value,
					onKeyDown: this.onKeyDown,
					onChange: this.onChange,
					innerRef: function innerRef(ref) {
						return _this3.input = ref;
					}
				}, rest)) : _react2.default.createElement(
					_react.Fragment,
					null,
					_react2.default.createElement(_rcTimePicker2.default, _extends({
						ref: function ref(_ref3) {
							return _this3.timePicker = _ref3;
						},
						showSecond: false,
						minuteStep: 5,
						defaultValue: this.state.time,
						onChange: this.onTimePickerChange,
						format: 'h:mm a',
						use12Hours: true,
						inputReadOnly: true
					}, rest))
				)
			);
		}
	}, {
		key: 'value',
		get: function get() {
			return this.state.value;
		}
	}]);

	return TimeInput;
}(_react.Component);

exports.default = TimeInput;


TimeInput.propTypes = {
	onChange: _propTypes2.default.func,
	defaultValue: _propTypes2.default.string,
	usePicker: _propTypes2.default.boolean,
	value: _propTypes2.default.string
};

TimeInput.defaultProps = {};