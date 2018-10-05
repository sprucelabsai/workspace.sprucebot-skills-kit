"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _Card = _interopRequireWildcard(require("./Card"));

var _Button = _interopRequireDefault(require("../Button/Button"));

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
stories.add('Card', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    title: "Get the most out of Spruce"
  }), _react.default.createElement(_Card.CardBody, null, _react.default.createElement("p", null, "Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.")), _react.default.createElement(_Card.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Get some skills",
    isSmall: true
  }))));
}).add('With a Header Action', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    title: "Add your teammates",
    actions: _react.default.createElement(_Button.default, {
      kind: "simple",
      text: "Go to team",
      isSmall: true
    })
  }), _react.default.createElement(_Card.CardBody, null, "Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it."), _react.default.createElement(_Card.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "primary",
    text: "Add teammates",
    isSmall: true
  }))));
}).add('With a Label', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.default, null, _react.default.createElement(_Card.CardHeader, {
    title: "This card has a label",
    labelText: "Private",
    actions: _react.default.createElement(_Button.default, {
      kind: "simple",
      text: "Go to team",
      isSmall: true
    })
  }), _react.default.createElement(_Card.CardBody, null, "Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it."), _react.default.createElement(_Card.CardFooter, null, _react.default.createElement(_Button.default, {
    kind: "secondary",
    text: "Get Some Skills",
    isSmall: true
  }))));
}).add('CardBuilder', function () {
  return _react.default.createElement(_Container.default, {
    size: "medium"
  }, _react.default.createElement(_Card.CardBuilder, cardJSON));
});