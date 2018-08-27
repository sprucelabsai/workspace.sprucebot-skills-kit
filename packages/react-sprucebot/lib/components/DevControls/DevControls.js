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

var _Select = require('../Select/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DevControls = function (_Component) {
	_inherits(DevControls, _Component);

	function DevControls(props) {
		_classCallCheck(this, DevControls);

		var _this = _possibleConstructorReturn(this, (DevControls.__proto__ || Object.getPrototypeOf(DevControls)).call(this, props));

		_this.onChangeRole = function (role) {
			window.location.href = '/dev/' + role + '/redirect';
		};

		_this.state = {
			loaded: false
		};
		return _this;
	}

	_createClass(DevControls, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({
				loaded: true
			});
		}
	}, {
		key: 'render',
		value: function render() {
			// don't render until loaded
			if (!this.state.loaded) {
				return null;
			}

			var className = this.props.className;

			var props = Object.assign({}, this.props);
			var auth = props.auth;

			// cleanup props

			delete props.auth;

			//easy bail if not auth'ed
			if (!auth || auth.error || !auth.role) {
				return _react2.default.createElement(
					'div',
					_extends({}, props, { className: 'dev_controls__no_auth ' + (className || '') }),
					_react2.default.createElement(
						'div',
						{ className: 'error' },
						'You\'re gonna wanna be logged in for this. \uD83D\uDE4F'
					)
				);
			}

			return _react2.default.createElement(
				'div',
				_extends({}, props, { className: 'dev_controls ' + (className || '') }),
				_react2.default.createElement(
					_Select2.default,
					{
						className: 'select',
						label: 'Jump to Role',
						onChange: this.onChangeRole
					},
					_react2.default.createElement(
						'option',
						{ value: '' },
						'Current: ' + auth.role
					),
					_react2.default.createElement(
						'option',
						{ value: 'owner' },
						'Owner'
					),
					_react2.default.createElement(
						'option',
						{ value: 'teammate' },
						'Teammate'
					),
					_react2.default.createElement(
						'option',
						{ value: 'guest' },
						'Guest'
					)
				)
			);
		}
	}]);

	return DevControls;
}(_react.Component);

DevControls.propTypes = {
	auth: _propTypes2.default.object
};

exports.default = DevControls;