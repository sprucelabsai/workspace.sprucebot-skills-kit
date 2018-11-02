"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _Tabs = _interopRequireDefault(require("./Tabs"));

var stories = (0, _react2.storiesOf)('Tabs', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Tabs', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_Tabs.default, {
    tabs: (0, _react3.object)('tabs', [{
      text: 'Team',
      isCurrent: true
    }, {
      text: 'Guests'
    }, {
      text: 'Everyone',
      onClick: function onClick() {
        return console.log('Click');
      }
    }])
  }));
}).add('With Disclosure', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_Tabs.default, {
    tabs: (0, _react3.object)('tabs', [{
      text: 'Active',
      isCurrent: true
    }, {
      text: 'Current'
    }, {
      text: 'Previous'
    }, {
      text: 'Cancelled'
    }])
  }));
});