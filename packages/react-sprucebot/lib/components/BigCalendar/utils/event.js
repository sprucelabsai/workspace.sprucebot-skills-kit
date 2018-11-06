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
  },
  clientXY: function clientXY(e) {
    if (e.touches && e.touches[0]) {
      return {
        clientX: e.touches[0].pageX,
        clientY: e.touches[0].pageY
      };
    } else {
      return {
        clientX: e.clientX,
        clientY: e.clientY
      };
    }
  }
};
exports.default = _default;