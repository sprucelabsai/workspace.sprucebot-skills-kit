'use strict';

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _http = require('axios/lib/adapters/http');

var _http2 = _interopRequireDefault(_http);

var _apiClient = require('./apiClient');

var _apiClient2 = _interopRequireDefault(_apiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// axios.interceptors.request.use(request => {
// 	console.log('Starting Request', request)
// 	return request
// })

var methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
var ENDPOINT = 'https://localhost';

// Make sure axios plays nice in test env
_axios2.default.defaults.host = ENDPOINT;
_axios2.default.defaults.adapter = _http2.default;

var mock = void 0,
    client = void 0;
beforeEach(function () {
	mock = (0, _nock2.default)(ENDPOINT).defaultReplyHeaders({
		'Access-Control-Allow-Origin': '*'
	});
	client = new _apiClient2.default(ENDPOINT, { allowSelfSignedCerts: true });
});
afterEach(function () {
	_nock2.default.cleanAll();
});
test('GET should 200', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	var scope, response;
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					scope = mock.get('/get').query({ tester: true }).reply(200, { getSuccess: true });
					_context.next = 3;
					return client.get('/get', {
						query: { tester: true }
					});

				case 3:
					response = _context.sent;

					expect(scope.isDone()).toBeTruthy();
					expect(response).toMatchSnapshot();

				case 6:
				case 'end':
					return _context.stop();
			}
		}
	}, _callee, undefined);
})));
test('POST should 201', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
	var body, scope, response;
	return regeneratorRuntime.wrap(function _callee2$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					body = { formBody: true };
					scope = mock.post('/post', body).reply(201, { postSuccess: true });
					_context2.next = 4;
					return client.post('/post', {
						body: body
					});

				case 4:
					response = _context2.sent;

					expect(scope.isDone()).toBeTruthy();
					expect(response).toMatchSnapshot();

				case 7:
				case 'end':
					return _context2.stop();
			}
		}
	}, _callee2, undefined);
})));
test('PUT should 200', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
	var body, scope, response;
	return regeneratorRuntime.wrap(function _callee3$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					body = { formBody: true };
					scope = mock
					// .log(message => console.log('debug message', arguments))
					.put('/').reply(200, { putSuccess: true });
					_context3.next = 4;
					return client.put('/', {
						// body
					});

				case 4:
					response = _context3.sent;

					expect(scope.isDone()).toBeTruthy();
					expect(response).toMatchSnapshot();

				case 7:
				case 'end':
					return _context3.stop();
			}
		}
	}, _callee3, undefined);
})));

test('PATCH should 200', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
	var body, scope, response;
	return regeneratorRuntime.wrap(function _callee4$(_context4) {
		while (1) {
			switch (_context4.prev = _context4.next) {
				case 0:
					body = { formBody: true };
					scope = mock.patch('/patch', function () {
						return true;
					}).reply(200, { patchSuccess: true });
					_context4.next = 4;
					return client.patch('/patch', {
						body: body
					});

				case 4:
					response = _context4.sent;

					expect(scope.isDone()).toBeTruthy();
					expect(response).toMatchSnapshot();

				case 7:
				case 'end':
					return _context4.stop();
			}
		}
	}, _callee4, undefined);
})));

test('DELETE should 200', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
	var body, scope, response;
	return regeneratorRuntime.wrap(function _callee5$(_context5) {
		while (1) {
			switch (_context5.prev = _context5.next) {
				case 0:
					body = { formBody: true };
					scope = mock.delete('/delete', function () {
						return true;
					}).reply(200, { deleteSuccess: true });
					_context5.next = 4;
					return client.delete('/delete', {
						body: body
					});

				case 4:
					response = _context5.sent;

					expect(scope.isDone()).toBeTruthy();
					expect(response).toMatchSnapshot();

				case 7:
				case 'end':
					return _context5.stop();
			}
		}
	}, _callee5, undefined);
})));

