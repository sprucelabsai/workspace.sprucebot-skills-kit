"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _BigCalendar = _interopRequireDefault(require("./BigCalendar"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var stories = (0, _react2.storiesOf)('Big Calendar', module);

var BigCalendarExample =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BigCalendarExample, _Component);

  function BigCalendarExample() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, BigCalendarExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(BigCalendarExample)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      users: [{
        name: 'Carolyn Selheim-Miller',
        nameWithLastInitial: 'Carolyn S.',
        casualName: 'Carolyn',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/180e751d-422f-4bdf-b6db-a3ad81f65be5--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/180e751d-422f-4bdf-b6db-a3ad81f65be5--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/180e751d-422f-4bdf-b6db-a3ad81f65be5--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/180e751d-422f-4bdf-b6db-a3ad81f65be5--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        id: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
        firstName: 'Carolyn',
        lastName: 'Selheim-Miller',
        profileImageUUID: '180e751d-422f-4bdf-b6db-a3ad81f65be5',
        createdAt: '2018-07-17T19:02:52.758Z',
        updatedAt: '2018-10-18T15:31:57.304Z'
      }, {
        updatedAt: '2018-10-24T23:33:58.794Z',
        createdAt: '2016-11-17T18:45:32.706Z',
        id: '78245981-5022-49a7-b2f2-6ac687e0f3d1',
        firstName: 'Taylor',
        lastName: 'Romero',
        name: 'Taylor Romero',
        profileImageUUID: 'f9ea1f05-a801-4f34-9d86-ec75c5c3881c',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f9ea1f05-a801-4f34-9d86-ec75c5c3881c--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f9ea1f05-a801-4f34-9d86-ec75c5c3881c--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f9ea1f05-a801-4f34-9d86-ec75c5c3881c--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f9ea1f05-a801-4f34-9d86-ec75c5c3881c--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        casualName: 'Taylor'
      }, {
        updatedAt: '2018-10-12T18:16:14.579Z',
        createdAt: '2016-11-17T18:45:32.707Z',
        id: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
        firstName: 'Brandon',
        lastName: 'Minch',
        name: 'Brandon Minch',
        profileImageUUID: '164224db-8523-48ee-8314-ae371cd47ca1',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/164224db-8523-48ee-8314-ae371cd47ca1--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/164224db-8523-48ee-8314-ae371cd47ca1--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/164224db-8523-48ee-8314-ae371cd47ca1--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/164224db-8523-48ee-8314-ae371cd47ca1--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        casualName: 'Brandon'
      }, {
        updatedAt: '2018-10-19T18:43:32.454Z',
        createdAt: '2017-05-10T20:39:26.871Z',
        id: '909beac7-42f7-443f-bd86-c762705c0c18',
        firstName: 'Ricky',
        lastName: 'Padilla',
        name: 'Ricky Padilla',
        profileImageUUID: '0725ae46-cfe1-46f6-afa5-80c0233b6dba',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0725ae46-cfe1-46f6-afa5-80c0233b6dba--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0725ae46-cfe1-46f6-afa5-80c0233b6dba--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0725ae46-cfe1-46f6-afa5-80c0233b6dba--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0725ae46-cfe1-46f6-afa5-80c0233b6dba--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        casualName: 'Ricky'
      }, {
        updatedAt: '2018-10-12T19:16:28.706Z',
        createdAt: '2017-08-23T05:38:35.684Z',
        id: 'ce914128-c77c-40fa-b5ef-d6faa3ed26a1',
        firstName: 'ryan android',
        lastName: 'johnson',
        name: 'ryan android johnson',
        profileImageUUID: 'f00de403-d05e-4d7f-aeb0-639d7fd14fe0',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f00de403-d05e-4d7f-aeb0-639d7fd14fe0--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f00de403-d05e-4d7f-aeb0-639d7fd14fe0--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f00de403-d05e-4d7f-aeb0-639d7fd14fe0--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f00de403-d05e-4d7f-aeb0-639d7fd14fe0--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        casualName: 'ryan android'
      }, {
        name: 'Jeremy Tinianow',
        nameWithLastInitial: 'Jeremy T.',
        casualName: 'Jeremy',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/03a5af62-9977-4d59-aa45-268867386237--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/03a5af62-9977-4d59-aa45-268867386237--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/03a5af62-9977-4d59-aa45-268867386237--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/03a5af62-9977-4d59-aa45-268867386237--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        id: '7a96fb12-b01c-45f3-9c09-d0922d5eaa44',
        firstName: 'Jeremy',
        lastName: 'Tinianow',
        profileImageUUID: '03a5af62-9977-4d59-aa45-268867386237',
        createdAt: '2016-11-17T18:45:32.707Z',
        updatedAt: '2018-10-25T18:02:46.039Z'
      }, {
        name: 'Robin Candi Cain',
        nameWithLastInitial: 'Robin C.',
        casualName: 'Robin',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/744bd43e-8861-4b1b-ba5d-142ce0301733--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/744bd43e-8861-4b1b-ba5d-142ce0301733--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/744bd43e-8861-4b1b-ba5d-142ce0301733--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/744bd43e-8861-4b1b-ba5d-142ce0301733--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        id: '2602d150-7f48-4a1a-a22d-1e2558b0ee4e',
        firstName: 'Robin',
        lastName: 'Candi Cain',
        profileImageUUID: '744bd43e-8861-4b1b-ba5d-142ce0301733',
        createdAt: '2016-11-17T18:45:32.707Z',
        updatedAt: '2018-10-17T17:58:00.122Z'
      }, {
        name: 'Kennn Goldfarb',
        nameWithLastInitial: 'Kennn G.',
        casualName: 'Kennn',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0caaa620-9893-4751-a9bb-79851d77e03b--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0caaa620-9893-4751-a9bb-79851d77e03b--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0caaa620-9893-4751-a9bb-79851d77e03b--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0caaa620-9893-4751-a9bb-79851d77e03b--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        id: '061bb108-7795-4f62-972c-7ee426b71668',
        firstName: 'Kennn',
        lastName: 'Goldfarb',
        profileImageUUID: '0caaa620-9893-4751-a9bb-79851d77e03b',
        createdAt: '2017-05-08T18:09:07.279Z',
        updatedAt: '2018-10-25T20:41:32.510Z'
      }, {
        name: 'Corbannn Baxter',
        nameWithLastInitial: 'Corbannn B.',
        casualName: 'Corbannn',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/7a6b5f08-2136-4d2b-8066-6286b6828de4--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/7a6b5f08-2136-4d2b-8066-6286b6828de4--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/7a6b5f08-2136-4d2b-8066-6286b6828de4--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/7a6b5f08-2136-4d2b-8066-6286b6828de4--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        id: '724d2986-ba56-4560-a1ab-74088b974274',
        firstName: 'Corbannn',
        lastName: 'Baxter',
        profileImageUUID: '7a6b5f08-2136-4d2b-8066-6286b6828de4',
        createdAt: '2016-11-17T18:45:32.707Z',
        updatedAt: '2018-10-12T18:13:28.979Z'
      }, {
        name: 'Zoe Kendall',
        nameWithLastInitial: 'Zoe K.',
        casualName: 'Zoe',
        profileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/4ef72c61-be73-45d7-a9e6-736b454581e6--X60.png',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/4ef72c61-be73-45d7-a9e6-736b454581e6--X60@2x.png',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/4ef72c61-be73-45d7-a9e6-736b454581e6--X150.png',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/4ef72c61-be73-45d7-a9e6-736b454581e6--X150@2x.png'
        },
        defaultProfileImages: {
          profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
          'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
          profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
          'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
        },
        id: 'df65bf1f-efae-41bd-af5f-a8714807dfef',
        firstName: 'Zoe',
        lastName: 'Kendall',
        profileImageUUID: '4ef72c61-be73-45d7-a9e6-736b454581e6',
        createdAt: '2016-11-17T18:45:32.707Z',
        updatedAt: '2018-10-25T20:01:55.310Z'
      }],
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
      },
      events: [{
        id: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd023',
        // durationSec: 3600,
        startAt: '2018-11-01 13:30:00',
        isAllDay: false,
        userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
        className: '',
        eventDetails: {},
        blocks: [{
          title: 'Primary',
          subtitle: '',
          durationSec: 60 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: true
        }, {
          title: 'Processing',
          subtitle: '',
          durationSec: 45 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: false
        }, {
          title: 'Finishing',
          subtitle: '',
          durationSec: 15 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: true
        }]
      }, {
        id: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd024',
        // durationSec: 3600,
        startAt: '2018-11-01 08:45:00',
        isAllDay: false,
        userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
        className: '',
        eventDetails: {},
        blocks: [{
          title: 'Primary',
          subtitle: '',
          durationSec: 45 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: true
        }]
      }, {
        id: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd025',
        // durationSec: 3600,
        startAt: '2018-10-31 15:30:00',
        isAllDay: false,
        userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
        className: '',
        eventDetails: {},
        blocks: [{
          title: 'Shave',
          subtitle: '',
          durationSec: 45 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: true
        }, {
          title: 'Shave',
          subtitle: '',
          durationSec: 30 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: false
        }]
      }, {
        id: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd026',
        // durationSec: 3600,
        startAt: '2018-10-31 16:30:00',
        isAllDay: false,
        userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
        className: '',
        eventDetails: {},
        blocks: [{
          title: 'Wax',
          subtitle: '',
          durationSec: 30 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: true
        }, {
          title: 'Wax',
          subtitle: '',
          durationSec: 30 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: false
        }, {
          title: 'Wax',
          subtitle: '',
          durationSec: 45 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: true
        }]
      }, {
        id: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd027',
        // durationSec: 3600,
        startAt: '2018-10-31 16:00:00',
        isAllDay: false,
        userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
        className: '',
        eventDetails: {},
        blocks: [{
          title: 'Haircut',
          subtitle: '',
          durationSec: 30 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: true
        }, {
          title: 'Haircut',
          subtitle: '',
          durationSec: 30 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: false
        }, {
          title: 'Haircut',
          subtitle: '',
          durationSec: 30 * 60,
          leftIcons: [],
          rightIcons: [],
          className: '',
          markAsBusy: true
        }]
      }]
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropEvent", function (event, newStart, newUser) {
      var eventsCopy = (0, _cloneDeep.default)(_this.state.events);
      var eventCopy = (0, _cloneDeep.default)(event);
      eventCopy.userId = newUser.id;
      eventCopy.startAt = newStart.format('YYYY-MM-DD HH:mm:ss');

      var eventIdx = _this.state.events.indexOf(event);

      eventsCopy.splice(eventIdx, 1);
      eventsCopy.push(eventCopy);

      _this.setState({
        events: eventsCopy
      });

      return true;
    });
    return _this;
  }

  (0, _createClass2.default)(BigCalendarExample, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          users = _this$state.users,
          location = _this$state.location,
          events = _this$state.events;
      return _react.default.createElement(_Container.default, null, _react.default.createElement(_BigCalendar.default, {
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