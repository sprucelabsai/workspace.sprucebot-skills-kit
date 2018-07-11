'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	if (!global || !global._babelPolyfill) {
		require('babel-core/register');
		require('babel-polyfill');
	}
}();