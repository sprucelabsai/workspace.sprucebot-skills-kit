export { default as Avatar } from './components/Avatar/Avatar'
export { default as UserAvatar } from './components/Avatar/UserAvatar'
export { default as BotText } from './components/BotText/BotText'
export {
	default as Button,
	IButtonProps,
	ButtonKinds,
	ButtonTypes
} from './components/Button/Button'
export { default as ButtonGroup } from './components/ButtonGroup/ButtonGroup'
export {
	Card,
	CardHeader,
	CardBody,
	CardSection,
	CardFooter,
	CardBuilder,
	OnboardingCard,
	ICardBuilderProps,
	Scores
} from './components/Card'
export { default as ContextMenu } from './components/ContextMenu/ContextMenu'
export {
	FeedBuilder,
	FooterPrimary,
	HeaderPrimary,
	Sidebar,
	SidebarSection,
	SidebarHeader,
	SaveBar,
	ProfileSummary
} from './components/Core'
export { default as Dropzone } from './components/Dropzone/Dropzone'
export { default as FontLoader } from './components/FontLoader/FontLoader'
export {
	Autosuggest,
	Checkbox,
	DomainInput,
	DurationInput,
	FormBuilder,
	PhoneInput,
	Radio,
	Search,
	Select,
	Slider,
	Stars,
	Tag,
	TextArea,
	TextInput,
	Toggle,
	FormLayout,
	FormLayoutGroup,
	FormLayoutItem,
	formatPhoneNumber,
	formatPhoneNumberIntl,
	isValidPhoneNumber,
	DatePicker
} from './components/Forms'
export { default as Icon, IIconProps } from './components/Icon/Icon'
export { default as Heading } from './components/Heading/Heading'
export { default as Subheading } from './components/Subheading/Subheading'
export {
	default as TextContainer
} from './components/TextContainer/TextContainer'
export { default as Text, Span } from './components/Text/Text'
export { default as TextStyle } from './components/TextStyle/TextStyle'
export { default as Image } from './components/Image/Image'
export { default as ImageSSR } from './components/ImageSSR/ImageSSR'
export { default as ImageCropper } from './components/ImageCropper/ImageCropper'
export { default as Layout } from './components/Layout/Layout'
export {
	default as LayoutSection
} from './components/Layout/components/LayoutSection/LayoutSection'
export {
	ExpandableListItem,
	IListItemProps,
	IListProps,
	IWrappedItemProps,
	List,
	ListHeader,
	ListItem,
	ListWrapper,
	SortableList
} from './components/List'
export { default as Loader } from './components/Loader/Loader'
export { default as Modal } from './components/Modal/Modal'
export { default as PagedModal } from './components/PagedModal/PagedModal'
export { default as Pagination } from './components/Pagination/Pagination'
export { default as Tabs } from './components/Tabs/Tabs'
export { default as Tab } from './components/Tabs/components/Tab/Tab'
export {
	default as ToastWrapper
} from './components/Toast/components/ToastWrapper/ToastWrapper'
export { default as Toast } from './components/Toast/Toast'
export { default as View } from './components/View/View'
export { default as Page, PageHeader, PageContent } from './components/Page'
export { default as Table, TableSearch, TableFilters } from './components/Table'
export {
	default as RecordTable,
	IRecordTableFetchOptions,
	IRecordTableFetchResults,
	IRecordTableProps
} from './components/RecordTable/RecordTable'
export {
	default as RecordSelectionList,
	IRecordSelectionListItemProps
} from './components/RecordSelectionList/RecordSelectionList'
export {
	default as RecordSelectionListItem
} from './components/RecordSelectionList/RecordSelectionListItem'
export { default as EmptyState } from './components/EmptyState/EmptyState'
export {
	default as EventDetails,
	IEventDetailsProps
} from './components/EventDetails/EventDetails'
export {
	IEventDetailsItemProps
} from './components/EventDetails/components/EventDetailsItem/EventDetailsItem'
export {
	applyUIEnhancementsToEventDetails
} from './components/EventDetails/EventDetailsUtilities'
export { default as CircleLoader } from './components/CircleLoader/CircleLoader'
export { default as SplitButton } from './components/SplitButton/SplitButton'
export {
	default as TruncatedList
} from './components/TruncatedList/TruncatedList'

export type ArrayElem<A> = A extends Array<infer Elem> ? Elem : never

export function unionArray<T>(array: T): Array<ArrayElem<T>> {
	return array as any
}

export {
	default as SprucebotAvatar
} from './components/SprucebotAvatar/SprucebotAvatar'
