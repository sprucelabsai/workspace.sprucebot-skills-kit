"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ControlButton = _interopRequireDefault(require("../ControlButton/ControlButton"));

var _Loader = _interopRequireDefault(require("../Loader/Loader"));

var _IconButton = _interopRequireDefault(require("../IconButton/IconButton"));

var Pager =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Pager, _Component);

  function Pager() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Pager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Pager)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      page: _this.props.page
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentWillReceiveProps", function (nextProps) {
      if (nextProps.page !== _this.props.page) {
        _this.setState({
          page: page
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "triggerOnChange", function (page, e) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(page, e);
      }

      return page;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "first", function (e) {
      var _this$props = _this.props,
          jumpAmount = _this$props.jumpAmount,
          infinite = _this$props.infinite;

      _this.setState(function (prevState) {
        if (infinite || jumpAmount && prevState.page - jumpAmount > 0) {
          return {
            page: _this.triggerOnChange(prevState.page - jumpAmount, e)
          };
        } else if (prevState.page > 0) {
          return {
            page: _this.triggerOnChange(0, e)
          };
        }

        return {};
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "back", function (e) {
      var _this$props2 = _this.props,
          infinite = _this$props2.infinite,
          _this$props2$skipAmou = _this$props2.skipAmount,
          skipAmount = _this$props2$skipAmou === void 0 ? 1 : _this$props2$skipAmou;

      _this.setState(function (prevState) {
        if (infinite || prevState.page - skipAmount >= 0) {
          return {
            page: _this.triggerOnChange(prevState.page - skipAmount, e)
          };
        }

        return {};
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "next", function (e) {
      var _this$props3 = _this.props,
          totalPages = _this$props3.totalPages,
          infinite = _this$props3.infinite,
          _this$props3$skipAmou = _this$props3.skipAmount,
          skipAmount = _this$props3$skipAmou === void 0 ? 1 : _this$props3$skipAmou;

      _this.setState(function (prevState) {
        if (infinite || prevState.page < totalPages - skipAmount) {
          return {
            page: _this.triggerOnChange(prevState.page + skipAmount, e)
          };
        }

        return {};
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "last", function (e) {
      var _this$props4 = _this.props,
          totalPages = _this$props4.totalPages,
          jumpAmount = _this$props4.jumpAmount,
          infinite = _this$props4.infinite;

      _this.setState(function (prevState) {
        if (infinite || jumpAmount && prevState.page + jumpAmount < totalPages - 1) {
          return {
            page: _this.triggerOnChange(prevState.page + jumpAmount, e)
          };
        } else if (prevState.page < totalPages - 1) {
          return {
            page: _this.triggerOnChange(totalPages - 1, e)
          };
        }

        return {};
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderView", function () {
      var page = _this.state.page;
      var _this$props5 = _this.props,
          totalPages = _this$props5.totalPages,
          titles = _this$props5.titles;
      var title = titles ? titles(page) : "".concat(page + 1, " of ").concat(totalPages);
      return _react.default.createElement("li", {
        className: "current"
      }, title);
    });
    return _this;
  }

  (0, _createClass2.default)(Pager, [{
    key: "render",
    value: function render() {
      var page = this.state.page;
      var _this$props6 = this.props,
          totalPages = _this$props6.totalPages,
          showStep = _this$props6.showStep,
          showJump = _this$props6.showJump,
          infinite = _this$props6.infinite,
          className = _this$props6.className,
          props = (0, _objectWithoutProperties2.default)(_this$props6, ["totalPages", "showStep", "showJump", "infinite", "className"]);
      var first = page === 0 && !infinite;
      var last = page === totalPages - 1 && !infinite;
      return _react.default.createElement("ul", (0, _extends2.default)({}, props, {
        className: "".concat(className, " pager")
      }), showJump && _react.default.createElement("li", {
        className: "first ".concat(first && 'disabled'),
        smallArrows: true
      }, _react.default.createElement(_IconButton.default, {
        onClick: this.first
      }, "first_page")), showStep && _react.default.createElement("li", {
        className: "back ".concat(first && 'disabled'),
        smallArrows: true
      }, _react.default.createElement(_IconButton.default, {
        onClick: this.back
      }, "chevron_left")), this.renderView(), showStep && _react.default.createElement("li", {
        className: "next ".concat(last && 'disabled'),
        smallArrows: true
      }, _react.default.createElement(_IconButton.default, {
        onClick: this.next
      }, "chevron_right")), showJump && _react.default.createElement("li", {
        className: "last ".concat(last && 'disabled'),
        smallArrows: true
      }, _react.default.createElement(_IconButton.default, {
        onClick: this.last
      }, "last_page")));
    }
  }]);
  return Pager;
}(_react.Component);

var _default = Pager;
exports.default = _default;
Pager.propTypes = {
  page: _propTypes.default.number,
  totalPages: _propTypes.default.number,
  infinite: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  titles: _propTypes.default.func,
  stepAmount: _propTypes.default.number,
  jumpAmount: _propTypes.default.number
};
Pager.defaultProps = {
  page: 0,
  infinite: false,
  stepAmount: 1,
  showStep: true,
  showJump: true
};