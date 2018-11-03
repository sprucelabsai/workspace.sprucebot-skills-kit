"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _Text = require("../Text/Text");

var _FormPartials = require("../Forms/FormPartials");

var ArrowNext = function ArrowNext(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
  }));
};

ArrowNext.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var ArrowBack = function ArrowBack(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
  }));
};

ArrowBack.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var Pagination = function Pagination(props) {
  var currentPage = props.currentPage,
      totalPages = props.totalPages,
      showPages = props.showPages,
      showJump = props.showJump,
      onClickNext = props.onClickNext,
      onClickBack = props.onClickBack,
      onPageButtonClick = props.onPageButtonClick,
      onJump = props.onJump,
      isSimple = props.isSimple;
  var pagesArray = [];
  var displayPages = [];

  for (var i = 0; i < totalPages; i++) {
    pagesArray.push(i);
  }

  if (currentPage <= 2 || totalPages - currentPage <= 2) {
    displayPages = pagesArray.filter(function (page) {
      return page === 0 || page === 1 || page === 2 || page === totalPages - 1 || page === totalPages - 2 || page === totalPages - 3 || page === currentPage;
    });
    displayPages.splice(3, 0, {
      text: '…'
    });
  } else {
    displayPages = pagesArray.filter(function (page) {
      return page === 0 || page === totalPages - 1 || page === currentPage || page === currentPage + 1 || page === currentPage - 1;
    });
    displayPages.splice(1, 0, {
      text: '…'
    });
    displayPages.splice(displayPages.length - 1, 0, {
      text: '…'
    });
  }

  var kind = isSimple ? 'simple' : 'secondary';
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('pagination-wrapper', {
      'pagination-wrapper-minimal': !showPages
    })
  }, _react.default.createElement(_Button.default, {
    kind: kind,
    onClick: onClickBack,
    isSmall: true,
    className: "pagination__btn",
    icon: _react.default.createElement(ArrowBack, null),
    disabled: currentPage === 0
  }), showPages && onPageButtonClick && displayPages.map(function (page, idx) {
    if (page.text === '…') {
      return _react.default.createElement(_Text.Text, {
        key: idx,
        className: "pagination__page-ellipse"
      }, _react.default.createElement(_Text.Span, null, "\u2026"));
    }

    return _react.default.createElement(_Button.default, {
      key: idx,
      onClick: function onClick() {
        return onPageButtonClick(page);
      },
      kind: currentPage === page ? 'simple' : '',
      text: (page + 1).toString(),
      isSmall: true,
      className: "pagination__page-btn"
    });
  }), _react.default.createElement(_Button.default, {
    kind: kind,
    onClick: onClickNext,
    isSmall: true,
    className: "pagination__btn",
    icon: _react.default.createElement(ArrowNext, null),
    disabled: currentPage >= totalPages - 1
  }), showJump && onJump && _react.default.createElement("form", {
    className: "pagination__jump-wrapper",
    onSubmit: function onSubmit(e) {
      e.preventDefault();

      for (var _i = 0; _i < e.currentTarget.elements.length; _i++) {
        if (e.currentTarget.elements[_i].name === 'jump') {
          onJump(e.currentTarget.elements[_i].value || e.currentTarget.elements[_i].placeholder);
        }
      }
    }
  }, _react.default.createElement(_Text.Span, {
    className: "pagination__jump-text"
  }, "Jump:\xA0"), _react.default.createElement(_FormPartials.InputInner, {
    name: "jump",
    autoComplete: "off",
    placeholder: currentPage,
    onBlur: function onBlur(e) {
      onJump(e.currentTarget.value || e.currentTarget.placeholder);
    }
  })));
};

var _default = Pagination;
exports.default = _default;