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
      return _react.default.createElement(_Container.default, {
        size: "small"
      }, _react.default.createElement(_ImageCropper.default, {
        image: (0, _react3.boolean)('With Image', true) ? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=320&h=320&q=80' : image,
        width: 160,
        height: 160,
        isCircular: true,
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
          isCircular: true,
          error: 'Upload an image'
        },
        color: [249, 250, 252, 1]
      }));
    }
  }]);
  return ImageCropperExample;
}(_react.Component);

stories.addDecorator(_react3.withKnobs);
stories.add('Avatar', function () {
  return _react.default.createElement(ImageCropperExample, null);
});