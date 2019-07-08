// @flow
import React, { Component } from 'react'
import { map, sampleSize } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react'

import { generateLocations } from '../../../.storybook/data/tableData'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import Card, { CardHeader, CardBody } from '../Card'

const stories = storiesOf('RecordSelectionList', module)

stories.addDecorator(withKnobs)

type RSLExampleProps = {
	canSelect?: 'many' | 'one',
	canRemove: boolean,
	locations: Array<Object>,
	totalRecordCount: number,
	maxRowsVisible?: number | 'auto'
}

type RSLExampleState = {
	isModalOpen?: boolean,
	selectedIds: Array<string>,
	unselectableIds: Array<string>,
	locations: Array<Object>
}

class RecordListItemsExample extends Component<
	RSLExampleProps,
	RSLExampleState
> {
	constructor(props) {
		super(props)

		let selectedIds = props.locations.map(loc => loc.id)

		if (props.canSelect === 'one') {
			selectedIds = sampleSize(selectedIds, 1)
		} else {
			selectedIds = sampleSize(selectedIds, Math.floor(selectedIds.length / 2))
		}

		const unselectedIds = props.locations
			.map(loc => loc.id)
			.filter(locationId => selectedIds.indexOf(locationId) === -1)

		const unselectableIds = sampleSize(unselectedIds, unselectedIds.length / 2)

		this.state = { selectedIds, locations: props.locations, unselectableIds }
	}

	render() {
		const {
			canSelect,
			canRemove,
			totalRecordCount,
			maxRowsVisible
		} = this.props
		const { selectedIds, locations, unselectableIds } = this.state
		return (
			<RecordSelectionList
				canSearch
				selectedIds={selectedIds}
				unselectableIds={unselectableIds}
				loadRecordListItems={async ({ limit, offset, search }) => {
					// Artificial API wait time
					await new Promise(resolve =>
						setTimeout(() => {
							resolve()
						}, Math.random() * 1000)
					)

					let results = []

					if (search) {
						const filteredLocations = locations.filter(location => {
							return location.node.publicName.match(new RegExp(search, 'ig'))
						})

						results = filteredLocations.slice(offset, offset + limit)
					} else {
						results = locations.slice(offset, offset + limit)
					}

					const recordListItems = results.map(result => {
						return {
							id: result.node.id,
							title: result.node.publicName,
							subtitle: result.node.address,
							isDisabled: unselectableIds.indexOf(result.node.id) >= 0,
							note:
								unselectableIds.indexOf(result.node.id) >= 0 &&
								'Location already in group!'
						}
					})

					return recordListItems
				}}
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
						locations: locations.filter(location => location.id !== id)
					})
				}}
				totalRecordCount={totalRecordCount}
				maxRowsVisible={
					maxRowsVisible && maxRowsVisible !== 'auto'
						? parseInt(maxRowsVisible, 10)
						: maxRowsVisible
				}
			/>
		)
	}
}

stories
	.add('In a Card', () => (
		<div style={{ width: '320px', padding: '8px' }}>
			<Card>
				<CardHeader title="Card Title" />
				<CardBody>
					<RecordListItemsExample
						canSelect={select('Can Select', [null, 'many', 'one'], null)}
						canRemove={boolean('Can Remove', false)}
						locations={map(generateLocations({ amount: 5 }), o => ({
							node: { ...o }
						}))}
						totalRecordCount={5}
						maxRowsVisible={select('Max Rows Visible', [null, 3, 'auto'])}
					/>
				</CardBody>
			</Card>
		</div>
	))
	.add('In a Modal', () => (
		<Modal isOpen onAfterOpen={() => null} onRequestClose={() => null}>
			<Modal.Header title="Modal title" onRequestClose={() => null} />
			<Modal.Body>
				<RecordListItemsExample
					canSelect={select('Can Select', [null, 'many', 'one'], 'many')}
					canRemove={boolean('Can Remove', true)}
					locations={map(generateLocations({ amount: 100 }), o => ({
						node: { ...o }
					}))}
					totalRecordCount={100}
					maxRowsVisible={select('Max Rows Visible', [null, 3, 'auto'])}
				/>
			</Modal.Body>
		</Modal>
	))
