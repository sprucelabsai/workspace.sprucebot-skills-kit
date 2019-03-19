"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactImageCrop = _interopRequireWildcard(require("react-image-crop"));

var _BotText = _interopRequireDefault(require("../BotText/BotText"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _exenv = _interopRequireDefault(require("exenv"));

var _Loader = _interopRequireDefault(require("../Loader/Loader"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SubmitWrapper = _interopRequireDefault(require("../SubmitWrapper/SubmitWrapper"));

var _exifOrientationImage = _interopRequireDefault(require("exif-orientation-image"));

var _classnames = _interopRequireDefault(require("classnames"));

if (_exenv.default.canUseDOM) {
  require('blueimp-canvas-to-blob');
}

var ImageCropper =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ImageCropper, _Component);

  function ImageCropper(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ImageCropper);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageCropper).call(this, props));
    _this.state = {
      errorMessage: '',
      base64Image: props.base64Image,
      crop: props.crop,
      pixelCrop: props.prop,
      changed: false,
      loading: !!props.src,
      // if there is an image src being passed, we have to actually fetch it
      tapToCrop: props.tapToCrop,
      uploading: false,
      newFile: false,
      type: props.src ? "image/".concat(props.src.split('.').pop()) : false,
      aspect: props.crop.aspect
    };
    return _this;
  }

  (0, _createClass2.default)(ImageCropper, [{
    key: "initiateFileUpload",
    value: function initiateFileUpload() {
      if (this.state.uploading) {
        return;
      }

      this.input.click();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // is browser out-to-date, Mayura???
      if (typeof FileReader === 'undefined') {
        this.setState({
          errorMessage: this.props.outOfDateBrowserMessage
        });
      } else {
        // setup file reader
        this.reader = new FileReader();
        this.reader.onload = this.onFileReaderLoadImage.bind(this);
        this.reader.onerror = this.onFileReaderLoadImageFail.bind(this);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var _this2 = this;

      var file = e.target.files[0];

      if (!file.type.match('image.*')) {
        alert(this.props.badImageMessage);
        return;
      }

      (0, _exifOrientationImage.default)(file, function (err, canvas) {
        if (!err) {
          _this2.setState({
            changed: true,
            newFile: true
          });

          canvas.toBlob(function (blob) {
            return _this2.reader.readAsDataURL(blob);
          });
        }
      });
    }
  }, {
    key: "onFileReaderLoadImage",
    value: function onFileReaderLoadImage(e) {
      var base64 = e.target.result;
      var type = base64.substr(5, base64.search(';') - 5);
      this.setState({
        loading: false,
        tapToCrop: false,
        errorMessage: false,
        base64Image: base64,
        type: type
      });
    }
  }, {
    key: "onFileReaderLoadImageFail",
    value: function onFileReaderLoadImageFail(err) {
      console.error(err);
      this.setState({
        errorMessage: this.props.uploadImageFailedMessage
      });
    }
  }, {
    key: "onCropChange",
    value: function onCropChange(crop, pixelCrop) {
      var maxWidth = window.innerWidth - 20;
      var maxHeight = window.innerHeight - 20;
      var x = window.event.x;
      var y = window.event.y;

      if (x > maxWidth || x < 20 || y < 20 || y > maxHeight) {
        this.cropper.onDocMouseTouchEnd();
      }

      this.setState({
        crop: crop,
        pixelCrop: pixelCrop,
        changed: true
      });
    }
  }, {
    key: "onImageLoadedFromCropper",
    value: function onImageLoadedFromCropper(image) {
      if (!this.cropper) {
        // this can happen when the cropper is hidden, then shown
        return;
      } else {
        var crop = this.state.crop;
        var pixelCrop = (0, _reactImageCrop.getPixelCrop)(image, crop);
        var widthHeight = image.height < image.width ? image.height / 2 : image.width / 2;
        var width = widthHeight / image.width * 100;
        var height = widthHeight / image.height * 100;
        crop.width = width;
        crop.height = height;
        crop.x = width >= height ? width / 2 : width;
        crop.y = width <= height ? height / 2 : height;

        if (this.state.aspect) {
          crop.aspect = this.state.aspect;
        }

        this.setState({
          crop: crop,
          pixelCrop: pixelCrop,
          loading: false
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.src !== this.props.src) {
        this.setState({
          type: "image/".concat(nextProps.src.split('.').pop()),
          base64Image: false,
          newFile: true,
          src: nextProps.src
        });
      }
    }
  }, {
    key: "hideBlock",
    value: function hideBlock() {
      this.setState({
        tapToCrop: false,
        crop: this.state.crop,
        changed: true
      });
    }
  }, {
    key: "onSave",
    value: function () {
      var _onSave = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var _this3 = this;

        var _this$state, pixelCrop, type, image, canvas, ctx, cropped;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state = this.state, pixelCrop = _this$state.pixelCrop, type = _this$state.type;

                if (!this.state.uploading) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                if (type) {
                  _context.next = 6;
                  break;
                }

                this.setState({
                  errorMessage: this.props.badImageMessage
                });
                return _context.abrupt("return");

              case 6:
                _context.prev = 6;
                this.setState({
                  uploading: true
                });
                _context.next = 10;
                return new Promise(function (resolve, reject) {
                  var image = new Image();

                  image.onload = function () {
                    resolve(image);
                  };

                  image.onerror = function (err) {
                    reject(err);
                  };

                  image.src = _this3.cropper.imageRef.src;
                });

              case 10:
                image = _context.sent;
                canvas = document.createElement('canvas');
                canvas.width = pixelCrop.width;
                canvas.height = pixelCrop.height;
                ctx = canvas.getContext('2d');
                ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
                cropped = canvas.toDataURL(type);
                _context.next = 19;
                return this.props.onSave(cropped, type);

              case 19:
                // reset things how they were
                this.setState({
                  tapToCrop: this.props.tapToCrop,
                  changed: false,
                  newFile: false,
                  base64Image: cropped
                });
                _context.next = 26;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](6);
                console.error(_context.t0);
                this.setState({
                  errorMessage: this.props.uploadImageFailedMessage
                });

              case 26:
                this.setState({
                  uploading: false
                });

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 22]]);
      }));

      function onSave() {
        return _onSave.apply(this, arguments);
      }

      return onSave;
    }()
  }, {
    key: "cancel",
    value: function cancel() {
      this.setState({
        tapToCrop: this.props.tapToCrop,
        crop: this.props.crop,
        changed: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          accept = _this$props.accept,
          uploadButtonText = _this$props.uploadButtonText,
          uploadNewButtonText = _this$props.uploadNewButtonText,
          saveButtonText = _this$props.saveButtonText,
          tapToCropButtonText = _this$props.tapToCropButtonText,
          cancelButtonText = _this$props.cancelButtonText,
          src = _this$props.src,
          className = _this$props.className,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["accept", "uploadButtonText", "uploadNewButtonText", "saveButtonText", "tapToCropButtonText", "cancelButtonText", "src", "className"]);
      var _this$state2 = this.state,
          uploading = _this$state2.uploading,
          base64Image = _this$state2.base64Image,
          crop = _this$state2.crop,
          loading = _this$state2.loading,
          changed = _this$state2.changed,
          tapToCrop = _this$state2.tapToCrop,
          errorMessage = _this$state2.errorMessage,
          newFile = _this$state2.newFile;
      var cropSrc = base64Image || src;
      var wrapperClassNames = (0, _classnames.default)('react_crop_wrapper', {
        loading: loading,
        tap_to_crop: tapToCrop
      });
      return _react.default.createElement("div", {
        className: "image_cropper"
      }, errorMessage && _react.default.createElement(_BotText.default, null, errorMessage), loading && _react.default.createElement(_Loader.default, null), !errorMessage && cropSrc && _react.default.createElement("div", {
        className: wrapperClassNames
      }, _react.default.createElement(_reactImageCrop.default, {
        ref: function ref(cropper) {
          return _this4.cropper = cropper;
        },
        keepSelection: true,
        onImageLoaded: this.onImageLoadedFromCropper.bind(this),
        src: cropSrc,
        crop: crop,
        onChange: this.onCropChange.bind(this)
      }), tapToCrop && _react.default.createElement("div", {
        className: "block"
      }, !loading && _react.default.createElement(_Button.default, {
        onClick: this.hideBlock.bind(this)
      }, tapToCropButtonText))), _react.default.createElement("input", {
        style: {
          display: 'none'
        },
        type: "file",
        ref: function ref(input) {
          _this4.input = input;
        },
        accept: accept,
        onChange: this.onChange.bind(this)
      }), !loading && _react.default.createElement(_SubmitWrapper.default, null, changed && !errorMessage && _react.default.createElement(_Button.default, {
        busy: uploading,
        onClick: this.onSave.bind(this),
        primary: true
      }, saveButtonText), changed && !newFile && !errorMessage && _react.default.createElement(_Button.default, {
        busy: uploading,
        onClick: this.cancel.bind(this),
        secondary: true
      }, cancelButtonText), _react.default.createElement(_Button.default, {
        busy: uploading,
        alt: true,
        onClick: this.initiateFileUpload.bind(this)
      }, src ? uploadNewButtonText : uploadButtonText)));
    }
  }]);
  return ImageCropper;
}(_react.Component);

