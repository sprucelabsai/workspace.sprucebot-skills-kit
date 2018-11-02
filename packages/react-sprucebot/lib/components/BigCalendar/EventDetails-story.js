"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _EventDetails = _interopRequireWildcard(require("./components/EventDetails"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var NoteIcon = function NoteIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M13.045 19.636l-3.712.53.53-3.712 9.546-9.546a2.25 2.25 0 0 1 3.182 3.182l-9.546 9.546zM5.25 2.499a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75v-1.5z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M12.75 3.249h3a1.5 1.5 0 0 1 1.5 1.5M17.25 19.749v3a1.5 1.5 0 0 1-1.5 1.5H2.25a1.5 1.5 0 0 1-1.5-1.5v-18a1.5 1.5 0 0 1 1.5-1.5h3M5.25 9.249h7.5M5.25 13.749h3",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

NoteIcon.defaultProps = {
  width: "24",
  height: "25",
  viewBox: "0 0 24 25",
  xmlns: "http://www.w3.org/2000/svg"
};

var ServiceIcon = function ServiceIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M8.25 4.748h15M8.25 13.748h15M8.25 22.748h15",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M.75 2.498a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3zM.75 11.498a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3zM.75 20.498a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

ServiceIcon.defaultProps = {
  width: "24",
  height: "25",
  viewBox: "0 0 24 25",
  xmlns: "http://www.w3.org/2000/svg"
};

var StatusIcon = function StatusIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M12 23.25a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M18 7.5l1.875-1.875M19.5 5.25l.75.75M12 5.25V.75M14.25.75h-4.5M12 15l-3.75-4.151",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

StatusIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
var stories = (0, _react2.storiesOf)('Big Calendar', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Event Details', function () {
  return _react.default.createElement(_Container.default, null, _react.default.createElement(_EventDetails.default, {
    header: {
      title: 'Cooper Moore',
      label: 'Appointment'
    },
    status: (0, _react3.select)('Status', {
      Booked: 'event-busy',
      Unconfirmed: 'event-unconfirmed',
      Break: 'break',
      Block: 'block'
    }, 'event-busy'),
    list: {
      items: [{
        avatar: 'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
        title: 'Cooper Moore',
        subtitle: '(364) 106-7572',
        contextMenu: {
          isSimple: true,
          actions: [{
            text: 'Guest notes'
          }]
        }
      }, {
        icon: _react.default.createElement(NoteIcon, {
          isLineIcon: true
        }),
        title: 'Prefers products that aren’t tested on animals.',
        subtitle: 'Caleigh Jerde, 4 months ago',
        actions: [{
          kind: 'simple',
          icon: _react.default.createElement(_Icon.default, {
            icon: "edit",
            className: "btn__line-icon"
          })
        }]
      }, {
        icon: _react.default.createElement(_Icon.default, {
          icon: "date",
          isLineIcon: true
        }),
        title: 'Mon, Oct 27, 2018',
        subtitle: '9–10:30am'
      }, {
        icon: _react.default.createElement(ServiceIcon, {
          isLineIcon: true
        }),
        title: 'Services',
        subtitle: '<p>Beard Tinting</p><p>Head Shave</p><p>$42 | 1hr 30min</p>',
        actions: [{
          kind: 'simple',
          icon: _react.default.createElement(_Icon.default, {
            icon: "add"
          })
        }, {
          kind: 'simple',
          icon: _react.default.createElement(_Icon.default, {
            icon: "edit",
            className: "btn__line-icon"
          })
        }]
      }, {
        icon: _react.default.createElement(StatusIcon, {
          isLineIcon: true
        }),
        title: 'Status',
        subtitle: 'Not checked in',
        contextMenu: {
          isSimple: true,
          icon: _react.default.createElement(_Icon.default, {
            icon: "edit",
            className: "btn__line-icon"
          }),
          actions: [{
            text: 'Check guest in'
          }, {
            text: 'Mark as late'
          }, {
            text: 'Mark as no show'
          }]
        }
      }]
    },
    footer: {
      primaryCTA: {
        text: 'Check Guest In'
      }
    }
  }));
});