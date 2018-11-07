"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _BigCalendar = _interopRequireDefault(require("./BigCalendar"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _storyUsers = _interopRequireDefault(require("./storyUsers"));

var _storyEvents = _interopRequireDefault(require("./storyEvents"));

// Mock data
var stories = (0, _react2.storiesOf)('Big Calendar', module);

var BigCalendarExample =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BigCalendarExample, _Component);

  function BigCalendarExample(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BigCalendarExample);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BigCalendarExample).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      users: _storyUsers.default,
      events: _storyEvents.default,
      // events: [],
      location: {
        id: '9139bfeb-7143-4a50-abad-2f768decb1d1',
        name: 'Barbershop #32',
        addressLine1: '3833 Steele st',
        addressLine2: 'Unit D',
        addressCity: 'Denver',
        addressState: 'CO',
        addressZip: '80205',
        addressCountry: 'US',
        geo: {
          lat: 39.7695943,
          lng: -104.9500088
        },
        OrganizationId: 'bc02c800-60f2-4e37-8ed1-a32f6a50e0a2',
        isPublic: false,
        timezone: 'America/Denver',
        archived: false,
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        phoneNumber: null,
        enableLockScreen: true
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropEvent", function (_ref) {
      var event = _ref.event,
          newStartAt = _ref.newStartAt,
          newUser = _ref.newUser,
          blockUpdates = _ref.blockUpdates;
      console.log({
        event: event,
        newStartAt: newStartAt,
        newUser: newUser,
        blockUpdates: blockUpdates
      });
      var eventsCopy = (0, _toConsumableArray2.default)(_this.state.events);
      var eventCopy = (0, _cloneDeep.default)(event);

      if (newUser) {
        eventCopy.userId = newUser.id;
      }

      if (newStartAt) {
        eventCopy.startAt = newStartAt.format('YYYY-MM-DD HH:mm:ss');
      }

      if (blockUpdates) {
        blockUpdates.forEach(function (update) {
          eventCopy.blocks[update.blockIdx].durationSec = update.newDurationSec;
        });
      }

      eventCopy.blocks = eventCopy.blocks.filter(function (block) {
        return block.durationSec > 0;
      });

      var eventIdx = _this.state.events.indexOf(event);

      eventsCopy.splice(eventIdx, 1);
      eventsCopy.push(eventCopy);

      _this.setState({
        events: eventsCopy
      });

      return true;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleUserModeChange", function (e) {
      switch (e.target.value) {
        case 'everyone':
          _this.setState({
            users: _storyUsers.default
          });

          break;

        case 'me':
          _this.setState({
            users: [_storyUsers.default[0]]
          });

          break;

        case 'working':
          _this.setState({
            users: _storyUsers.default
          });

          break;
      }

      console.log(e.target.value);
    });
    _this.bigCalRef = _react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(BigCalendarExample, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          users = _this$state.users,
          location = _this$state.location,
          events = _this$state.events;
      console.log(users);
      return _react.default.createElement(_Container.default, null, _react.default.createElement(_BigCalendar.default, {
        userModeOptions: {
          team: 'Everyone',
          working: 'Working',
          me: 'Me'
        },
        onChangeUserMode: this.handleUserModeChange,
        onDropEvent: this.handleDropEvent,
        allUsers: users,
        timezone: location.timezone,
        allEvents: events,
        defaultMinTime: "07:00",
        defaultMaxTime: "20:00",
        defaultStartTime: "09:00",
        defaultEndTime: "18:00"
      }));
    }
  }]);
  return BigCalendarExample;
}(_react.Component);

stories.addDecorator(_react3.withKnobs);
stories.add('Big Calendar', function () {
  return _react.default.createElement(BigCalendarExample, null);
});