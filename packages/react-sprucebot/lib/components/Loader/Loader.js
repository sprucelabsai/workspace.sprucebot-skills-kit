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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoaderWrapper = _styledComponents2.default.span.attrs({
	className: 'loader_wrapper'
}).withConfig({
	displayName: 'Loader__LoaderWrapper',
	componentId: 's1sl4f0-0'
})(['display:block;margin:20px;text-align:center;', ';', ';', ';'], function (props) {
	return props.fullWidth === false && 'margin: unset';
}, function (props) {
	return props.fullWidth === false && props.margin && 'margin: ' + props.margin;
}, function (props) {
	return props.flex && '\n\t\t\tflex: 2;\n\t\t\tdisplay: flex;\n\t\t\talign-self: center;\n\t\t\talign-items: center;\n\t\t\tjustify-content: center;\n\t\t';
});

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
			    margin = _props.margin,
			    flex = _props.flex,
			    loaderStyle = _props.loaderStyle;

			var dotClassName = dark ? 'loader_dot_dark' : 'loader_dot';

			return _react2.default.createElement(
				LoaderWrapper,
				{
					style: loaderStyle,
					fullWidth: fullWidth,
					margin: margin,
					flex: flex
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
	margin: _propTypes2.default.string,
	flex: _propTypes2.default.bool,
	loaderStyle: _propTypes2.default.object
};

Loader.defaultProps = {
	dark: true,
	fullWidth: true,
	loaderStyle: {}
};