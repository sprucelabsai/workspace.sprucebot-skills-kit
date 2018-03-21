'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reduxForm = require('redux-form');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _FormExample = require('./FormExample');

var _FormExample2 = _interopRequireDefault(_FormExample);

var _reducers = require('../../skillskit/store/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _withStore = require('../../skillskit/store/withStore');

var _withStore2 = _interopRequireDefault(_withStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe.only('FormExample', function () {
	var onSubmit = jest.fn();
	var wrapped = void 0;
	beforeEach(function () {
		var Page = (0, _withStore2.default)(function (_ref) {
			var children = _ref.children;
			return children;
		}, {
			actions: {},
			reducers: _reducers2.default,
			config: {
				SERVER_HOST: 'https://example.com'
			}
		});
		wrapped = (0, _enzyme.mount)(_react2.default.createElement(
			Page,
			null,
			_react2.default.createElement(_FormExample2.default, { onSubmit: onSubmit })
		));
	});

	test('it renders', function () {
		expect(wrapped).toMatchSnapshot();
	});

	test('it calls onSubmit', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var form;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						form = wrapped.find('form');

						// Pass Field Validation

						wrapped.find('input[name="password"]').simulate('change', { target: { value: 12345678 } });
						wrapped.find('select[name="dropdown"]').simulate('change', { target: { value: 'value2' } });

						// Trigger onSubmit handler
						form.simulate('submit');

						// Assert submit called with expected values
						expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
							dropdown: 'value2',
							firstName: 'Sprucebot',
							password: 12345678
						}), expect.anything(), expect.anything());

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	})));
});