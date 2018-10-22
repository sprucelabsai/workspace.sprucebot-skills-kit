"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _index = require("./index");

var stories = (0, _react2.storiesOf)('Forms', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Autosuggest', function () {
  return _react.default.createElement(_index.Autosuggest, {
    placeholder: "Countries",
    defaultSuggestions: ['United States', 'Canada', 'Mexico', 'Greenland'],
    shouldRenderSuggestions: function shouldRenderSuggestions() {
      return true;
    }
  });
}).add('Text Input', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.TextInput, {
    type: "text",
    id: (0, _react3.text)('id', 'input'),
    name: (0, _react3.text)('name', 'inputName'),
    label: (0, _react3.text)('Label', 'First Name'),
    postLabel: (0, _react3.text)('Post Label', ''),
    placeholder: (0, _react3.text)('Placeholder', 'i.e. Annie'),
    defaultValue: (0, _react3.text)('Value', ''),
    error: (0, _react3.text)('Error Text', ''),
    helper: (0, _react3.text)('Helper Text', 'Let me help you understand why we are asking for this.'),
    readOnly: (0, _react3.boolean)('Read Only', false)
  })));
}).add('Text Area', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.TextArea, {
    id: (0, _react3.text)('id', 'input'),
    name: (0, _react3.text)('name', 'inputName'),
    label: (0, _react3.text)('Label', 'Category'),
    postLabel: (0, _react3.text)('Post Label', ''),
    placeholder: (0, _react3.text)('Placeholder', 'Optional category description…'),
    defaultValue: (0, _react3.text)('Value', ''),
    error: (0, _react3.text)('Error Text', ''),
    helper: (0, _react3.text)('Helper Text', ''),
    readOnly: (0, _react3.boolean)('Read Only', false)
  })));
}).add('Search', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Search, {
    type: "text",
    placeholder: (0, _react3.text)('Placeholder', 'Search for anything…'),
    readOnly: (0, _react3.boolean)('Read Only', false)
  })));
}).add('Phone Number', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.PhoneInput, {
    label: "Phone Number",
    placeholder: "(555) 555-5555"
  })));
}).add('Subdomain', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.DomainInput, {
    label: "Shopify Store URL",
    placeholder: "my-shopify-store",
    appendix: ".myshopify.com"
  })));
}).add('Radio', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Radio, {
    className: "l-mb-xsmall",
    id: "option-one",
    name: "radio",
    label: (0, _react3.text)('Option One', 'Option One'),
    postText: (0, _react3.text)('Helper One', '')
  }), _react.default.createElement(_index.Radio, {
    className: "l-mb-xsmall",
    id: "option-two",
    name: "radio",
    label: (0, _react3.text)('Option Two', 'Option Two'),
    postText: (0, _react3.text)('Helper Two', '')
  }), _react.default.createElement(_index.Radio, {
    className: "l-mb-xsmall",
    id: "option-three",
    name: "radio",
    label: (0, _react3.text)('Option Three', 'Option Three'),
    postText: (0, _react3.text)('Helper Three', '')
  })));
}).add('Checkbox', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Checkbox, {
    className: "l-mb-xsmall",
    id: "option-one",
    name: "optionOne",
    label: (0, _react3.text)('Option One', 'Option One'),
    postText: (0, _react3.text)('Helper One', '')
  }), _react.default.createElement(_index.Checkbox, {
    className: "l-mb-xsmall",
    id: "option-two",
    name: "optionTwo",
    label: (0, _react3.text)('Option Two', 'Option Two'),
    postText: (0, _react3.text)('Helper Two', '')
  }), _react.default.createElement(_index.Checkbox, {
    className: "l-mb-xsmall",
    id: "option-three",
    name: "optionThree",
    label: (0, _react3.text)('Option Three', 'Option Three'),
    postText: (0, _react3.text)('Helper Three', ''),
    isIndeterminate: true
  })));
}).add('Toggle', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Toggle, {
    id: "toggle",
    name: "toggle",
    postText: (0, _react3.text)('Post Text', '')
  })));
}).add('Tag', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Tag, {
    className: "l-mr-small l-mb-small",
    text: (0, _react3.text)('Text', 'Barber Services'),
    isSmall: (0, _react3.boolean)('Small', false)
  }), _react.default.createElement(_index.Tag, {
    className: "l-mr-small l-mb-small",
    kind: "secondary",
    text: (0, _react3.text)('Text', 'Barber Services'),
    isSmall: (0, _react3.boolean)('Small', false)
  })));
}).add('Slider', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Slider, {
    id: "slider",
    name: "slider",
    min: 0,
    max: 200,
    value: 100,
    label: "Scale",
    postLabel: "100%"
  })));
}).add('Select', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Select, {
    label: (0, _react3.text)('Label', 'Country'),
    id: "country",
    options: ['United States', 'Canada', 'New Jersey'],
    isSimple: (0, _react3.boolean)('Simple', false),
    helper: (0, _react3.text)('Helper', ''),
    error: (0, _react3.text)('Error', ''),
    disabled: (0, _react3.boolean)('Disabled', false)
  })));
}).add('Date Picker', function () {
  return _react.default.createElement(_index.DatePicker, {
    id: "TESTS",
    numberOfMonths: 1
  });
}).add('Stars', function () {
  return _react.default.createElement(_index.Stars, null);
});