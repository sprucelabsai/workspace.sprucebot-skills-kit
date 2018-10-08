// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import Tabs from './Tabs'

const stories = storiesOf('Tabs', module)

stories.addDecorator(withKnobs)

stories
	.add('Tabs', () => (
		<Container size="small">
			<Tabs
				tabs={[
					{ text: 'Team', isCurrent: true },
					{ text: 'Guests' },
					{ text: 'Everyone' }
				]}
			/>
		</Container>
	))
	.add('With Disclosure', () => (
		<Container size="small">
			<Tabs
				tabs={[
					{ text: 'Active', isCurrent: true },
					{ text: 'Current' },
					{ text: 'Previous' },
					{ text: 'Cancelled' }
				]}
			/>
		</Container>
	))
