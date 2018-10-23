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

var _Modal = _interopRequireDefault(require("./Modal"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _Forms = require("../Forms");

var ModalExample =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ModalExample, _Component);

  function ModalExample() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ModalExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ModalExample)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isOpen: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleVisibility", function () {
      _this.setState(function (prevState) {
        return {
          isOpen: !prevState.isOpen
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onAfterOpen", function () {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onRequestClose", function () {
      _this.setState({
        isOpen: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(ModalExample, [{
    key: "render",
    value: function render() {
      var isOpen = this.state.isOpen;
      var _this$props = this.props,
          title = _this$props.title,
          canGoBack = _this$props.canGoBack,
          hasSecondaryButton = _this$props.hasSecondaryButton,
          includeFooter = _this$props.includeFooter;
      return _react.default.createElement(_Container.default, null, _react.default.createElement(_Button.default, {
        kind: "secondary",
        text: "Give me modal",
        onClick: this.toggleVisibility
      }), _react.default.createElement(_Modal.default, {
        isOpen: isOpen,
        onAfterOpen: this.onAfterOpen,
        onRequestClose: this.onRequestClose,
        isSmall: true
      }, _react.default.createElement(_Modal.default.Header, {
        title: title,
        onRequestClose: this.onRequestClose,
        handleGoBack: canGoBack ? function () {
          return console.log('take me home');
        } : null
      }), _react.default.createElement("form", null, _react.default.createElement(_Modal.default.Body, null, _react.default.createElement(_Forms.FormRow, null, _react.default.createElement(_Forms.TextInput, {
        label: "Category Name",
        placeholder: "i.e. Barber"
      })), _react.default.createElement(_Forms.FormRow, null, _react.default.createElement(_Forms.TextInput, {
        label: "Teaser",
        postLabel: "0/64",
        placeholder: "Haircuts, shaves, and touch-ups.",
        helper: "Add a short teaser for your guests to see when they browse your services. Please limit to 64 characters."
      })), _react.default.createElement(_Forms.FormRow, null, _react.default.createElement(_Forms.TextArea, {
        label: "Description",
        placeholder: "Optional category description\u2026",
        helper: "Add a short teaser for your guests to see when they browse your services.",
        rows: 3
      })), _react.default.createElement(_Forms.FormRow, null, _react.default.createElement(_Forms.Checkbox, {
        label: "Hide this category",
        postText: "It will still be visible to your teammates, but will be hidden from guests."
      }))), includeFooter && _react.default.createElement(_Modal.default.Footer, {
        primaryAction: {
          text: 'Create Category',
          onClick: function onClick() {
            return console.log('Next');
          },
          type: 'submit'
        },
        secondaryAction: hasSecondaryButton && {
          text: 'Cancel',
          onClick: function onClick() {
            return console.log('Cancel');
          }
        }
      }))));
    }
  }]);
  return ModalExample;
}(_react.Component);

var stories = (0, _react2.storiesOf)('Modal', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Modal', function () {
  return _react.default.createElement(ModalExample, {
    title: (0, _react3.text)('Title', 'New Service Category'),
    canGoBack: (0, _react3.boolean)('Show Back Button', false),
    includeFooter: (0, _react3.boolean)('Show Footer', true),
    hasSecondaryButton: (0, _react3.boolean)('Show Secondary Action', false)
  });
});