"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = exports.SortableListItem = exports.SortableList = exports.List = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Avatar = _interopRequireDefault(require("../Avatar/Avatar"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var _reactSortableHoc = require("react-sortable-hoc");

var List = function List(_ref) {
  var className = _ref.className,
      isSortable = _ref.isSortable,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "isSortable"]);
  return _react.default.createElement("div", (0, _extends2.default)({}, props, {
    className: "List item__list ".concat(className ? className : '', " ").concat(isSortable ? 'sortable__item__list' : '')
  }));
};

exports.List = List;
var SortableListContainer = (0, _reactSortableHoc.SortableContainer)(function (_ref2) {
  var props = (0, _extends2.default)({}, _ref2);
  return _react.default.createElement(List, (0, _extends2.default)({
    isSortable: true
  }, props));
});

var SortableList = function SortableList(_ref3) {
  var props = (0, _extends2.default)({}, _ref3);
  return _react.default.createElement(SortableListContainer, (0, _extends2.default)({
    helperClass: "sortable_list_helper"
  }, props));
};

exports.SortableList = SortableList;
var SortableDragHandle = (0, _reactSortableHoc.SortableHandle)(function () {
  return _react.default.createElement(_Icon.default, {
    className: "drag_handle"
  }, "drag_handle");
});
var SortableListItem = (0, _reactSortableHoc.SortableElement)(function (_ref4) {
  var isSortable = _ref4.isSortable,
      props = (0, _objectWithoutProperties2.default)(_ref4, ["isSortable"]);
  return _react.default.createElement(ListItem, (0, _extends2.default)({
    isSortable: isSortable
  }, props));
});
exports.SortableListItem = SortableListItem;

var ListItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ListItem, _Component);

  function ListItem() {
    (0, _classCallCheck2.default)(this, ListItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItem).apply(this, arguments));
  }

  (0, _createClass2.default)(ListItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          title = _this$props.title,
          subtitle = _this$props.subtitle,
          rightInput = _this$props.rightInput,
          rightTitle = _this$props.rightTitle,
          rightSubtitle = _this$props.rightSubtitle,
          online = _this$props.online,
          avatar = _this$props.avatar,
          showOnlineIndicator = _this$props.showOnlineIndicator,
          alignItems = _this$props.alignItems,
          overflow = _this$props.overflow,
          width = _this$props.width,
          componentAsSubtitle = _this$props.componentAsSubtitle,
          onClick = _this$props.onClick,
          leftInput = _this$props.leftInput,
          isSortable = _this$props.isSortable,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["className", "children", "title", "subtitle", "rightInput", "rightTitle", "rightSubtitle", "online", "avatar", "showOnlineIndicator", "alignItems", "overflow", "width", "componentAsSubtitle", "onClick", "leftInput", "isSortable"]); // build children

      children = children || [];

      if (!Array.isArray(children)) {
        children = [children];
      }

      if (componentAsSubtitle && componentAsSubtitle.length > 0) {
        var _children;

        (_children = children).unshift.apply(_children, (0, _toConsumableArray2.default)(componentAsSubtitle));
      } else if (componentAsSubtitle) {
        children.unshift(componentAsSubtitle);
      } // setup title/subtitle


      if (subtitle) {
        children.unshift(_react.default.createElement("div", (0, _extends2.default)({}, props, {
          className: "ItemSubTitle sub__title",
          key: "subtitle"
        }), subtitle));
      }

      if (title) {
        children.unshift(_react.default.createElement("div", {
          className: "ItemTitle title",
          overflow: overflow,
          width: width,
          key: "title"
        }, title));
      }

      return _react.default.createElement("div", (0, _extends2.default)({}, props, {
        className: "".concat(className || '', " ListItemWrapper item__list__item ").concat(online ? '' : 'offline')
      }), isSortable && _react.default.createElement(SortableDragHandle, null), leftInput && _react.default.createElement("div", {
        className: "left_input"
      }, leftInput), avatar && _react.default.createElement("div", {
        className: "ItemAvatar avatar__outer__wrapper",
        onClick: onClick,
        alignItems: alignItems
      }, avatar === true ? _react.default.createElement(_Avatar.default, {
        className: "empty",
        online: online,
        showOnlineIndicator: showOnlineIndicator
      }) : _react.default.createElement(_Avatar.default, {
        online: online,
        image: avatar,
        showOnlineIndicator: showOnlineIndicator
      })), children && _react.default.createElement("div", {
        className: "ItemDetail item__details",
        onClick: onClick
      }, children), (rightTitle || rightSubtitle || rightInput) && _react.default.createElement("div", {
        className: "ItemRightContent content__right",
        alignItems: alignItems
      }, rightInput && rightInput, rightTitle && _react.default.createElement("div", {
        className: "ItemTitle title",
        weight: 400
      }, rightTitle), rightSubtitle && _react.default.createElement("div", {
        className: "ItemSubTitle sub__title"
      }, rightSubtitle)));
    }
  }]);
  return ListItem;
}(_react.Component);

exports.ListItem = ListItem;
SortableListItem.propTypes = {
  isSortable: _propTypes.default.bool,
  index: _propTypes.default.number.isRequired
};
SortableListItem.defaultProps = {
  isSortable: true
};
SortableList.propTypes = {
  onSortEnd: _propTypes.default.func,
  useDragHandle: _propTypes.default.bool
};
SortableList.defaultProps = {
  useDragHandle: true
};
ListItem.propTypes = {
  friend: _propTypes.default.object,
  title: _propTypes.default.string,
  subtitle: _propTypes.default.string,
  rightInput: _propTypes.default.any,
  leftInput: _propTypes.default.any,
  rightTitle: _propTypes.default.any,
  rightSubtitle: _propTypes.default.any,
  online: _propTypes.default.bool,
  avatar: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  showOnlineIndicator: _propTypes.default.bool,
  alignItems: _propTypes.default.string
};
ListItem.defaultProps = {
  online: true,
  showOnlineIndicator: true
};