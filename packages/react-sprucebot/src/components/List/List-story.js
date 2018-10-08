// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import List from './List'
import SortableList from './components/SortableList/SortableList'
import EditIcon from '../../../static/assets/icons/Interface-Essential/Edit/pencil-write.svg'
import DateIcon from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-date.svg'

const stories = storiesOf('List', module)

stories.addDecorator(withKnobs)

stories
	.add('Text List', () => (
		<Container size="small">
			<List
				header={{ title: 'Holidays' }}
				isSmall={boolean('Small', false)}
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
			<SortableList
				header={{ title: 'Services' }}
				isSmall={boolean('Small', false)}
				items={[
					{
						title: 'Clean Up',
						subtitle: '$20 | 15min',
						actions: [
							{
								icon: <EditIcon className="btn__line-icon" />
							}
						]
					},
					{
						title: 'Shampoo',
						subtitle: '$7 | 45min',
						actions: [
							{
								icon: <EditIcon className="btn__line-icon" />
							}
						]
					},
					{
						title: 'Young Spruce',
						subtitle: '$23 | 50min',
						actions: [
							{
								icon: <EditIcon className="btn__line-icon" />
							}
						]
					}
				]}
			/>
			<List
				header={{ title: 'Important Dates' }}
				isSmall={boolean('Small', false)}
				items={[
					{
						icon: <DateIcon className="u-icon__no-fill u-icon__stroke" />,
						title: 'Wed, Nov 28, 2018',
						subtitle: 'Closed'
					},
					{
						icon: <DateIcon className="u-icon__no-fill u-icon__stroke" />,
						title: 'Thu, Nov 29, 2018',
						subtitle: 'Closed'
					},
					{
						icon: <DateIcon className="u-icon__no-fill u-icon__stroke" />,
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
				isSmall={boolean('Small', false)}
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
