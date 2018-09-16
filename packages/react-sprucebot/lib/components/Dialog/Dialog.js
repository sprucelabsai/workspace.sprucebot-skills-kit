'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../../skillskit/index');

var _index2 = _interopRequireDefault(_index);

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
var dialogVerticalPadding = 30;

var timerRunning = false;

var Dialog = function (_Component) {
	_inherits(Dialog, _Component);

	function Dialog(props) {
		_classCallCheck(this, Dialog);

		//for callbacks
		var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

		_this.dialogHeight = 0;

		_this.setIdx = function (idx) {
			_this.setState({ dialogIndex: idx });
		};

		_this.updateIndexes = function () {
			var index = currentDialogs.length;
			currentDialogs.forEach(function (dialog, idx) {
				if (idx < index - 1) {
					dialog.blur();
				}
				dialog.setIdx(index - idx);
			});
		};

		_this.handleTapClose = function () {
			// because dialogs are shown/hidden by being conditionally rendered, we actually have no way of knowing how we should close unless someone tells us
			if (_this.props.onTapClose) {
				_this.closeDialog();
				_this.setState({ focusClass: 'closed', opacity: 0 }, function () {
					if (_this.props.onTapClose) {
						setTimeout(function () {
							_this.props.onTapClose();
						}, 500);
					}
				});
			}
		};

		_this.iframeMessageHandler = _this.iframeMessageHandler.bind(_this);

		_this.state = {
			focusClass: '',
			isHidden: true,
			scrollTop: 0,
			firstShow: true,
			opacity: 0,
			inIframe: true,
			dialogIndex: 0
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
						setTimeout(function () {
							_this3.postHeight();
						}, 500);
					});
				}, 10);
			});
		}
	}, {
		key: 'postHeight',
		value: function postHeight() {
			var height = 0;

			currentDialogs.forEach(function (dialog) {
				var node = _reactDom2.default.findDOMNode(dialog.dialogNode);
				var styles = window.getComputedStyle(node);
				var margin = parseFloat(styles['marginTop']);

				var dialogHeight = Math.ceil(node.offsetHeight + margin);
				height = Math.max(dialogHeight, height);
			});

			if (currentDialogs.length > 0) {
				_skillskit2.default.setMinBodyHeight(height);
			}
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (typeof document !== 'undefined' && !dialogUnderlay) {
				dialogUnderlay = document.createElement('div');
				dialogUnderlay.className = 'dialog_underlay';
				dialogUnderlay.classList.add('hidden');
				document.body.appendChild(dialogUnderlay);
			}
			if (dialogUnderlay) {
				dialogUnderlay.classList.add('on');
				setTimeout(function () {
					dialogUnderlay.classList.remove('hidden');
				}, 10);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('message', this.iframeMessageHandler);
			if (this.state.firstShow) {
				this.requestScroll();
			}

			this.focus();
			currentDialogs.push(this);
			this.updateIndexes();
			_skillskit2.default.showUnderlay();

			if (!timerRunning) {
				timerRunning = true;
				this.heightInterval = setInterval(function () {
					if (currentDialogs[0]) {
						currentDialogs[0].postHeight();
					}
				}, 300);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			// in case our starting state is not showing
			if (this.state.firstShow) {
				this.requestScroll();
			}

			if (!this.state.inIframe) {
				dialogUnderlay.classList.add('not_in_iframe');
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.body.style.minHeight = 'auto';
			window.removeEventListener('message', this.iframeMessageHandler);
			this.closeDialog();

			if (this.heightInterval) {
				clearInterval(this.heightInterval);
				timerRunning = false;
			}
		}
	}, {
		key: 'requestScroll',
		value: function requestScroll() {
			// we are not in the sb iframe
			if (window.top === window.self) {
				this.setState({
					opacity: 1,
					scrollTop: window.document.body.scrollTop,
					firstShow: false,
					inIframe: false
				});
			} else {
				_skillskit2.default.requestScroll();
			}
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
		key: 'closeDialog',
		value: function closeDialog() {
			if (this.state.focusClass !== 'closed') {
				currentDialogs.pop();
				if (currentDialogs.length - 1 >= 0) {
					var nextDialog = currentDialogs[currentDialogs.length - 1];
					nextDialog.focus();
					var node = _reactDom2.default.findDOMNode(this.dialogNode);
					_skillskit2.default.scrollTo(node.offsetTop - dialogVerticalPadding);
				} else {
					dialogUnderlay.classList.add('hidden');
					_skillskit2.default.hideUnderlay();
					setTimeout(function () {
						_skillskit2.default.clearMinBodyHeight();
						dialogUnderlay.classList.remove('on');
					}, 300);
				}

				this.updateIndexes();
			} else {
				this.postHeight();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props,
			    tag = _props.tag,
			    children = _props.children,
			    className = _props.className,
			    title = _props.title,
			    onTapClose = _props.onTapClose,
			    props = _objectWithoutProperties(_props, ['tag', 'children', 'className', 'title', 'onTapClose']);

			var _state = this.state,
			    opacity = _state.opacity,
			    height = _state.height,
			    inIframe = _state.inIframe,
			    focusClass = _state.focusClass,
			    isHidden = _state.isHidden,
			    firstShow = _state.firstShow,
			    dialogIndex = _state.dialogIndex;


			var Tag = tag;
			var dialogStyle = {
				marginTop: this.state.scrollTop + dialogVerticalPadding
			};

			var hasHeader = true; // always have a header, just won't show close/title if not supplied

			return typeof document !== 'undefined' && _reactDom2.default.createPortal(_react2.default.createElement(
				'div',
				{
					className: 'dialog__wrapper ' + focusClass + ' ' + (!firstShow ? 'was-focused' : '') + ' ' + (isHidden ? 'hidden' : '') + ' dialog-' + dialogIndex,
					onClick: function onClick(e) {
						if (e.target.className.search('dialog__wrapper') > -1 && currentDialogs.length - 1 >= 0) {
							currentDialogs[currentDialogs.length - 1].handleTapClose();
						}
					}
				},
				_react2.default.createElement(
					'div',
					_extends({
						ref: function ref(node) {
							return _this4.dialogNode = node;
						},
						className: 'dialog ' + (className || '') + ' ' + (hasHeader ? 'has_header' : ''),
						style: dialogStyle,
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
								onClick: this.handleTapClose
							},
							'close'
						)
					),
					children
				)
			), dialogUnderlay);
		}
	}]);

	return Dialog;
}(_react.Component);

exports.default = Dialog;


Dialog.propTypes = {
	tag: _propTypes2.default.string,
	onTapClose: _propTypes2.default.func,
	title: _propTypes2.default.string
};

Dialog.defaultProps = {
	tag: 'div'
};