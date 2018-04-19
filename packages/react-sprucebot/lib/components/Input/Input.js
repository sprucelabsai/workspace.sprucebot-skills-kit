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

var _Typography = require('../Typography/Typography');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This input field has been deprecated
 * Use `InputField` instead
 */
var Input = function (_Component) {
	_inherits(Input, _Component);

	function Input(props) {
		_classCallCheck(this, Input);

		var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

		_this.state = {
			hasValue: !!(props.value || props.defaultValue)
		};
		console.warn('Deprecated Notice: react-sprucebot#Input will be removed in a future verison \n', 'Use {InputField|SelectField|TextArea} along with redux-form');
		return _this;
	}

	_createClass(Input, [{
		key: 'onChange',
		value: function onChange(e) {
			this.setState({
				hasValue: this.input.value.length > 0
			});
			if (this.props.onChange) {
				this.props.onChange(this.input.value, e);
			}
			if (this.props.multiline) {
				this.sizeTextarea();
			}
		}
	}, {
		key: 'sizeTextarea',
		value: function sizeTextarea() {
			var _this2 = this;

			if (typeof window !== 'undefined') {
				var style = window.getComputedStyle(this.input);
				var heightOffset = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

				// Fix when a textarea is not on document body and heightOffset is Not a Number
				if (isNaN(heightOffset)) {
					heightOffset = 0;
				}

				var height = style.height;
				this.input.style.transition = 'none';
				this.input.style.height = '1px';

				var scrollHeight = this.input.scrollHeight;
				this.input.style.height = height;

				if (this._sizeTimeout) {
					clearTimeout(this._sizeTimeout);
				}
				this._sizeTimeout = setTimeout(function () {
					if (_this2.input) {
						_this2.input.style.transition = _this2._textAreaTransition;
						_this2.input.style.height = scrollHeight + heightOffset + 'px';
					}
				}, 250);
			}
		}
	}, {
		key: 'handleMultiline',
		value: function handleMultiline(props) {
			if (props.multiline) {
				this._textAreaTransition = this.input.style.transition;
				this.sizeTextarea();
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.handleMultiline(this.props);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.handleMultiline(this.props);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var props = Object.assign({}, this.props);
			var error = props.error,
			    label = props.label,
			    finePrint = props.finePrint,
			    multiline = props.multiline;
			var tag = props.tag;

			var labelClass = label ? 'js-show-label' : '';

			delete props.error;
			delete props.label;
			delete props.onChange;
			delete props.finePrint;
			delete props.tag;
			delete props.multiline;

			// inputs cannot have children
			if (multiline) {
				tag = 'textarea';
			} else if (tag === 'input') {
				delete props.children;
			}

			// if this is an empty input, has a label, but no placeholder
			// make the placeholder match the label and hide the label
			if (tag === 'input' && label && !props.placeholder && !this.state.hasValue) {
				props.placeholder = label;
				labelClass = '';
			}

			var Tag = tag;

			return _react2.default.createElement(
				'div',
				{ className: 'input__wrapper' },
				label && _react2.default.createElement(
					'span',
					{ className: 'input__mini__label ' + labelClass },
					label
				),
				_react2.default.createElement(Tag, _extends({}, props, {
					onChange: this.onChange.bind(this),
					ref: function ref(_ref) {
						_this3.input = _ref;
					}
				})),
				error && _react2.default.createElement(
					'span',
					{ className: 'input__error error-is-visible' },
					error
				),
				finePrint && _react2.default.createElement(
					_Typography.Paragraph,
					{ fine: true },
					finePrint
				)
			);
		}
	}]);

	return Input;
}(_react.Component);

exports.default = Input;


Input.propTypes = {
	finePrint: _propTypes2.default.string,
	label: _propTypes2.default.string,
	error: _propTypes2.default.string,
	tag: _propTypes2.default.string,
	multiline: _propTypes2.default.bool
};

Input.defaultProps = {
	tag: 'input',
	multiline: false
};