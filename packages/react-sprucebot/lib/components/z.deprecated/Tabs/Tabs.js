"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPane = exports.Tabs = void 0;

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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Avatar = _interopRequireDefault(require("../Avatar/Avatar"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var Tabs =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Tabs, _Component);

  function Tabs(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Tabs);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tabs).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setSelected", function (idx, key, e) {
      _this.onTabClick(idx, key, e);
    });

    var children = _react.default.Children.toArray(props.children); // default to first selected item


    var _idx = props.selected || 0;

    var selected = children[_idx] && children[_idx].key;

    if (children.length > 0) {
      children.some(function (tab) {
        if (tab.props.selected) {
          selected = tab.key;
          return true;
        }
      });
    }

    _this.state = {
      selected: selected,
      children: children
    };
    return _this;
  }

  (0, _createClass2.default)(Tabs, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var newState = {
        children: _react.default.Children.toArray(nextProps.children)
      };

      if (typeof nextProps.selected === 'number' && nextProps.selected !== this.state.selected) {
        newState.children.forEach(function (tab, idx) {
          if (idx === nextProps.selected) {
            newState.selected = tab.key;
          }
        });
      }

      this.setState(newState);
    }
  }, {
    key: "onTabClick",
    value: function onTabClick(idx, key, e) {
      if (this.state.selected !== idx) {
        if (this.props.onChange) {
          this.props.onChange(idx, e);
        }

        this.setState({
          selected: key
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          selected = _this$state.selected,
          children = _this$state.children;
      var _this$props = this.props,
          _ = _this$props.selected,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["selected"]); // build tab labels and selected

      var tabs = [];
      var totalTabs = children.length;
      var tabPanes = [];
      children.forEach(function (tab, idx) {
        var className = '';

        switch (idx) {
          case 0:
            className = 'toggle__left';
            break;

          case totalTabs - 1:
            className = 'toggle__right';
            break;

          default:
            className = 'toggle__middle';
            break;
        } // select the proper tab


        if (selected === tab.key) {
          className += ' btn__toggle__active';
          tabPanes.push(tab);
        }

        tabs.push(_react.default.createElement(_Button.default, {
          onClick: function onClick(e) {
            _this2.onTabClick(idx, tab.key, e);
          },
          toggle: true,
          className: "tab ".concat(className || ''),
          key: "tab-".concat(tab.key)
        }, tab.props.title));
      });
      return _react.default.createElement("div", null, _react.default.createElement("div", (0, _extends2.default)({
        className: "toggle__wrapper"
      }, props), tabs), _react.default.createElement("div", {
        className: "tab__panes"
      }, tabPanes));
    }
  }]);
  return Tabs;
}(_react.Component);

exports.Tabs = Tabs;
Tabs.propTypes = {
  onChange: _propTypes.default.func,
  selected: _propTypes.default.number
};

var TabPane =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(TabPane, _Component2);

  function TabPane() {
    (0, _classCallCheck2.default)(this, TabPane);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabPane).apply(this, arguments));
  }

  (0, _createClass2.default)(TabPane, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["className"]);
      return _react.default.createElement("div", {
        className: "tap__pane ".concat(className || '')
      }, this.props.children);
    }
  }]);
  return TabPane;
}(_react.Component);

exports.TabPane = TabPane;
TabPane.propTypes = {
  title: _propTypes.default.string,
  selected: _propTypes.default.bool
};