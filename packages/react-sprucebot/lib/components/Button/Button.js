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

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _link = require('next/link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonWrapper = _styledComponents2.default.div.withConfig({
	displayName: 'Button__ButtonWrapper',
	componentId: 'bvtufj-0'
})(['display:flex;width:50%;', ';', ';'], function (props) {
	return props.left && 'padding-right: 1.125em;';
}, function (props) {
	return props.right && 'padding-left: 1.125em;';
});

var StyledButton = _styledComponents2.default.button.withConfig({
	displayName: 'Button__StyledButton',
	componentId: 'bvtufj-1'
})(['', ';'], function (props) {
	return props.busy || props.disabled && '\n\t\t\tpointer-events: none;\n\t\t\tcursor: not-allowed;\n\t\t';
});

var StyledAnchor = _styledComponents2.default.a.withConfig({
	displayName: 'Button__StyledAnchor',
	componentId: 'bvtufj-2'
})(['', ';'], function (props) {
	return props.busy || props.disabled && '\n\t\tpointer-events: none;\n\t\tcursor: not-allowed;\n\t';
});

// TODO refactor into styled component

var Button = function (_Component) {
	_inherits(Button, _Component);

	function Button(props) {
		_classCallCheck(this, Button);

		var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

		_this.onClick = function (e) {
			var busy = _this.state.busy;
			var _this$props = _this.props,
			    disabled = _this$props.disabled,
			    onClick = _this$props.onClick,
			    href = _this$props.href,
			    target = _this$props.target,
			    router = _this$props.router;


			if (busy || disabled) {
				return;
			}

			if (onClick) {
				onClick(e);
			} else if (href) {
				_this.setState({ busy: true });
			}
		};

		_this.renderView = function () {
			var busy = _this.state.busy;
			var _this$props2 = _this.props,
			    hideLoader = _this$props2.hideLoader,
			    loaderDark = _this$props2.loaderDark,
			    loaderStyle = _this$props2.loaderStyle,
			    children = _this$props2.children;


			if (busy && !hideLoader) {
				return _react2.default.createElement(_Loader2.default, {
					dark: loaderDark ? true : false,
					fullWidth: false,
					loaderStyle: loaderStyle
				});
			}
			return children;
		};

		_this.state = {
			busy: !!props.busy
		};
		return _this;
	}

	_createClass(Button, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (typeof nextProps.busy !== 'undefined') {
				this.setState({
					busy: nextProps.busy
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    tag = _props.tag,
			    disabled = _props.disabled,
			    primary = _props.primary,
			    secondary = _props.secondary,
			    alt = _props.alt,
			    link = _props.link,
			    caution = _props.caution,
			    className = _props.className,
			    children = _props.children,
			    submit = _props.submit,
			    remove = _props.remove,
			    toggle = _props.toggle,
			    router = _props.router,
			    loaderDark = _props.loaderDark,
			    loaderStyle = _props.loaderStyle,
			    propBusy = _props.busy,
			    hideLoader = _props.hideLoader,
			    left = _props.left,
			    right = _props.right,
			    props = _objectWithoutProperties(_props, ['tag', 'disabled', 'primary', 'secondary', 'alt', 'link', 'caution', 'className', 'children', 'submit', 'remove', 'toggle', 'router', 'loaderDark', 'loaderStyle', 'busy', 'hideLoader', 'left', 'right']);

			var busy = this.state.busy;


			if (primary && secondary) {
				return _react2.default.createElement(
					'button',
					{ className: 'btn__primary' },
					'\'primary\' and \'secondary\' are mutually exclusive.'
				);
			} else if (primary && alt) {
				return _react2.default.createElement(
					'button',
					{ className: 'btn__primary' },
					'\'primary\' and \'alt\' are mutually exclusive.'
				);
			}

			var btnClass = primary ? 'btn__primary' : '';
			btnClass += secondary ? 'btn__secondary' : '';
			btnClass += alt && btnClass.length > 0 ? '__alt' : '';
			btnClass += alt && btnClass.length === 0 ? 'btn__alt' : '';
			btnClass += disabled ? ' btn__disabled' : '';
			btnClass += caution ? ' btn__caution' : '';
			btnClass += link ? ' btn__link' : '';
			btnClass += toggle ? 'btn__toggle' : '';

			if (remove) {
				btnClass = 'btn__remove';
			}

			// if this button has a href or is a "remove" button, make it an anchor
			var Tag = void 0;
			var usingLink = false;

			if (props.href || remove) {
				Tag = _link2.default;
				usingLink = true;
			} else if (tag === 'button') {
				Tag = StyledButton;
			} else {
				Tag = tag;
			}

			return _react2.default.createElement(
				Tag,
				_extends({
					className: 'btn ' + btnClass + ' ' + (className || ''),
					onClick: this.onClick,
					disabled: disabled,
					busy: busy
				}, props),
				usingLink && _react2.default.createElement(
					'a',
					{ className: 'btn ' + btnClass + ' ' + (className || '') },
					_react2.default.createElement(
						'span',
						{ className: 'wrapper' },
						this.renderView()
					)
				),
				!usingLink && _react2.default.createElement(
					'span',
					{ className: 'wrapper' },
					this.renderView()
				)
			);
		}
	}]);

	return Button;
}(_react.Component);

exports.default = Button;


Button.propTypes = {
	tag: _propTypes2.default.string,
	primary: _propTypes2.default.bool,
	alt: _propTypes2.default.bool,
	secondary: _propTypes2.default.bool,
	busy: _propTypes2.default.bool,
	href: _propTypes2.default.string,
	remove: _propTypes2.default.bool,
	toggle: _propTypes2.default.bool,
	hideLoader: _propTypes2.default.bool,
	left: _propTypes2.default.bool,
	right: _propTypes2.default.bool,
	type: _propTypes2.default.string
};

Button.defaultProps = {
	tag: 'button',
	primary: false,
	alt: false,
	secondary: false,
	busy: false,
	remove: false,
	toggle: false,
	type: 'button'
};