"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedAttachment = exports.FeedItem = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Loader = _interopRequireDefault(require("../Loader/Loader"));

var _BotText = _interopRequireDefault(require("../BotText/BotText"));

var _Avatar = _interopRequireDefault(require("../Avatar/Avatar"));

var _moment = _interopRequireDefault(require("moment"));

var _Typography = require("../Typography/Typography");

var Feed =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Feed, _Component);

  function Feed() {
    (0, _classCallCheck2.default)(this, Feed);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Feed).apply(this, arguments));
  }

  (0, _createClass2.default)(Feed, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          loading = _this$props.loading,
          data = _this$props.data,
          showHeaders = _this$props.showHeaders,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["loading", "data", "showHeaders"]);
      var lastDay = 0;
      return _react.default.createElement("div", (0, _extends2.default)({}, props, {
        className: "feed__wrapper ".concat(!showHeaders ? 'no_headers' : '')
      }), loading && _react.default.createElement(_Loader.default, null), data && data.map(function (item) {
        var day = (0, _moment.default)(item.date).dayOfYear();
        var header = undefined;

        if (showHeaders && day !== lastDay) {
          lastDay = day;
          header = (0, _moment.default)(item.date).isSame(new Date(), 'day') ? 'Today' : (0, _moment.default)(item.date).format('MMM Do');
        }

        return _react.default.createElement(FeedItem, (0, _extends2.default)({
          key: item.id
        }, item, {
          header: header
        }));
      }));
    }
  }]);
  return Feed;
}(_react.Component);

exports.default = Feed;
Feed.propTypes = {
  data: _propTypes.default.array,
  loading: _propTypes.default.bool,
  showHeaders: _propTypes.default.bool
};
Feed.defaultProps = {
  loading: false,
  showHeaders: true
};

var FeedItem =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(FeedItem, _Component2);

  function FeedItem() {
    (0, _classCallCheck2.default)(this, FeedItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FeedItem).apply(this, arguments));
  }

  (0, _createClass2.default)(FeedItem, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          bigAvatar = _this$props2.bigAvatar,
          header = _this$props2.header,
          user = _this$props2.user,
          message = _this$props2.message,
          date = _this$props2.date,
          attachments = _this$props2.attachments,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["bigAvatar", "header", "user", "message", "date", "attachments"]);
      var imageKey = bigAvatar ? 'profile150@2x' : 'profile60';
      return _react.default.createElement("div", (0, _extends2.default)({
        className: "feed__item ".concat(bigAvatar ? 'big_avatar' : '')
      }, props), header && _react.default.createElement(_Typography.SectionHeading, null, header), user && _react.default.createElement("div", {
        className: "feed__avatar"
      }, _react.default.createElement(_Avatar.default, {
        top: bigAvatar,
        image: user.User.profileImages ? user.User.profileImages[imageKey] : user.User.defaultProfileImages[imageKey]
      })), _react.default.createElement(_BotText.default, null, message, _react.default.createElement("span", {
        className: "date"
      }, (0, _moment.default)(date).calendar())), this.props.attachments && _react.default.createElement("div", {
        className: "feed__attachments"
      }, attachments.map(function (attachment, idx) {
        return _react.default.createElement(FeedAttachment, (0, _extends2.default)({
          key: "attachment-".concat(idx)
        }, attachment));
      })));
    }
  }]);
  return FeedItem;
}(_react.Component);

exports.FeedItem = FeedItem;
FeedItem.propTypes = {
  header: _propTypes.default.string,
  date: _propTypes.default.object.isRequired,
  message: _propTypes.default.string.isRequired,
  user: _propTypes.default.object,
  attachments: _propTypes.default.array,
  bigAvatar: _propTypes.default.bool
};

var FeedAttachment =
/*#__PURE__*/
function (_Component3) {
  (0, _inherits2.default)(FeedAttachment, _Component3);

  function FeedAttachment() {
    (0, _classCallCheck2.default)(this, FeedAttachment);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FeedAttachment).apply(this, arguments));
  }

  (0, _createClass2.default)(FeedAttachment, [{
    key: "render",
    value: function render() {
      var fullWidth = this.props.fullWidth;
      var className = fullWidth ? 'full-width' : '';
      return _react.default.createElement("div", {
        className: "feed__attachment ".concat(className)
      }, _react.default.createElement("div", {
        className: "title"
      }, this.props.title), _react.default.createElement("div", {
        className: "value"
      }, this.props.value));
    }
  }]);
  return FeedAttachment;
}(_react.Component);

exports.FeedAttachment = FeedAttachment;
FeedAttachment.propTypes = {
  title: _propTypes.default.string.isRequired,
  value: _propTypes.default.any.isRequired,
  fullWidth: _propTypes.default.bool
};