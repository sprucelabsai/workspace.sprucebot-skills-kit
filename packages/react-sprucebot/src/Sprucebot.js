// @flow
import Button from './components/Button/Button'
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
	Button
}
module.exports = Sprucebot
