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

var _reactAvatarEditor = _interopRequireDefault(require("react-avatar-editor"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _Dropzone = _interopRequireWildcard(require("../Dropzone/Dropzone"));

var _Forms = require("../Forms");

// NOTE: Relies on https://github.com/mosch/react-avatar-editor
var RotateLeftIcon = function RotateLeftIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M3.434 10.537a8.78 8.78 0 0 1 .523-1.274M3.069 14.425a9.006 9.006 0 0 1-.028-1.983M4.389 18.111a9 9 0 0 1-.843-1.711M7.163 20.9a9.033 9.033 0 0 1-1.506-1.2M10.98 22.248a8.974 8.974 0 0 1-1.909-.431M10 4.25h2a9.029 9.029 0 0 1 .995 18",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M13.5 1.75L10 4.25l3.5 2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

RotateLeftIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var RotateRightIcon = function RotateRightIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M20.566 10.537a8.782 8.782 0 0 0-.523-1.274M20.931 14.425a8.998 8.998 0 0 0 .028-1.983M19.611 18.111c.341-.54.624-1.114.843-1.713M16.837 20.9a9.03 9.03 0 0 0 1.506-1.2M13.02 22.248a8.972 8.972 0 0 0 1.909-.431M14 4.25h-2a9.029 9.029 0 0 0-.995 18",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M10.5 1.75l3.5 2.5-3.5 2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

RotateRightIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var ImageCropper =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ImageCropper, _Component);

  function ImageCropper() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ImageCropper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ImageCropper)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      scale: 1,
      rotate: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleScale", function (e) {
      var newVal = e.currentTarget.value;

      _this.setState({
        scale: newVal / 100
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRotate", function (dir) {
      _this.setState(function (prevState) {
        var newRotate = dir === 'left' ? prevState.rotate - 90 : prevState.rotate + 90;
        return {
          rotate: newRotate
        };
      });
    });
    return _this;
  }

  (0, _createClass2.default)(ImageCropper, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          image = _this$props.image,
          width = _this$props.width,
          height = _this$props.height,
          isCircular = _this$props.isCircular,
          dropzoneProps = _this$props.dropzoneProps,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["image", "width", "height", "isCircular", "dropzoneProps"]);
      var _this$state = this.state,
          scale = _this$state.scale,
          rotate = _this$state.rotate;
      return _react.default.createElement("div", {
        className: "image-cropper"
      }, _react.default.createElement("div", {
        className: "image-cropper__dropzone-wrapper"
      }, image ? _react.default.createElement(_reactAvatarEditor.default, (0, _extends2.default)({
        image: image,
        width: width,
        height: height,
        scale: scale,
        rotate: rotate,
        border: 0,
        borderRadius: isCircular ? 100 : 0,
        color: [255, 255, 255, 1]
      }, rest)) : _react.default.createElement(_Dropzone.default, dropzoneProps)), _react.default.createElement("div", {
        className: "image-cropper__controls-row"
      }, _react.default.createElement(_Button.default, {
        kind: "secondary",
        className: "image-cropper__rotate-btn",
        text: "Rotate Left",
        icon: _react.default.createElement(RotateLeftIcon, {
          className: "btn__line-icon"
        }),
        disabled: !image,
        onClick: function onClick() {
          return _this2.handleRotate('left');
        }
      }), _react.default.createElement(_Button.default, {
        kind: "secondary",
        className: "image-cropper__rotate-btn",
        text: "Rotate Right",
        icon: _react.default.createElement(RotateRightIcon, {
          className: "btn__line-icon"
        }),
        disabled: !image,
        onClick: function onClick() {
          return _this2.handleRotate('right');
        }
      })), _react.default.createElement("div", {
        className: "image-cropper__controls-row"
      }, _react.default.createElement(_Forms.Slider, {
        label: "Scale",
        id: "scale",
        min: "100",
        max: "200",
        value: 100,
        postLabel: "".concat(Math.round(scale * 100), "%"),
        disabled: !image,
        onChange: this.handleScale
      })), _react.default.createElement("div", {
        className: "image-cropper__controls-row"
      }, _react.default.createElement(_Button.default, {
        kind: "primary",
        isFullWidth: true,
        text: "Save Image",
        disabled: !image
      })));
    }
  }]);
  return ImageCropper;
}(_react.Component);

exports.default = ImageCropper;