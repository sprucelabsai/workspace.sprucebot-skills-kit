'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var StyledButton = (0, _styledComponents2.default)(_Button2.default).withConfig({
	displayName: 'IconButton__StyledButton',
	componentId: 'mdoqrl-0'
})(['align-items:center;background:none;color:#00aac7;display:flex;font-size:', ';margin:0;padding:0;text-decoration:none;width:auto;&:hover{background:none;}'], function (props) {
	return props.fontSize ? '' + props.fontSize : '2em';
});

var IconButton = function IconButton(_ref) {
	var children = _ref.children,
	    className = _ref.className,
	    loaderStyle = _ref.loaderStyle,
	    props = _objectWithoutProperties(_ref, ['children', 'className', 'loaderStyle']);

	return _react2.default.createElement(
		StyledButton,
		_extends({
			loaderDark: true,
			loaderStyle: _extends({
				fontSize: '.5em'
			}, loaderStyle)
		}, props, {
			className: 'IconButton icon-button ' + (className || '')
		}),
		_react2.default.createElement(
			_Icon2.default,
			{ fontSize: props.fontSize },
			children
		)
	);
};

IconButton.propTypes = {
	onClick: _propTypes2.default.func,
	children: _propTypes2.default.any
};

exports.default = IconButton;