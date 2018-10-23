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

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FormPartials = require("../Forms/FormPartials");

var _Button = _interopRequireDefault(require("../Button/Button"));

var DefaultIcon = function DefaultIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M24.5 54.833h-21a2.333 2.333 0 0 1-2.333-2.334v-49A2.333 2.333 0 0 1 3.5 1.166h31.017c.62 0 1.213.248 1.65.686l8.65 8.647c.437.438.683 1.031.683 1.65v7.684M20.855 36.096a11.667 11.667 0 1 1 12.297-15.53",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M22.167 17.502v7h4.666",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M40.833 54.836c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M40.833 47.836v-14M40.833 33.836l-5.25 5.25M40.833 33.836l5.25 5.25",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

DefaultIcon.defaultProps = {
  width: "56",
  height: "56",
  viewBox: "0 0 56 56",
  xmlns: "http://www.w3.org/2000/svg"
};

var UploadedIcon = function UploadedIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M24.5 54.833h-21a2.333 2.333 0 0 1-2.333-2.334v-49A2.333 2.333 0 0 1 3.5 1.166h31.017c.62 0 1.213.248 1.65.686l8.65 8.647c.437.438.683 1.031.683 1.65v7.684M21.098 36.119A11.667 11.667 0 1 1 33.6 22.165",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M22.167 17.502v7h4.666",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M40.833 54.836c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M47.073 36.764l-6.779 9.039a1.752 1.752 0 0 1-2.639.187l-3.5-3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

UploadedIcon.defaultProps = {
  width: "56",
  height: "56",
  viewBox: "0 0 56 56",
  xmlns: "http://www.w3.org/2000/svg"
};

var DropIcon = function DropIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M38.656 53.605c-.154.623-.466.642-.7.042l-9.165-24.115c-.233-.6.077-.905.677-.681l24.215 9.081c.6.233.583.537-.04.7L41.575 41.65l-2.919 11.956z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M47.322 28.973c-.098.422-.198.844-.31 1.264M29.115 47.268c-.966.119-1.918.354-2.89.38M19.273 47.133a23.243 23.243 0 0 1-5.467-1.989M9.06 41.92a23.867 23.867 0 0 1-3.87-4.34M2.147 31.303a24.065 24.065 0 0 1-.98-5.733M1.561 19.834a23.675 23.675 0 0 1 1.867-5.512M7.34 8.566a22.798 22.798 0 0 1 4.448-3.748M16.961 2.319c.908-.35 1.867-.518 2.8-.78.97-.119 1.923-.352 2.896-.373M29.61 1.666a23.238 23.238 0 0 1 5.467 1.986M39.82 6.887a23.727 23.727 0 0 1 3.874 4.342M46.737 17.5c.557 1.864.886 3.79.98 5.733",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

DropIcon.defaultProps = {
  width: "56",
  height: "56",
  viewBox: "0 0 56 56",
  xmlns: "http://www.w3.org/2000/svg"
};

var WarnIcon = function WarnIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M52.624 48.247c.313.4.334.932.051 1.35-.282.418-.812.64-1.342.56H4.667c-.53.08-1.06-.142-1.342-.56a1.132 1.132 0 0 1 .051-1.35L26.957 5.064c.574-1.051 1.512-1.051 2.086 0l23.58 43.183z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M28 36.279V21.322M27.979 40.55a.6.6 0 0 0-.406.165.502.502 0 0 0-.156.38c.012.292.273.523.592.524h.012a.6.6 0 0 0 .406-.164.501.501 0 0 0 .156-.38c-.012-.29-.268-.519-.583-.524h-.012",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

WarnIcon.defaultProps = {
  width: "56",
  height: "52",
  viewBox: "0 0 56 52",
  xmlns: "http://www.w3.org/2000/svg"
};

