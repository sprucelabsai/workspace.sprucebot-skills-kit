// @flow
import React, { Fragment, Component } from 'react'
import { storiesOf } from '@storybook/react'
import { generateLocations } from '../../../.storybook/data/tableData'
import { map, sampleSize } from 'lodash'
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
import TruncatedList from './TruncatedList'

const stories = storiesOf('TruncatedList', module)

stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)

stories.addDecorator(withKnobs)

type TruncatedListExampleProps = {
	header?: string,
	canSelect?: 'many' | 'one',
	canRemove: boolean,
	locations: Array<Object>,
	totalRecordCount: number,
	maxItemsVisible: number,
	noItemsText?: string
}

type TruncatedListExampleState = {
	selectedIds: Array<string>,
	unselectableIds: Array<string>,
	locationRecordListItems: Array<Object>
}

class TruncatedListExample extends Component<
	TruncatedListExampleProps,
	TruncatedListExampleState
> {
	constructor(props) {
		super(props)

		let selectedIds = props.locations.map(loc => loc.node.id)

		if (props.canSelect === 'one') {
			selectedIds = sampleSize(selectedIds, 1)
		} else {
			selectedIds = sampleSize(selectedIds, Math.floor(selectedIds.length / 2))
		}

		const unselectedIds = props.locations
			.map(loc => loc.node.id)
			.filter(locationId => selectedIds.indexOf(locationId) === -1)

		const unselectableIds = props.canSelect
			? sampleSize(unselectedIds, unselectedIds.length / 2)
			: []

		const locationRecordListItems = props.locations.map(result => {
			return {
				id: result.node.id,
				title: result.node.publicName,
				subtitle: result.node.address,
				note:
					unselectableIds.indexOf(result.node.id) >= 0 &&
					'Location already in group!'
			}
		})

		this.state = {
			selectedIds,
			locationRecordListItems,
			unselectableIds
		}
	}

	render() {
		const {
			header,
			canSelect,
			canRemove,
			totalRecordCount,
			maxItemsVisible,
			noItemsText
		} = this.props
		const { selectedIds, locationRecordListItems, unselectableIds } = this.state
		return (
			<TruncatedList
				header={header}
				noItemsText={noItemsText}
				selectedIds={selectedIds}
				unselectableIds={unselectableIds}
				recordSelectionListItems={locationRecordListItems}
				maxItemsVisible={maxItemsVisible}
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
						locationRecordListItems: locationRecordListItems.filter(
							locationItem => locationItem.id !== id
						)
					})
				}}
				totalRecordCount={totalRecordCount}
			/>
		)
	}
}

stories.add('Truncated List', () => (
	<TruncatedListExample
		header={text('header', 'Locations')}
		noItemsText={text('no items', 'No locations selected')}
		canSelect={select('Can Select', [null, 'many', 'one'], null)}
		canRemove={boolean('Can Remove', true)}
		locations={map(generateLocations({ amount: 5 }), o => ({
			node: { ...o }
		}))}
		maxItemsVisible={5}
		totalRecordCount={20}
	/>
))
