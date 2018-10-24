"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _List = _interopRequireWildcard(require("../../../List/List"));

var _EventDetailsHeader = _interopRequireWildcard(require("./components/EventDetailsHeader/EventDetailsHeader"));

var _EventDetailsFooter = _interopRequireWildcard(require("./components/EventDetailsFooter/EventDetailsFooter"));

var EventDetails = function EventDetails(props) {
  var header = props.header,
      list = props.list,
      status = props.status,
      footer = props.footer;
  var parentClass = (0, _classnames.default)('event-details card l-pb-0', {
    'event-confirmed': status === 'event-busy',
    'event-unconfirmed': status === 'event-unconfirmed',
    break: status === 'break',
    block: status === 'block'
  });
  return _react.default.createElement("div", {
    className: parentClass
  }, _react.default.createElement(_EventDetailsHeader.default, header), _react.default.createElement(_List.default, list), _react.default.createElement(_EventDetailsFooter.default, footer));
};

var _default = EventDetails;
exports.default = _default;