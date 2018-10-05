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

var StatsSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(StatsSlider, _Component);

  function StatsSlider() {
    (0, _classCallCheck2.default)(this, StatsSlider);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StatsSlider).apply(this, arguments));
  }

  (0, _createClass2.default)(StatsSlider, [{
    key: "render",
    value: function render() {
      var props = Object.assign({}, this.props);
      var statCards = [];
      var stats = props.stats,
          className = props.className;
      delete props.stats;
      delete props.className;
      stats.forEach(function (stat, idx) {
        statCards.push(_react.default.createElement("div", {
          key: "stat-".concat(idx),
          className: "stat__card"
        }, stat.dir !== 0 && _react.default.createElement("div", {
          className: "icon ".concat(stat.dir > 0 ? 'up' : '')
        }), _react.default.createElement("div", {
          className: "value"
        }, stat.value), _react.default.createElement("div", {
          className: "title"
        }, stat.title)));
      });
      return _react.default.createElement("div", {
        className: "stat__card__slider ".concat(className || '')
      }, _react.default.createElement("div", {
        className: "stat__card__slider__scroll"
      }, statCards));
    }
  }]);
  return StatsSlider;
}(_react.Component);

exports.default = StatsSlider;
StatsSlider.propTypes = {
  stats: _propTypes.default.array.isRequired
};
StatsSlider.defaultProps = {
  stats: []
};