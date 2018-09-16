'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _Container = require('../Container/Container');

var _Container2 = _interopRequireDefault(_Container);

var _BotText = require('../BotText/BotText');

var _BotText2 = _interopRequireDefault(_BotText);

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Typography = require('../Typography/Typography');

var _Avatar = require('../Avatar/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Form = require('../Form/Form');

var _Form2 = _interopRequireDefault(_Form);

var _Switch = require('../Switch/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _InputField = require('../InputField/InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _SelectField = require('../SelectField/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _List = require('../List/List');

var _Tabs = require('../Tabs/Tabs');

var _LinkPile = require('../LinkPile/LinkPile');

var _LinkPile2 = _interopRequireDefault(_LinkPile);

var _Pager = require('../Pager/Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _StatsSlider = require('../StatsSlider/StatsSlider');

var _StatsSlider2 = _interopRequireDefault(_StatsSlider);

var _ButtonGrid = require('../ButtonGrid/ButtonGrid');

var _Stars = require('../Stars/Stars');

var _Stars2 = _interopRequireDefault(_Stars);

var _ImageCropper = require('../ImageCropper/ImageCropper');

var _ImageCropper2 = _interopRequireDefault(_ImageCropper);

var _Callout = require('../Callout/Callout');

var _Callout2 = _interopRequireDefault(_Callout);

var _Feed = require('../Feed/Feed');

var _Feed2 = _interopRequireDefault(_Feed);

var _TrainingGuide = require('../TrainingGuide/TrainingGuide');

var _TrainingGuide2 = _interopRequireDefault(_TrainingGuide);

var _Onboarding = require('../Onboarding/Onboarding');

var _Onboarding2 = _interopRequireDefault(_Onboarding);

var _Dialog = require('../Dialog/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Pre = require('../Pre/Pre');

var _Pre2 = _interopRequireDefault(_Pre);

var _Error = require('../Error/Error');

var _Error2 = _interopRequireDefault(_Error);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _IconButton = require('../IconButton/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ControlButton = require('../ControlButton/ControlButton');

var _ControlButton2 = _interopRequireDefault(_ControlButton);

var _TimeInput = require('../TimeInput/TimeInput');

var _TimeInput2 = _interopRequireDefault(_TimeInput);

var _DateSelect = require('../DateSelect/DateSelect');

var _DateSelect2 = _interopRequireDefault(_DateSelect);

var _DateRangeSelect = require('../DateRangeSelect/DateRangeSelect');

var _DateRangeSelect2 = _interopRequireDefault(_DateRangeSelect);

var _index = require('../../skillskit/index');

var _index2 = _interopRequireDefault(_index);

var _actions = require('../../skillskit/store/actions');

var actions = _interopRequireWildcard(_actions);

var _reducers = require('../../skillskit/store/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _withStore = require('../../skillskit/store/withStore');

var _withStore2 = _interopRequireDefault(_withStore);

var _FormExample = require('./FormExample');

var _FormExample2 = _interopRequireDefault(_FormExample);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dark = (0, _styledComponents2.default)(_Pre2.default).withConfig({
	displayName: 'Styleguide__Dark',
	componentId: 'xjzule-0'
})(['background-color:#333;padding:3px;']);

var FlexContainer = (0, _styledComponents2.default)('div').withConfig({
	displayName: 'Styleguide__FlexContainer',
	componentId: 'xjzule-1'
})(['display:flex;justify-content:center;']);

var demoGuest = {
	id: 'b8d62e17-a511-4b9b-ae8a-56710f89af48',
	role: 'guest',
	status: 'offline',
	visits: 1,
	LocationId: '1975559c-e071-4198-8ab3-eccbeb00e1d0',
	UserId: 'a2ca3026-ef80-408f-9a39-4ab9fa44a87d',
	User: {
		id: 'a2ca3026-ef80-408f-9a39-4ab9fa44a87d',
		firstName: 'Niki',
		name: 'Niki R.',
		profileImageUUID: null,
		profileImages: {
			profile60: 'https://hello.sprucebot.com/avatar.jpg',
			'profile60@2x': 'https://hello.sprucebot.com/avatar.jpg',
			profile150: 'https://hello.sprucebot.com/avatar.jpg',
			'profile150@2x': 'https://hello.sprucebot.com/avatar.jpg'
		},
		defaultProfileImages: {
			profile60: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
			'profile60@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
			profile150: 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
			'profile150@2x': 'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
		}
	},
	isConnected: true,
	lastRecordedVisit: '2017-12-01T23:05:35.705Z',
	updatedAt: '2017-12-02T00:06:05.448Z',
	Location: {
		id: '1975559c-e071-4198-8ab3-eccbeb00e1d0',
		name: 'Spruce',
		addressLine1: '4347 Tennyson St',
		addressLine2: null,
		addressCity: 'Denver',
		addressState: 'CO',
		addressZip: '80212',
		addressCountry: 'US',
		geo: { lat: 39.775644, lng: -105.044258 },
		OrganizationId: 'fcdd548b-fe3b-42dc-8c66-6810411cd84d'
	}
};
var NOW = void 0;
if (process.env.NODE_ENV === 'test') {
	NOW = (0, _momentTimezone2.default)(946738800000).tz('America/Los_Angeles'); // Snapshot testing requires an unchanging date
} else {
	NOW = new Date();
}

var Styleguide = function (_Component) {
	_inherits(Styleguide, _Component);

	function Styleguide(props) {
		_classCallCheck(this, Styleguide);

		var _this = _possibleConstructorReturn(this, (Styleguide.__proto__ || Object.getPrototypeOf(Styleguide)).call(this, props));

		_this.state = {
			calloutOn: false,
			errorMessage: '',
			showAlert: false
		};
		_this.didCompleteOnboarding = _this.didCompleteOnboarding.bind(_this);
		return _this;
	}

	_createClass(Styleguide, [{
		key: 'didCompleteOnboarding',
		value: function didCompleteOnboarding() {
			var onboardingComplete = this.props.onboarding.onboardingComplete;

			if (!onboardingComplete) {
				this.props.actions.onboarding.finishOnboarding();
				console.log('Posting to your database that you completed onboarding.  Check your Skill Data now!');
			} else {
				console.log("You've already completed the onboarding.  Check your Skill Data now!");
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var HR = _react2.default.createElement('hr', { style: 'border-top-width:10px;' });
			var calloutOn = this.state.calloutOn;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Importing Components'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'All the components you need to build your skill are available in the \'react-sprucebot\' module. Any modules you create yourself are subject to rejection from the Skills Marketplace.'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'import {\n\tContainer,\n\tBotText,\n\tLoader,\n\tH1,\n\tH2,\n\tH3,\n\tH4,\n\tH5,\n\tH6,\n\tSectionHeading,\n\tParagraph as P,\n\tA,\n\tAvatar,\n\tButton,\n\tForm,\n\tSwitch,\n\tInputField,\n\tSelectField,\n\tSubmitWrapper,\n\tList,\n\tListItem,\n\tTabs,\n\tTabPane,\n\tLinkPile,\n\tPager,\n\tStatsSlider,\n\tButtonGrid,\n\tGridButton,\n\tStars,\n\tImageCropper,\n\tCallout,\n\tFeed,\n\tTrainingGuide,\n\tDialog,\n\tIcon,\n\tIconButton,\n\tControlButton\n} from \'react-sprucebot\''
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Headings'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Notice the use of the Component with a capitalized tag, e.g. \'H\' vs \'h\'. This is intentional and is actively enforced.'
					),
					_react2.default.createElement(
						_Typography.H1,
						null,
						'I\'m an H1'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<H1>I\'m an H1</H1>'
					),
					_react2.default.createElement(
						_Typography.H2,
						null,
						'I\'m an H2'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<H2>I\'m an H2</H2>'
					),
					_react2.default.createElement(
						_Typography.H3,
						null,
						'I\'m an H3'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<H3>I\'m an H3</H3>'
					),
					_react2.default.createElement(
						_Typography.H4,
						null,
						'I\'m an H4'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<H4>I\'m an H4</H4>'
					),
					_react2.default.createElement(
						_Typography.H5,
						null,
						'I\'m an H5'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<H5>I\'m an H5</H5>'
					),
					_react2.default.createElement(
						_Typography.H6,
						null,
						'I\'m an H6'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<H6>I\'m an H6</H6>'
					),
					_react2.default.createElement(
						_Typography.Paragraph,
						null,
						'I\'m a paragraph of some text'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<P>I\'m a paragraph of some text</P>'
					),
					_react2.default.createElement(
						_Typography.A,
						{ href: '#' },
						'I\'m an anchor tag'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<A href="#">I\'m an anchor tag</A>'
					),
					_react2.default.createElement(
						_Typography.SectionHeading,
						null,
						'Section Heading'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<SectionHeading>Section Heading</SectionHeading>'
					),
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Use SectionHeading to break up sections of your page and to label forms, similar to a fieldset.'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Sub Headings'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_Typography.H1,
						{ with_subheader: true },
						'Header'
					),
					_react2.default.createElement(
						_Typography.H2,
						{ subheader: true },
						'Sub Headings'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<H1 with_subheader>Header</H1>\n<H2 subheader>Sub Headings</H2>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Bot Text'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'I\'m some bot text. I\'m great for quick hints, tips, shout outs, etc. This text comes right from Sprucebot, so make sure it\'s on brand.'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<BotText>I\'m some bot text. I\'m great for quick hints, tips, shout outs, etc. This text comes right from Sprucebot, so make sure it\'s on brand.</BotText>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Paragraphs'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_Typography.Paragraph,
						null,
						'I\'m a normal paragraph tag'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<P>I\'m a normal paragraph tag</P>'
					),
					_react2.default.createElement(
						_Typography.Paragraph,
						{ fine: true },
						'I\'m some fine print'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<P fine>I\'m some fine print</P>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Top Avatar'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Avatars usually go next to users when output in a list. Adding the "top" property will make it big and center. Great for the tops of profile or dashboard pages.'
					),
					_react2.default.createElement(_Avatar2.default, { top: true, image: 'https://hello.sprucebot.com/avatar.jpg' }),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Avatar top image="https://hello.sprucebot.com/avatar.jpg" />'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					{
						ref: function ref(_ref) {
							_this2.ref = _ref;
						}
					},
					'Buttons'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_Button2.default,
						{ primary: true },
						'I\'m a primary button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button primary>I\'m a primary button</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ primary: true, disabled: true },
						'I\'m a primary disabled button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button primary disabled>I\'m a primary disabled button</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ secondary: true },
						'I\'m a secondary button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button secondary>I\'m a secondary button</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ secondary: true, disabled: true },
						'I\'m a secondary disabled button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button secondary disabled>I\'m a secondary disabled button</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ alt: true },
						'I\'m an alt button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button alt>I\'m an alt button</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ alt: true, disabled: true },
						'I\'m an alt disabled button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button alt disabled>I\'m an alt disabled button</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ secondary: true, alt: true },
						'I\'m a secondary alt button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button secondary alt >I\'m a secondary alt button</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ secondary: true, alt: true, disabled: true },
						'I\'m a secondary alt disabled button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button secondary alt disabled>I\'m a secondary alt disabled button</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ caution: true },
						'I\'m a caution button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button caution>I\'m a caution button</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ link: true },
						'I\'m a button link'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button link>I\'m a button link</Button>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Link Buttons'
				),
				_react2.default.createElement(
					_BotText2.default,
					null,
					'Buttons can also be turned into links by setting the "href". Optional options include setting "target", or "router"'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button primary href="https://sprucebot.com">I\'m a primary button turned link</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ primary: true, href: 'https://sprucebot.com' },
						'I\'m a primary button turned link'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button primary href="https://sprucebot.com" target="_blank">I\'ll open in a new window</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ primary: true, href: 'https://sprucebot.com', target: '_blank' },
						'I\'ll open in a new window'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'import Router from \'next/router\'\n\n<Button primary href="/styleguide" router={Router}>I\'ll use next.js router.push() to change url</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{ primary: true, href: '/' },
						'I\'ll use next.js router.push() to change url'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Icons'
				),
				_react2.default.createElement(
					_Container2.default,
					{ className: 'icon__button__container' },
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Icons and Icon Buttons have the option to display an icon using Material Icons. Check out https://material.io/icons/. To use an icon, just enter the icon name as the child of the button.'
					),
					_react2.default.createElement(
						_Icon2.default,
						null,
						'mood'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Icon>mood</Icon>'
					),
					_react2.default.createElement(
						_IconButton2.default,
						null,
						'place'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<IconButton onClick={/* Handle Click */}>place</IconButton>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Control Buttons'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Control Buttons have the option to display a right or left icon using Material Icons. Check out https://material.io/icons/. To use an icon, just enter the icon name as a value for the iconLeft or iconRight prop. You can also pass an href to render the button as a link!'
					),
					_react2.default.createElement(
						_ControlButton2.default,
						null,
						'I\'m a control button'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<ControlButton>I\'m a control button</ControlButton>'
					),
					_react2.default.createElement(
						_ControlButton2.default,
						{ iconLeft: 'favorite' },
						'I have a left icon'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<ControlButton iconLeft="favorite">I have a left icon</ControlButton>'
					),
					_react2.default.createElement(
						_ControlButton2.default,
						{ iconRight: 'edit' },
						'I have a right icon'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<ControlButton iconRight="edit">I have a right icon</ControlButton>'
					),
					_react2.default.createElement(
						_ControlButton2.default,
						{ iconRight: '\uD83E\uDD16', href: 'https://sprucebot.com' },
						'I\'m a link'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<ControlButton iconRight="\uD83E\uDD16" href="https://sprucebot.com">I\'m a link</ControlButton>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Loaders'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Loaders can be dark or light. Default, they are dark. But, if you need to put a loader on a dark dark background, set dark=',
						false,
						'.'
					),
					_react2.default.createElement(_Loader2.default, null),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Loader />'
					),
					_react2.default.createElement(
						Dark,
						null,
						_react2.default.createElement(_Loader2.default, { dark: false })
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Loader dark={false} />'
					),
					_react2.default.createElement(
						_Button2.default,
						{ busy: true },
						'Content does not matter'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button busy>Content does not matter</Button>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Switches'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(_Switch2.default, {
						onChange: function onChange(on, e) {
							console.log('on:', on, 'event:', e);
						}
					}),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Switch\n\tonChange={(on, e) => {\n\t\tconsole.log(\'on:\', on, \'event:\', e)\n\t}}\n/>'
					),
					_react2.default.createElement(_Switch2.default, { on: true }),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Switch on />'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Date Select'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Date Select allows for the selection of a single date and returns a moment object. Custom props allow blocked dates, default values, and initial visible months.'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<DateSelect\n\tallowPastDates\n\tbypassDaysBlocked\n\tonDateSelect={(date) => {\n\t\tconsole.log(date)\n\t}}\n\tdefaultDate={moment(\'2018-08-10\')}\n\tinitialVisibleMonth={() => moment(\'2018-08-10\')}\n/>'
					),
					_react2.default.createElement(
						FlexContainer,
						null,
						_react2.default.createElement(_DateSelect2.default, {
							allowPastDates: true,
							bypassDaysBlocked: true,
							onDateSelect: function onDateSelect(date) {
								console.log(date);
							},
							defaultDate: (0, _momentTimezone2.default)('2018-08-10'),
							initialVisibleMonth: function initialVisibleMonth() {
								return (0, _momentTimezone2.default)('2018-08-10');
							}
						})
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Date Range Select'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Date Range Select allows for the selection of a range of dates via choosing a start and end date, returning a moment object for each. Custom props allow for the viewing of outside month days, selection of an entire current week, and default date selection.'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<DateRangeSelect\n\tallowPastDates\n\tbypassDaysBlocked\n\tonDatesChange={(startDate, endDate) => {\n\t\tconsole.log(startDate, endDate)\n\t}}\n\tnumberOfMonths={1}\n\tsetDefaultDates\n\tdefaultStartDate={moment(\'2018-03-28\')}\n\tdefaultEndDate={moment()}\n/>'
					),
					_react2.default.createElement(
						FlexContainer,
						null,
						_react2.default.createElement(_DateRangeSelect2.default, {
							allowPastDates: true,
							bypassDaysBlocked: true,
							onDatesChange: function onDatesChange(startDate, endDate) {
								console.log(startDate, endDate);
							},
							numberOfMonths: 1,
							setDefaultDates: true,
							defaultStartDate: (0, _momentTimezone2.default)('2018-03-28'),
							defaultEndDate: (0, _momentTimezone2.default)()
						})
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<DateRangeSelect\n\tallowPastDates\n\tbypassDaysBlocked\n\tonDatesChange={(startDate, endDate) => {\n\t\tconsole.log(startDate, endDate)\n\t}}\n\tnumberOfMonths={2}\n\tcurrentWeek\n\tenableOutsideDays\n\tinitialVisibleMonth={() => moment(\'2018-10-31\')}\n\torientation={\'vertical\'}\n/>'
					),
					_react2.default.createElement(
						FlexContainer,
						null,
						_react2.default.createElement(_DateRangeSelect2.default, {
							allowPastDates: true,
							bypassDaysBlocked: true,
							onDatesChange: function onDatesChange(startDate, endDate) {
								console.log(startDate, endDate);
							},
							numberOfMonths: 2,
							currentWeek: true,
							enableOutsideDays: true,
							initialVisibleMonth: function initialVisibleMonth() {
								return (0, _momentTimezone2.default)('2018-10-31');
							},
							orientation: 'vertical'
						})
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Time Input'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'The Time Input is a cross-browser compatible implementation for capturing a time.'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<TimeInput\n\tdefaultValue="22:15"\n\tonChange={newValue =>\n\t\tconsole.log(`Time Input Changed to: ${newValue}`)\n\t}\n\tref={ref => (this.timeInput = ref)}\n/>'
					),
					_react2.default.createElement(_TimeInput2.default, {
						defaultValue: '22:15',
						onChange: function onChange(newValue) {
							return console.log('Time Input Changed to: ' + newValue);
						},
						ref: function ref(_ref2) {
							return _this2.timeInput = _ref2;
						}
					})
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Redux Forms'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(_FormExample2.default, null)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Lists'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_Typography.SectionHeading,
						null,
						'A Friend List'
					),
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Lists are very useful for showing guests, teammates, etc.'
					),
					_react2.default.createElement(
						_List.List,
						null,
						_react2.default.createElement(_List.ListItem, {
							title: 'Taylor',
							subtitle: 'Last Visit: Today',
							rightTitle: 'Owner',
							rightSubtitle: 'Visits: 7',
							avatar: 'https://hello.sprucebot.com/avatar.jpg'
						}),
						_react2.default.createElement(_List.ListItem, {
							online: false,
							title: 'Ryan',
							subtitle: 'Last Visit: 10 days ago',
							rightTitle: 'Owner',
							rightSubtitle: 'Visits: 7',
							avatar: 'https://hello.sprucebot.com/avatar.jpg'
						})
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<List>\n\t<ListItem\n\t\ttitle="Taylor"\n\t\tsubtitle="Last Visit: Today"\n\t\trightTitle="Owner"\n\t\trightSubtitle="Visits: 7"\n\t\tavatar="https://hello.sprucebot.com/avatar.jpg"\n\t/>\n\t<ListItem\n\t\tonline={false}\n\t\ttitle="Ryan"\n\t\tsubtitle="Last Visit: 10 days ago"\n\t\trightTitle="Owner"\n\t\trightSubtitle="Visits: 7"\n\t\tavatar="https://hello.sprucebot.com/avatar.jpg"\n\t/>\n</List>'
					),
					_react2.default.createElement(
						_Typography.SectionHeading,
						null,
						'A Flexible List!'
					),
					_react2.default.createElement(
						_BotText2.default,
						null,
						'But, lists can do more than that! Actually, a LOT more than that!'
					),
					_react2.default.createElement(
						_List.List,
						null,
						_react2.default.createElement(
							_List.ListItem,
							null,
							'This is the most basic list item.'
						),
						_react2.default.createElement(_List.ListItem, {
							title: 'Awesome title!',
							subtitle: 'Fantastic subtitle!',
							rightInput: _react2.default.createElement(_Button2.default, {
								remove: true,
								onClick: function onClick(e) {
									console.log('event:', e);
								}
							})
						}),
						_react2.default.createElement(
							_List.ListItem,
							{ rightInput: _react2.default.createElement(_Switch2.default, null) },
							'I can even do switches!'
						),
						_react2.default.createElement(
							_List.ListItem,
							null,
							_react2.default.createElement(_InputField2.default, { label: 'An input!', input: { value: '' }, meta: {} })
						),
						_react2.default.createElement(
							_List.ListItem,
							null,
							_react2.default.createElement(
								_SelectField2.default,
								{
									label: 'And a SelectField!',
									input: { value: '' },
									meta: {}
								},
								_react2.default.createElement(
									'option',
									null,
									'Nuke \'em Rico'
								),
								_react2.default.createElement(
									'option',
									null,
									'With pleasure!'
								)
							)
						)
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<List>\n\t<ListItem>This is the most basic list item.</ListItem>\n\t<ListItem\n\t\ttitle="Awesome title!"\n\t\tsubtitle="Fantastic subtitle!"\n\t\trightInput={\n\t\t\t<Button\n\t\t\t\tremove\n\t\t\t\tonClick={e => {\n\t\t\t\t\tconsole.log(\'event:\', e)\n\t\t\t\t}}\n\t\t\t/>\n\t\t}\n\t/>\n\t<ListItem rightInput={<Switch />}>I can even do switches!</ListItem>\n\t<ListItem>\n\t\t<InputField label="An input!" input={{value: \'val\', onChange: () => console.log(\'onChange!\')}} />\n\t</ListItem>\n\t<ListItem>\n\t\t<Select label="And a select!">\n\t\t\t<option>Nuke \'em Rico</option>\n\t\t\t<option>With pleasure!</option>\n\t\t</Select>\n\t</ListItem>\n</List>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Tabs'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_Tabs.Tabs,
						{
							onChange: function onChange(idx, e) {
								console.log('tab:', idx, 'event:', e);
							}
						},
						_react2.default.createElement(
							_Tabs.TabPane,
							{ title: 'First' },
							'First Pane'
						),
						!this.state.hideSecondPane && _react2.default.createElement(
							_Tabs.TabPane,
							{ selected: true, title: 'Second' },
							_react2.default.createElement(
								_BotText2.default,
								null,
								'Tabs are fantastic! You can use them so easily!'
							)
						),
						_react2.default.createElement(
							_Tabs.TabPane,
							{ title: 'Third' },
							_react2.default.createElement(
								_BotText2.default,
								null,
								'Tabs can be dynamically hidden and shown!'
							),
							_react2.default.createElement(
								_List.List,
								null,
								_react2.default.createElement(_List.ListItem, {
									title: 'Show Second Tab',
									rightInput: _react2.default.createElement(_Switch2.default, {
										on: true,
										onChange: function onChange(on) {
											return _this2.setState({ hideSecondPane: !on });
										}
									})
								})
							)
						)
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Tabs\n\tonChange={(idx, e) => {\n\t\tconsole.log(\'tab:\', idx, \'event:\', e)\n\t}}\n>\n\t<TabPane title="First">First Pane</TabPane>\n\t<TabPane selected title="Second">\n\t\t<BotText>Tabs are fantastic! You can use them so easily!</BotText>\n\t</TabPane>\n\t<TabPane title="Third">Third Pane</TabPane>\n</Tabs>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Link Pile'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'LinkPile\'s are great for dashboards or control panels. It shrinks the margin between buttons to make them look more cohesive.'
					),
					_react2.default.createElement(
						_Typography.SectionHeading,
						null,
						'Controls'
					),
					_react2.default.createElement(
						_LinkPile2.default,
						null,
						_react2.default.createElement(
							_Button2.default,
							{ primary: true },
							'Button 1'
						),
						_react2.default.createElement(
							_Button2.default,
							{ alt: true },
							'Button 2'
						),
						_react2.default.createElement(
							_Button2.default,
							{ secondary: true },
							'Button 3'
						),
						_react2.default.createElement(
							_Button2.default,
							{ secondary: true, alt: true },
							'Button 4'
						)
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<LinkPile>\n\t<Button primary>Button 1</Button>\n\t<Button alt>Button 2</Button>\n\t<Button secondary>Button 3</Button>\n\t<Button secondary alt>\n\t\tButton 4\n\t</Button>\n</LinkPile>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Pager'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'The pager is pretty simple. It will track your page (zero based), but you\'ll need to implement `onChange`` to make your API requests. Also, don\'t forget to add `totalPages`.'
					),
					_react2.default.createElement(_Pager2.default, {
						totalPages: 5,
						titles: function titles(page) {
							return ['Page 1', 'Custom', 'What the?', 'You know', 'What'][page];
						},
						onChange: function onChange(page, e) {
							console.log('page:', page, 'event:', e);
						}
					}),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Pager\n\ttotalPages={5}\n\ttitles={page =>\n\t\t[\'Page 1\', \'Custom\', \'What the?\', \'You know\', \'What\'][page]}\n\t\tonChange={(page, e) => {\n\t\t\tconsole.log(\'page:\', page, \'event:\', e)\n\t\t}}\n\t\t/>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Stats Slider'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_Typography.SectionHeading,
						null,
						'KPI\'s'
					),
					_react2.default.createElement(_StatsSlider2.default, {
						stats: [{
							dir: 1,
							title: 'Hourly',
							value: '$23.50'
						}, {
							dir: -1,
							title: 'Services',
							value: 10
						}, {
							dir: 1,
							title: 'Avg. Ticket',
							value: '$25.23'
						}, {
							dir: 0,
							title: 'Returns',
							value: 0
						}]
					}),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<StatsSlider\n\tstats={[\n\t\t{\n\t\t\tdir: 1,\n\t\t\ttitle: \'Hourly\',\n\t\t\tvalue: \'$23.50\'\n\t\t},\n\t\t{\n\t\t\tdir: -1,\n\t\t\ttitle: \'Services\',\n\t\t\tvalue: 10\n\t\t},\n\t\t{\n\t\t\tdir: 1,\n\t\t\ttitle: \'Avg. Ticket\',\n\t\t\tvalue: \'$25.23\'\n\t\t},\n\t\t{\n\t\t\tdir: 0,\n\t\t\ttitle: \'Returns\',\n\t\t\tvalue: 0\n\t\t}\n\t]}\n/>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Button Grid'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_Typography.SectionHeading,
						null,
						'Select Your Options'
					),
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Set the line-height of .btn_grid .btn to control height of button. The text will stay centered.'
					),
					_react2.default.createElement(
						_ButtonGrid.ButtonGrid,
						null,
						_react2.default.createElement(
							_ButtonGrid.GridButton,
							{ subtitle: 'It\'s good' },
							'Option 1'
						),
						_react2.default.createElement(
							_ButtonGrid.GridButton,
							{ subtitle: 'It\'s better!' },
							'Option 2'
						),
						_react2.default.createElement(
							_ButtonGrid.GridButton,
							{ subtitle: 'Def worth a look', selected: true },
							'Option 3'
						)
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<ButtonGrid>\n\t<GridButton subtitle="It\'s good">Option 1</GridButton>\n\t<GridButton subtitle="It\'s better!">Option 2</GridButton>\n\t<GridButton subtitle="Def worth a look" selected>\n\t\tOption 3\n\t</GridButton>\n</ButtonGrid>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Stars'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Please take a moment to rate this rating component.'
					),
					_react2.default.createElement(_Stars2.default, {
						max: 4,
						score: 2,
						'static': false,
						onChange: function onChange(score, e) {
							console.log('score:', score, 'event:', e);
						}
					}),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Stars\n\tmax={4}\n\tscore={2}\n\tstatic={false}\n\tonChange={(score, e) => {\n\t\tconsole.log(\'score:\', score, \'event:\', e)\n\t}}\n/>'
					),
					_react2.default.createElement(
						_BotText2.default,
						null,
						'You can also make Stars static so the rating cannot be changed!'
					),
					_react2.default.createElement(_Stars2.default, {
						max: 4,
						score: 2,
						'static': true,
						onChange: function onChange(score, e) {
							console.log('score:', score, 'event:', e);
						}
					}),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Stars\n\tmax={4}\n\tscore={2}\n\tstatic={true}\n\tonChange={(score, e) => {\n\t\tconsole.log(\'score:\', score, \'event:\', e)\n\t}}\n/>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Image Cropper'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Our ImageCropper is currently using',
						' ',
						_react2.default.createElement(
							'a',
							{
								onClick: function onClick(e) {
									return e.stopPropagation();
								},
								href: 'https://github.com/DominicTobias/react-image-crop'
							},
							'react-image-crop'
						),
						'. Tap the button below and give it a shot.'
					),
					_react2.default.createElement(_ImageCropper2.default, {
						tapToCrop: true,
						src: 'https://s3.amazonaws.com/sprucebot/ticket.png',
						onSave: function onSave(img) {
							return console.log(img);
						},
						crop: { x: 25, y: 25, width: 50, height: 50 }
					}),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<ImageCropper\n\ttapToCrop={true}\n\tsrc="https://s3.amazonaws.com/sprucebot/ticket.png"\n\tonSave={img => console.log(img)}\n\tcrop={{ x: 25, y: 25, width: 50, height: 50 }}\n/>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Callouts'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'If you have some information you need to call out (think modal dialog), you can use the ',
						'<Callout />',
						' component.'
					),
					_react2.default.createElement(
						_Callout2.default,
						{ on: calloutOn },
						_react2.default.createElement(
							_Typography.H2,
							null,
							'Some important sub-form'
						),
						_react2.default.createElement(
							_BotText2.default,
							null,
							'Things like nested forms or multi-step processes benefit greatly from a callout. It lets you see where you were, but brings focus to what you\'re about to do.'
						),
						_react2.default.createElement(
							_List.List,
							null,
							_react2.default.createElement(
								_List.ListItem,
								{
									rightInput: _react2.default.createElement(_Switch2.default, {
										onChange: function onChange(calloutOn) {
											return _this2.setState({ calloutOn: calloutOn });
										}
									})
								},
								'Try the call out! ->'
							)
						)
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Callout on={calloutOn}>\n\t<H2>Call this out</H2>\n\t<BotText>\n\t\tThings like nested forms or multi-step processes benefit greatly\n\t\tfrom a callout. It lets you see where you were, but brings focus\n\t\tto what you\'re about to do.\n\t</BotText>\n\t<List>\n\t\t<ListItem\n\t\t\trightInput={\n\t\t\t\t<Switch\n\t\t\t\t\tonChange={calloutOn => this.setState({ calloutOn })}\n\t\t\t\t/>\n\t\t\t}\n\t\t>\n\t\t\tTry the call out! ->\n\t\t</ListItem>\n\t</List>\n</Callout>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'The Feed'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'The Feed is used by nearly every Skill to visualize events and facilitate conversation around those events.'
					),
					_react2.default.createElement(_Feed2.default, {
						data: [{
							createdAt: (0, _momentTimezone2.default)(NOW).subtract(34, 'hour'),
							id: 'bbc55a55-2e13-4322-a2c5-0fec1abc79be',
							message: 'Randy C. has arrived! 💥 This <FeedItem /> has bigAvatar set to true.',
							user: demoGuest,
							bigAvatar: true,
							attachments: [{
								title: 'Membership level',
								value: 'Gold'
							}, {
								title: 'Total Points',
								value: 1253
							}]
						}, {
							createdAt: (0, _momentTimezone2.default)(NOW).subtract(25, 'hour'),
							id: 'bbc55a55-2e13-4372-a2c5-0fec1abc79ee',
							message: 'Ryan J. has arrived! 💥 bigAvatar is not true.',
							user: demoGuest,
							attachments: [{
								title: 'Membership level',
								value: 'Turquoise'
							}, {
								title: 'Total Points',
								value: 2393
							}, {
								title: 'Favorite Color',
								value: 'blue'
							}, {
								title: 'Note',
								fullWidth: true,
								value: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed dolor ac felis scelerisque hendrerit ac et dui. Sed vel tortor vitae magna luctus aliquam sit amet ut eros. Duis et viverra nulla, et mattis nunc." - Taylor R. Sept. 3rd'
							}]
						}, {
							createdAt: NOW,
							id: 'bbc55a55-2e13-4322-a2c5-0fec1dabc79ee',
							message: 'Shane M. has arrived! 💥 We also added more to this message to demo long alerts.',
							user: demoGuest,
							attachments: [{
								title: 'Membership level',
								value: 'Platinum'
							}, {
								title: 'Total Points',
								value: 5302
							}, {
								title: 'Visits',
								value: 5
							}, {
								title: 'Idle chit-chat',
								value: 'A little'
							}]
						}]
					}),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Feed data={[\n\t{\n\t\tcreatedAt: moment(NOW).subtract(34, \'hour\'),\n\t\tid: \'bbc55a55-2e13-4322-a2c5-0fec1abc79be\',\n\t\tmessage:\n\t\t\t\'Randy C. has arrived! \uD83D\uDCA5 This <FeedItem /> has bigAvatar set to true.\',\n\t\tuser: demoGuest,\n\t\tbigAvatar: true,\n\t\tattachments: [\n\t\t\t{\n\t\t\t\ttitle: \'Membership level\',\n\t\t\t\tvalue: \'Gold\'\n\t\t\t},\n\t\t\t{\n\t\t\t\ttitle: \'Total Points\',\n\t\t\t\tvalue: 1253\n\t\t\t}\n\t\t]\n\t},\n\t{\n\t\tcreatedAt: moment(NOW).subtract(25, \'hour\'),\n\t\tid: \'bbc55a55-2e13-4372-a2c5-0fec1abc79ee\',\n\t\tmessage: \'Ryan J. has arrived! \uD83D\uDCA5 bigAvatar is not true.\',\n\t\tuser: demoGuest,\n\t\tattachments: [\n\t\t\t{\n\t\t\t\ttitle: \'Membership level\',\n\t\t\t\tvalue: \'Turquoise\'\n\t\t\t},\n\t\t\t{\n\t\t\t\ttitle: \'Total Points\',\n\t\t\t\tvalue: 2393\n\t\t\t},\n\t\t\t{\n\t\t\t\ttitle: \'Favorite Color\',\n\t\t\t\tvalue: \'blue\'\n\t\t\t},\n\t\t\t{\n\t\t\t\ttitle: \'Note\',\n\t\t\t\tfullWidth: true,\n\t\t\t\tvalue:\n\t\t\t\t\t\'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed dolor ac felis scelerisque hendrerit ac et dui. Sed vel tortor vitae magna luctus aliquam sit amet ut eros. Duis et viverra nulla, et mattis nunc." - Taylor R. Sept. 3rd\'\n\t\t\t}\n\t\t]\n\t},\n\t{\n\t\tcreatedAt: NOW,\n\t\tid: \'bbc55a55-2e13-4322-a2c5-0fec1dabc79ee\',\n\t\tmessage:\n\t\t\t\'Shane M. has arrived! \uD83D\uDCA5 We also added more to this message to demo long alerts.\',\n\t\tuser: demoGuest,\n\t\tattachments: [\n\t\t\t{\n\t\t\t\ttitle: \'Membership level\',\n\t\t\t\tvalue: \'Platinum\'\n\t\t\t},\n\t\t\t{\n\t\t\t\ttitle: \'Total Points\',\n\t\t\t\tvalue: 5302\n\t\t\t},\n\t\t\t{\n\t\t\t\ttitle: \'Visits\',\n\t\t\t\tvalue: 5\n\t\t\t},\n\t\t\t{\n\t\t\t\ttitle: \'Idle chit-chat\',\n\t\t\t\tvalue: \'A little\'\n\t\t\t}\n\t\t]\n\t}\n]} />'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Training Guide'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(_TrainingGuide2.default, {
						onComplete: function onComplete() {
							return alert('Done!');
						},
						steps: ['This is a training guide.', 'It "guides" you through many steps.', 'One at a time', 'and the last one shows a done.']
					})
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(_Onboarding2.default, {
						heading: 'Onboarding',
						steps: ['This is an onboarding component.', 'It has a heading.', 'And "guides" you through the steps like the TrainingGuide.', 'You can also change the label of the done button.', 'Additionally, you can pass a boolean prop to say if onboarding has been completed.', 'If the owner/teammate has done onboarding already, all of the messages will be displayed.'],
						onComplete: this.didCompleteOnboarding,
						doneButtonLabel: 'Finish',
						onboardingComplete: this.props.onboarding.onboardingComplete
					}),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Onboarding\n\theading={\'Onboarding\'}\n\tsteps={[\n\t\t\'This is an onboarding component.\',\n\t\t\'It has a heading\',\n\t\t\'And "guides" you through the steps like the TrainingGuide\',\n\t\t\'You can also change the label of the done button.\',\n\t\t\'Additionally, you can pass a boolean prop to say if onboarding has been completed.\',\n\t\t\'If the owner/teammate has done onboarding already, all of the messages will be displayed.\'\n\t]}\n\tonComplete={this.didCompleteOnboarding}\n\tdoneButtonLabel={\'Finish\'}\n\tonboardingComplete={this.props.onboarding.onboardingComplete}\n/>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Dialogs'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'Dialogs are always shown modally. So, you can use them as alerts, confirmation dialogs, popups, etc.'
					),
					_react2.default.createElement(
						_List.List,
						null,
						_react2.default.createElement(_List.ListItem, {
							title: 'Showing as an alert',
							subtitle: 'You can drop in a button to hide it too',
							rightInput: _react2.default.createElement(
								_Button2.default,
								{
									alt: true,
									type: 'button',
									onClick: function onClick() {
										return _this2.setState({ showAlert: true });
									}
								},
								'Show Alert'
							)
						})
					),
					_react2.default.createElement(
						_Dialog2.default,
						{ show: this.state.showAlert },
						_react2.default.createElement(
							_BotText2.default,
							null,
							'Use BotText to display any content in the alert.'
						),
						_react2.default.createElement(
							_Button2.default,
							{
								type: 'button',
								onClick: function onClick() {
									return _this2.setState({ showAlert: false });
								}
							},
							'Okay'
						)
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Dialog show={this.state.showAlert}>\n\t<BotText>Use BotText to display any content in the alert.</BotText>\n\t<Button\n\t\ttype="button"\n\t\tonClick={() => this.setState({ showAlert: false })}\n\t>\n\t\tOkay\n\t</Button>\n</Dialog>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Error'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_Button2.default,
						{
							onClick: function onClick() {
								return _this2.setState({
									errorMessage: 'There was an error.  Please try again'
								});
							}
						},
						'Show Error Message'
					),
					_react2.default.createElement(_Error2.default, {
						errorMessage: this.state.errorMessage,
						closeErrorDialog: function closeErrorDialog() {
							return _this2.setState({ errorMessage: '' });
						},
						closeErrorDialogTxt: 'Sounds good!'
					}),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Error\n\terrorMessage={this.state.errorMessage}\n\tcloseErrorDialog={() => this.setState({ errorMessage: \'\' })}\n\tcloseErrorDialogTxt={\'Sounds good!\'}\n/>'
					)
				),
				_react2.default.createElement(
					_Typography.H1,
					null,
					'Scroll To Method'
				),
				_react2.default.createElement(
					_Container2.default,
					null,
					_react2.default.createElement(
						_BotText2.default,
						null,
						'This method allows the user to scroll to any position they want.  The default is to the top of the page, but the user can pass in a number or component using ReactDOM to find the ref\'s offsetTop as well'
					),
					_react2.default.createElement(
						_Button2.default,
						{
							onClick: function onClick() {
								_index2.default.scrollTo();
							}
						},
						'Default Scroll To Top'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button\n\tonClick={() => {\n\t\tskill.scrollTo()\n\t}}\n>\n\t{\'Scroll To The Top\'}\n</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{
							onClick: function onClick() {
								_index2.default.scrollTo(2600);
							}
						},
						'Scroll To A Number'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button\n\tonClick={() => {\n\t\tskill.scrollTo(2550)\n\t}}\n>\n\t{\'Scroll To The Top\'}\n</Button>'
					),
					_react2.default.createElement(
						_Button2.default,
						{
							onClick: function onClick() {
								_index2.default.scrollTo(_reactDom2.default.findDOMNode(_this2.ref).offsetTop);
							}
						},
						'Scroll To The Buttons Section'
					),
					_react2.default.createElement(
						_Pre2.default,
						null,
						'<Button\n\tonClick={() => {\n\t\tskill.scrollTo(ReactDOM.findDOMNode(this.ref).offsetTop)\n\t}}\n>\n\t{\'Scroll To The Top\'}\n</Button>'
					)
				)
			);
		}
	}]);

	return Styleguide;
}(_react.Component);

exports.default = (0, _withStore2.default)(Styleguide, {
	actions: actions,
	reducers: _reducers2.default,
	config: { SERVER_HOST: 'https://example.com' }
});