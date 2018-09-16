'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SectionHeading = exports.A = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.Paragraph = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Paragraph = function Paragraph(_ref) {
	var className = _ref.className,
	    fine = _ref.fine,
	    props = _objectWithoutProperties(_ref, ['className', 'fine']);

	return _react2.default.createElement('p', _extends({}, props, {
		className: (fine ? 'fine__print' : '') + ' ' + (className || '')
	}));
};

exports.Paragraph = Paragraph;
var H1 = function H1(_ref2) {
	var className = _ref2.className,
	    with_subheader = _ref2.with_subheader,
	    props = _objectWithoutProperties(_ref2, ['className', 'with_subheader']);

	return _react2.default.createElement('h1', _extends({}, props, {
		className: (with_subheader ? 'with__subheader' : '') + ' ' + (className || '')
	}));
};

exports.H1 = H1;
var H2 = function H2(_ref3) {
	var className = _ref3.className,
	    subheader = _ref3.subheader,
	    props = _objectWithoutProperties(_ref3, ['className', 'subheader']);

	return _react2.default.createElement('h2', _extends({}, props, {
		className: (subheader ? 'is__subheader' : '') + ' ' + (className || '')
	}));
};

exports.H2 = H2;
var H3 = function H3(_ref4) {
	var className = _ref4.className,
	    props = _objectWithoutProperties(_ref4, ['className']);

	return _react2.default.createElement('h3', _extends({}, props, { className: '' + (className || '') }));
};

exports.H3 = H3;
var H4 = function H4(_ref5) {
	var className = _ref5.className,
	    props = _objectWithoutProperties(_ref5, ['className']);

	return _react2.default.createElement('h4', _extends({}, props, { className: '' + (className || '') }));
};

exports.H4 = H4;
var H5 = function H5(_ref6) {
	var className = _ref6.className,
	    props = _objectWithoutProperties(_ref6, ['className']);

	return _react2.default.createElement('h5', _extends({}, props, { className: '' + (className || '') }));
};

exports.H5 = H5;
var H6 = function H6(_ref7) {
	var className = _ref7.className,
	    props = _objectWithoutProperties(_ref7, ['className']);

	return _react2.default.createElement('h6', _extends({}, props, { className: '' + (className || '') }));
};

exports.H6 = H6;
var A = function A(_ref8) {
	var className = _ref8.className,
	    props = _objectWithoutProperties(_ref8, ['className']);

	return _react2.default.createElement('a', _extends({}, props, { className: '' + (className || '') }));
};

exports.A = A;
var SectionHeading = function SectionHeading(_ref9) {
	var className = _ref9.className,
	    props = _objectWithoutProperties(_ref9, ['className']);

	return _react2.default.createElement('h2', _extends({}, props, { className: 'profile__subtitle ' + (className || '') }));
};
exports.SectionHeading = SectionHeading;