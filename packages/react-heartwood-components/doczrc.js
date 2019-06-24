import { css } from 'styled-components'
import { css as cssPlugin } from 'docz-plugin-css'

const path = require('path')

export default {
	wrapper: 'docz/DoczWrapper',
	plugins: [
		cssPlugin({
			preprocessor: 'sass',
			cssmodules: false,
			loaderOpts: {
				includePaths: [path.resolve(__dirname, 'src')]
			}
		})
	],
	// theme: 'docz/theme',
	themeConfig: {
		colors: {
			primary: '#1953cb',
			blockquoteBg: '#fff',
			blockquoteBorder: '#fff',
			blockquoteColor: '#525966'
		},
		styles: {
			h3: css`
				margin: 25px 0 10px;
				font-size: 20px;
				font-weight: 600;
			`,
			blockquote: css`
				margin: 25px 0;
				font-size: 32px;
			`
		}
	},
	menu: [
		'React Heartwood Components',
		{
			name: 'Avatars',
			menu: ['Avatar', 'UserAvatar']
		},
		{
			name: 'Buttons',
			menu: ['Button', 'ButtonGroup', 'ContextMenu']
		},
		{
			name: 'Cards',
			menu: [
				'Card',
				'CardHeader',
				'CardBody',
				'CardFooter',
				'CardSection',
				'CardBuilder',
				'OnboardingCard',
				'Scores'
			]
		},
		{
			name: 'Communication',
			menu: ['Message', 'MessageBuilder']
		},
		{
			name: 'Core',
			menu: [
				'HeaderPrimary',
				'DefaultLockup',
				'Hamburger',
				'LocationMenu',
				'UserMenu',
				'SaveBar',
				'Sidebar',
				'SidebarSection',
				'SidebarItem',
				'SidebarFooter',
				'SidebarExpander',
				'HelpButton',
				'Legal',
				'Breadcrumbs',
				'Breadcrumb',
				'FooterPrimary',
				'ProfileSummary',
				'FeedBuilder'
			]
		},
		{
			name: 'Feedback',
			menu: [
				'BotText',
				'CircleLoader',
				'EmptyState',
				'Loader',
				'Toast',
				'ToastHeader',
				'ToastWrapper'
			]
		},
		{
			name: 'Forms',
			menu: [
				'Autosuggest',
				'Checkbox',
				'DatePicker',
				'DomainInput',
				'Dropzone',
				'DurationInput',
				'FormBuilder',
				'FormInner',
				'FormLayout',
				'FormLayoutGroup',
				'FormLayoutItem',
				'ImageCropper',
				'InputHelper',
				'InputInner',
				'InputPre',
				'PhoneInput',
				'Radio',
				'Search',
				'Select',
				'Slider',
				'Stars',
				'Tag',
				'TextArea',
				'TextInput',
				'Toggle'
			]
		},
		{
			name: 'Icons',
			menu: ['Icon']
		},
		{
			name: 'Images',
			menu: ['Image', 'ImageSSR']
		},
		{
			name: 'Lists',
			menu: [
				'List',
				'ListHeader',
				'ListItem',
				'RecordSelectionList',
				'RecordSelectionListItem',
				'SortableList'
			]
		},
		{
			name: 'Modals',
			menu: ['Modal', 'ModalHeader', 'ModalBody', 'ModalFooter', 'PagedModal']
		},
		{
			name: 'Navigation',
			menu: ['Pagination', 'Tabs', 'Tab']
		},
		{
			name: 'Structure',
			menu: [
				'Layout',
				'LayoutSection',
				'Page',
				'PageContent',
				'PageHeader',
				'View'
			]
		},
		{
			name: 'Tables',
			menu: ['Table', 'TableFilters', 'TableSearch', 'RecordTable']
		},
		{
			name: 'Text',
			menu: [
				'Heading',
				'Subheading',
				'Text',
				'Span',
				'TextContainer',
				'TextStyle'
			]
		},
		{
			name: 'Utilities',
			menu: ['Anchor', 'FontLoader']
		}
	]
}
