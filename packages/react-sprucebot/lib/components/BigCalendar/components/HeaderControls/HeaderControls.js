"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Select = _interopRequireDefault(require("../../../Forms/components/Select/Select"));

var _Button = _interopRequireDefault(require("../../../Button/Button"));

var _Pagination = _interopRequireDefault(require("../../../Pagination/Pagination"));

var _classnames = _interopRequireDefault(require("classnames"));

var _screenfull = _interopRequireDefault(require("screenfull"));

var HeaderControls = function HeaderControls(props) {
  return _react.default.createElement("div", {
    className: "bigcalendar__header-controls"
  }, _react.default.createElement(_Pagination.default, {
    isSimple: true,
    onClickNext: props.onNextDate,
    onClickBack: props.onBackDate,
    currentPage: 1,
    totalPages: 3
  }), _react.default.createElement(_Button.default, {
    kind: 'simple',
    isSmall: true,
    text: 'Date',
    className: "bigcalendar__selectedDate-button"
  }), _react.default.createElement(_Button.default, {
    kind: 'simple',
    isSmall: true,
    text: 'CalendarIcon',
    className: "bigcalendar__calendarIcon-button"
  }), props.userModeOptions && props.onChangeUserMode && _react.default.createElement(_Select.default, {
    options: props.userModeOptions,
    onChange: props.onChangeUserMode
  }), _react.default.createElement(_Button.default, {
    kind: "simple",
    text: "Full Screen",
    onClick: function onClick() {
      _screenfull.default.toggle(props.fullScreenNodeRef.current);
    }
  }));
};

var _default = HeaderControls;
exports.default = _default;