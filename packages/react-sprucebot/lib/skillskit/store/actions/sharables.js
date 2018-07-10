'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.emitEvent = emitEvent;
var EMIT_SHARABLE_EVENT_REQUEST = exports.EMIT_SHARABLE_EVENT_REQUEST = 'sharables/EMIT_SHARABLE_EVENT_REQUEST';
var EMIT_SHARABLE_EVENT_SUCCESS = exports.EMIT_SHARABLE_EVENT_SUCCESS = 'sharables/EMIT_SHARABLE_EVENT_SUCCESS';
var EMIT_SHARABLE_EVENT_ERROR = exports.EMIT_SHARABLE_EVENT_ERROR = 'sharables/EMIT_SHARABLE_EVENT_ERROR';

function emitEvent(name, payload) {
	return {
		types: [EMIT_SHARABLE_EVENT_REQUEST, EMIT_SHARABLE_EVENT_SUCCESS, EMIT_SHARABLE_EVENT_ERROR],
		promise: function promise(client, auth) {
			return client.post('/api/1.0/sharables/emit.json', {
				data: {
					name: name,
					payload: payload
				}
			});
		},
		name: name
	};
}