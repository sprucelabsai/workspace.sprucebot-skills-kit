"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _default = {
  lang: {},
  overrides: {},
  configure: function configure(langDir) {
    this.lang = require("".concat(langDir, "/default.js"));

    try {
      this.overrides = require("".concat(langDir, "/overrides.js"));
    } catch (err) {
      console.info('No lang override specified.');
    }
  },
  mixin: function mixin(lang, overrides) {
    this.lang = lang;
    this.overrides = overrides;
  },
  getText: function getText(key) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var translations = (0, _objectSpread2.default)({}, this.lang, {}, this.overrides, {}, context);

    if (translations[key]) {
      return typeof translations[key] === 'function' ? translations[key](translations) : translations[key];
    }

    throw Error("Translation missing key ".concat(key));
  }
};
exports.default = _default;