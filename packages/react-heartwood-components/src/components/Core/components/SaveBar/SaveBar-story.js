// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs/react'
import StylesProvider from '../../../../../.storybook/StylesProvider'
import SaveBar from './SaveBar'

const ProvideStyles = storyFn => <StylesProvider>{storyFn()}</StylesProvider>

const stories = storiesOf('Save Bar', module)

stories.addDecorator(ProvideStyles)
stories.addDecorator(withKnobs)

stories
	.add('Default', () => (
		<SaveBar
			isVisible={boolean('isVisible', true)}
			isSaving={boolean('isSaving', false)}
			isDiscarding={boolean('isDiscarding', false)}
			isSaveDisabled={boolean('isSaveDisabled', false)}
			isDiscardDisabled={boolean('isDiscardDisabled', false)}
			onDiscard={() => console.log('DISCARD')}
			onSave={() => console.log('SAVE')}
			STORYBOOKdoNotWrap
		/>
	))
	.add('Saving', () => (
		<SaveBar
			isVisible={boolean('isVisible', true)}
			isSaving={boolean('isSaving', false)}
			isDiscarding={boolean('isDiscarding', false)}
			isSaveDisabled={boolean('isSaveDisabled', false)}
			isDiscardDisabled={boolean('isDiscardDisabled', false)}
			onDiscard={() => console.log('DISCARD')}
			onSave={() => console.log('SAVE')}
			STORYBOOKdoNotWrap
		/>
	))
	.add('Discarding', () => (
		<SaveBar
			isVisible={boolean('isVisible', true)}
			isSaving={boolean('isSaving', false)}
			isDiscarding={boolean('isDiscarding', false)}
			isSaveDisabled={boolean('isSaveDisabled', false)}
			isDiscardDisabled={boolean('isDiscardDisabled', false)}
			onDiscard={() => console.log('DISCARD')}
			onSave={() => console.log('SAVE')}
			STORYBOOKdoNotWrap
		/>
	))
