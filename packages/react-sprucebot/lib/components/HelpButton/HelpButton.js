'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('../IconButton/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HelpButton = function (_Component) {
	_inherits(HelpButton, _Component);

	function HelpButton() {
		_classCallCheck(this, HelpButton);

		return _possibleConstructorReturn(this, (HelpButton.__proto__ || Object.getPrototypeOf(HelpButton)).apply(this, arguments));
	}

	_createClass(HelpButton, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    title = _props.title,
			    _props$body = _props.body,
			    body = _props$body === undefined ? '' : _props$body;

			return React.createElement(
				_IconButton2.default,
				{
					onClick: function onClick() {
						_this2.props.skill.showHelp({
							title: title,
							body: body
						});
					}
				},
				'help'
			);
		}
	}]);

	return HelpButton;
}(_react.Component);

exports.default = HelpButton;


HelpButton.propTypes = {
	title: _propTypes2.default.string.isRequired,
	body: _propTypes2.default.string
};