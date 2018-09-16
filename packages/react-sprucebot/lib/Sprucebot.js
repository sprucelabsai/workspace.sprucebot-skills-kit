"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _Avatar = _interopRequireDefault(require("./components/Avatar/Avatar"));

var _BotText = _interopRequireDefault(require("./components/BotText/BotText"));

var _Button = _interopRequireDefault(require("./components/Button/Button"));

var _Container = _interopRequireDefault(require("./components/Container/Container"));

var _DateSelect = _interopRequireDefault(require("./components/DateSelect/DateSelect"));

var _DateRangeSelect = _interopRequireDefault(require("./components/DateRangeSelect/DateRangeSelect"));

var _Calendar = _interopRequireDefault(require("./components/Calendar/Calendar"));

var _BigCalendar = _interopRequireDefault(require("./components/Calendar/BigCalendar"));

var _Input = _interopRequireDefault(require("./components/Input/Input"));

var _Pre = _interopRequireDefault(require("./components/Pre/Pre"));

var _Switch = _interopRequireDefault(require("./components/Switch/Switch"));

var _Loader = _interopRequireDefault(require("./components/Loader/Loader"));

var _Form = _interopRequireDefault(require("./components/Form/Form"));

var _LinkPile = _interopRequireDefault(require("./components/LinkPile/LinkPile"));

var _Select = _interopRequireDefault(require("./components/Select/Select"));

var _SubmitWrapper = _interopRequireDefault(require("./components/SubmitWrapper/SubmitWrapper"));

var _Pager = _interopRequireDefault(require("./components/Pager/Pager"));

var _Stars = _interopRequireDefault(require("./components/Stars/Stars"));

var _DevControls = _interopRequireDefault(require("./components/DevControls/DevControls"));

var ButtonGrid = _interopRequireWildcard(require("./components/ButtonGrid/ButtonGrid"));

var _StatsSlider = _interopRequireDefault(require("./components/StatsSlider/StatsSlider"));

var _ImageCropper = _interopRequireDefault(require("./components/ImageCropper/ImageCropper"));

var _TrainingGuide = _interopRequireDefault(require("./components/TrainingGuide/TrainingGuide"));

var _Onboarding = _interopRequireDefault(require("./components/Onboarding/Onboarding"));

var _Callout = _interopRequireDefault(require("./components/Callout/Callout"));

var _Dialog = _interopRequireDefault(require("./components/Dialog/Dialog"));

var _Error = _interopRequireDefault(require("./components/Error/Error"));

var _Feed = _interopRequireWildcard(require("./components/Feed/Feed"));

var _Icon = _interopRequireDefault(require("./components/Icon/Icon"));

var _IconButton = _interopRequireDefault(require("./components/IconButton/IconButton"));

var _ControlButton = _interopRequireDefault(require("./components/ControlButton/ControlButton"));

var _Search = _interopRequireDefault(require("./components/Search/Search"));

var _HelpButton = _interopRequireDefault(require("./components/HelpButton/HelpButton"));

var Typography = _interopRequireWildcard(require("./components/Typography/Typography"));

var List = _interopRequireWildcard(require("./components/List/List"));

var Tabs = _interopRequireWildcard(require("./components/Tabs/Tabs"));

var _skillskit = _interopRequireDefault(require("./skillskit"));

var _document2 = _interopRequireDefault(require("./skillskit/next/_document"));

var _Page = _interopRequireDefault(require("./skillskit/next/Page"));

var _withStore = _interopRequireWildcard(require("./skillskit/store/withStore"));

var _lang = _interopRequireDefault(require("./skillskit/helpers/lang"));

var _sharable = _interopRequireDefault(require("./skillskit/helpers/sharable"));

// import './require-babel-polyfill'
var Sprucebot = (0, _objectSpread2.default)({
  testUtils: {
    // Prevent confusion between withStore and createStore
    createStore: _withStore.createStore
  },
  utils: {
    arrayMove: function arrayMove(arr, previousIndex, newIndex) {
      var array = arr.slice(0);

      if (newIndex >= array.length) {
        var k = newIndex - array.length;

        while (k-- + 1) {
          array.push(undefined);
        }
      }

      array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
      return array;
    }
  },
  lang: _lang.default,
  skill: _skillskit.default,
  _document: _document2.default,
  Page: _Page.default,
  withStore: _withStore.default,
  Avatar: _Avatar.default,
  BotText: _BotText.default,
  Button: _Button.default,
  Container: _Container.default,
  DateSelect: _DateSelect.default,
  DateRangeSelect: _DateRangeSelect.default,
  Calendar: _Calendar.default,
  BigCalendar: _BigCalendar.default,
  Input: _Input.default,
  Pre: _Pre.default,
  Switch: _Switch.default,
  Loader: _Loader.default,
  LinkPile: _LinkPile.default,
  Form: _Form.default,
  Select: _Select.default,
  SubmitWrapper: _SubmitWrapper.default,
  Pager: _Pager.default,
  StatsSlider: _StatsSlider.default,
  ButtonGrid: ButtonGrid,
  Stars: _Stars.default,
  ImageCropper: _ImageCropper.default,
  DevControls: _DevControls.default,
  Callout: _Callout.default,
  Feed: _Feed.default,
  FeedItem: _Feed.FeedItem,
  Dialog: _Dialog.default,
  Error: _Error.default,
  FeedAttachment: _Feed.FeedAttachment,
  TrainingGuide: _TrainingGuide.default,
  Onboarding: _Onboarding.default,
  Icon: _Icon.default,
  HelpButton: _HelpButton.default,
  IconButton: _IconButton.default,
  ControlButton: _ControlButton.default,
  Search: _Search.default,
  sharable: _sharable.default
}, Typography, List, Tabs, ButtonGrid);
module.exports = Sprucebot;