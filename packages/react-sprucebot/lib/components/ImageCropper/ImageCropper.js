'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImageCrop = require('react-image-crop');

var _reactImageCrop2 = _interopRequireDefault(_reactImageCrop);

var _BotText = require('../BotText/BotText');

var _BotText2 = _interopRequireDefault(_BotText);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _exenv = require('exenv');

var _exenv2 = _interopRequireDefault(_exenv);

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SubmitWrapper = require('../SubmitWrapper/SubmitWrapper');

var _SubmitWrapper2 = _interopRequireDefault(_SubmitWrapper);

var _exifOrientationImage = require('exif-orientation-image');

var _exifOrientationImage2 = _interopRequireDefault(_exifOrientationImage);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (_exenv2.default.canUseDOM) {
	require('blueimp-canvas-to-blob');
}

var ImageCropper = function (_Component) {
	_inherits(ImageCropper, _Component);

	function ImageCropper(props) {
		_classCallCheck(this, ImageCropper);

		var _this = _possibleConstructorReturn(this, (ImageCropper.__proto__ || Object.getPrototypeOf(ImageCropper)).call(this, props));

		_this.state = {
			errorMessage: '',
			base64Image: props.base64Image,
			crop: props.crop,
			pixelCrop: props.prop,
			changed: false,
			loading: !!props.src, // if there is an image src being passed, we have to actually fetch it
			tapToCrop: props.tapToCrop,
			uploading: false,
			newFile: false,
			type: props.src ? 'image/' + props.src.split('.').pop() : false,
			aspect: props.crop.aspect
		};
		return _this;
	}

	_createClass(ImageCropper, [{
		key: 'initiateFileUpload',
		value: function initiateFileUpload() {
			if (this.state.uploading) {
				return;
			}
			this.input.click();
		}
	}, {
		key: 'componentDidMount',
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
		key: 'onChange',
		value: function onChange(e) {
			var _this2 = this;

			var file = e.target.files[0];
			if (!file.type.match('image.*')) {
				alert(this.props.badImageMessage);
				return;
			}

			(0, _exifOrientationImage2.default)(file, function (err, canvas) {
				if (!err) {
					_this2.setState({ changed: true, newFile: true });
					canvas.toBlob(function (blob) {
						return _this2.reader.readAsDataURL(blob);
					});
				}
			});
		}
	}, {
		key: 'onFileReaderLoadImage',
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
		key: 'onFileReaderLoadImageFail',
		value: function onFileReaderLoadImageFail(err) {
			console.error(err);
			this.setState({ errorMessage: this.props.uploadImageFailedMessage });
		}
	}, {
		key: 'onCropChange',
		value: function onCropChange(crop, pixelCrop) {
			var maxWidth = window.innerWidth - 20;
			var maxHeight = window.innerHeight - 20;
			var x = window.event.x;
			var y = window.event.y;

			if (x > maxWidth || x < 20 || y < 20 || y > maxHeight) {
				this.cropper.onDocMouseTouchEnd();
			}
			this.setState({ crop: crop, pixelCrop: pixelCrop, changed: true });
		}
	}, {
		key: 'onImageLoadedFromCropper',
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
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.src !== this.props.src) {
				this.setState({
					type: 'image/' + nextProps.src.split('.').pop(),
					base64Image: false,
					newFile: true,
					src: nextProps.src
				});
			}
		}
	}, {
		key: 'hideBlock',
		value: function hideBlock() {
			this.setState({ tapToCrop: false, crop: this.state.crop, changed: true });
		}
	}, {
		key: 'onSave',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var _this3 = this;

				var _state, pixelCrop, type, image, canvas, ctx, cropped;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_state = this.state, pixelCrop = _state.pixelCrop, type = _state.type;

								if (!this.state.uploading) {
									_context.next = 3;
									break;
								}

								return _context.abrupt('return');

							case 3:
								if (type) {
									_context.next = 6;
									break;
								}

								this.setState({
									errorMessage: this.props.badImageMessage
								});
								return _context.abrupt('return');

							case 6:
								_context.prev = 6;

								this.setState({ uploading: true });

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
								_context.t0 = _context['catch'](6);

								console.error(_context.t0);
								this.setState({ errorMessage: this.props.uploadImageFailedMessage });

							case 26:

								this.setState({ uploading: false });

							case 27:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[6, 22]]);
			}));

			function onSave() {
				return _ref.apply(this, arguments);
			}

			return onSave;
		}()
	}, {
		key: 'cancel',
		value: function cancel() {
			this.setState({
				tapToCrop: this.props.tapToCrop,
				crop: this.props.crop,
				changed: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props,
			    accept = _props.accept,
			    uploadButtonText = _props.uploadButtonText,
			    uploadNewButtonText = _props.uploadNewButtonText,
			    saveButtonText = _props.saveButtonText,
			    tapToCropButtonText = _props.tapToCropButtonText,
			    cancelButtonText = _props.cancelButtonText,
			    src = _props.src,
			    className = _props.className,
			    props = _objectWithoutProperties(_props, ['accept', 'uploadButtonText', 'uploadNewButtonText', 'saveButtonText', 'tapToCropButtonText', 'cancelButtonText', 'src', 'className']);

			var _state2 = this.state,
			    uploading = _state2.uploading,
			    base64Image = _state2.base64Image,
			    crop = _state2.crop,
			    loading = _state2.loading,
			    changed = _state2.changed,
			    tapToCrop = _state2.tapToCrop,
			    errorMessage = _state2.errorMessage,
			    newFile = _state2.newFile;


			var cropSrc = base64Image || src;
			var wrapperClassNames = (0, _classnames2.default)('react_crop_wrapper', {
				loading: loading,
				tap_to_crop: tapToCrop
			});

			return _react2.default.createElement(
				'div',
				{ className: 'image_cropper' },
				errorMessage && _react2.default.createElement(
					_BotText2.default,
					null,
					errorMessage
				),
				loading && _react2.default.createElement(_Loader2.default, null),
				!errorMessage && cropSrc && _react2.default.createElement(
					'div',
					{ className: wrapperClassNames },
					_react2.default.createElement(_reactImageCrop2.default, {
						ref: function ref(cropper) {
							return _this4.cropper = cropper;
						},
						keepSelection: true,
						onImageLoaded: this.onImageLoadedFromCropper.bind(this),
						src: cropSrc,
						crop: crop,
						onChange: this.onCropChange.bind(this)
					}),
					tapToCrop && _react2.default.createElement(
						'div',
						{ className: 'block' },
						!loading && _react2.default.createElement(
							_Button2.default,
							{ onClick: this.hideBlock.bind(this) },
							tapToCropButtonText
						)
					)
				),
				_react2.default.createElement('input', {
					style: { display: 'none' },
					type: 'file',
					ref: function ref(input) {
						_this4.input = input;
					},
					accept: accept,
					onChange: this.onChange.bind(this)
				}),
				!loading && _react2.default.createElement(
					_SubmitWrapper2.default,
					null,
					changed && !errorMessage && _react2.default.createElement(
						_Button2.default,
						{
							busy: uploading,
							onClick: this.onSave.bind(this),
							primary: true
						},
						saveButtonText
					),
					changed && !newFile && !errorMessage && _react2.default.createElement(
						_Button2.default,
						{
							busy: uploading,
							onClick: this.cancel.bind(this),
							secondary: true
						},
						cancelButtonText
					),
					_react2.default.createElement(
						_Button2.default,
						{
							busy: uploading,
							alt: true,
							onClick: this.initiateFileUpload.bind(this)
						},
						src ? uploadNewButtonText : uploadButtonText
					)
				)
			);
		}
	}]);

	return ImageCropper;
}(_react.Component);

exports.default = ImageCropper;


ImageCropper.propTypes = {
	base64Image: _propTypes2.default.string,
	imageUrl: _propTypes2.default.string,
	onSave: _propTypes2.default.func.isRequired,
	badImageMessage: _propTypes2.default.any.isRequired,
	outOfDateBrowserMessage: _propTypes2.default.any.isRequired,
	uploadImageFailedMessage: _propTypes2.default.any.isRequired,
	loadingImageFailedMessage: _propTypes2.default.any.isRequired,
	uploadButtonText: _propTypes2.default.any.isRequired,
	uploadNewButtonText: _propTypes2.default.any.isRequired,
	tapToCropButtonText: _propTypes2.default.any.isRequired,
	saveButtonText: _propTypes2.default.any.isRequired,
	cancelButtonText: _propTypes2.default.any.isRequired,
	accept: _propTypes2.default.string.isRequired,
	crop: _propTypes2.default.object.isRequired,
	tapToCrop: _propTypes2.default.bool
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