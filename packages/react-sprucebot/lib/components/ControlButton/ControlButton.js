'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ControlButton = function ControlButton(_ref) {
	var iconLeft = _ref.iconLeft,
	    iconRight = _ref.iconRight,
	    children = _ref.children,
	    props = _objectWithoutProperties(_ref, ['iconLeft', 'iconRight', 'children']);

	return _react2.default.createElement(
		_Button2.default,
		_extends({}, props, {
			className: 'ControlButton control__button ' + (className || ''),
			tabIndex: 0,
			hideLoader: true
		}),
		iconLeft && _react2.default.createElement(
			_Icon2.default,
			{ className: 'icon__left' },
			iconLeft
		),
		_react2.default.createElement(
			'span',
			null,
			children
		),
		iconRight && _react2.default.createElement(
			_Icon2.default,
			{ className: 'icon__right' },
			iconRight
		)
	);
};

ControlButton.propTypes = {
	onClick: _propTypes2.default.func,
	children: _propTypes2.default.any,
	className: _propTypes2.default.string,
	iconLeft: _propTypes2.default.string,
	iconRight: _propTypes2.default.string
};

exports.default = ControlButton;