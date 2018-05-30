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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Button = _styledComponents2.default.button.attrs({
	className: function className(_ref) {
		var _className = _ref.className;
		return 'IconButton icon-button ' + (_className || '');
	}
}).withConfig({
	displayName: 'IconButton__Button',
	componentId: 'mdoqrl-0'
})(['align-items:center;background:none;color:#00aac7;display:flex;font-size:', ';margin:0;padding:0;width:auto;&:hover{background:none;}'], function (props) {
	return props.fontSize ? '' + props.fontSize : '2em';
});

var IconButton = function IconButton(_ref2) {
	var onClick = _ref2.onClick,
	    children = _ref2.children,
	    props = _objectWithoutProperties(_ref2, ['onClick', 'children']);

	return _react2.default.createElement(
		Button,
		_extends({ onClick: onClick }, props),
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