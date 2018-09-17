"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _https = _interopRequireDefault(require("https"));

var _http = _interopRequireDefault(require("http"));

var _qs = _interopRequireDefault(require("qs"));

var methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

var ApiClient =
/*#__PURE__*/
function () {
  function ApiClient(endpoint, _ref) {
    var _this = this;

    var _ref$allowSelfSignedC = _ref.allowSelfSignedCerts,
        allowSelfSignedCerts = _ref$allowSelfSignedC === void 0 ? false : _ref$allowSelfSignedC;
    (0, _classCallCheck2.default)(this, ApiClient);
    this.jwt = undefined;
    this.ssl = endpoint.search('https') === 0;
    this.endpoint = endpoint;
    this.allowSelfSignedCerts = allowSelfSignedCerts;
    methods.forEach(function (method) {
      _this[method.toLowerCase()] = function (path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return new Promise(
        /*#__PURE__*/
        function () {
          var _ref2 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(resolve, reject) {
            var body, query, cancelToken, headers, fetchOptions, agent, fetchUrl, response, json;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    body = options.body, query = options.query, cancelToken = options.cancelToken;
                    _context.prev = 1;
                    headers = {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    };
                    fetchOptions = {
                      method: method,
                      headers: headers,
                      data: body
                    };

                    if (cancelToken) {
                      fetchOptions.cancelToken = cancelToken;
                    } // Allows Node to accept our self signed cert


                    if (_this.ssl && _this.allowSelfSignedCerts) {
                      agent = new _https.default.Agent({
                        rejectUnauthorized: false
                      });
                      fetchOptions.httpsAgent = agent;
                    }

                    if (_this.jwt) {
                      fetchOptions.headers['x-skill-jwt'] = _this.jwt;
                    }

                    fetchUrl = "".concat(endpoint).concat(path);

                    if (query) {
                      fetchUrl = // determine if we're appending or creating a query string
                      fetchUrl.indexOf('?') > -1 ? "".concat(fetchUrl).concat(_qs.default.stringify(query)) : "".concat(fetchUrl, "?").concat(_qs.default.stringify(query));
                    } // Start network request


                    _context.prev = 9;
                    _context.next = 12;
                    return (0, _axios.default)(fetchUrl, fetchOptions);

                  case 12:
                    response = _context.sent;
                    json = response.data;
                    resolve(json);
                    _context.next = 20;
                    break;

                  case 17:
                    _context.prev = 17;
                    _context.t0 = _context["catch"](9);
                    return _context.abrupt("return", reject(_context.t0 && _context.t0.response && _context.t0.response.data ? _context.t0.response.data : _context.t0));

                  case 20:
                    _context.next = 26;
                    break;

                  case 22:
                    _context.prev = 22;
                    _context.t1 = _context["catch"](1);
                    console.error('Response failure', _context.t1);
                    reject(_context.t1);

                  case 26:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[1, 22], [9, 17]]);
          }));

          return function (_x, _x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      };
    });
  }

  (0, _createClass2.default)(ApiClient, [{
    key: "setJwt",
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


var _default = function _default(host, options) {
  return new ApiClient(host, options);
};

exports.default = _default;