var Dropzone =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Dropzone, _Component);

  function Dropzone() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Dropzone);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Dropzone)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDragEnter", function (e) {
      var onDragEnter = _this.props.onDragEnter;

      if (onDragEnter) {
        onDragEnter();
      }

      _this.setState({
        userCanDrop: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDragLeave", function () {
      var onDragLeave = _this.props.onDragLeave;

      if (onDragLeave) {
        onDragLeave();
      }

      _this.setState({
        userCanDrop: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDragOver", function () {
      var onDragOver = _this.props.onDragOver;

      if (onDragOver) {
        onDragOver();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDragStart", function () {
      var onDragStart = _this.props.onDragStart;

      if (onDragStart) {
        onDragStart();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDrop", function () {
      var onDrop = _this.props.onDrop;

      if (onDrop) {
        onDrop();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDropAccepted", function () {
      var onDropAccepted = _this.props.onDropAccepted;
      onDropAccepted();

      _this.setState({
        userCanDrop: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDropRejected", function () {
      var onDropRejected = _this.props.onDropRejected;

      if (onDropRejected) {
        onDropRejected();
      }

      _this.setState({
        userCanDrop: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onFileDialogCancel", function () {
      var onFileDialogCancel = _this.props.onFileDialogCancel;

      if (onFileDialogCancel) {
        onFileDialogCancel();
      }
    });
    return _this;
  }

  (0, _createClass2.default)(Dropzone, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          id = _this$props.id,
          label = _this$props.label,
          postLabel = _this$props.postLabel,
          onDrop = _this$props.onDrop,
          buttonText = _this$props.buttonText,
          error = _this$props.error,
          isSmall = _this$props.isSmall,
          isCircular = _this$props.isCircular,
          fileWasUploaded = _this$props.fileWasUploaded,
          uploadProgress = _this$props.uploadProgress,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["id", "label", "postLabel", "onDrop", "buttonText", "error", "isSmall", "isCircular", "fileWasUploaded", "uploadProgress"]);
      var defaultClass = (0, _classnames.default)('dropzone', {
        'dropzone-small': isSmall,
        'dropzone-circular': isCircular
      });
      return _react.default.createElement(_react.Fragment, null, label && _react.default.createElement(_FormPartials.InputPre, {
        id: id,
        label: label,
        postLabel: postLabel
      }), _react.default.createElement(_reactDropzone.default, (0, _extends2.default)({
        ref: function ref(_ref2) {
          return _this2.dropzone = _ref2;
        },
        className: defaultClass,
        activeClassName: "dropzone--is-hovered",
        rejectClassName: "dropzone--has-error",
        disabledClassName: "dropzone--is-disabled",
        onDragEnter: this.onDragEnter,
        onDragLeave: this.onDragLeave,
        onDragOver: this.onDragOver,
        onDragStart: this.onDragStart,
        onDrop: this.onDrop,
        onDropAccepted: this.onDropAccepted,
        onDropRejected: this.onDropRejected,
        onFileDialogCancel: this.onFileDialogCancel,
        disabled: !!uploadProgress
      }, rest), function (_ref) {
        var isDragAccept = _ref.isDragAccept,
            isDragReject = _ref.isDragReject;
        return _react.default.createElement(_react.Fragment, null, !!uploadProgress && _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", {
          className: "dropzone__helper-text"
        }, "Uploading\u2026"), _react.default.createElement("div", {
          className: "dropzone__uploading-progress-wrapper"
        }, _react.default.createElement("div", {
          className: "dropzone__uploading-progress",
          style: {
            width: "".concat(uploadProgress, "%")
          }
        }))), _react.default.createElement("div", {
          className: "dropzone__icons"
        }, !uploadProgress && !isDragAccept && !isDragReject && _react.default.createElement(_react.Fragment, null, fileWasUploaded ? _react.default.createElement(UploadedIcon, {
          className: "dropzone__icon dropzone__did-upload-icon"
        }) : _react.default.createElement(DefaultIcon, {
          className: "dropzone__icon"
        })), isDragAccept && _react.default.createElement(DropIcon, {
          className: "dropzone__icon dropzone__allow-drop-icon"
        }), isDragReject && _react.default.createElement(WarnIcon, {
          className: "dropzone__icon dropzone__warn-drop-icon"
        })), _react.default.createElement(_Button.default, {
          kind: isSmall ? 'simple' : 'secondary',
          isSmall: isSmall,
          text: buttonText,
          className: "dropzone__btn",
          disabled: !!uploadProgress
        }), !isCircular && _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", {
          className: "dropzone__text"
        }, "or drop files to upload"), isDragAccept && _react.default.createElement("p", {
          className: "dropzone__helper-text-bottom dropzone__helper-text-accepted"
        }, "Drop files to upload them"), isDragReject && _react.default.createElement("p", {
          className: "dropzone__helper-text-bottom dropzone__helper-text-rejected"
        }, error)));
      }));
    }
  }]);
  return Dropzone;
}(_react.Component);

exports.default = Dropzone;
(0, _defineProperty2.default)(Dropzone, "defaultProps", {
  fileWasUploaded: false,
  isSmall: false,
  isCircular: false
});