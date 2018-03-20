'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Typography = require('../Typography/Typography');

var _TrainingGuide = require('../TrainingGuide/TrainingGuide');

var _TrainingGuide2 = _interopRequireDefault(_TrainingGuide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Onboarding = function (_Component) {
	_inherits(Onboarding, _Component);

	function Onboarding() {
		_classCallCheck(this, Onboarding);

		return _possibleConstructorReturn(this, (Onboarding.__proto__ || Object.getPrototypeOf(Onboarding)).apply(this, arguments));
	}

	_createClass(Onboarding, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    heading = _props.heading,
			    steps = _props.steps,
			    onComplete = _props.onComplete,
			    doneButtonLabel = _props.doneButtonLabel;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_Typography.H1,
					null,
					heading
				),
				_react2.default.createElement(_TrainingGuide2.default, {
					steps: steps,
					onComplete: onComplete,
					doneButtonLabel: doneButtonLabel
				})
			);
		}
	}]);

	return Onboarding;
}(_react.Component);

exports.default = Onboarding;


Onboarding.propTypes = {
	heading: _propTypes2.default.string.isRequired,
	steps: _propTypes2.default.array.isRequired,
	onComplete: _propTypes2.default.func.isRequired,
	doneButtonLabel: _propTypes2.default.string.isRequired
};