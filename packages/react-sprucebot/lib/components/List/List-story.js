"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _people = require("../../../.storybook/data/people");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _List = _interopRequireWildcard(require("./List"));

var _ListHeader = _interopRequireDefault(require("./components/ListHeader/ListHeader"));

var _Tabs = _interopRequireDefault(require("../Tabs/Tabs"));

var _SortableList = _interopRequireDefault(require("./components/SortableList/SortableList"));

var _actions = require("../../../.storybook/data/actions");

var EditIcon = function EditIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M13.045 15.135l-3.712.531.53-3.713 9.546-9.546a2.25 2.25 0 0 1 3.182 3.182l-9.546 9.546z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M18.348 3.469L21.53 6.65M18.75 15.25v7.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5h7.5",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

EditIcon.defaultProps = {
  width: "24",
  height: "25",
  viewBox: "0 0 24 25",
  xmlns: "http://www.w3.org/2000/svg"
};

var DateIcon = function DateIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M6.75 12.75h.75a.75.75 0 0 1 .75.75v5.25M6.75 18.75h3M13.832 12.75h1.918a.75.75 0 0 1 .7 1.014l-1.87 4.986",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M.75 5.25a1.5 1.5 0 0 1 1.5-1.5h19.5a1.5 1.5 0 0 1 1.5 1.5v16.5a1.5 1.5 0 0 1-1.5 1.5H2.25a1.5 1.5 0 0 1-1.5-1.5V5.25z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M.75 9.75h22.5M6.75 6V.75M17.25 6V.75",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

DateIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var CalendarIcon = function CalendarIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M.75 5.25a1.5 1.5 0 0 1 1.5-1.5h19.5a1.5 1.5 0 0 1 1.5 1.5v16.5a1.5 1.5 0 0 1-1.5 1.5H2.25a1.5 1.5 0 0 1-1.5-1.5V5.25z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M.75 9.75h22.5M6.75 6V.75M17.25 6V.75M5.625 13.5a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75M5.625 18.75a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75M12 13.5a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75M12 18.75a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75M18.375 13.5a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75M18.375 18.75a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

CalendarIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var ArrowForward = function ArrowForward(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
  }));
};

ArrowForward.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var ArrowBack = function ArrowBack(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
  }));
};

ArrowBack.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
var stories = (0, _react2.storiesOf)('List', module);

var TestPanel = function TestPanel() {
  return _react.default.createElement("div", null, "Test Panel");
};

var TabbedList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TabbedList, _Component);

  function TabbedList() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TabbedList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TabbedList)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      users: _people.userList02,
      tabs: [{
        text: 'Guests',
        panel: _react.default.createElement(_List.default, {
          items: _people.userList
        })
      }, {
        text: 'Team',
        panel: _react.default.createElement(_List.default, {
          items: _people.userList02
        })
      }, {
        text: 'Settings',
        panel: _react.default.createElement(_List.default, {
          items: _people.userList03
        })
      }],
      activeTabIndex: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTabClick", function (idx) {
      _this.setState({
        activeTabIndex: idx
      });
    });
    return _this;
  }

  (0, _createClass2.default)(TabbedList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          users = _this$state.users,
          tabs = _this$state.tabs,
          activeTabIndex = _this$state.activeTabIndex;
      return _react.default.createElement(_List.ListWrapper, null, _react.default.createElement(_ListHeader.default, {
        title: "Notes"
      }), _react.default.createElement(_Tabs.default, {
        tabs: tabs.map(function (tab, idx) {
          return (0, _objectSpread2.default)({
            isCurrent: idx === activeTabIndex,
            onClick: function onClick() {
              return _this2.handleTabClick(idx);
            }
          }, tab);
        })
      }));
    }
  }]);
  return TabbedList;
}(_react.Component);

stories.addDecorator(_react3.withKnobs);
stories.add('Text List', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_List.default, {
    header: {
      title: 'Holidays'
    },
    isSmall: (0, _react3.boolean)('Small', false),
    items: [{
      title: 'Wed, Nov 28, 2018',
      subtitle: 'Closed'
    }, {
      title: 'Thu, Nov 29, 2018',
      subtitle: 'Closed'
    }, {
      title: 'Wed, Dec 25, 2018',
      subtitle: 'Closed'
    }]
  }), _react.default.createElement(_SortableList.default, {
    header: {
      title: 'Services'
    },
    isSmall: (0, _react3.boolean)('Small', false),
    onConfirm: function onConfirm() {
      return console.log('Confirmed!');
    },
    items: [{
      title: 'Clean Up',
      subtitle: '$20 | 15min',
      contextMenu: {
        icon: _react.default.createElement(EditIcon, null),
        size: 'large',
        isSimple: true,
        actions: _actions.threeTextActions
      }
    }, {
      title: 'Shampoo',
      subtitle: '$7 | 45min',
      contextMenu: {
        icon: _react.default.createElement(EditIcon, null),
        size: 'large',
        isSimple: true,
        actions: _actions.threeTextActions
      }
    }, {
      title: 'Young Spruce',
      subtitle: '$23 | 50min',
      contextMenu: {
        icon: _react.default.createElement(EditIcon, null),
        size: 'large',
        isSimple: true,
        actions: _actions.threeTextActions
      }
    }]
  }), _react.default.createElement(_List.default, {
    header: {
      title: 'Important Dates'
    },
    isSmall: (0, _react3.boolean)('Small', false),
    items: [{
      icon: _react.default.createElement(DateIcon, {
        className: "u-icon__no-fill u-icon__stroke"
      }),
      title: 'Wed, Nov 28, 2018',
      subtitle: 'Closed'
    }, {
      icon: _react.default.createElement(DateIcon, {
        className: "u-icon__no-fill u-icon__stroke"
      }),
      title: 'Thu, Nov 29, 2018',
      subtitle: 'Closed'
    }, {
      icon: _react.default.createElement(DateIcon, {
        className: "u-icon__no-fill u-icon__stroke"
      }),
      title: 'Wed, Dec 25, 2018',
      subtitle: 'Closed'
    }]
  }));
}).add('Settings List', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_List.default, {
    header: {
      title: 'Settings'
    },
    items: [{
      title: 'Barber',
      toggleId: 'barber'
    }, {
      title: 'Brow & Wax',
      toggleId: 'brow-and-wax'
    }, {
      title: 'Featured',
      toggleId: 'featured'
    }, {
      title: 'Gucci & Fire',
      toggleId: 'gucci-and-fire'
    }, {
      title: 'Style Consulting',
      toggleId: 'style-consulting'
    }]
  }), _react.default.createElement(_List.default, {
    header: {
      title: 'Settings'
    },
    isSmall: (0, _react3.boolean)('Small', false),
    items: [{
      title: 'Hide this category',
      subtitle: 'Guests cannot book hidden services',
      toggleId: 'hide-category'
    }]
  }));
}).add('People List', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_List.default, {
    header: {
      title: 'Team Schedule',
      subtitle: 'Mon, Sep 27',
      actions: [{
        text: 'Today',
        kind: 'simple'
      }, {
        icon: _react.default.createElement(CalendarIcon, {
          className: "btn__line-icon"
        }),
        kind: 'simple'
      }, {
        icon: _react.default.createElement(ArrowBack, null),
        kind: 'simple'
      }, {
        icon: _react.default.createElement(ArrowForward, null),
        kind: 'simple'
      }]
    },
    isSmall: (0, _react3.boolean)('Small', false),
    items: _people.userList
  }));
}).add('People Tabbed', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(TabbedList, null));
});