test('GET should 404', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
	var scope, response;
	return regeneratorRuntime.wrap(function _callee6$(_context6) {
		while (1) {
			switch (_context6.prev = _context6.next) {
				case 0:
					scope = mock.get('/404').query({ 404: true }).reply(404, { getSuccess: false });
					_context6.prev = 1;
					_context6.next = 4;
					return client.get('/404', {
						query: { 404: true }
					});

				case 4:
					response = _context6.sent;

					expect(false).toBeTruthy(); // Test should not get here
					_context6.next = 12;
					break;

				case 8:
					_context6.prev = 8;
					_context6.t0 = _context6['catch'](1);

					expect(scope.isDone()).toBeTruthy();
					expect(_context6.t0).toMatchSnapshot();

				case 12:
				case 'end':
					return _context6.stop();
			}
		}
	}, _callee6, undefined, [[1, 8]]);
})));

test('POST should 404', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
	var body, scope, response;
	return regeneratorRuntime.wrap(function _callee7$(_context7) {
		while (1) {
			switch (_context7.prev = _context7.next) {
				case 0:
					body = { formBody: true };
					scope = mock.post('/post404', body).reply(404, { postSuccess: false });
					_context7.prev = 2;
					_context7.next = 5;
					return client.post('/post404', {
						body: body
					});

				case 5:
					response = _context7.sent;

					expect(false).toBeTruthy(); // Test should not get here
					_context7.next = 13;
					break;

				case 9:
					_context7.prev = 9;
					_context7.t0 = _context7['catch'](2);

					expect(scope.isDone()).toBeTruthy();
					expect(_context7.t0).toMatchSnapshot();

				case 13:
				case 'end':
					return _context7.stop();
			}
		}
	}, _callee7, undefined, [[2, 9]]);
})));
test('PUT should 500', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
	var body, scope, response;
	return regeneratorRuntime.wrap(function _callee8$(_context8) {
		while (1) {
			switch (_context8.prev = _context8.next) {
				case 0:
					body = { formBody: true };
					scope = mock.put('/', body).reply(500, { putSuccess: false });
					_context8.prev = 2;
					_context8.next = 5;
					return client.put('/', {
						body: body
					});

				case 5:
					response = _context8.sent;

					expect(false).toBeTruthy(); // Test should not get here
					_context8.next = 13;
					break;

				case 9:
					_context8.prev = 9;
					_context8.t0 = _context8['catch'](2);

					expect(scope.isDone()).toBeTruthy();
					expect(_context8.t0).toMatchSnapshot();

				case 13:
				case 'end':
					return _context8.stop();
			}
		}
	}, _callee8, undefined, [[2, 9]]);
})));

test('PATCH should 404', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
	var body, scope, response;
	return regeneratorRuntime.wrap(function _callee9$(_context9) {
		while (1) {
			switch (_context9.prev = _context9.next) {
				case 0:
					body = { formBody: true };
					scope = mock.patch('/patch', function () {
						return true;
					}).reply(404, { patchSuccess: false });
					_context9.prev = 2;
					_context9.next = 5;
					return client.patch('/patch', {
						body: body
					});

				case 5:
					response = _context9.sent;

					expect(false).toBeTruthy(); // Test should not get here
					_context9.next = 13;
					break;

				case 9:
					_context9.prev = 9;
					_context9.t0 = _context9['catch'](2);

					expect(scope.isDone()).toBeTruthy();
					expect(_context9.t0).toMatchSnapshot();

				case 13:
				case 'end':
					return _context9.stop();
			}
		}
	}, _callee9, undefined, [[2, 9]]);
})));

test('DELETE should 500', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
	var body, scope, response;
	return regeneratorRuntime.wrap(function _callee10$(_context10) {
		while (1) {
			switch (_context10.prev = _context10.next) {
				case 0:
					body = { formBody: true };
					scope = mock.delete('/delete', function () {
						return true;
					}).reply(500, { deleteSuccess: false });
					_context10.prev = 2;
					_context10.next = 5;
					return client.delete('/delete', {
						body: body
					});

				case 5:
					response = _context10.sent;

					expect(false).toBeTruthy(); // Test should not get here
					_context10.next = 13;
					break;

				case 9:
					_context10.prev = 9;
					_context10.t0 = _context10['catch'](2);

					expect(scope.isDone()).toBeTruthy();
					expect(_context10.t0).toMatchSnapshot();

				case 13:
				case 'end':
					return _context10.stop();
			}
		}
	}, _callee10, undefined, [[2, 9]]);
})));