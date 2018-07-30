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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ControlButton = require('../ControlButton/ControlButton');

var _ControlButton2 = _interopRequireDefault(_ControlButton);

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _IconButton = require('../IconButton/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyledList = _styledComponents2.default.ul.withConfig({
	displayName: 'Pager__StyledList',
	componentId: 's1b0v454-0'
})(['display:flex;align-items:center;', ';'], function (props) {
	return props.margin && 'margin: ' + props.margin;
});

var StyledListItem = _styledComponents2.default.li.withConfig({
	displayName: 'Pager__StyledListItem',
	componentId: 's1b0v454-1'
})(['&&{', ';', ';', ';}'], function (props) {
	return props.smallArrows && 'flex: 0.5';
}, function (props) {
	return props.hide && 'display: none';
}, function (props) {
	return props.loading && '\n\t\t\t\tpointer-events: none;\n\t\t\t\tcursor: not-allowed;\n\t\t\t';
});

var DropDownButton = (0, _styledComponents2.default)(_ControlButton2.default).withConfig({
	displayName: 'Pager__DropDownButton',
	componentId: 's1b0v454-2'
})(['margin-left:0.7em;']);

var StyledLoader = (0, _styledComponents2.default)(_Loader2.default).withConfig({
	displayName: 'Pager__StyledLoader',
	componentId: 's1b0v454-3'
})(['&&{flex:2;display:flex;align-self:center;align-items:center;justify-content:center;}']);

var Pager = function (_Component) {
	_inherits(Pager, _Component);

	function Pager() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Pager);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pager.__proto__ || Object.getPrototypeOf(Pager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			page: _this.props.page
		}, _this.componentWillReceiveProps = function (nextProps) {
			if (nextProps.page !== _this.props.page) {
				_this.setState({ page: page });
			}
		}, _this.triggerOnChange = function (page, e) {
			var onChange = _this.props.onChange;


			if (onChange) {
				onChange(page, e);
			}
			return page;
		}, _this.first = function (e) {
			var _this$props = _this.props,
			    jumpAmount = _this$props.jumpAmount,
			    infinite = _this$props.infinite;


			_this.setState(function (prevState) {
				if (infinite || jumpAmount && prevState.page - jumpAmount > 0) {
					return {
						page: _this.triggerOnChange(prevState.page - jumpAmount, e)
					};
				} else if (prevState.page > 0) {
					return {
						page: _this.triggerOnChange(0, e)
					};
				}
				return {};
			});
		}, _this.back = function (e) {
			var _this$props2 = _this.props,
			    infinite = _this$props2.infinite,
			    _this$props2$skipAmou = _this$props2.skipAmount,
			    skipAmount = _this$props2$skipAmou === undefined ? 1 : _this$props2$skipAmou;


			_this.setState(function (prevState) {
				if (infinite || prevState.page - skipAmount >= 0) {
					return {
						page: _this.triggerOnChange(prevState.page - skipAmount, e)
					};
				}
				return {};
			});
		}, _this.next = function (e) {
			var _this$props3 = _this.props,
			    totalPages = _this$props3.totalPages,
			    infinite = _this$props3.infinite,
			    _this$props3$skipAmou = _this$props3.skipAmount,
			    skipAmount = _this$props3$skipAmou === undefined ? 1 : _this$props3$skipAmou;


			_this.setState(function (prevState) {
				if (infinite || prevState.page < totalPages - skipAmount) {
					return {
						page: _this.triggerOnChange(prevState.page + skipAmount, e)
					};
				}
				return {};
			});
		}, _this.last = function (e) {
			var _this$props4 = _this.props,
			    totalPages = _this$props4.totalPages,
			    jumpAmount = _this$props4.jumpAmount,
			    infinite = _this$props4.infinite;


			_this.setState(function (prevState) {
				if (infinite || jumpAmount && prevState.page + jumpAmount < totalPages - 1) {
					return {
						page: _this.triggerOnChange(prevState.page + jumpAmount, e)
					};
				} else if (prevState.page < totalPages - 1) {
					return {
						page: _this.triggerOnChange(totalPages - 1, e)
					};
				}
				return {};
			});
		}, _this.renderView = function () {
			var page = _this.state.page;
			var _this$props5 = _this.props,
			    totalPages = _this$props5.totalPages,
			    titles = _this$props5.titles;


			var title = titles ? titles(page) : page + 1 + ' of ' + totalPages;
			return _react2.default.createElement(
				StyledListItem,
				{ className: 'current' },
				title
			);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}
	// Starting page


	_createClass(Pager, [{
		key: 'render',
		value: function render() {
			var page = this.state.page;

			var _props = this.props,
			    totalPages = _props.totalPages,
			    showStep = _props.showStep,
			    showJump = _props.showJump,
			    infinite = _props.infinite,
			    className = _props.className,
			    props = _objectWithoutProperties(_props, ['totalPages', 'showStep', 'showJump', 'infinite', 'className']);

			var first = page === 0 && !infinite;
			var last = page === totalPages - 1 && !infinite;

			return _react2.default.createElement(
				'ul',
				_extends({}, props, { className: className + ' pager' }),
				showJump && _react2.default.createElement(
					'li',
					{ className: 'first ' + (first && 'disabled'), smallArrows: true },
					_react2.default.createElement(
						_IconButton2.default,
						{ onClick: this.first },
						'first_page'
					)
				),
				showStep && _react2.default.createElement(
					'li',
					{ className: 'back ' + (first && 'disabled'), smallArrows: true },
					_react2.default.createElement(
						_IconButton2.default,
						{ onClick: this.back },
						'chevron_left'
					)
				),
				this.renderView(),
				showStep && _react2.default.createElement(
					'li',
					{ className: 'next ' + (last && 'disabled'), smallArrows: true },
					_react2.default.createElement(
						_IconButton2.default,
						{ onClick: this.next },
						'chevron_right'
					)
				),
				showJump && _react2.default.createElement(
					'li',
					{ className: 'last ' + (last && 'disabled'), smallArrows: true },
					_react2.default.createElement(
						_IconButton2.default,
						{ onClick: this.last },
						'last_page'
					)
				)
			);
		}
	}]);

	return Pager;
}(_react.Component);

exports.default = Pager;


Pager.propTypes = {
	page: _propTypes2.default.number,
	totalPages: _propTypes2.default.number,
	infinite: _propTypes2.default.bool,
	onChange: _propTypes2.default.func,
	titles: _propTypes2.default.func,
	stepAmount: _propTypes2.default.number,
	jumpAmount: _propTypes2.default.number
};

Pager.defaultProps = {
	page: 0,
	infinite: false,
	stepAmount: 1,
	showStep: true,
	showJump: true
};