"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _Avatar = _interopRequireDefault(require("./components/Avatar/Avatar"));

var _Button = _interopRequireDefault(require("./components/Button/Button"));

var _ButtonGroup = _interopRequireDefault(require("./components/ButtonGroup/ButtonGroup"));

var Card = _interopRequireWildcard(require("./components/Card/Card"));

var _ContextMenu = _interopRequireDefault(require("./components/ContextMenu/ContextMenu"));

var _Core = require("./components/Core");

var _Dropzone = _interopRequireDefault(require("./components/Dropzone/Dropzone"));

var FormPartials = _interopRequireWildcard(require("./components/Forms/FormPartials"));

var _Forms = require("./components/Forms");

var _Container = _interopRequireDefault(require("./components/Layout/Container/Container"));

var _List = _interopRequireWildcard(require("./components/List"));

var _Loader = _interopRequireDefault(require("./components/Forms/Loader/Loader"));

var _Modal = _interopRequireDefault(require("./components/Modal/Modal"));

var _Tab = _interopRequireWildcard(require("./components/Tab"));

var _Toast = _interopRequireDefault(require("./components/Toast/Toast"));

var _View = _interopRequireDefault(require("./components/View/View"));

var _skillskit = _interopRequireDefault(require("./skillskit"));

var _document2 = _interopRequireDefault(require("./skillskit/next/_document"));

var _Page = _interopRequireDefault(require("./skillskit/next/Page"));

var _withStore = _interopRequireWildcard(require("./skillskit/store/withStore"));

var _lang = _interopRequireDefault(require("./skillskit/helpers/lang"));

var _sharable = _interopRequireDefault(require("./skillskit/helpers/sharable"));

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
  sharable: _sharable.default,
  Avatar: _Avatar.default,
  Button: _Button.default,
  ButtonGroup: _ButtonGroup.default
}, Card, {
  Checkbox: _Forms.Checkbox,
  Container: _Container.default,
  ContextMenu: _ContextMenu.default,
  DomainInput: _Forms.DomainInput,
  Dropzone: _Dropzone.default,
  FooterPrimary: _Core.FooterPrimary
}, FormPartials, {
  HeaderPrimary: _Core.HeaderPrimary,
  List: _List.default,
  ListHeader: _List.ListHeader,
  ListItem: _List.ListItem,
  Loader: _Loader.default,
  Modal: _Modal.default,
  PhoneInput: _Forms.PhoneInput,
  Radio: _Forms.Radio,
  Search: _Forms.Search,
  Select: _Forms.Select,
  Sidebar: _Core.Sidebar,
  Slider: _Forms.Slider,
  SortableList: _List.SortableList,
  Tabs: _Tab.default,
  Tab: _Tab.Tab,
  Tag: _Forms.Tag,
  TextArea: _Forms.TextArea,
  TextInput: _Forms.TextInput,
  Toast: _Toast.default,
  Toggle: _Forms.Toggle,
  View: _View.default
});
module.exports = Sprucebot;