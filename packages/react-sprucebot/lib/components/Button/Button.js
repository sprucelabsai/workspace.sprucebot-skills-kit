'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO refactor into styled component
var Button = function (_Component) {
	_inherits(Button, _Component);

	function Button(props) {
		_classCallCheck(this, Button);

		var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

		_this.onClick = function (e) {
			if (_this.props.onClick) {
				_this.props.onClick(e);
			} else if (_this.props.href) {
				e.preventDefault();
				_this.setState({ busy: true });
				var url = _this.props.href;
				if (/^http/.test(url)) {
					// If the href is a full domain name
					if (_this.props.target) {
						window.open(url, _this.props.target);
					} else {
						window.open(url, '_self');
					}
				} else {
					// Relative url
					if (_this.props.target) {
						window.open(url, _this.props.target);
					} else if (_this.props.router) {
						_this.props.router.push(url);
					} else {
						window.open(url, '_self');
					}
				}

				// Reset the state to not-busy if it's been 2 sec
				setTimeout(function () {
					_this.setState({ busy: false });
				}, 2000);
			}
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
			    props = _objectWithoutProperties(_props, ['tag', 'disabled', 'primary', 'secondary', 'alt', 'link', 'caution', 'className', 'children', 'submit', 'remove', 'toggle', 'router', 'loaderDark', 'loaderStyle', 'busy', 'hideLoader']);

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
			} else if (!btnClass) {
				btnClass = 'btn';
			}

			// if this button has a href or is a "remove" button, make it an anchor
			var Tag = props.href || remove ? 'a' : tag;

			return _react2.default.createElement(
				Tag,
				_extends({
					className: btnClass + ' ' + (className || ''),
					onClick: this.onClick
				}, props),
				busy && !hideLoader ? _react2.default.createElement(_Loader2.default, {
					dark: loaderDark ? true : false,
					fullWidth: false,
					loaderStyle: loaderStyle
				}) : children
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