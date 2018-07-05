import register from 'babel-core/register'
import polyfill from 'babel-polyfill'

import Avatar from './components/Avatar/Avatar'
import BotText from './components/BotText/BotText'
import Button from './components/Button/Button'
import Container from './components/Container/Container'
import DateSelect from './components/DateSelect/DateSelect'
import DateRangeSelect from './components/DateRangeSelect/DateRangeSelect'
import Calendar from './components/Calendar/Calendar'
import Input from './components/Input/Input'
import Pre from './components/Pre/Pre'
import Switch from './components/Switch/Switch'
import Loader from './components/Loader/Loader'
import Form from './components/Form/Form'
import LinkPile from './components/LinkPile/LinkPile'
import Select from './components/Select/Select'
import SubmitWrapper from './components/SubmitWrapper/SubmitWrapper'
import Pager from './components/Pager/Pager'
import Stars from './components/Stars/Stars'
import DevControls from './components/DevControls/DevControls'
import * as ButtonGrid from './components/ButtonGrid/ButtonGrid'
import StatsSlider from './components/StatsSlider/StatsSlider'
import Styleguide from './components/Styleguide/Styleguide'
import ImageCropper from './components/ImageCropper/ImageCropper'
import TrainingGuide from './components/TrainingGuide/TrainingGuide'
import TimeInput from './components/TimeInput/TimeInput'
import Onboarding from './components/Onboarding/Onboarding'
import Callout from './components/Callout/Callout'
import Dialog from './components/Dialog/Dialog'
import Error from './components/Error/Error'
import Feed, { FeedItem, FeedAttachment } from './components/Feed/Feed'
import Icon from './components/Icon/Icon'
import IconButton from './components/IconButton/IconButton'
import ControlButton from './components/ControlButton/ControlButton'
import Search from './components/Search/Search'
import * as Typography from './components/Typography/Typography'
import * as List from './components/List/List'
import * as Tabs from './components/Tabs/Tabs'
import skill from './skillskit'
import _document from './skillskit/next/_document'
import Page from './skillskit/next/Page'
import withStore, { createStore } from './skillskit/store/withStore'
import lang from './skillskit/helpers/lang'

const Sprucebot = {
	testUtils: {
		// Prevent confusion between withStore and createStore
		createStore
	},
	lang,
	skill,
	_document,
	Page,
	withStore,
	Avatar,
	BotText,
	Button,
	Container,
	DateSelect,
	DateRangeSelect,
	Calendar,
	Input,
	Pre,
	Switch,
	Loader,
	LinkPile,
	Form,
	Select,
	SubmitWrapper,
	Pager,
	StatsSlider,
	ButtonGrid,
	Stars,
	Styleguide,
	ImageCropper,
	DevControls,
	Callout,
	Feed,
	FeedItem,
	Dialog,
	Error,
	FeedAttachment,
	TrainingGuide,
	TimeInput,
	Onboarding,
	Icon,
	IconButton,
	ControlButton,
	Search,
	...Typography,
	...List,
	...Tabs,
	...ButtonGrid
}
module.exports = Sprucebot
