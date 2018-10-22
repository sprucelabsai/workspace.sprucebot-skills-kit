"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactSortableHoc = require("react-sortable-hoc");

var _ListHeader = _interopRequireDefault(require("../ListHeader/ListHeader"));

var _ListItem = _interopRequireWildcard(require("../ListItem/ListItem"));

var _List = require("../../List");

var SortableItem = (0, _reactSortableHoc.SortableElement)(function (_ref) {
  var item = _ref.item;
  return _react.default.createElement(_ListItem.default, item);
});
var SortableList = (0, _reactSortableHoc.SortableContainer)(function (_ref2) {
  var items = _ref2.items,
      parentClass = _ref2.parentClass,
      disabled = _ref2.disabled;
  return _react.default.createElement("ul", {
    className: parentClass
  }, items.map(function (item, index) {
    return _react.default.createElement(SortableItem, {
      key: "item-".concat(index),
      disabled: disabled,
      index: index,
      item: item
    });
  }));
});

var headerActions = function headerActions(_ref3) {
  var isSorting = _ref3.isSorting,
      onClickToggle = _ref3.onClickToggle,
      onClickCancel = _ref3.onClickCancel,
      onClickConfirm = _ref3.onClickConfirm;

  if (isSorting) {
    return [{
      text: 'Cancel',
      onClick: onClickCancel
    }, {
      text: 'Confirm',
      kind: 'simple',
      onClick: onClickConfirm
    }];
  }

  return [{
    text: 'Change Order',
    kind: 'simple',
    onClick: onClickToggle
  }];
};

var SortableComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SortableComponent, _Component);

  function SortableComponent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SortableComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SortableComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      items: _this.props.items || [],
      isSorting: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggleSorting", function () {
      _this.setState(function (prevState) {
        return {
          isSorting: !prevState.isSorting
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onCancel", function () {
      _this.setState({
        items: _this.props.items,
        isSorting: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onConfirm", function () {
      var onConfirm = _this.props.onConfirm;

      _this.setState({
        isSorting: false
      }); // Do other stuff with the API to save changes


      if (onConfirm) {
        onConfirm();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSortStart", function () {//
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSortEnd", function (_ref4) {
      var oldIndex = _ref4.oldIndex,
          newIndex = _ref4.newIndex;

      _this.setState({
        items: (0, _reactSortableHoc.arrayMove)(_this.state.items, oldIndex, newIndex)
      });
    });
    return _this;
  }

  (0, _createClass2.default)(SortableComponent, [{
    key: "render",
    value: function render() {
      var isSorting = this.state.isSorting;
      var _this$props = this.props,
          header = _this$props.header,
          items = _this$props.items,
          className = _this$props.className,
          isSmall = _this$props.isSmall;
      var parentClass = (0, _classnames.default)('list sortable-list', className, {
        'list-small': isSmall
      });
      return _react.default.createElement(_react.Fragment, null, header && _react.default.createElement(_ListHeader.default, (0, _extends2.default)({
        isSmall: isSmall,
        actions: headerActions({
          isSorting: isSorting,
          onClickToggle: this.toggleSorting,
          onClickConfirm: this.onConfirm,
          onClickCancel: this.onCancel
        })
      }, header)), _react.default.createElement(SortableList, {
        parentClass: parentClass,
        items: (0, _toConsumableArray2.default)(this.state.items).map(function (item) {
          return (0, _objectSpread2.default)({
            isDraggable: isSorting
          }, item);
        }),
        disabled: !isSorting,
        onSortStart: this.onSortStart,
        onSortEnd: this.onSortEnd
      }));
    }
  }]);
  return SortableComponent;
}(_react.Component);

exports.default = SortableComponent;