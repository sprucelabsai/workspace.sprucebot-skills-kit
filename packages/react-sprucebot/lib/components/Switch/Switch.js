'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = function (_Component) {
	_inherits(Switch, _Component);

	function Switch(props) {
		_classCallCheck(this, Switch);

		var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

		_this.state = {
			on: !!props.on
		};

		_this.onChange = _this.onChange.bind(_this);
		return _this;
	}

	_createClass(Switch, [{
		key: 'onChange',
		value: function onChange(e) {
			var _this2 = this;

			// toggle on state of button
			this.setState(function (prevState, props) {
				// new 'on' state
				var on = !prevState.on;

				// let any callbacks know of state change
				if (_this2.props.onChange) {
					_this2.props.onChange(on, e);
				}

				return {
					on: on
				};
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({ on: nextProps.on });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'switch switch' + (this.props.on ? ' on' : '') },
				_react2.default.createElement(
					'button',
					{ onClick: function onClick() {
							return _this3.onChange();
						} },
					_react2.default.createElement(
						'span',
						null,
						this.props.on ? 'Enabled' : 'Disabled'
					)
				)
			);
		}
	}]);

	return Switch;
}(_react.Component);

exports.default = Switch;


Switch.propTypes = {
	on: _propTypes2.default.bool,
	onChange: _propTypes2.default.func
};

Switch.defaultProps = {
	on: false
};