exports.default = ImageCropper;
ImageCropper.propTypes = {
  base64Image: _propTypes.default.string,
  imageUrl: _propTypes.default.string,
  onSave: _propTypes.default.func.isRequired,
  badImageMessage: _propTypes.default.any.isRequired,
  outOfDateBrowserMessage: _propTypes.default.any.isRequired,
  uploadImageFailedMessage: _propTypes.default.any.isRequired,
  loadingImageFailedMessage: _propTypes.default.any.isRequired,
  uploadButtonText: _propTypes.default.any.isRequired,
  uploadNewButtonText: _propTypes.default.any.isRequired,
  tapToCropButtonText: _propTypes.default.any.isRequired,
  saveButtonText: _propTypes.default.any.isRequired,
  cancelButtonText: _propTypes.default.any.isRequired,
  accept: _propTypes.default.string.isRequired,
  crop: _propTypes.default.object.isRequired,
  tapToCrop: _propTypes.default.bool
};
ImageCropper.defaultProps = {
  accept: 'image/*',
  loadingImageFailedMessage: "Uh man, I couldn't load your image.",
  badImageMessage: 'Bad upload! You gotta select an image.',
  outOfDateBrowserMessage: 'You gotta update your browser to upload and crop images. ☹️',
  uploadImageFailedMessage: "So, this is embarrassing, but I could not upload that file and couldn't tell you why. 😞",
  uploadButtonText: 'Upload Image',
  uploadNewButtonText: 'Upload Different Image',
  saveButtonText: 'Save Changes',
  tapToCropButtonText: 'Tap to Re-Crop',
  cancelButtonText: 'Cancel Crop',
  tapToCrop: false,
  crop: {}
};