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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Avatar = function (_Component) {
	_inherits(Avatar, _Component);

	function Avatar() {
		_classCallCheck(this, Avatar);

		return _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).apply(this, arguments));
	}

	_createClass(Avatar, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    top = _props.top,
			    online = _props.online,
			    image = _props.image,
			    user = _props.user,
			    props = _objectWithoutProperties(_props, ['className', 'top', 'online', 'image', 'user']);

			var style = {};
			var isOnline = online;

			//passed an image
			if (typeof image === 'string' && image) {
				style.backgroundImage = 'url(\'' + image + '\')';
			} else if (user && user.User && user.User.profileImages && user.User.profileImages.profile150) {
				style.backgroundImage = 'url(' + user.User.profileImages.profile150 + ')';
				isOnline = user.status === 'online';
			}

			return _react2.default.createElement('div', _extends({
				style: style,
				className: (top ? 'top__avatar' : 'avatar__wrapper') + ' ' + (className || '') + ' ' + (isOnline ? 'online' : '')
			}, props));
		}
	}]);

	return Avatar;
}(_react.Component);

exports.default = Avatar;


Avatar.propTypes = {
	top: _propTypes2.default.bool,
	user: _propTypes2.default.object, //pass this or everything belowe
	image: _propTypes2.default.string,
	showOnlineIndicator: _propTypes2.default.bool,
	online: _propTypes2.default.bool
};

Avatar.defaultProps = {
	top: false,
	showOnlineIndicator: true
};