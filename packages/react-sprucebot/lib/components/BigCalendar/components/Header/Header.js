"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _HeaderControls = _interopRequireDefault(require("../HeaderControls/HeaderControls"));

var _Button = _interopRequireDefault(require("../../../Button/Button"));

var _Pagination = _interopRequireDefault(require("../../../Pagination/Pagination"));

var _Text = require("../../../Text/Text");

// sub components
var Header = function Header(props) {
  return _react.default.createElement("div", {
    className: "bigcalendar__header"
  }, _react.default.createElement("div", {
    className: "bigcalendar__header-top"
  }, _react.default.createElement(_Text.H2, {
    className: ""
  }, props.selectedDate.format(props.dateFormat)), _react.default.createElement(_HeaderControls.default, {
    userModeOptions: props.userModeOptions,
    onChangeUserMode: props.onChangeUserMode,
    fullScreenNodeRef: props.fullScreenNodeRef,
    onBackDate: props.onBackDate,
    onNextDate: props.onNextDate,
    onChangeView: props.onChangeView
  })), _react.default.createElement("div", {
    className: "bigcalendar__header-bottom"
  }, _react.default.createElement("div", {
    className: "bigcalendar__header-smalldate"
  }, _react.default.createElement("p", {
    className: "dow"
  }, props.selectedDate.format('dd')), _react.default.createElement("p", {
    className: "day"
  }, props.selectedDate.format('D'))), _react.default.createElement(_Pagination.default, {
    onClickNext: props.onHorizontalPageNext,
    onClickBack: props.onHorizontalPageBack,
    currentPage: props.currentHorizontalPage,
    totalPages: props.totalHorizontalPages
  })));
};

var _default = Header;
exports.default = _default;