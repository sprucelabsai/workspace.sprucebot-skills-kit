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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_Component) {
	_inherits(Loader, _Component);

	function Loader() {
		_classCallCheck(this, Loader);

		return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).apply(this, arguments));
	}

	_createClass(Loader, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    dark = _props.dark,
			    fullWidth = _props.fullWidth,
			    margin = _props.margin;

			var dotClassName = dark ? 'loader_dot_dark' : 'loader_dot';
			var fullWidthStyle = fullWidth ? { display: 'block', margin: '20px', textAlign: 'center' } : { margin: margin ? '' + margin : 'unset' };

			return _react2.default.createElement(
				'span',
				{
					className: 'loader_wrapper',
					style: _extends({}, fullWidthStyle, this.props.loaderStyle)
				},
				_react2.default.createElement('span', { className: dotClassName }),
				_react2.default.createElement('span', { className: dotClassName }),
				_react2.default.createElement('span', { className: dotClassName })
			);
		}
	}]);

	return Loader;
}(_react.Component);

exports.default = Loader;


Loader.propTypes = {
	dark: _propTypes2.default.bool,
	fullWidth: _propTypes2.default.bool,
	loaderStyle: _propTypes2.default.object
};

Loader.defaultProps = {
	dark: true,
	fullWidth: true,
	loaderStyle: {}
};