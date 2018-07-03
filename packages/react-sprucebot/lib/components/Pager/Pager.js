'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyledList = _styledComponents2.default.ul.withConfig({
	displayName: 'Pager__StyledList',
	componentId: 'uh9gqt-0'
})(['display:flex;align-items:center;', ';'], function (props) {
	return props.margin && 'margin: ' + props.margin;
});

var StyledListItem = _styledComponents2.default.li.withConfig({
	displayName: 'Pager__StyledListItem',
	componentId: 'uh9gqt-1'
})(['&&{', ';', ';', ';}'], function (props) {
	return props.smallArrows && 'flex: 0.5';
}, function (props) {
	return props.hide && 'display: none';
}, function (props) {
	return props.loading && '\n\t\t\t\tpointer-events: none;\n\t\t\t\tcursor: not-allowed;\n\t\t\t';
});

var DropDownButton = (0, _styledComponents2.default)(_ControlButton2.default).withConfig({
	displayName: 'Pager__DropDownButton',
	componentId: 'uh9gqt-2'
})(['margin-left:0.7em;']);

var StyledLoader = (0, _styledComponents2.default)(_Loader2.default).withConfig({
	displayName: 'Pager__StyledLoader',
	componentId: 'uh9gqt-3'
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
		}, _this.componentDidUpdate = function (prevProps) {
			var updatePage = prevProps.updatePage,
			    backToStart = prevProps.backToStart;


			if (updatePage) {
				_this.updatePageNumber();
			}

			if (backToStart) {
				_this.backToStart();
			}
		}, _this.triggerOnChange = function (page, e) {
			var onChange = _this.props.onChange;


			if (onChange) {
				onChange(page, e);
			}
			return page;
		}, _this.first = function (e) {
			var skipAmount = _this.props.skipAmount;


			_this.setState(function (prevState) {
				if (skipAmount && prevState.page - skipAmount > 0) {
					return {
						page: _this.triggerOnChange(prevState.page - skipAmount, e)
					};
				} else if (prevState.page > 0) {
					return {
						page: _this.triggerOnChange(0, e)
					};
				}
				return {};
			});
		}, _this.back = function (e) {
			_this.setState(function (prevState) {
				if (prevState.page > 0) {
					return {
						page: _this.triggerOnChange(prevState.page - 1, e)
					};
				}
				return {};
			});
		}, _this.next = function (e) {
			var totalPages = _this.props.totalPages;


			_this.setState(function (prevState) {
				if (prevState.page < totalPages - 1) {
					return {
						page: _this.triggerOnChange(prevState.page + 1, e)
					};
				}
				return {};
			});
		}, _this.last = function (e) {
			var _this$props = _this.props,
			    totalPages = _this$props.totalPages,
			    skipAmount = _this$props.skipAmount;


			_this.setState(function (prevState) {
				if (skipAmount && prevState.page + skipAmount < totalPages - 1) {
					return {
						page: _this.triggerOnChange(prevState.page + skipAmount, e)
					};
				} else if (prevState.page < totalPages - 1) {
					return {
						page: _this.triggerOnChange(totalPages - 1, e)
					};
				}
				return {};
			});
		}, _this.updatePageNumber = function (e) {
			var updateAmount = _this.props.updateAmount;


			if (updateAmount) {
				_this.setState(function (prevState) {
					return {
						page: _this.triggerOnChange(prevState.page + updateAmount, e)
					};
				});
			}
		}, _this.backToStart = function (e) {
			var initialPage = _this.props.initialPage;


			if (initialPage) {
				_this.setState({ page: _this.triggerOnChange(initialPage, e) });
			}
		}, _this.renderView = function () {
			var page = _this.state.page;
			var _this$props2 = _this.props,
			    totalPages = _this$props2.totalPages,
			    loading = _this$props2.loading,
			    loadingText = _this$props2.loadingText,
			    showLoader = _this$props2.showLoader,
			    hasButton = _this$props2.hasButton,
			    buttonClick = _this$props2.buttonClick,
			    titles = _this$props2.titles;

			var title = titles ? titles(page) : page + 1 + ' of ' + totalPages;

			if (loading && showLoader) {
				return _react2.default.createElement(StyledLoader, { fullWidth: false, margin: '7px 0', flex: true });
			} else if (loading && loadingText) {
				return _react2.default.createElement(
					StyledListItem,
					{ className: 'current' },
					loadingText
				);
			} else if (hasButton && buttonClick) {
				return _react2.default.createElement(
					StyledListItem,
					{ className: 'current' },
					_react2.default.createElement(
						DropDownButton,
						{ iconRight: hasButton, onClick: buttonClick },
						title
					)
				);
			} else {
				return _react2.default.createElement(
					StyledListItem,
					{ className: 'current' },
					'title'
				);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}
	// Starting page


	_createClass(Pager, [{
		key: 'render',
		value: function render() {
			var page = this.state.page;
			var _props = this.props,
			    totalPages = _props.totalPages,
			    margin = _props.margin,
			    hideSingleArrows = _props.hideSingleArrows,
			    hideDoubleArrows = _props.hideDoubleArrows,
			    loading = _props.loading;


			var first = page === 0;
			var last = page === totalPages - 1;

			return _react2.default.createElement(
				StyledList,
				{ className: 'pager', margin: margin },
				_react2.default.createElement(
					StyledListItem,
					{
						loading: loading,
						className: 'first ' + (first && 'disabled'),
						onClick: this.first,
						smallArrows: true,
						hide: hideDoubleArrows
					},
					_react2.default.createElement(
						'a',
						null,
						'First'
					)
				),
				_react2.default.createElement(
					StyledListItem,
					{
						loading: loading,
						className: 'back ' + (first && 'disabled'),
						onClick: this.back,
						smallArrows: true,
						hide: hideSingleArrows
					},
					_react2.default.createElement(
						'a',
						null,
						'Back'
					)
				),
				this.renderView(),
				_react2.default.createElement(
					StyledListItem,
					{
						loading: loading,
						className: 'next ' + (last && 'disabled'),
						onClick: this.next,
						smallArrows: true,
						hide: hideSingleArrows
					},
					_react2.default.createElement(
						'a',
						null,
						'Next'
					)
				),
				_react2.default.createElement(
					StyledListItem,
					{
						loading: loading,
						className: 'last ' + (last && 'disabled'),
						onClick: this.last,
						smallArrows: true,
						hide: hideDoubleArrows
					},
					_react2.default.createElement(
						'a',
						null,
						'Last'
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
	totalPages: _propTypes2.default.number.isRequired,
	onChange: _propTypes2.default.func,
	titles: _propTypes2.default.func
};

Pager.defaultProps = {
	page: 0
};