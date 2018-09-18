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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = _interopRequireDefault(require("../../skillskit/index"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _IconButton = _interopRequireDefault(require("../IconButton/IconButton"));

var _Typography = require("../Typography/Typography");

var _skillskit = _interopRequireDefault(require("../../skillskit"));

var dialogUnderlay = null;
var currentDialogs = [];
var dialogVerticalPadding = 30;
var timerRunning = false;

var Dialog =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Dialog, _Component);

  function Dialog(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Dialog);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Dialog).call(this, props)); //for callbacks

    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dialogHeight", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setIdx", function (idx) {
      _this.setState({
        dialogIndex: idx
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateIndexes", function () {
      var index = currentDialogs.length;
      currentDialogs.forEach(function (dialog, idx) {
        if (idx < index - 1) {
          dialog.blur();
        }

        dialog.setIdx(index - idx);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTapClose", function () {
      // because dialogs are shown/hidden by being conditionally rendered, we actually have no way of knowing how we should close unless someone tells us
      if (_this.props.onTapClose) {
        _this.closeDialog();

        _this.setState({
          focusClass: 'closed',
          opacity: 0
        }, function () {
          if (_this.props.onTapClose) {
            setTimeout(function () {
              _this.props.onTapClose();
            }, 500);
          }
        });
      }
    });
    _this.iframeMessageHandler = _this.iframeMessageHandler.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      focusClass: '',
      isHidden: true,
      scrollTop: 0,
      firstShow: true,
      opacity: 0,
      inIframe: true,
      dialogIndex: 0
    };
    return _this;
  }

  (0, _createClass2.default)(Dialog, [{
    key: "blur",
    value: function blur() {
      var _this2 = this;

      this.setState({
        focusClass: 'blurred'
      }, function () {
        setTimeout(function () {
          _this2.setState({
            isHidden: true
          });
        }, 500);
      });
    }
  }, {
    key: "focus",
    value: function focus() {
      var _this3 = this;

      this.setState({
        isHidden: false
      }, function () {
        setTimeout(function () {
          _this3.setState({
            focusClass: 'focused'
          }, function () {
            // Resize the skill
            setTimeout(function () {
              _this3.postHeight();
            }, 500);
          });
        }, 10);
      });
    }
  }, {
    key: "postHeight",
    value: function postHeight() {
      var height = 0;
      currentDialogs.forEach(function (dialog) {
        var node = _reactDom.default.findDOMNode(dialog.dialogNode);

        var styles = window.getComputedStyle(node);
        var margin = parseFloat(styles['marginTop']);
        var dialogHeight = Math.ceil(node.offsetHeight + margin);
        height = Math.max(dialogHeight, height);
      });

      if (currentDialogs.length > 0) {
        _skillskit.default.setMinBodyHeight(height);
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (typeof document !== 'undefined' && !dialogUnderlay) {
        dialogUnderlay = document.createElement('div');
        dialogUnderlay.className = 'dialog_underlay';
        dialogUnderlay.classList.add('hidden');
        document.body.appendChild(dialogUnderlay);
      }

      if (dialogUnderlay) {
        dialogUnderlay.classList.add('on');
        setTimeout(function () {
          dialogUnderlay.classList.remove('hidden');
        }, 10);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('message', this.iframeMessageHandler);

      if (this.state.firstShow) {
        this.requestScroll();
      }

      this.focus();
      currentDialogs.push(this);
      this.updateIndexes();

      _skillskit.default.showUnderlay();

      if (!timerRunning) {
        timerRunning = true;
        this.heightInterval = setInterval(function () {
          if (currentDialogs[0]) {
            currentDialogs[0].postHeight();
          }
        }, 300);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // in case our starting state is not showing
      if (this.state.firstShow) {
        this.requestScroll();
      }

      if (!this.state.inIframe) {
        dialogUnderlay.classList.add('not_in_iframe');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.style.minHeight = "auto";
      window.removeEventListener('message', this.iframeMessageHandler);
      this.closeDialog();

      if (this.heightInterval) {
        clearInterval(this.heightInterval);
        timerRunning = false;
      }
    }
  }, {
    key: "requestScroll",
    value: function requestScroll() {
      // we are not in the sb iframe
      if (window.top === window.self) {
        this.setState({
          opacity: 1,
          scrollTop: window.document.body.scrollTop,
          firstShow: false,
          inIframe: false
        });
      } else {
        _skillskit.default.requestScroll();
      }
    }
  }, {
    key: "iframeMessageHandler",
    value: function iframeMessageHandler(e) {
      try {
        var results = JSON.parse(e.data);

        if (this.state.firstShow && results.name === 'SkillContainer:ScrollTop') {
          var top = results.skillScrollTop < 0 ? Math.abs(results.skillScrollTop) : 0;
          this.setState({
            scrollTop: top,
            firstShow: false,
            opacity: 1
          });
        }
      } catch (err) {}
    }
  }, {
    key: "closeDialog",
    value: function closeDialog() {
      if (this.state.focusClass !== 'closed') {
        currentDialogs.pop();

        if (currentDialogs.length - 1 >= 0) {
          var nextDialog = currentDialogs[currentDialogs.length - 1];
          nextDialog.focus();

          var node = _reactDom.default.findDOMNode(this.dialogNode);

          _skillskit.default.scrollTo(node.offsetTop - dialogVerticalPadding);
        } else {
          dialogUnderlay.classList.add('hidden');

          _skillskit.default.hideUnderlay();

          setTimeout(function () {
            _skillskit.default.clearMinBodyHeight();

            dialogUnderlay.classList.remove('on');
          }, 300);
        }

        this.updateIndexes();
      } else {
        this.postHeight();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          tag = _this$props.tag,
          children = _this$props.children,
          className = _this$props.className,
          title = _this$props.title,
          onTapClose = _this$props.onTapClose,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["tag", "children", "className", "title", "onTapClose"]);
      var _this$state = this.state,
          opacity = _this$state.opacity,
          height = _this$state.height,
          inIframe = _this$state.inIframe,
          focusClass = _this$state.focusClass,
          isHidden = _this$state.isHidden,
          firstShow = _this$state.firstShow,
          dialogIndex = _this$state.dialogIndex;
      var Tag = tag;
      var dialogStyle = {
        marginTop: this.state.scrollTop + dialogVerticalPadding
      };
      var hasHeader = true; // always have a header, just won't show close/title if not supplied

      return typeof document !== 'undefined' && _reactDom.default.createPortal(_react.default.createElement("div", {
        className: "dialog__wrapper ".concat(focusClass, " ").concat(!firstShow ? 'was-focused' : '', " ").concat(isHidden ? 'hidden' : '', " dialog-").concat(dialogIndex),
        onClick: function onClick(e) {
          if (e.target.className.search('dialog__wrapper') > -1 && currentDialogs.length - 1 >= 0) {
            currentDialogs[currentDialogs.length - 1].handleTapClose();
          }
        }
      }, _react.default.createElement("div", (0, _extends2.default)({
        ref: function ref(node) {
          return _this4.dialogNode = node;
        },
        className: "dialog ".concat(className || '', " ").concat(hasHeader ? 'has_header' : ''),
        style: dialogStyle,
        opacity: opacity
      }, props), hasHeader && _react.default.createElement("div", {
        className: "dialog__header"
      }, title && _react.default.createElement(_Typography.H2, null, title), onTapClose && _react.default.createElement(_IconButton.default, {
        className: "btn__close_dialog",
        onClick: this.handleTapClose
      }, "close")), children)), dialogUnderlay);
    }
  }]);
  return Dialog;
}(_react.Component);

exports.default = Dialog;
Dialog.propTypes = {
  tag: _propTypes.default.string,
  onTapClose: _propTypes.default.func,
  title: _propTypes.default.string
};
Dialog.defaultProps = {
  tag: 'div'
};