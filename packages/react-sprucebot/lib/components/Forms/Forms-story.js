"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _index = require("./index");

var _countries = _interopRequireDefault(require("../../../.storybook/data/countries"));

var renderSuggestion = function renderSuggestion(suggestion) {
  if (suggestion.isEmptyMessage) {
    return _react.default.createElement("div", {
      className: "autosuggest__no-results"
    }, _react.default.createElement("p", {
      className: "autosuggest__no-results-title"
    }, "No matching countries found."), _react.default.createElement("p", {
      className: "autosuggest__no-results-subtitle"
    }, "Please adjust your search and try again."));
  }

  return _react.default.createElement(_Button.default, {
    isSmall: true,
    className: "autosuggest__list-item-inner",
    text: suggestion.text
  });
};

var stories = (0, _react2.storiesOf)('Forms', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Autosuggest', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Autosuggest, {
    inputPre: (0, _react3.object)('inputPre', {
      label: 'Country'
    }),
    inputHelper: (0, _react3.object)('inputHelper', {
      helper: 'We use this information to improve your shopping experience.'
    }),
    placeholder: (0, _react3.text)('placeholder', 'Select your country'),
    defaultSuggestions: (0, _react3.object)('defaultSuggestions', _countries.default),
    shouldRenderSuggestions: function shouldRenderSuggestions() {
      return true;
    },
    renderSuggestion: renderSuggestion,
    getSuggestionValue: function getSuggestionValue(value) {
      return value.text;
    },
    getSuggestions: function getSuggestions(value) {
      var results = _countries.default.filter(function (suggestion) {
        return suggestion.text.toLowerCase().slice(0, value.length) === value.toLowerCase();
      }); // Here you could add click events to buttons or whatever else they need
      // No Results Message


      if (results.length === 0) {
        return [{
          text: 'NO RESULTS',
          isEmptyMessage: true
        }];
      }

      return results;
    }
  }));
}).add('Text Input', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.TextInput, {
    type: "text",
    id: (0, _react3.text)('id', 'input'),
    name: (0, _react3.text)('name', 'inputName'),
    label: (0, _react3.text)('label', 'First Name'),
    postLabel: (0, _react3.text)('postLabel', ''),
    placeholder: (0, _react3.text)('placeholder', 'i.e. Annie'),
    defaultValue: (0, _react3.text)('defaultValue', ''),
    error: (0, _react3.text)('error', ''),
    helper: (0, _react3.text)('helper', 'Let me help you understand why we are asking for this.'),
    readOnly: (0, _react3.boolean)('readOnly', false),
    isSmall: (0, _react3.boolean)('isSmall', false)
  })));
}).add('Text Area', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.TextArea, (0, _extends2.default)({
    id: (0, _react3.text)('id', 'input'),
    name: (0, _react3.text)('name', 'inputName'),
    label: (0, _react3.text)('label', 'Category'),
    postLabel: (0, _react3.text)('postLabel', ''),
    placeholder: (0, _react3.text)('placeholder', 'Optional category description…'),
    defaultValue: (0, _react3.text)('defaultValue', ''),
    error: (0, _react3.text)('error', ''),
    helper: (0, _react3.text)('helper', ''),
    readOnly: (0, _react3.boolean)('readOnly', false)
  }, (0, _react3.object)('...rest', {})))));
}).add('Search', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Search, {
    type: "text",
    placeholder: (0, _react3.text)('placeholder', 'Search for anything…'),
    readOnly: (0, _react3.boolean)('readOnly', false),
    isSmall: (0, _react3.boolean)('isSmall', false)
  })));
}).add('Phone Number', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.PhoneInput, {
    label: (0, _react3.text)('label', 'Phone Number'),
    placeholder: (0, _react3.text)('placeholder', '(555) 555-5555'),
    isSmall: (0, _react3.boolean)('isSmall', false)
  })));
}).add('Subdomain', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.DomainInput, {
    label: (0, _react3.text)('label', 'Shopify Store URL'),
    placeholder: (0, _react3.text)('placeholder', 'my-shopify-store'),
    appendix: (0, _react3.text)('appendix', '.myshopify.com')
  })));
}).add('Radio', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Radio, {
    className: "l-mb-xsmall",
    id: "option-one",
    name: "radio",
    label: (0, _react3.text)('label: option one', 'Option One'),
    postText: (0, _react3.text)('postText: option one', '')
  }), _react.default.createElement(_index.Radio, {
    className: "l-mb-xsmall",
    id: "option-two",
    name: "radio",
    label: (0, _react3.text)('label: option two', 'Option Two'),
    postText: (0, _react3.text)('postText: option two', '')
  }), _react.default.createElement(_index.Radio, {
    className: "l-mb-xsmall",
    id: "option-three",
    name: "radio",
    label: (0, _react3.text)('label: option three', 'Option Three'),
    postText: (0, _react3.text)('postText: option three', '')
  })));
}).add('Checkbox', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Checkbox, {
    className: "l-mb-xsmall",
    id: "option-one",
    name: "optionOne",
    label: (0, _react3.text)('label: option one', 'Option One'),
    postText: (0, _react3.text)('postText: option one', '')
  }), _react.default.createElement(_index.Checkbox, {
    className: "l-mb-xsmall",
    id: "option-two",
    name: "optionTwo",
    label: (0, _react3.text)('label: option two', 'Option Two'),
    postText: (0, _react3.text)('postText: option two', '')
  }), _react.default.createElement(_index.Checkbox, {
    className: "l-mb-xsmall",
    id: "option-three",
    name: "optionThree",
    label: (0, _react3.text)('label: option three', 'Option Three'),
    postText: (0, _react3.text)('postText: option three', ''),
    isIndeterminate: true
  })));
}).add('Toggle', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Toggle, {
    id: (0, _react3.text)('id', 'toggle'),
    name: (0, _react3.text)('name', 'toggle'),
    postText: (0, _react3.text)('postText', ''),
    className: (0, _react3.text)('className', '')
  })));
}).add('Tag', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Tag, {
    text: (0, _react3.text)('text', 'Barber Services'),
    isSmall: (0, _react3.boolean)('isSmall', false),
    className: (0, _react3.text)('className', 'l-mr-small l-mb-small')
  }), _react.default.createElement(_index.Tag, {
    kind: "secondary",
    text: (0, _react3.text)('text', 'Barber Services'),
    isSmall: (0, _react3.boolean)('isSmall', false),
    className: (0, _react3.text)('className', 'l-mr-small l-mb-small')
  })));
}).add('Slider', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Slider, {
    id: (0, _react3.text)('id', 'slider'),
    name: (0, _react3.text)('name', 'slider'),
    min: (0, _react3.number)('min', 0),
    max: (0, _react3.number)('max', 200),
    value: (0, _react3.number)('value', 100),
    label: (0, _react3.text)('label', 'Scale'),
    postLabel: (0, _react3.text)('postLabel', '100%')
  })));
}).add('Select', function () {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_index.Select, {
    label: (0, _react3.text)('label', 'Country'),
    id: (0, _react3.text)('id', 'country'),
    options: (0, _react3.object)('options', ['United States', 'Canada', 'New Jersey']),
    isSimple: (0, _react3.boolean)('isSimple', false),
    helper: (0, _react3.text)('helper', ''),
    error: (0, _react3.text)('error', ''),
    disabled: (0, _react3.boolean)('disabled', false)
  })));
}).add('Date Picker', function () {
  return _react.default.createElement(_index.DatePicker, {
    id: (0, _react3.text)('id', 'test'),
    numberOfMonths: (0, _react3.number)('numberOfMonths', 1)
  });
}).add('Stars', function () {
  return _react.default.createElement(_index.Stars, null);
});