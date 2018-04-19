'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var submit = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(values) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						console.log('Redux Form Submit: ', values);
						return _context.abrupt('return', new Promise(function (resolve, reject) {
							var yes = confirm('Form Success or Fail?');
							var done = void 0;
							if (yes) {
								done = resolve;
							} else {
								done = reject;
							}
							setTimeout(done, 1500);
						}).then(function () {
							return { success: 'Success!' };
						}).catch(function () {
							throw new _reduxForm.SubmissionError({
								firstName: 'Async Validation Error',
								_error: 'Submit Failed'
							});
						}));

					case 2:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function submit(_x) {
		return _ref.apply(this, arguments);
	};
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _BotText = require('../BotText/BotText');

var _BotText2 = _interopRequireDefault(_BotText);

var _Pre = require('../Pre/Pre');

var _Pre2 = _interopRequireDefault(_Pre);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _LinkPile = require('../LinkPile/LinkPile');

var _LinkPile2 = _interopRequireDefault(_LinkPile);

var _Form = require('../Form/Form');

var _Form2 = _interopRequireDefault(_Form);

var _Typography = require('../Typography/Typography');

var _InputField = require('../InputField/InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _TextArea = require('../TextArea/TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _SelectField = require('../SelectField/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var required = function required(value) {
	return value ? undefined : 'Required';
};
var minLength = function minLength(min) {
	return function (value) {
		return value && value.length < min ? 'Must be ' + min + ' characters or more' : undefined;
	};
};
// Important to invoke this function outside #render()
var minLength8 = minLength(8);

function FormExample(_ref2) {
	var handleSubmit = _ref2.handleSubmit,
	    reset = _ref2.reset,
	    pristine = _ref2.pristine,
	    submitting = _ref2.submitting,
	    error = _ref2.error,
	    _ref2$onSubmit = _ref2.onSubmit,
	    onSubmit = _ref2$onSubmit === undefined ? submit : _ref2$onSubmit;

	return _react2.default.createElement(
		_Form2.default,
		{ onSubmit: handleSubmit(onSubmit) },
		_react2.default.createElement(
			_BotText2.default,
			null,
			'Using',
			' ',
			_react2.default.createElement(
				'a',
				{ href: 'https://redux-form.com', target: '_blank' },
				'redux-form'
			),
			' ',
			'makes it easy to validate form state and handle server side errors on form submission. Go ahead, try out the example:'
		),
		_react2.default.createElement(
			_Typography.SectionHeading,
			null,
			'Example Heading'
		),
		_react2.default.createElement(_reduxForm.Field, { name: 'firstName', label: 'First Name', component: _InputField2.default }),
		_react2.default.createElement(_reduxForm.Field, { name: 'email', label: 'Email', component: _InputField2.default }),
		_react2.default.createElement(_reduxForm.Field, {
			name: 'password',
			type: 'password',
			label: 'Password',
			validate: [required, minLength8],
			component: _InputField2.default
		}),
		_react2.default.createElement(_reduxForm.Field, {
			name: 'description',
			type: 'textarea',
			label: 'Growing multiline input',
			finePrint: 'This is helpful fine print.',
			component: _TextArea2.default
		}),
		_react2.default.createElement(
			_reduxForm.Field,
			{
				name: 'dropdown',
				label: 'Dropdowns Rock!',
				validate: required,
				component: _SelectField2.default
			},
			_react2.default.createElement(
				'option',
				{ value: null },
				'Select a value'
			),
			_react2.default.createElement(
				'option',
				{ value: 'value1' },
				'Value 1'
			),
			_react2.default.createElement(
				'option',
				{ value: 'value2' },
				'Value 2'
			)
		),
		error && _react2.default.createElement(
			_Typography.Paragraph,
			null,
			error
		),
		_react2.default.createElement(
			_LinkPile2.default,
			null,
			_react2.default.createElement(
				_Button2.default,
				{ alt: true, disabled: pristine || submitting, onClick: reset },
				'Reset Form'
			),
			_react2.default.createElement(
				_Button2.default,
				{ primary: true, type: 'submit', disabled: submitting, busy: submitting },
				'Submit'
			)
		),
		_react2.default.createElement(
			_Typography.SectionHeading,
			null,
			'Basic Form Submission'
		),
		_react2.default.createElement(
			_BotText2.default,
			null,
			'Notice you pass the form an `initialValues` which sets default values for the form. When a user submits the form is your chance to persist those values to your server and other reducers. When the `onSubmit` is executed, you can expect that client side validations have ran.'
		),
		_react2.default.createElement(
			_Pre2.default,
			null,
			'\nimport { reduxForm, Field, propTypes, SubmissionError } from \'redux-form\'\n\nconst required = value => (value ? undefined : \'Required\') // Validator\n\nfunction FormExample({ handleSubmit, reset, pristine, submitting, error }) {\n\tconst onSubmit = (values) => console.log(\'Your async submit function. Submitted values: \', values)\n\treturn (\n\t\t<Form onSubmit={handleSubmit(onSubmit)}>\n\t\t\t<SectionHeading>Example Heading</SectionHeading>\n\t\t\t<Field name="firstName" label="First Name" component={InputField} />\n\t\t\t{error && <P>{error}</P>}\n\t\t\t<LinkPile>\n\t\t\t\t<Button alt disabled={pristine || submitting} onClick={reset}>\n\t\t\t\t\tReset Form\n\t\t\t\t</Button>\n\t\t\t\t<Button primary type="submit" disabled={submitting} busy={submitting}>\n\t\t\t\t\tSubmit\n\t\t\t\t</Button>\n\t\t\t</LinkPile>\n\t\t</Form>\n\t)}\nexport default reduxForm({\n\tform: \'form-example\',\n\tinitialValues: {\n\t\tfirstName: \'Sprucebot\'\n\t}\n})(FormExample)'
		),
		_react2.default.createElement(
			_Pre2.default,
			null,
			'<Field name="firstName" label="First Name" component={InputField} />'
		),
		_react2.default.createElement(
			_Pre2.default,
			null,
			'<Field name="email" label="Email" component={InputField} />'
		),
		_react2.default.createElement(
			_Pre2.default,
			null,
			'<Field\n\tname="password"\n\ttype="password"\n\tlabel="Password"\n\tvalidate={[required, minLength8]}\n\tcomponent={InputField}\n/>'
		),
		_react2.default.createElement(
			_Pre2.default,
			null,
			'<Field\n\tname="description"\n\ttype="textarea"\n\tlabel="Growing multiline input"\n\tfinePrint="This is helpful fine print."\n\tcomponent={TextArea}\n/>'
		),
		_react2.default.createElement(
			_Pre2.default,
			null,
			'<Field\n\tname="dropdown"\n\tlabel="Dropdowns Rock!"\n\tvalidate={required}\n\tcomponent={SelectField}\n>\n\t<option value={null}>Select a value</option>\n\t<option value="value1">Value 1</option>\n\t<option value="value2">Value 2</option>\n</Field>'
		)
	);
}

FormExample.propTypes = _extends({}, _reduxForm.propTypes);

exports.default = (0, _reduxForm.reduxForm)({
	form: 'form-example',
	initialValues: {
		firstName: 'Sprucebot'
	}
})(FormExample);