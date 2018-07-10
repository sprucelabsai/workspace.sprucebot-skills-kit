'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (config, Sharable) {

	var actionGo = function actionGo(_ref) {
		var actions = _ref.actions,
		    _ref$internal = _ref.internal,
		    internal = _ref$internal === undefined ? false : _ref$internal;


		var newActions = false;

		if (!internal && config && config.actionsToEvents) {

			newActions = {};

			Object.keys(config.actionsToEvents).map(function (namespace) {

				//build namespace
				newActions[namespace] = {};

				Object.keys(config.actionsToEvents[namespace]).map(function (action) {

					//save event
					var event = config.actionsToEvents[namespace][action];

					newActions[namespace][action] = function () {
						var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
							var response;
							return regeneratorRuntime.wrap(function _callee$(_context) {
								while (1) {
									switch (_context.prev = _context.next) {
										case 0:
											_context.next = 2;
											return actions.sharable.emitEvent(event, payload);

										case 2:
											response = _context.sent;
											return _context.abrupt('return', response.results);

										case 4:
										case 'end':
											return _context.stop();
									}
								}
							}, _callee, undefined);
						}));

						return function (_x) {
							return _ref2.apply(this, arguments);
						};
					}();

					return {
						event: event,
						action: action
					};
				});
			});
		}

		return _extends({}, actions, newActions);
	};

	return function (_Component) {
		_inherits(SharableWrapper, _Component);

		function SharableWrapper() {
			_classCallCheck(this, SharableWrapper);

			return _possibleConstructorReturn(this, (SharableWrapper.__proto__ || Object.getPrototypeOf(SharableWrapper)).apply(this, arguments));
		}

		_createClass(SharableWrapper, [{
			key: 'render',
			value: function render() {
				var props = _objectWithoutProperties(this.props, []);

				return _react2.default.createElement(Sharable, _extends({}, props, { actions: actionGo(props) }));
			}
		}]);

		return SharableWrapper;
	}(_react.Component);
};