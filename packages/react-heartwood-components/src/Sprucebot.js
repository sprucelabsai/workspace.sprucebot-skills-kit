// @flow

import Avatar from './components/Avatar/Avatar'
import BotText from './components/BotText/BotText'
import Button from './components/Button/Button'
import ButtonGroup from './components/ButtonGroup/ButtonGroup'
import * as Card from './components/Card'
import ContextMenu from './components/ContextMenu/ContextMenu'
import { FooterPrimary, HeaderPrimary, Sidebar } from './components/Core'
import Dropzone from './components/Dropzone/Dropzone'
import * as FormPartials from './components/Forms/FormPartials'
import {
	Autosuggest,
	Checkbox,
	DomainInput,
	PhoneInput,
	Radio,
	Search,
	Select,
	Slider,
	Stars,
	Tag,
	TextArea,
	TextInput,
	Toggle
} from './components/Forms'
import Icon from './components/Icon/Icon'
import { H1, H2, H3, H4, Text, Span, Anchor } from './components/Text/Text'
import Image from './components/Image/Image'
import List, { ListHeader, ListItem, SortableList } from './components/List'
import Loader from './components/Loader/Loader'
import Modal from './components/Modal/Modal'
import Pagination from './components/Pagination/Pagination'
import Tabs, { Tab } from './components/Tabs'
import Toast from './components/Toast/Toast'
import View from './components/View/View'
import skill from './skillskit'
import _document from './skillskit/next/_document'
import Page from './skillskit/next/Page'
import withStore, { createStore } from './skillskit/store/withStore'
import lang from './skillskit/helpers/lang'
import sharable from './skillskit/helpers/sharable'

const Sprucebot = {
	testUtils: {
		// Prevent confusion between withStore and createStore
		createStore
	},
	utils: {
		arrayMove(arr, previousIndex, newIndex) {
			const array = arr.slice(0)
			if (newIndex >= array.length) {
				let k = newIndex - array.length
				while (k-- + 1) {
					array.push(undefined)
				}
			}
			array.splice(newIndex, 0, array.splice(previousIndex, 1)[0])
			return array
		}
	},
	lang,
	skill,
	_document,
	Page,
	withStore,
	sharable,
	Autosuggest,
	Avatar,
	BotText,
	Button,
	ButtonGroup,
	...Card,
	Checkbox,
	ContextMenu,
	DomainInput,
	Dropzone,
	FooterPrimary,
	...FormPartials,
	HeaderPrimary,
	H1,
	H2,
	H3,
	H4,
	Icon,
	Image,
	List,
	ListHeader,
	ListItem,
	Loader,
	Modal,
	Pagination,
	PhoneInput,
	Radio,
	Search,
	Select,
	Sidebar,
	Slider,
	SortableList,
	Span,
	Stars,
	Tabs,
	Tab,
	Tag,
	Text,
	TextArea,
	TextInput,
	Toast,
	Toggle,
	View
}
module.exports = Sprucebot
