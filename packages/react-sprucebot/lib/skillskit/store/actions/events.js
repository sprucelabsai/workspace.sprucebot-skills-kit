"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.didUpdateUser = didUpdateUser;
exports.DID_UPDATE_USER = void 0;
var DID_UPDATE_USER = 'events/DID_UPDATE_USER';
exports.DID_UPDATE_USER = DID_UPDATE_USER;

function didUpdateUser(payload) {
  return {
    type: DID_UPDATE_USER,
    payload: payload
  };
}