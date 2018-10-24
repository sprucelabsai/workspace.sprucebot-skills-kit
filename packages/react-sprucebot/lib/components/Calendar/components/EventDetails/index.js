"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "EventDetailsHeader", {
  enumerable: true,
  get: function get() {
    return _EventDetailsHeader2.default;
  }
});
Object.defineProperty(exports, "EventDetailsFooter", {
  enumerable: true,
  get: function get() {
    return _EventDetailsFooter2.default;
  }
});
exports.default = void 0;

var _EventDetails = _interopRequireDefault(require("./EventDetails"));

var _EventDetailsHeader2 = _interopRequireDefault(require("./components/EventDetailsHeader/EventDetailsHeader"));

var _EventDetailsFooter2 = _interopRequireDefault(require("./components/EventDetailsFooter/EventDetailsFooter"));

var _default = _EventDetails.default;
exports.default = _default;