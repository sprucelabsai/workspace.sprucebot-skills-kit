// @flow

import Avatar from './components/Avatar/Avatar'
import Button from './components/Button/Button'
import ButtonGroup from './components/ButtonGroup/ButtonGroup'
import * as Card from './components/Card/Card'
import ContextMenu from './components/ContextMenu/ContextMenu'
import { FooterPrimary, HeaderPrimary, Sidebar } from './components/Core'
import Dropzone from './components/Dropzone/Dropzone'
import * as FormPartials from './components/Forms/FormPartials'
import {
	Checkbox,
	DomainInput,
	PhoneInput,
	Radio,
	Search,
	Select,
	Slider,
	Tag,
	TextArea,
	TextInput,
	Toggle
} from './components/Forms'
import Container from './components/Layout/Container/Container'
import List, { ListHeader, ListItem, SortableList } from './components/List'
import Loader from './components/Loader/Loader'
import Modal from './components/Modal/Modal'
import Tabs, { Tab } from './components/Tab'
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
	Avatar,
	Button,
	ButtonGroup,
	...Card,
	Checkbox,
	Container,
	ContextMenu,
	DomainInput,
	Dropzone,
	FooterPrimary,
	...FormPartials,
	HeaderPrimary,
	List,
	ListHeader,
	ListItem,
	Loader,
	Modal,
	PhoneInput,
	Radio,
	Search,
	Select,
	Sidebar,
	Slider,
	SortableList,
	Tabs,
	Tab,
	Tag,
	TextArea,
	TextInput,
	Toast,
	Toggle,
	View
}
module.exports = Sprucebot
