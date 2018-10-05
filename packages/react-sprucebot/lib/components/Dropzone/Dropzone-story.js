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

var _Dropzone = _interopRequireDefault(require("./Dropzone"));

var DropzoneExample =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DropzoneExample, _Component);

  function DropzoneExample() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DropzoneExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DropzoneExample)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      uploadProgress: 0,
      fileWasUploaded: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "fakeUpload", function () {
      var uploadProgress = _this.state.uploadProgress;

      if (uploadProgress >= 100) {
        clearInterval(_this.interval);

        _this.setState({
          uploadProgress: 0,
          fileWasUploaded: true
        });
      } else {
        _this.setState(function (prevState) {
          return {
            uploadProgress: prevState.uploadProgress + 1
          };
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDropAccepted", function () {
      _this.interval = setInterval(_this.fakeUpload, 10);
    });
    return _this;
  }

  (0, _createClass2.default)(DropzoneExample, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          uploadProgress = _this$state.uploadProgress,
          fileWasUploaded = _this$state.fileWasUploaded;
      return _react.default.createElement(_Dropzone.default, {
        id: "photos",
        label: (0, _react3.text)('Label', 'Profile Photo'),
        accept: "image/*",
        onDropAccepted: this.onDropAccepted,
        buttonText: (0, _react3.text)('Button Text', 'Upload an Image'),
        fileWasUploaded: fileWasUploaded,
        uploadProgress: uploadProgress,
        error: "Please upload an image file.",
        isSmall: (0, _react3.boolean)('Small', false),
        isCircular: (0, _react3.boolean)('Circular', false)
      });
    }
  }]);
  return DropzoneExample;
}(_react.Component);

var stories = (0, _react2.storiesOf)('Dropzone', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Dropzone', function () {
  return _react.default.createElement(_Container.default, {
    size: "small",
    center: true
  }, _react.default.createElement(DropzoneExample, null));
});