"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _Card = _interopRequireWildcard(require("./Card"));

var _index = require("./index");

var _ContextMenu = _interopRequireDefault(require("../ContextMenu/ContextMenu"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _Avatar = _interopRequireDefault(require("../Avatar/Avatar"));

var _user0196w = _interopRequireDefault(require("../../../static/assets/users/user-01--96w.png"));

var LockIcon2 = function LockIcon2(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M2.5 9A1.5 1.5 0 0 1 4 7.5h8A1.5 1.5 0 0 1 13.5 9v6a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 15V9z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M4.5 7.5V5a3.5 3.5 0 1 1 7 0v2.5",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M8 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

LockIcon2.defaultProps = {
  className: "card-header__label-icon",
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "18",
  viewBox: "0 0 16 18"
};

var AlertIcon3 = function AlertIcon3(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.413 13.333L9.18 1.433a1.333 1.333 0 0 0-2.362 0l-6.232 11.9a1.333 1.333 0 0 0 1.182 1.952H14.23a1.333 1.333 0 0 0 1.182-1.952zm-8.08-7.718a.667.667 0 0 1 1.334 0v4a.667.667 0 1 1-1.334 0v-4zm.682 7.674h.018A.984.984 0 0 0 9 12.267a1.018 1.018 0 0 0-1.016-.978h-.019A.984.984 0 0 0 7 12.309c.02.546.468.978 1.015.98z"
  }));
};

AlertIcon3.defaultProps = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg"
};
var cardJSON = {
  header: {
    title: 'Introducing the Card Builder! (Note: WIP)',
    labelText: '',
    labelIcon: '',
    actions: [{
      type: 'button',
      text: 'More Info',
      href: '#',
      target: '_blank',
      isSmall: true
    }]
  },
  body: {
    children: "<p>The Card Builder enables Skill devs to build cards using JSON. It should not be used for core cards.</p>"
  },
  footer: {
    actions: [{
      type: 'button',
      text: 'Do things',
      kind: 'secondary',
      icon: '',
      isSmall: true
    }]
  }
};
var stories = (0, _react2.storiesOf)('Card', module);
stories.addDecorator(_react3.withKnobs);
stories.add('To Do', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    labelText: (0, _react3.text)('Label Text', ''),
    labelIcon: (0, _react3.boolean)('Label Icon', false) && _react.default.createElement(LockIcon2, {
      className: "u-icon__no-fill u-icon__stroke"
    }),
    title: (0, _react3.text)('Title', 'Get the most out of Spruce'),
    actions: (0, _react3.boolean)('Header Action', false) && [{
      kind: 'simple',
      text: 'Go to team',
      isSmall: true
    }],
    contextMenu: (0, _react3.boolean)('Header Context Menu', false) && _react.default.createElement(_ContextMenu.default, {
      actions: [{
        text: 'One'
      }, {
        text: 'Two'
      }, {
        text: 'Three'
      }]
    })
  }), _react.default.createElement(_Card.CardBody, null, _react.default.createElement("p", null, (0, _react3.text)('Body Copy', 'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.'))), _react.default.createElement(_Card.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Get some skills",
    isSmall: true
  }))));
}).add('Critical Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, {
    isCritical: true
  }, _react.default.createElement(_Card.CardHeader, {
    title: "Please update your credit card",
    labelText: "Billing failure",
    labelIcon: _react.default.createElement(AlertIcon3, null)
  }), _react.default.createElement(_Card.CardBody, null, "Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference."), _react.default.createElement(_Card.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Update credit card"
  }))));
}).add('Score Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    title: "Value of future appointments",
    actions: [{
      text: 'Go to reports'
    }]
  }), _react.default.createElement(_Card.CardBody, null, _react.default.createElement("p", null, "Two roads diverged in a wood, and I took the one less traveled by, And that has made all\u2028the difference."), _react.default.createElement(_index.Scores, {
    scores: [{
      id: 1,
      label: 'Today',
      value: '$1,848'
    }, {
      id: 2,
      label: 'This Week',
      value: '$5,778'
    }, {
      id: 3,
      label: 'This Month',
      value: '$25,068'
    }]
  }))));
}).add('With a Header Action', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    title: "Add your teammates",
    actions: [{
      kind: 'simple',
      text: 'Go to team',
      isSmall: true
    }]
  }), _react.default.createElement(_Card.CardBody, null, "Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it."), _react.default.createElement(_Card.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "primary",
    text: "Add teammates",
    isSmall: true
  }))));
}).add('With a Context Menu', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    title: "Add your teammates",
    contextMenu: _react.default.createElement(_ContextMenu.default, {
      actions: [{
        text: 'One'
      }, {
        text: 'Two'
      }, {
        text: 'Three'
      }]
    })
  }), _react.default.createElement(_Card.CardBody, null, _react.default.createElement("p", null, "Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.")), _react.default.createElement(_Card.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Get some teammates",
    isSmall: true
  }))));
}).add('With a Label', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    labelText: "Private",
    labelIcon: _react.default.createElement(LockIcon2, {
      className: "u-icon__no-fill u-icon__stroke"
    }),
    contextMenu: _react.default.createElement(_ContextMenu.default, {
      actions: [{
        text: 'One'
      }, {
        text: 'Two'
      }, {
        text: 'Three'
      }]
    })
  }), _react.default.createElement(_Card.CardBody, null, _react.default.createElement("p", null, "Unapologetic travel nerd. Professional entrepreneur. Explorer. Bacon buff. Proud communicator. Introvert. Avid writer."))));
}).add('Person Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, {
    isCentered: true
  }, _react.default.createElement(_Card.CardHeader, null), _react.default.createElement(_Card.CardBody, null, _react.default.createElement(_Avatar.default, {
    isLarge: true,
    image: _user0196w.default,
    alt: "Rosamund Mueleer"
  }), _react.default.createElement("h3", {
    className: "card-header__title l-mb-xsmall"
  }, "Say \"Happy Birthday\""), _react.default.createElement("p", null, "It\u2019s Rosamond Mueller\u2019s birthday today. Don\u2019t forget to say happy birthday!")), _react.default.createElement(_Card.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Send a birthday message",
    isSmall: true
  }))));
}).add('CardBuilder', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.CardBuilder, cardJSON));
});