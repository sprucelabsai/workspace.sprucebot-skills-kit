// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import List from './List'
import ListHeader from './components/ListHeader/ListHeader'
import Tabs from '../Tabs/Tabs'
import SortableList from './components/SortableList/SortableList'
import EditIcon from '../../../static/assets/icons/Interface-Essential/Edit/pencil-write.svg'
import DateIcon from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-date.svg'
import CalendarIcon from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-3.svg'
import ArrowForward from '../../../static/assets/icons/ic_arrow_forward.svg'
import ArrowBack from '../../../static/assets/icons/ic_arrow_back.svg'
import user01image from '../../../static/assets/users/user-01--96w.png'
import user02image from '../../../static/assets/users/user-02--96w.png'
import user03image from '../../../static/assets/users/user-03--96w.png'
import user04image from '../../../static/assets/users/user-04--96w.png'
import user05image from '../../../static/assets/users/user-05--96w.png'
import user06image from '../../../static/assets/users/user-06--96w.png'
import user07image from '../../../static/assets/users/user-07--96w.png'
import user08image from '../../../static/assets/users/user-08--96w.png'
import user09image from '../../../static/assets/users/user-09--96w.png'

const stories = storiesOf('List', module)

const singleAction = [
	{
		icon: <EditIcon className="btn__line-icon" />
	}
]

const userList = [
	{
		avatar: user01image,
		title: 'Vicenta Maggio',
		subtitle: '7am–5pm, Break: 2–3:25pm',
		actions: singleAction
	},
	{
		avatar: user02image,
		title: 'Madaline Gibson',
		subtitle: '9am–6pm, Break: 12–1pm',
		actions: singleAction
	},
	{
		avatar: user03image,
		title: 'Katlynn Pouros',
		subtitle: '9am–5pm',
		actions: singleAction
	}
]

const userList02 = [
	{
		avatar: user04image,
		title: 'Lacey Morissette',
		subtitle: 'No Notes',
		actions: singleAction
	},
	{
		avatar: user05image,
		title: 'Jade Mohr',
		subtitle: 'No Notes',
		actions: singleAction
	},
	{
		avatar: user06image,
		title: 'Gianni Block',
		subtitle: 'No Notes',
		actions: singleAction
	}
]
const userList03 = [
	{
		avatar: user07image,
		title: 'Camila Hintz',
		subtitle: 'No Notes',
		actions: singleAction
	},
	{
		avatar: user08image,
		title: 'Ara Dare',
		subtitle: 'No Notes',
		actions: singleAction
	},
	{
		avatar: user09image,
		title: 'Alexanne Stanton',
		subtitle: 'No Notes',
		actions: singleAction
	}
]

type TabbedProps = {}
type TabbedState = {
	users: Array<Object>,
	tabs: Array<Object>,
	activeTabIndex: number
}

const TestPanel = () => <div>Test Panel</div>

class TabbedList extends Component<Props, State> {
	state = {
		users: userList02,
		tabs: [
			{
				text: 'Guests',
				panel: <List items={userList} />
			},
			{
				text: 'Team',
				panel: <List items={userList02} />
			},
			{
				text: 'Settings',
				panel: <List items={userList03} />
			}
		],
		activeTabIndex: 0
	}

	handleTabClick = (idx: number) => {
		this.setState({
			activeTabIndex: idx
		})
	}

	render() {
		const { users, tabs, activeTabIndex } = this.state

		return (
			<div className="list-wrapper">
				<ListHeader title="Notes" />
				<Tabs
					tabs={tabs.map((tab, idx) => ({
						isCurrent: idx === activeTabIndex,
						onClick: () => this.handleTabClick(idx),
						...tab
					}))}
				/>
			</div>
		)
	}
}

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
				onConfirm={() => console.log('Confirmed!')}
				items={[
					{
						title: 'Clean Up',
						subtitle: '$20 | 15min',
						actions: singleAction
					},
					{
						title: 'Shampoo',
						subtitle: '$7 | 45min',
						actions: singleAction
					},
					{
						title: 'Young Spruce',
						subtitle: '$23 | 50min',
						actions: singleAction
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
	.add('People List', () => (
		<Container size="small">
			<List
				header={{
					title: 'Team Schedule',
					subtitle: 'Mon, Sep 27',
					actions: [
						{
							text: 'Today',
							kind: 'simple'
						},
						{
							icon: <CalendarIcon className="btn__line-icon" />,
							kind: 'simple'
						},
						{
							icon: <ArrowBack />,
							kind: 'simple'
						},
						{
							icon: <ArrowForward />,
							kind: 'simple'
						}
					]
				}}
				isSmall={boolean('Small', false)}
				items={userList}
			/>
		</Container>
	))
	.add('People Tabbed', () => (
		<Container size="small">
			<TabbedList />
		</Container>
	))
