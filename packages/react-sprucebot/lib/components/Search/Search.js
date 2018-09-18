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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Typography = require("../Typography/Typography");

var _skillskit = _interopRequireDefault(require("../../skillskit"));

var Search =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Search, _Component);

  function Search(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Search);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Search).call(this, props));
    _this.state = {
      selectedUser: null
    };
    return _this;
  }

  (0, _createClass2.default)(Search, [{
    key: "onClick",
    value: function onClick(e) {
      e.preventDefault();

      _skillskit.default.searchForUser({
        locationId: this.props.locationId,
        onCancel: this.onCancelSearch.bind(this),
        onSelectUser: this.onSelectUser.bind(this),
        roles: this.props.roles
      });

      e.target.blur();
    }
  }, {
    key: "onCancelSearch",
    value: function onCancelSearch() {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
  }, {
    key: "onSelectUser",
    value: function onSelectUser(user) {
      this.props.onSelectUser(user);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onCancel = _this$props.onCancel,
          onSelectUser = _this$props.onSelectUser,
          locationId = _this$props.locationId,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["onCancel", "onSelectUser", "locationId"]);
      return _react.default.createElement("div", {
        className: "input__wrapper search__wrapper"
      }, _react.default.createElement("input", (0, _extends2.default)({}, props, {
        type: "search",
        onClick: this.onClick.bind(this)
      })));
    }
  }]);
  return Search;
}(_react.Component);

exports.default = Search;
Search.propTypes = {
  onCancel: _propTypes.default.func,
  onSelectUser: _propTypes.default.func.isRequired,
  roles: _propTypes.default.array,
  locationId: _propTypes.default.string.isRequired
};
Search.defaultProps = {
  roles: ['guest']
};