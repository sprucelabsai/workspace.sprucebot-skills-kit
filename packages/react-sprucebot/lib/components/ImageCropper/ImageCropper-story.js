"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _ImageCropper = _interopRequireDefault(require("./ImageCropper"));

var AvatarIcon = function AvatarIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M26.833 27.833a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v26a1 1 0 0 1-1 1h-26a1 1 0 0 1-1-1v-26z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M36.458 39.667a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M54.833 49.584l-5.579-8.37a1.75 1.75 0 0 0-2.89-.033l-4.667 6.653-2.884-2.308a1.752 1.752 0 0 0-2.55.397l-5.93 8.91",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M17.5 21c5.477 0 9.917-4.44 9.917-9.917 0-5.476-4.44-9.916-9.917-9.916-5.477 0-9.917 4.44-9.917 9.916C7.583 16.56 12.023 21 17.5 21z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M19.833 24.666A16.345 16.345 0 0 0 1.167 40.833h18.666",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

AvatarIcon.defaultProps = {
  width: "56",
  height: "56",
  viewBox: "0 0 56 56",
  xmlns: "http://www.w3.org/2000/svg"
};

var ShopIcon = function ShopIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M8.608 4.667c-.968 0-1.835.598-2.18 1.502L2.74 15.848a4.667 4.667 0 0 0-.032 3.232 6.42 6.42 0 0 0 12.46-2.163 6.417 6.417 0 1 0 12.833 0 6.417 6.417 0 1 0 12.833 0 6.419 6.419 0 0 0 12.46 2.163 4.652 4.652 0 0 0-.035-3.232l-3.686-9.679a2.333 2.333 0 0 0-2.18-1.502H8.608zM11.566 30.833a.5.5 0 0 1 .5-.5H27.4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5H12.066a.5.5 0 0 1-.5-.5v-13z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M32.566 51.333V31.5c0-.644.523-1.167 1.167-1.167h9.333c.645 0 1.167.523 1.167 1.167v19.833",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M48.9 23.118V49a2.333 2.333 0 0 1-2.334 2.333H9.233A2.333 2.333 0 0 1 6.9 49V23.062",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

ShopIcon.defaultProps = {
  width: "56",
  height: "56",
  viewBox: "0 0 56 56",
  xmlns: "http://www.w3.org/2000/svg"
};
var stories = (0, _react2.storiesOf)('ImageCropper', module);

var ImageCropperExample =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ImageCropperExample, _Component);

  function ImageCropperExample() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ImageCropperExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ImageCropperExample)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      image: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDrop", function (files) {
      files.forEach(function (file) {
        var reader = new FileReader();

        reader.onload = function () {
          var fileAsDataURL = reader.result;

          _this.setState({
            image: fileAsDataURL
          });
        };

        reader.readAsDataURL(file);
      });
    });
    return _this;
  }

  (0, _createClass2.default)(ImageCropperExample, [{
    key: "render",
    value: function render() {
      var image = this.state.image;
      var _this$props = this.props,
          isCircular = _this$props.isCircular,
          width = _this$props.width,
          height = _this$props.height;
      return _react.default.createElement(_Container.default, {
        size: "small"
      }, _react.default.createElement(_ImageCropper.default, {
        image: (0, _react3.boolean)('With Image', true) ? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=320&h=320&q=80' : image,
        width: width,
        height: height,
        isCircular: isCircular,
        dropzoneProps: {
          id: 'dropzone',
          onDrop: function onDrop() {
            return console.log('onDrop');
          },
          onDragEnter: function onDragEnter() {
            return console.log('onDragEnter');
          },
          onDragStart: function onDragStart() {
            return console.log('onDragStart');
          },
          onDragOver: function onDragOver() {
            return console.log('onDragOver');
          },
          onDragLeave: function onDragLeave() {
            return console.log('onDragLeave');
          },
          onDropAccepted: this.handleDrop,
          buttonText: 'Add Image',
          isSmall: true,
          isCircular: isCircular,
          error: 'Upload an image',
          defaultIcon: isCircular ? _react.default.createElement(AvatarIcon, {
            className: "dropzone__icon"
          }) : _react.default.createElement(ShopIcon, {
            className: "dropzone__icon"
          })
        },
        color: [249, 250, 252, 1]
      }));
    }
  }]);
  return ImageCropperExample;
}(_react.Component);

stories.addDecorator(_react3.withKnobs);
stories.add('Avatar', function () {
  return _react.default.createElement(ImageCropperExample, {
    width: (0, _react3.number)('Width', 160),
    height: (0, _react3.number)('Height', 160),
    isCircular: (0, _react3.boolean)('Circular', true)
  });
});