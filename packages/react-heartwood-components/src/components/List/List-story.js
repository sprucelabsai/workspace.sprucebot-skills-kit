// @flow
import React, { Fragment, Component } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	object,
	select
} from '@storybook/addon-knobs/react'
import {
	userList,
	userList02,
	userList03
} from '../../../.storybook/data/people'
import List, { ListWrapper } from './List'
import ListHeader from './components/ListHeader/ListHeader'
import ListItem from './components/ListItem/ListItem'
import Icon from '../Icon/Icon'
import Tabs from '../Tabs/Tabs'
import SortableList from './components/SortableList/SortableList'
import DateIcon from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-date.svg'
import CalendarIcon from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-3.svg'
import ArrowForward from '../../../static/assets/icons/ic_arrow_forward.svg'
import ArrowBack from '../../../static/assets/icons/ic_arrow_back.svg'
import { threeTextActions } from '../../../.storybook/data/actions'

const stories = storiesOf('List', module)

type TabbedProps = {}
type TabbedState = {
	users: Array<Object>,
	tabs: Array<Object>,
	activeTabIndex: number
}

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
		const { tabs, activeTabIndex } = this.state

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

// stories.addDecorator(
// 	withKnobsOptions({
// 		escapeHTML: false
// 	})
// )

stories.addDecorator(withKnobs)

stories
	.add('List Item', () => (
		<ListItem
			title={text('title', 'Wed, Oct 28')}
			subtitle={text('subtitle', '9am–4pm')}
			avatar={text('avatar', '')}
			image={text('image', '')}
			icon={
				text('icon', '') && (
					<Icon
						isLineIcon={boolean('isLineIcon', true)}
						icon={text('icon', '')}
					/>
				)
			}
			isDraggable={boolean('isDraggable', false)}
			actions={object('actions', [])}
			toggleId={text('toggleId', '')}
			contextMenu={object('contextMenu', null)}
		/>
	))
	.add('Text List', () => (
		<Fragment>
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
							icon: {
								name: 'edit',
								isLineIcon: true
							},
							size: 'large',
							isSimple: true,
							actions: threeTextActions
						}
					},
					{
						title: 'Shampoo',
						subtitle: '$7 | 45min',
						contextMenu: {
							icon: {
								name: 'edit',
								isLineIcon: true
							},
							size: 'large',
							isSimple: true,
							actions: threeTextActions
						}
					},
					{
						title: 'Young Spruce',
						subtitle: '$23 | 50min',
						contextMenu: {
							icon: {
								name: 'edit',
								isLineIcon: true
							},
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
						icon: {
							customIcon: DateIcon,
							isLineIcon: true
						},
						title: 'Wed, Nov 28, 2018',
						subtitle: 'Closed'
					},
					{
						icon: {
							customIcon: DateIcon,
							isLineIcon: true
						},
						title: 'Thu, Nov 29, 2018',
						subtitle: 'Closed'
					},
					{
						icon: {
							customIcon: DateIcon,
							isLineIcon: true
						},
						title: 'Wed, Dec 25, 2018',
						subtitle: 'Closed'
					}
				])}
			/>
		</Fragment>
	))
	.add('Settings List', () => (
		<Fragment>
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
		</Fragment>
	))
	.add('People List', () => (
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
						icon: {
							customIcon: CalendarIcon,
							isLineIcon: true
						},
						kind: 'simple'
					},
					{
						icon: {
							customIcon: ArrowBack
						},
						kind: 'simple'
					},
					{
						icon: {
							customIcon: ArrowForward
						},
						kind: 'simple'
					}
				]
			}}
			isSmall={boolean('isSmall', false)}
			items={object('items', userList)}
		/>
	))
	.add('People Tabbed', () => <TabbedList />)
	.add('Selectable Items', () => (
		<List
			selectableType={select(
				'selectableType',
				['checkbox', 'radio'],
				'checkbox'
			)}
			items={object('selectable items', [
				{
					title: 'Clean Up',
					subtitle: '$20 | 15min',
					selectableId: 'cleanUp',
					selectableProps: {
						name: 'radio'
					}
				},
				{
					title: 'Shampoo',
					subtitle: '$7 | 45min',
					selectableId: 'shampoo',
					selectableProps: {
						name: 'radio'
					}
				},
				{
					title: 'Young Spruce',
					subtitle: '$23 | 50min',
					selectableId: 'youngSpruce',
					selectableProps: {
						name: 'radio'
					}
				}
			])}
			isSmall={boolean('isSmall', false)}
		/>
	))
