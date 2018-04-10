'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

var ApiClient = function () {
	function ApiClient(endpoint, _ref) {
		var _this = this;

		var _ref$allowSelfSignedC = _ref.allowSelfSignedCerts,
		    allowSelfSignedCerts = _ref$allowSelfSignedC === undefined ? false : _ref$allowSelfSignedC;

		_classCallCheck(this, ApiClient);

		this.jwt = undefined;
		this.ssl = endpoint.search('https') === 0;
		this.endpoint = endpoint;
		this.allowSelfSignedCerts = allowSelfSignedCerts;

		methods.forEach(function (method) {
			_this[method.toLowerCase()] = function (path) {
				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				return new Promise(function () {
					var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
						var body, query, headers, fetchOptions, agent, fetchUrl, response, json;
						return regeneratorRuntime.wrap(function _callee$(_context) {
							while (1) {
								switch (_context.prev = _context.next) {
									case 0:
										body = options.body, query = options.query;
										_context.prev = 1;
										headers = {
											Accept: 'application/json',
											'Content-Type': 'application/json'
										};
										fetchOptions = {
											method: method,
											headers: headers,
											data: body

											// Allows Node to accept our self signed cert
										};
										if (_this.ssl && _this.allowSelfSignedCerts) {
											agent = new _https2.default.Agent({
												rejectUnauthorized: false
											});

											fetchOptions.httpsAgent = agent;
										}

										if (_this.jwt) {
											fetchOptions.headers['x-skill-jwt'] = _this.jwt;
										}

										fetchUrl = '' + endpoint + path;


										if (query) {
											fetchUrl =
											// determine if we're appending or creating a query string
											fetchUrl.indexOf('?') > -1 ? '' + fetchUrl + _qs2.default.stringify(query) : fetchUrl + '?' + _qs2.default.stringify(query);
										}

										// Start network request
										_context.prev = 8;
										_context.next = 11;
										return (0, _axios2.default)(fetchUrl, fetchOptions);

									case 11:
										response = _context.sent;
										json = response.data;

										resolve(json);
										_context.next = 20;
										break;

									case 16:
										_context.prev = 16;
										_context.t0 = _context['catch'](8);

										console.log('Request not ok', _context.t0);
										return _context.abrupt('return', reject(_context.t0.response.data));

									case 20:
										_context.next = 26;
										break;

									case 22:
										_context.prev = 22;
										_context.t1 = _context['catch'](1);

										console.error('Response failure', _context.t1);
										reject(_context.t1);

									case 26:
									case 'end':
										return _context.stop();
								}
							}
						}, _callee, _this, [[1, 22], [8, 16]]);
					}));

					return function (_x2, _x3) {
						return _ref2.apply(this, arguments);
					};
				}());
			};
		});
	}

	_createClass(ApiClient, [{
		key: 'setJwt',
		value: function setJwt(jwt) {
			this.jwt = jwt;
		}
	}]);

	return ApiClient;
}();

/**
 * Creates a new api client to manage network requests
 * @param {string} host
 * @example createClient('https://www.example.com')
 * @returns {ApiClient}
 */


exports.default = function (host, options) {
	return new ApiClient(host, options);
};