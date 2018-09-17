"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Stars =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Stars, _Component);

  function Stars(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Stars);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Stars).call(this, props));
    _this.state = {
      score: props.score,
      hover: 0
    };
    return _this;
  }

  (0, _createClass2.default)(Stars, [{
    key: "onClickStar",
    value: function onClickStar(score, e) {
      var _this2 = this;

      if (!this.props.static) {
        this.setState(function (prevState) {
          if (prevState.score !== score) {
            if (_this2.props.onChange) {
              _this2.props.onChange(score, e);
            }

            return {
              score: score
            };
          }

          return {};
        });
      }
    }
  }, {
    key: "onMouseOverStar",
    value: function onMouseOverStar(score, e) {
      if (!this.props.static) {
        this.setState({
          hover: score
        });
      }
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(e) {
      if (!this.props.static) {
        this.setState({
          hover: 0
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          max = _this$props.max,
          onChange = _this$props.onChange;
      var _this$state = this.state,
          score = _this$state.score,
          hover = _this$state.hover; // just round for score until halves are possible

      score = Math.round(score);

      if (hover > 0) {
        score = hover;
      }

      var stars = [];

      var _loop = function _loop(idx) {
        stars.push(_react.default.createElement("div", {
          onMouseOver: function onMouseOver(e) {
            _this3.onMouseOverStar(idx, e);
          },
          onClick: function onClick(e) {
            _this3.onClickStar(idx, e);
          },
          key: "star-".concat(idx),
          className: "star ".concat(score >= idx ? 'active' : '')
        }));
      };

      for (var idx = 1; idx <= max; idx++) {
        _loop(idx);
      }

      return _react.default.createElement("div", {
        className: "stars",
        onMouseLeave: function onMouseLeave(e) {
          _this3.onMouseLeave(e);
        }
      }, stars);
    }
  }]);
  return Stars;
}(_react.Component);

exports.default = Stars;
Stars.propTypes = {
  score: _propTypes.default.number,
  max: _propTypes.default.number,
  onChange: _propTypes.default.func,
  static: _propTypes.default.bool
};
Stars.defaultProps = {
  max: 5,
  score: 0,
  static: false,
  onChange: function onChange(score, e) {}
};