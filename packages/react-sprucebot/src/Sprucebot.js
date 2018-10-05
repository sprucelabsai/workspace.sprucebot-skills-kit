// @flow
import Button from './components/Button/Button'
import ButtonGroup from './components/ButtonGroup/ButtonGroup'
import * as Card from './components/Card/Card'
import ContextMenu from './components/ContextMenu/ContextMenu'
import Dropzone from './components/Dropzone/Dropzone'
import * as FormPartials from './components/Forms/FormPartials'
import Checkbox from './components/Forms/Checkbox/Checkbox'
import DomainInput from './components/Forms/DomainInput/DomainInput'
import PhoneInput from './components/Forms/PhoneInput/PhoneInput'
import Radio from './components/Forms/Radio/Radio'
import Search from './components/Forms/Search/Search'
import Select from './components/Forms/Select/Select'
import Slider from './components/Forms/Slider/Slider'
import Tag from './components/Forms/Tag/Tag'
import TextArea from './components/Forms/TextArea/TextArea'
import TextInput from './components/Forms/TextInput/TextInput'
import Toggle from './components/Forms/Toggle/Toggle'
import Container from './components/Layout/Container/Container'
import Loader from './components/Forms/Loader/Loader'
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
	Button,
	ButtonGroup,
	...Card,
	ContextMenu,
	Dropzone,
	...FormPartials,
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
	Toggle,
	Container,
	Loader
}
module.exports = Sprucebot
