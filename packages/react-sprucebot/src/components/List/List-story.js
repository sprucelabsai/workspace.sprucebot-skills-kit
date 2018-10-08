// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import List from './List'

const stories = storiesOf('List', module)

stories.addDecorator(withKnobs)

stories
	.add('Text List', () => (
		<Container size="small">
			<List
				header={{ title: 'Holidays' }}
				items={[
					{
						title: 'Wed, Nov 28, 2018',
						subtitle: 'Closed'
					},
					{
						title: 'Thu, Nov 29, 2018',
						subtitle: 'Closed'
					},
					{
						title: 'Wed, Dec 25, 2018',
						subtitle: 'Closed'
					}
				]}
			/>
		</Container>
	))
	.add('Settings List', () => (
		<Container size="small">
			<List
				header="Settings"
				items={[
					{
						title: 'Barber',
						toggleId: 'barber'
					},
					{
						title: 'Brow & Wax',
						toggleId: 'brow-and-wax'
					},
					{
						title: 'Featured',
						toggleId: 'featured'
					},
					{
						title: 'Gucci & Fire',
						toggleId: 'gucci-and-fire'
					},
					{
						title: 'Style Consulting',
						toggleId: 'style-consulting'
					}
				]}
			/>
			<List
				header="Settings"
				items={[
					{
						title: 'Hide this category',
						subtitle: 'Guests cannot book hidden services',
						toggleId: 'hide-category'
					}
				]}
			/>
		</Container>
	))
