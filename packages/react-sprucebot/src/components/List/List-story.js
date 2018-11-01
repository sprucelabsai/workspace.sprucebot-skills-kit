// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	number,
	object
} from '@storybook/addon-knobs/react'
import {
	userList,
	userList02,
	userList03
} from '../../../.storybook/data/people'
import Container from '../Layout/Container/Container'
import List, { ListWrapper } from './List'
import ListHeader from './components/ListHeader/ListHeader'
import ListItem from './components/ListItem/ListItem'
import Icon from '../Icon/Icon'
import Tabs from '../Tabs/Tabs'
import SortableList from './components/SortableList/SortableList'
import EditIcon from '../../../static/assets/icons/Interface-Essential/Edit/pencil-write.svg'
import DateIcon from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-date.svg'
import CalendarIcon from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-3.svg'
import ArrowForward from '../../../static/assets/icons/ic_arrow_forward.svg'
import ArrowBack from '../../../static/assets/icons/ic_arrow_back.svg'
import {
	singleAction,
	threeTextActions
} from '../../../.storybook/data/actions'

const stories = storiesOf('List', module)

type TabbedProps = {}
type TabbedState = {
	users: Array<Object>,
	tabs: Array<Object>,
	activeTabIndex: number
}

const TestPanel = () => <div>Test Panel</div>

class TabbedList extends Component<TabbedProps, TabbedState> {
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
			<ListWrapper>
				<ListHeader title="Notes" />
				<Tabs
					tabs={tabs.map((tab, idx) => ({
						isCurrent: idx === activeTabIndex,
						onClick: () => this.handleTabClick(idx),
						...tab
					}))}
				/>
			</ListWrapper>
		)
	}
}

stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)

stories.addDecorator(withKnobs)

stories
	.add('List Item', () => (
		<Container size="small">
			<ListItem
				title={text('title', 'Wed, Oct 28')}
				subtitle={text('subtitle', '9am–4pm')}
				avatar={text('avatar', '')}
				image={text('image', '')}
				icon={
					text('icon', '') && (
						<Icon
							className={text(
								'iconClassName',
								'u-icon__no-fill u-icon__stroke'
							)}
							icon={text('icon', '')}
						/>
					)
				}
				isDraggable={boolean('isDraggable', false)}
				actions={object('actions', [])}
				toggleId={text('toggleId', '')}
				contextMenu={object('contextMenu', null)}
			/>
		</Container>
	))
	.add('Text List', () => (
		<Container size="small">
			<List
				header={object('header: text list', { title: 'Holidays' })}
				isSmall={boolean('isSmall', false)}
				items={object('items: text list', [
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
				])}
			/>
			<SortableList
				header={object('header: sortable list', { title: 'Services' })}
				isSmall={boolean('isSmall', false)}
				onConfirm={() => console.log('Confirmed!')}
				items={object('items: sortable list', [
					{
						title: 'Clean Up',
						subtitle: '$20 | 15min',
						contextMenu: {
							icon: <EditIcon />,
							size: 'large',
							isSimple: true,
							actions: threeTextActions
						}
					},
					{
						title: 'Shampoo',
						subtitle: '$7 | 45min',
						contextMenu: {
							icon: <EditIcon />,
							size: 'large',
							isSimple: true,
							actions: threeTextActions
						}
					},
					{
						title: 'Young Spruce',
						subtitle: '$23 | 50min',
						contextMenu: {
							icon: <EditIcon />,
							size: 'large',
							isSimple: true,
							actions: threeTextActions
						}
					}
				])}
			/>
			<List
				header={object('header: dates list', { title: 'Important Dates' })}
				isSmall={boolean('isSmall', false)}
				items={object('items: dates list', [
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
				])}
			/>
		</Container>
	))
	.add('Settings List', () => (
		<Container size="small">
			<List
				header={object('header', { title: 'Settings' })}
				items={object('items', [
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
				])}
			/>
			<List
				header={object('header', { title: 'Settings' })}
				isSmall={boolean('isSmall', false)}
				items={object('items: two', [
					{
						title: 'Hide this category',
						subtitle: 'Guests cannot book hidden services',
						toggleId: 'hide-category'
					}
				])}
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
				isSmall={boolean('isSmall', false)}
				items={object('items', userList)}
			/>
		</Container>
	))
	.add('People Tabbed', () => (
		<Container size="small">
			<TabbedList />
		</Container>
	))
