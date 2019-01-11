// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	text,
	boolean,
	number,
	object
} from '@storybook/addon-knobs/react'
import StylesProvider from '../../../../../.storybook/StylesProvider'
import SaveBar from './SaveBar'

const ProvideStyles = storyFn => <StylesProvider>{storyFn()}</StylesProvider>

const stories = storiesOf('Save Bar', module)

stories.addDecorator(ProvideStyles)
stories.addDecorator(withKnobs)

const location = {
	name: 'Chimera Hair Salon',
	address: '7678 N High St, Denver, CO'
}

stories
	.add('Default', () => (
		<SaveBar
			onDiscard={() => console.log('DISCARD')}
			onSave={() => console.log('SAVE')}
			STORYBOOKdoNotWrap
		/>
	))
	.add('Saving', () => (
		<SaveBar
			onDiscard={() => console.log('DISCARD')}
			onSave={() => console.log('SAVE')}
			isSaving={true}
			STORYBOOKdoNotWrap
		/>
	))
	.add('Discarding', () => (
		<SaveBar
			onDiscard={() => console.log('DISCARD')}
			onSave={() => console.log('SAVE')}
			isDiscarding={true}
			STORYBOOKdoNotWrap
		/>
	))
