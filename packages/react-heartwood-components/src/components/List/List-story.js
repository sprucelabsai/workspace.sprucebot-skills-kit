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
import {
	dateList,
	serviceList,
	listHiddenIcons,
	nestedList,
	listWithAction,
	settingsList,
	selectableList,
	expandableList
} from '../../../.storybook/data/lists'
import List, { ListWrapper } from './List'
import ListHeader from './components/ListHeader/ListHeader'
import ListItem from './components/ListItem/ListItem'
import Icon from '../Icon/Icon'
import Tabs from '../Tabs/Tabs'
import SortableList from './components/SortableList/SortableList'
import ArrowForward from '../../../static/assets/icons/ic_arrow_forward.svg'
import ArrowBack from '../../../static/assets/icons/ic_arrow_back.svg'

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

stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)

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
				items={object('items: text list', dateList)}
			/>
			<SortableList
				header={object('header: sortable list', { title: 'Services' })}
				isSmall={boolean('isSmall', false)}
				onConfirm={() => console.log('Confirmed!')}
				items={object('items: sortable list', serviceList)}
			/>
			<List
				header={object('header: dates list', { title: 'Important Dates' })}
				isSmall={boolean('isSmall', false)}
				items={object('items: dates list', dateList)}
			/>
		</Fragment>
	))
	.add('Nested List', () => <List isSmall items={nestedList} />)
	.add('List with an action', () => <List items={listWithAction} />)
	.add('Icons: some hidden', () => (
		<List
			header={object('header: dates list', { title: 'Important Dates' })}
			isSmall={boolean('isSmall', false)}
			items={object('items: dates list', listHiddenIcons)}
		/>
	))
	.add('Settings List', () => (
		<List
			header={object('header', { title: 'Settings' })}
			items={object('items', settingsList)}
		/>
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
							name: 'calendar',
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
			items={object('selectable items', selectableList)}
			isSmall={boolean('isSmall', false)}
		/>
	))
	.add('Expandable List Item', () => <List items={expandableList} />)
