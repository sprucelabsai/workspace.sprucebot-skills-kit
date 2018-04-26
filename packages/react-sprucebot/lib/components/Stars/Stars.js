'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stars = function (_Component) {
	_inherits(Stars, _Component);

	function Stars(props) {
		_classCallCheck(this, Stars);

		var _this = _possibleConstructorReturn(this, (Stars.__proto__ || Object.getPrototypeOf(Stars)).call(this, props));

		_this.state = {
			score: props.score,
			hover: 0
		};
		return _this;
	}

	_createClass(Stars, [{
		key: 'onClickStar',
		value: function onClickStar(score, e) {
			var _this2 = this;

			if (!this.props.static) {
				this.setState(function (prevState) {
					if (prevState.score !== score) {
						if (_this2.props.onChange) {
							_this2.props.onChange(score, e);
						}
						return {
							score: score
						};
					}

					return {};
				});
			}
		}
	}, {
		key: 'onMouseOverStar',
		value: function onMouseOverStar(score, e) {
			if (!this.props.static) {
				this.setState({
					hover: score
				});
			}
		}
	}, {
		key: 'onMouseLeave',
		value: function onMouseLeave(e) {
			if (!this.props.static) {
				this.setState({
					hover: 0
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    max = _props.max,
			    onChange = _props.onChange;
			var _state = this.state,
			    score = _state.score,
			    hover = _state.hover;

			// just round for score until halves are possible

			score = Math.round(score);

			if (hover > 0) {
				score = hover;
			}

			var stars = [];

			var _loop = function _loop(idx) {
				stars.push(_react2.default.createElement('div', {
					onMouseOver: function onMouseOver(e) {
						_this3.onMouseOverStar(idx, e);
					},
					onClick: function onClick(e) {
						_this3.onClickStar(idx, e);
					},
					key: 'star-' + idx,
					className: 'star ' + (score >= idx ? 'active' : '')
				}));
			};

			for (var idx = 1; idx <= max; idx++) {
				_loop(idx);
			}

			return _react2.default.createElement(
				'div',
				{
					className: 'stars',
					onMouseLeave: function onMouseLeave(e) {
						_this3.onMouseLeave(e);
					}
				},
				stars
			);
		}
	}]);

	return Stars;
}(_react.Component);

exports.default = Stars;


Stars.propTypes = {
	score: _propTypes2.default.number,
	max: _propTypes2.default.number,
	onChange: _propTypes2.default.func,
	static: _propTypes2.default.bool
};

Stars.defaultProps = {
	max: 5,
	score: 0,
	static: false,
	onChange: function onChange(score, e) {}
};