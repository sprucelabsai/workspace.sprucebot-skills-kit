// @flow
import React from 'react'
import { each, keys } from 'lodash'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	select,
	object
} from '@storybook/addon-knobs/react'
import EmptyState from './EmptyState'
import * as icons from '../../icons.js'

const options = {}

each(keys(icons), icon => {
	options[icon] = icon
})

const stories = storiesOf('EmptyState', module)

stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)
stories.addDecorator(withKnobs)

stories.add('Simple', () => (
	<EmptyState
		headline={text('headline', 'Data not available')}
		subheadline={text('subheadline', 'Please try again later')}
	/>
))

stories.add('Full', () => (
	<EmptyState
		icon={select('icon', options, 'location')}
		isLineIcon={boolean('isLineIcon', true)}
		headline={text('headline', 'Data not available')}
		subheadline={text('subheadline', 'Please try again later')}
		primaryAction={object('primary button action', {
			text: 'Try Again',
			onClick: () => console.log('Next'),
			type: 'submit'
		})}
		primaryActionButtonKind={select(
			'primary button kind',
			['primary', 'secondary', 'simple', 'caution'],
			'simple'
		)}
		primaryActionButtonIcon={select(
			'primary button icon',
			options,
			'rotate_left'
		)}
	/>
))
