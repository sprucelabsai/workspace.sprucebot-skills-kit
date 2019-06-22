// @flow
import React from 'react'
import { each, keys } from 'lodash'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
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

stories.add('Default', () => <EmptyState />)

stories.add('No matches', () => (
	<EmptyState
		icon={select('icon', options, 'no_matches')}
		headline={text('headline', 'No matches found')}
		primaryAction={object('primary button action', {
			text: 'Show all',
			onClick: () => {},
			type: 'submit'
		})}
		primaryActionButtonKind={select(
			'primary button kind',
			['primary', 'secondary', 'simple', 'caution'],
			'simple'
		)}
		primaryActionButtonIcon={select('primary button icon', options, null)}
	/>
))

stories.add('API Failure', () => (
	<EmptyState
		icon={select('icon', options, 'caution')}
		headline={text('headline', 'Data not available')}
		subheadline={text('subheadline', 'It looks like something went wrong.')}
		primaryAction={object('primary button action', {
			text: 'Try Again',
			onClick: () => {},
			type: 'submit'
		})}
		primaryActionButtonKind={select(
			'primary button kind',
			['primary', 'secondary', 'simple', 'caution'],
			'simple'
		)}
		primaryActionButtonIcon={select('primary button icon', options, null)}
	/>
))
