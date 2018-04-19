'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	_nock2.default.disableNetConnect();
	return (0, _nock2.default)(_config2.default.get('SERVER_HOST')).defaultReplyHeaders({
		'Access-Control-Allow-Origin': '*'
	});
};