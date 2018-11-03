"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  durationSec: function durationSec(event) {
    var durationSec = 0;
    event.blocks.forEach(function (block) {
      durationSec += block.durationSec;
    });
    return durationSec;
  }
};
exports.default = _default;