'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SectionHeading = exports.A = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.Paragraph = undefined;

var _templateObject = _taggedTemplateLiteral([''], ['']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Paragraph = exports.Paragraph = _styledComponents2.default.p.attrs({
	className: function className(props) {
		return props.fine ? 'fine__print' : '';
	}
})(_templateObject);

var H1 = exports.H1 = _styledComponents2.default.h1.attrs({
	className: function className(props) {
		return props.with_subheader ? 'with__subheader' : '';
	}
})(_templateObject);
var H2 = exports.H2 = _styledComponents2.default.h2.attrs({
	className: function className(props) {
		return props.subheader ? 'is__subheader' : '';
	}
})(_templateObject);
var H3 = exports.H3 = _styledComponents2.default.h3(_templateObject);
var H4 = exports.H4 = _styledComponents2.default.h4(_templateObject);
var H5 = exports.H5 = _styledComponents2.default.h5(_templateObject);
var H6 = exports.H6 = _styledComponents2.default.h6(_templateObject);

var A = exports.A = _styledComponents2.default.a(_templateObject);
var SectionHeading = exports.SectionHeading = _styledComponents2.default.h2.attrs({
	className: 'profile__subtitle'
})(_templateObject);