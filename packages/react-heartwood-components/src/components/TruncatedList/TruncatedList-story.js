// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { generateLocations } from '../../../.storybook/data/tableData'
import { map, sampleSize, cloneDeep } from 'lodash'
import {
	withKnobs,
	// withKnobsOptions,
	text,
	boolean,
	object,
	select
} from '@storybook/addon-knobs/react'
import { userList, userList02 } from '../../../.storybook/data/people'

import Card, { CardHeader, CardBody, CardSection } from '../Card'
import TruncatedList from './TruncatedList'

const stories = storiesOf('TruncatedList', module)

// stories.addDecorator(
// 	withKnobsOptions({
// 		escapeHTML: false
// 	})
// )

stories.addDecorator(withKnobs)

type TruncatedListExampleProps = {
	header?: string,
	canSelect?: 'many' | 'one',
	canRemove: boolean,
	recordSelectionListItems: Array<Object>,
	maxItemsVisible: number,
	noItemsText?: string,
	truncatedActionItemType?: string
}

type TruncatedListExampleState = {
	selectedIds: Array<string>,
	unselectableIds: Array<string>,
	loadedRecordSelectionListItems: Array<Object>
}

class TruncatedListExample extends Component<
	TruncatedListExampleProps,
	TruncatedListExampleState
> {
	constructor(props) {
		super(props)

		let selectedIds = props.recordSelectionListItems.map(loc => loc.id)

		if (props.canSelect === 'one') {
			selectedIds = sampleSize(selectedIds, 1)
		} else {
			selectedIds = sampleSize(selectedIds, Math.floor(selectedIds.length / 2))
		}

		const unselectedIds = props.recordSelectionListItems
			.map(loc => loc.id)
			.filter(locationId => selectedIds.indexOf(locationId) === -1)

		const unselectableIds = props.canSelect
			? sampleSize(unselectedIds, unselectedIds.length / 2)
			: []

		this.state = {
			selectedIds,
			loadedRecordSelectionListItems: cloneDeep(props.recordSelectionListItems),
			unselectableIds
		}
	}

	render() {
		const {
			header,
			canSelect,
			canRemove,
			noItemsText,
			truncatedActionItemType
		} = this.props
		const {
			selectedIds,
			loadedRecordSelectionListItems,
			unselectableIds
		} = this.state

		return (
			<TruncatedList
				header={header}
				noItemsText={noItemsText}
				selectedIds={selectedIds}
				unselectableIds={unselectableIds}
				recordSelectionListItems={loadedRecordSelectionListItems.slice(0, 5)}
				isTruncated={loadedRecordSelectionListItems.length > 5}
				canSelect={canSelect}
				canRemove={canRemove}
				onSelect={id => {
					// Typically you'd want "many" or "one", so you'd only need one side
					// of this conditional.
					if (canSelect === 'many') {
						if (selectedIds.indexOf(id) >= 0) {
							this.setState({
								selectedIds: selectedIds.filter(selectedId => selectedId !== id)
							})
						} else {
							this.setState({ selectedIds: [...selectedIds, id] })
						}
					} else if (canSelect === 'one') {
						this.setState({ selectedIds: [id] })
					}
				}}
				onRemove={id => {
					// The component maintains state of the records it has loaded, but
					// it's up to you to remove them from your list in your local state.
					// Also, if for some reason you want to have selection alongside deletion,
					// you should be sure to clear out the selection at the same time.
					this.setState({
						selectedIds: selectedIds.filter(selectedId => selectedId !== id),
						loadedRecordSelectionListItems: loadedRecordSelectionListItems.filter(
							locationItem => locationItem.id !== id
						)
					})
				}}
				truncatedActionText={`See all${
					truncatedActionItemType
						? ` ${
								loadedRecordSelectionListItems.length
						  } ${truncatedActionItemType}`
						: ''
				}`}
				onClickTruncatedAction={() =>
					console.log('Clicked truncated list action!')
				}
			/>
		)
	}
}

stories
	.add('Truncated List - Single', () => {
		return (
			<div style={{ width: '320px', padding: '8px' }}>
				<Card isSmall>
					<CardHeader
						title="Locations"
						actions={object('actions', [
							{
								text: 'Add a location',
								kind: 'simple'
							}
						])}
					/>
					<CardBody>
						<TruncatedListExample
							noItemsText={text('noItemsText', 'No locations selected')}
							truncatedActionItemType={'locations'}
							canSelect={select('Can Select', [null, 'many', 'one'], null)}
							canRemove={boolean('Can Remove', true)}
							recordSelectionListItems={map(
								generateLocations({ amount: 10 }),
								location => ({
									id: location.id,
									title: location.publicName,
									subtitle: location.address
								})
							)}
						/>
					</CardBody>
				</Card>
			</div>
		)
	})
	.add('Truncated List - Multiple', () => {
		return (
			<div style={{ width: '320px', padding: '8px' }}>
				<Card isSmall>
					<CardHeader
						title="Manager Access"
						actions={object('actions', [
							{
								text: 'Add managers',
								kind: 'simple'
							}
						])}
					/>
					<CardBody isSectioned={false} areSectionSeparatorsVisible={true}>
						<CardSection>
							<TruncatedListExample
								header={text('header', 'Managers')}
								noItemsText={text('noItemsText', 'No managers selected')}
								truncatedActionItemType={'managers'}
								canSelect={select('Can Select', [null, 'many', 'one'], null)}
								canRemove={boolean('Can Remove', true)}
								recordSelectionListItems={map(
									[...userList, ...userList02],
									user => ({
										id: user.id,
										avatar: user.avatar,
										title: user.title,
										subtitle: 'Manager'
									})
								)}
							/>
						</CardSection>
						<CardSection>
							<TruncatedListExample
								header={text('header', 'Group Managers')}
								noItemsText={text('noItemsText', 'No managers selected')}
								truncatedActionItemType={'group managers'}
								canSelect={select('Can Select', [null, 'many', 'one'], null)}
								canRemove={boolean('Can Remove', true)}
								recordSelectionListItems={map(
									[...userList, ...userList02],
									user => ({
										id: user.id,
										avatar: user.avatar,
										title: user.title,
										subtitle: 'Group Manager'
									})
								)}
							/>
						</CardSection>
					</CardBody>
				</Card>
			</div>
		)
	})
