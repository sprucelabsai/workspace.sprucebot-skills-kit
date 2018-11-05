"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _onboarding = require("../../../.storybook/data/onboarding");

var _people = require("../../../.storybook/data/people");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _index = _interopRequireWildcard(require("./index"));

var _List = _interopRequireDefault(require("../List/List"));

var _Text = require("../Text/Text");

var _Image = _interopRequireDefault(require("../Image/Image"));

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
stories.addDecorator((0, _react3.withKnobsOptions)({
  escapeHTML: false
}));
stories.addDecorator(_react3.withKnobs);
stories.add('Critical Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_index.default, {
    isCritical: true
  }, _react.default.createElement(_index.CardHeader, {
    title: (0, _react3.text)('title', 'Please update your credit card'),
    labelText: (0, _react3.text)('labelText', 'Billing failure'),
    labelIcon: _react.default.createElement(AlertIcon3, null)
  }), _react.default.createElement(_index.CardBody, null, _react.default.createElement(_Text.Text, {
    className: "u-lh-loose u-color-body-light"
  }, "Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.")), _react.default.createElement(_index.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Update credit card"
  }))));
}).add('Score Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_index.default, null, _react.default.createElement(_index.CardHeader, {
    title: (0, _react3.text)('title', 'Value of future appointments'),
    actions: (0, _react3.object)('actions', [{
      text: 'Go to reports'
    }])
  }), _react.default.createElement(_index.CardBody, null, _react.default.createElement(_Text.Text, {
    className: "u-lh-loose u-color-body-light"
  }, "Two roads diverged in a wood, and I took the one less traveled by, And that has made all\u2028the difference."), _react.default.createElement(_index.Scores, {
    scores: (0, _react3.object)('scores', [{
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
    }])
  }))));
}).add('People Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_index.default, null, _react.default.createElement(_index.CardHeader, {
    title: (0, _react3.text)('title', 'Your upcoming appointments'),
    actions: (0, _react3.object)('actions', [{
      text: 'View in calendar'
    }])
  }), _react.default.createElement(_index.CardBody, null, _react.default.createElement(_List.default, {
    items: _people.userList
  }), _react.default.createElement(_Text.Anchor, {
    href: "#"
  }, "+3 more today"))));
}).add('Person Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_index.default, {
    isCentered: true
  }, _react.default.createElement(_index.CardHeader, null), _react.default.createElement(_index.CardBody, null, _react.default.createElement(_Avatar.default, {
    isLarge: true,
    image: _user0196w.default,
    alt: "Rosamund Mueleer"
  }), _react.default.createElement(_Text.H3, {
    className: "card-header__title l-mb-xsmall"
  }, "Say \"Happy Birthday\""), _react.default.createElement(_Text.Text, {
    className: "u-lh-loose u-color-body-light"
  }, "It\u2019s Rosamond Mueller\u2019s birthday today. Don\u2019t forget to say happy birthday!")), _react.default.createElement(_index.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Send a birthday message",
    isSmall: true
  }))));
}).add('Place Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_index.default, null, _react.default.createElement(_Image.default, {
    src: "https://images.unsplash.com/photo-1535401991746-da3d9055713e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9fa1c73c0d29848a6e63595c588051ad&auto=format&fit=crop&w=720&h=360&q=80",
    width: 720,
    height: 360,
    className: "l-mb-small"
  }), _react.default.createElement(_index.CardBody, null, _react.default.createElement(_Text.H3, null, "Les Basics"), _react.default.createElement(_Text.Text, {
    className: "u-lh-loose u-color-body-light"
  }, "101 Purdy Lakes, West Jordanmouth, NH 38827-6100")), _react.default.createElement(_index.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Book an appointment"
  }))));
}).add('Celebration Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_index.default, {
    isCentered: true
  }, _react.default.createElement(_Image.default, {
    src: "https://images.unsplash.com/photo-1499306215218-42e51ae058b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6a6ae71facb70ced00bcbae8174ee47c&auto=format&fit=crop&w=720&h=360&q=80",
    width: 720,
    height: 360,
    className: "l-mb-small"
  }), _react.default.createElement(_index.CardBody, null, _react.default.createElement(_Text.H3, null, "Congrats on 10k guests!"), _react.default.createElement(_Text.Text, {
    className: "u-lh-loose u-color-body-light"
  }, "I\u2019ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."))));
}).add('To Do', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_index.default, null, _react.default.createElement(_index.CardHeader, {
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
  }), _react.default.createElement(_index.CardBody, null, _react.default.createElement(_Text.Text, {
    className: "u-lh-loose u-color-body-light"
  }, (0, _react3.text)('Body Copy', 'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.'))), _react.default.createElement(_index.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Get some skills",
    isSmall: true
  }))));
}).add('Onboarding Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_index.OnboardingCard, _onboarding.onboarding));
}).add('CardBuilder', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_index.CardBuilder, (0, _react3.object)('json', cardJSON)));
});