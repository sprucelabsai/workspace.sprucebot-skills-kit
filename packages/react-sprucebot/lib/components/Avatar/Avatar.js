"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Avatar = function Avatar(props) {
  var image = props.image,
      alt = props.alt,
      isLarge = props.isLarge,
      isVertical = props.isVertical,
      showIndicator = props.showIndicator,
      status = props.status,
      name = props.name,
      text = props.text,
      width = props.width,
      height = props.height;
  var wrapperClass = (0, _classnames.default)('avatar-wrapper', {
    'avatar-wrapper-large': isLarge,
    'avatar-wrapper-has-text': text,
    'avatar-wrapper-vertical': isVertical
  });
  var indicatorClass = (0, _classnames.default)('avatar__indicator', {
    'avatar__indicator--is-online': status === 'online'
  });
  var imgWidth = 40;
  var imgHeight = 40;

  if (isLarge) {
    imgWidth = 96;
    imgHeight = 96;
  }

  if (width) {
    imgWidth = width;
  }

  if (height) {
    imgHeight = height;
  }

  return _react.default.createElement("div", {
    className: wrapperClass
  }, _react.default.createElement("div", {
    className: "avatar__image-wrapper"
  }, _react.default.createElement("img", {
    className: "avatar",
    src: image,
    alt: alt,
    width: imgWidth,
    height: imgHeight
  }), showIndicator && _react.default.createElement("div", {
    className: indicatorClass
  })), (name || text) && _react.default.createElement("div", {
    className: "avatar__text-wrapper"
  }, name && _react.default.createElement("p", {
    className: "avatar__name"
  }, name), text && _react.default.createElement("p", {
    className: "avatar__text"
  }, text)));
};

Avatar.defaultProps = {
  isLarge: false,
  isVertical: false,
  showIndicator: false,
  status: 'offline',
  name: '',
  text: '',
  width: null,
  height: null
};
var _default = Avatar;
exports.default = _default;