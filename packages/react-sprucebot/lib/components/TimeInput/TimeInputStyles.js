'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeInputStyles = function (_Component) {
	_inherits(TimeInputStyles, _Component);

	function TimeInputStyles() {
		_classCallCheck(this, TimeInputStyles);

		return _possibleConstructorReturn(this, (TimeInputStyles.__proto__ || Object.getPrototypeOf(TimeInputStyles)).apply(this, arguments));
	}

	_createClass(TimeInputStyles, [{
		key: 'render',
		value: function render() {
			// Only load the styles once on the page
			// if (global.RCTimePickerInit) {
			// 	return null
			// }

			// global.RCTimePickerInit = true

			return _react2.default.createElement('div', {
				dangerouslySetInnerHTML: {
					__html: '<style>\n\t\t\t\t\t\t\t\t.rc-time-picker {\n\t\t\t\t\t\tdisplay: inline-block;\n\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker * {\n\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-input {\n\t\t\t\t\t\tflex: 2;\n\t\t\t\t\t\tbackground-color: transparent;\n\t\t\t\t\t\tborder: none;\n\t\t\t\t\t\tcolor: #808080;\n\t\t\t\t\t\tfont-size: 1.2em;\n\t\t\t\t\t\tmargin: 0.5em;\n\t\t\t\t\t\tpadding: 0;\n\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t\tdisplay: inline-block;\n\t\t\t\t\t\theight: 28px;\n\t\t\t\t\t\tcursor: text;\n\t\t\t\t\t\tline-height: 1.5;\n\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\ttransition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),\n\t\t\t\t\t\t\tbackground 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),\n\t\t\t\t\t\t\tbox-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-input[disabled] {\n\t\t\t\t\t\tcolor: #ccc;\n\t\t\t\t\t\tbackground: #f7f7f7;\n\t\t\t\t\t\tcursor: not-allowed;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel {\n\t\t\t\t\t\tz-index: 1070;\n\t\t\t\t\t\twidth: 170px;\n\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel * {\n\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-inner {\n\t\t\t\t\t\tdisplay: inline-block;\n\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t\toutline: none;\n\t\t\t\t\t\tlist-style: none;\n\t\t\t\t\t\tfont-size: 12px;\n\t\t\t\t\t\ttext-align: left;\n\t\t\t\t\t\tbackground-color: #fff;\n\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\tbox-shadow: 0 1px 5px #ccc;\n\t\t\t\t\t\tbackground-clip: padding-box;\n\t\t\t\t\t\tborder: 1px solid #ccc;\n\t\t\t\t\t\tline-height: 1.5;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-narrow {\n\t\t\t\t\t\tmax-width: 113px;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-input {\n\t\t\t\t\t\tcolor: #808080;\n\t\t\t\t\t\tfont-size: 1.2em;\n\t\t\t\t\t\tmargin: 0;\n\t\t\t\t\t\tpadding: 0;\n\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\tcursor: auto;\n\t\t\t\t\t\tline-height: 1.5;\n\t\t\t\t\t\toutline: 0;\n\t\t\t\t\t\tborder: 1px solid transparent;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-input-wrap {\n\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t\tpadding: 6px;\n\t\t\t\t\t\tborder-bottom: 1px solid #e9e9e9;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-input-invalid {\n\t\t\t\t\t\tborder-color: red;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-clear-btn {\n\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\tright: 6px;\n\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\twidth: 20px;\n\t\t\t\t\t\theight: 20px;\n\t\t\t\t\t\ttext-align: center;\n\t\t\t\t\t\tline-height: 20px;\n\t\t\t\t\t\ttop: 6px;\n\t\t\t\t\t\tmargin: 0;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-clear-btn:after {\n\t\t\t\t\t\tcontent: \'x\';\n\t\t\t\t\t\tfont-size: 12px;\n\t\t\t\t\t\tcolor: #aaa;\n\t\t\t\t\t\tdisplay: inline-block;\n\t\t\t\t\t\tline-height: 1;\n\t\t\t\t\t\twidth: 20px;\n\t\t\t\t\t\ttransition: color 0.3s ease;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-clear-btn:hover:after {\n\t\t\t\t\t\tcolor: #666;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-select {\n\t\t\t\t\t\tfloat: left;\n\t\t\t\t\t\tfont-size: 12px;\n\t\t\t\t\t\tborder: 1px solid #e9e9e9;\n\t\t\t\t\t\tborder-width: 0 1px;\n\t\t\t\t\t\tmargin-left: -1px;\n\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\t\t\t\twidth: 56px;\n\t\t\t\t\t\tmax-height: 144px;\n\t\t\t\t\t\toverflow-y: auto;\n\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-select-active {\n\t\t\t\t\t\toverflow-y: auto;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-select:first-child {\n\t\t\t\t\t\tborder-left: 0;\n\t\t\t\t\t\tmargin-left: 0;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-select:last-child {\n\t\t\t\t\t\tborder-right: 0;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-select ul {\n\t\t\t\t\t\tlist-style: none;\n\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\t\t\t\tmargin: 0;\n\t\t\t\t\t\tpadding: 0;\n\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\toverflow-x: hidden;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-select li {\n\t\t\t\t\t\tcolor: #808080;\n\t\t\t\t\t\tfont-size: 1.2em;\n\t\t\t\t\t\tlist-style: none;\n\t\t\t\t\t\tbox-sizing: content-box;\n\t\t\t\t\t\tmargin: 0;\n\t\t\t\t\t\tpadding: 0 0 0 16px;\n\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\theight: 24px;\n\t\t\t\t\t\tline-height: 24px;\n\t\t\t\t\t\ttext-align: left;\n\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\t-webkit-user-select: none;\n\t\t\t\t\t\t-moz-user-select: none;\n\t\t\t\t\t\t-ms-user-select: none;\n\t\t\t\t\t\tuser-select: none;\n\t\t\t\t\t}\n\t\t\t\t\t.rc-time-picker-panel-select li:hover {\n\t\t\t\t\t\tbackground: #edfaff;\n\t\t\t\t\t}\n\t\t\t\t\tli.rc-time-picker-panel-select-option-selected {\n\t\t\t\t\t\tbackground: #f7f7f7;\n\t\t\t\t\t\tfont-weight: bold;\n\t\t\t\t\t}\n\t\t\t\t\tli.rc-time-picker-panel-select-option-disabled {\n\t\t\t\t\t\tcolor: #ccc;\n\t\t\t\t\t}\n\t\t\t\t\tli.rc-time-picker-panel-select-option-disabled:hover {\n\t\t\t\t\t\tbackground: transparent;\n\t\t\t\t\t\tcursor: not-allowed;\n\t\t\t\t\t}\n\t\t\t\t\t</style>'
				}
			});
		}
	}]);

	return TimeInputStyles;
}(_react.Component);

exports.default = TimeInputStyles;