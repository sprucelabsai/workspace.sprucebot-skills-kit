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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _skillskit = _interopRequireDefault(require("../../skillskit"));

var Avatar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Avatar, _Component);

  function Avatar() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Avatar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Avatar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTapEdit", function () {
      var user = _this.props.user;

      if (_this.canEdit()) {
        _skillskit.default.editUserProfile({
          userId: user.User.id,
          locationId: user.Location.id
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "canEdit", function () {
      var _this$props = _this.props,
          enableProfileEditing = _this$props.enableProfileEditing,
          user = _this$props.user,
          auth = _this$props.auth;
      var minimumRequirementsMet = auth && enableProfileEditing && user && user.User && user.User.id && user.Location && user.Location.id; // DELETE THIS OUT WHEN ROLES ARE PROPERLY PASSED

      if (minimumRequirementsMet && (auth.role === 'owner' || auth.role === 'teammate' || auth.User.id === user.User.id)) {
        return true;
      } // END DELETE
      //we have all the data, lets do some role checks


      if (minimumRequirementsMet) {
        if (auth.role === 'owner') {
          return true;
        } else if (auth.role === 'teammate' && user.role === 'guest') {
          return true;
        } else if (auth.User.id === user.User.id) {
          return true;
        }
      }

      return false;
    });
    return _this;
  }

  (0, _createClass2.default)(Avatar, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          top = _this$props2.top,
          online = _this$props2.online,
          image = _this$props2.image,
          user = _this$props2.user,
          showOnlineIndicator = _this$props2.showOnlineIndicator,
          enableProfileEditing = _this$props2.enableProfileEditing,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["className", "top", "online", "image", "user", "showOnlineIndicator", "enableProfileEditing"]);
      var style = {};
      var isOnline = online; //passed an image

      if (typeof image === 'string' && image) {
        style.backgroundImage = "url('".concat(image, "')");
      } else if (user && user.User && user.User.profileImages && user.User.profileImages.profile150) {
        style.backgroundImage = "url(".concat(user.User.profileImages.profile150, ")");
        isOnline = user.status === 'online';
      }

      return _react.default.createElement("div", (0, _extends2.default)({
        style: style,
        className: "".concat(top ? 'top__avatar' : 'avatar__wrapper', " ").concat(className || '', " ").concat(isOnline ? 'online' : '', " ").concat(this.canEdit() ? 'is_editable' : ''),
        onClick: this.handleTapEdit
      }, props));
    }
  }]);
  return Avatar;
}(_react.Component);

exports.default = Avatar;
Avatar.propTypes = {
  top: _propTypes.default.bool,
  auth: _propTypes.default.object,
  user: _propTypes.default.object,
  //pass this or everything belowe
  image: _propTypes.default.string,
  showOnlineIndicator: _propTypes.default.bool,
  online: _propTypes.default.bool,
  enableProfileEditing: _propTypes.default.bool
};
Avatar.defaultProps = {
  top: false,
  showOnlineIndicator: true,
  enableProfileEditing: false
};