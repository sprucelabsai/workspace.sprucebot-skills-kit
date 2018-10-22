"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _StylesProvider = _interopRequireDefault(require("../../../../../.storybook/StylesProvider"));

var _Container = _interopRequireDefault(require("../../../Layout/Container/Container"));

var _HeaderPrimary = _interopRequireDefault(require("./HeaderPrimary"));

var _user0196w = _interopRequireDefault(require("../../../../../static/assets/users/user-01--96w.png"));

var ProvideStyles = function ProvideStyles(storyFn) {
  return _react.default.createElement(_StylesProvider.default, null, storyFn());
};

var stories = (0, _react2.storiesOf)('Header Primary', module);
stories.addDecorator(ProvideStyles);
stories.addDecorator(_react3.withKnobs);
var user = {
  name: 'Madaline Gibson',
  image: _user0196w.default,
  tel: '(605) 230-5253'
};
var business = {
  name: 'Chimera Hair Salon',
  address: '7678 N High St, Denver, CO'
};
stories.add('Default', function () {
  return _react.default.createElement(_HeaderPrimary.default, {
    STORYBOOKdoNotWrap: true,
    sidebarIsVisible: false,
    toggleSidebarVisibility: function toggleSidebarVisibility() {
      return null;
    }
  });
}).add('Logged In', function () {
  return _react.default.createElement(_HeaderPrimary.default, {
    STORYBOOKdoNotWrap: true,
    user: user,
    sidebarIsVisible: false,
    toggleSidebarVisibility: function toggleSidebarVisibility() {
      return null;
    }
  });
}).add('Logged In to Business', function () {
  return _react.default.createElement(_HeaderPrimary.default, {
    STORYBOOKdoNotWrap: true,
    user: user,
    business: business,
    sidebarIsVisible: false,
    toggleSidebarVisibility: function toggleSidebarVisibility() {
      return null;
    }
  });
});