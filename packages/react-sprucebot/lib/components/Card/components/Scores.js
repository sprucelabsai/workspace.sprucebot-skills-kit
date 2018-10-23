"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var ScorePanel = function ScorePanel(props) {
  var label = props.label,
      value = props.value;
  return _react.default.createElement("div", {
    className: "card__score"
  }, _react.default.createElement("p", {
    className: "card__score-label"
  }, label), _react.default.createElement("p", {
    className: "card__score-value"
  }, value));
};

var Scores = function Scores(props) {
  var scores = props.scores;
  return _react.default.createElement("div", {
    className: "card__scores"
  }, scores.map(function (score) {
    return _react.default.createElement(ScorePanel, (0, _extends2.default)({
      key: score.id
    }, score));
  }));
};

var _default = Scores;
exports.default = _default;