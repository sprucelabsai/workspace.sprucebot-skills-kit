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
import Tabs from './Tabs'

const stories = storiesOf('Tabs', module)

stories.addDecorator(withKnobs)

stories
	.add('Tabs', () => (
		<Tabs
			tabs={object('tabs', [
				{ text: 'Team', isCurrent: true },
				{ text: 'Guests' },
				{ text: 'Everyone', onClick: () => console.log('Click') },
				{ text: 'Little Black Book 📓' }
			])}
		/>
	))
	.add('Many Tabs', () => (
		<Tabs
			tabs={object('tabs', [
				{ text: 'Team' },
				{ text: 'Guests' },
				{ text: 'Everyone', onClick: () => console.log('Click') },
				{ text: 'All' },
				{ text: 'Active', isCurrent: true },
				{ text: 'Hidden' },
				{ text: 'Public' },
				{ text: 'Private' }
			])}
		/>
	))
	.add('With Disclosure', () => (
		<Tabs
			tabs={object('tabs', [
				{ text: 'Active', isCurrent: true },
				{ text: 'Current' },
				{ text: 'Previous' },
				{ text: 'Cancelled' }
			])}
		/>
	))
