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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../../skillskit/index');

var _index2 = _interopRequireDefault(_index);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _IconButton = require('../IconButton/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Typography = require('../Typography/Typography');

var _skillskit = require('../../skillskit');

var _skillskit2 = _interopRequireDefault(_skillskit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dialogUnderlay = null;
var currentDialogs = [];

var DialogWrapper = _styledComponents2.default.div.attrs({
	className: function className(_ref) {
		var show = _ref.show,
		    _className = _ref.className;
		return 'dialog__wrapper ' + _className;
	}
}).withConfig({
	displayName: 'Dialog__DialogWrapper',
	componentId: 'q9geqg-0'
})(['opacity:', ';'], function (props) {
	return props.opacity;
});

var DialogContainer = _styledComponents2.default.div.attrs({
	className: function className(_ref2) {
		var show = _ref2.show,
		    _className2 = _ref2.className;
		return 'dialog ' + _className2;
	}
}).withConfig({
	displayName: 'Dialog__DialogContainer',
	componentId: 'q9geqg-1'
})(['opacity:', ';'], function (props) {
	return props.opacity;
});
var DialogCloseButton = (0, _styledComponents2.default)(_Button2.default).attrs({
	className: 'btn__close_dialog',
	remove: true
}).withConfig({
	displayName: 'Dialog__DialogCloseButton',
	componentId: 'q9geqg-2'
})(['']);

var Dialog = function (_Component) {
	_inherits(Dialog, _Component);

	function Dialog(props) {
		_classCallCheck(this, Dialog);

		//for callbacks
		var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

		_this.iframeMessageHandler = _this.iframeMessageHandler.bind(_this);

		_this.state = {
			focusClass: '',
			isHidden: true,
			width: -1,
			height: 500,
			scrollTop: 0,
			firstShow: true,
			opacity: 0,
			inIframe: true
		};
		return _this;
	}

	_createClass(Dialog, [{
		key: 'blur',
		value: function blur() {
			var _this2 = this;

			this.setState({ focusClass: 'blurred' }, function () {
				setTimeout(function () {
					_this2.setState({ isHidden: true });
				}, 500);
			});
		}
	}, {
		key: 'focus',
		value: function focus() {
			var _this3 = this;

			this.setState({ isHidden: false }, function () {
				setTimeout(function () {
					_this3.setState({ focusClass: 'focused' }, function () {
						// Resize the skill
						_this3.postHeight();
					});
				}, 100);
			});
		}
	}, {
		key: 'setSize',
		value: function setSize(_ref3) {
			var width = _ref3.width,
			    height = _ref3.height;

			this.setState({ width: width, height: height });
			this.postHeight();
		}
	}, {
		key: 'postHeight',
		value: function postHeight() {
			var underlayHeight = dialogUnderlay ? dialogUnderlay.offsetHeight : 0;

			//min height on body
			document.body.style.minHeight = underlayHeight + 'px';
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (typeof document !== 'undefined' && !dialogUnderlay) {
				dialogUnderlay = document.createElement('div');
				dialogUnderlay.className = 'dialog_underlay';
				document.body.appendChild(dialogUnderlay);
			}
			dialogUnderlay.classList.add('on');
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('message', this.iframeMessageHandler);
			if (this.props.show && this.state.firstShow) {
				this.requestScroll();
			}

			currentDialogs.forEach(function (dialog) {
				return dialog.blur();
			});
			this.focus();
			currentDialogs.push(this);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			// in case our starting state is not showing
			if (this.props.show && this.state.firstShow) {
				this.requestScroll();
			}

			if (!this.state.inIframe) {
				dialogUnderlay.classList.add('not_in_iframe');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// if we are being show, set opacity and request scroll
			if (!this.props.show && nextProps.show) {
				this.setState({ firstShow: true, opacity: 0 });
				this.requestScroll();
			}

			if (this.props.show && !nextProps.show) {
				document.body.style.minHeight = 'auto';
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.body.style.minHeight = 'auto';
			window.removeEventListener('message', this.iframeMessageHandler);
			currentDialogs.pop();
			if (currentDialogs.length - 1 >= 0) {
				currentDialogs[currentDialogs.length - 1].focus();
			} else {
				dialogUnderlay.classList.remove('on');
			}
		}
	}, {
		key: 'requestScroll',
		value: function requestScroll() {
			var _this4 = this;

			_skillskit2.default.requestScroll();
			setTimeout(function () {
				// we are not in the sb iframe
				if (_this4.state.opacity === 0) {
					_this4.setState({
						opacity: 1,
						scrollTop: window.document.body.scrollTop,
						firstShow: false,
						inIframe: false
					});
				}
			}, 250);
		}
	}, {
		key: 'iframeMessageHandler',
		value: function iframeMessageHandler(e) {
			try {
				var results = JSON.parse(e.data);
				if (this.state.firstShow && results.name === 'SkillContainer:ScrollTop') {
					var top = results.skillScrollTop < 0 ? Math.abs(results.skillScrollTop) : 0;
					this.setState({
						scrollTop: top,
						firstShow: false,
						opacity: 1
					});
				}
			} catch (err) {}
		}
	}, {
		key: 'onTapClose',
		value: function onTapClose() {
			var _this5 = this;

			this.setState({ focusClass: '' });
			this.postHeight();
			if (this.props.onTapClose) {
				setTimeout(function () {
					_this5.props.onTapClose();
				}, 600);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var _props = this.props,
			    tag = _props.tag,
			    children = _props.children,
			    className = _props.className,
			    title = _props.title,
			    onTapClose = _props.onTapClose,
			    show = _props.show,
			    props = _objectWithoutProperties(_props, ['tag', 'children', 'className', 'title', 'onTapClose', 'show']);

			var _state = this.state,
			    opacity = _state.opacity,
			    height = _state.height,
			    inIframe = _state.inIframe,
			    focusClass = _state.focusClass,
			    isHidden = _state.isHidden,
			    firstShow = _state.firstShow;

			var Tag = tag;
			var dialogStyle = {
				marginTop: this.state.scrollTop
			};

			if (!show) {
				return null;
			}

			var hasHeader = onTapClose || title;

			return typeof document !== 'undefined' && _reactDom2.default.createPortal(_react2.default.createElement(
				_reactMeasure2.default,
				{
					scroll: true,
					onResize: function onResize(contentRect) {
						_this6.setSize({
							width: contentRect.scroll.width,
							height: contentRect.scroll.height
						});
					}
				},
				function (_ref4) {
					var measureRef = _ref4.measureRef;
					return _react2.default.createElement(
						DialogWrapper,
						{
							className: focusClass + ' ' + (!firstShow ? 'was-focused' : '') + ' ' + (isHidden ? 'hidden' : ''),
							show: show,
							style: dialogStyle,
							onClick: function onClick(e) {
								if (e.target.className.search('dialog__wrapper') > -1 && currentDialogs.length - 1 >= 0) {
									currentDialogs[currentDialogs.length - 1].onTapClose();
								}
							}
						},
						_react2.default.createElement(
							DialogContainer,
							_extends({
								innerRef: measureRef,
								className: (className || '') + ' ' + (hasHeader ? 'has_header' : ''),
								show: show,
								opacity: opacity
							}, props),
							hasHeader && _react2.default.createElement(
								'div',
								{ className: 'dialog__header' },
								title && _react2.default.createElement(
									_Typography.H2,
									null,
									title
								),
								onTapClose && _react2.default.createElement(
									_IconButton2.default,
									{
										className: 'btn__close_dialog',
										onClick: _this6.onTapClose.bind(_this6)
									},
									'close'
								)
							),
							children
						)
					);
				}
			), dialogUnderlay);
		}
	}]);

	return Dialog;
}(_react.Component);

exports.default = Dialog;


Dialog.propTypes = {
	tag: _propTypes2.default.string,
	show: _propTypes2.default.bool,
	onTapClose: _propTypes2.default.func,
	title: _propTypes2.default.string
};

Dialog.defaultProps = {
	tag: 'div',
	show: true
};