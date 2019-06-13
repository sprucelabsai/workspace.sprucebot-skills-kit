// @flow
import React, { Component } from 'react'
import { map, sampleSize } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react'

import { generateLocations } from '../../../.storybook/data/tableData'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'
import RecordSelectionListItem from '../RecordSelectionList/RecordSelectionListItem'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import Card, { CardHeader, CardBody } from '../Card'

const stories = storiesOf('RecordSelectionList', module)

stories.addDecorator(withKnobs)

type Props = {
	canSelect?: 'many' | 'one',
	canRemove: boolean,
	locations: Array<Object>,
	totalRecordCount: number,
	virtualHeight?: string,
	maxRowsVisible?: number | 'auto'
}

type State = {
	isModalOpen?: boolean,
	selectedIds: Array<string>,
	unselectableIds: Array<string>,
	locations: Array<Object>
}

class BasicExample extends Component<Props, State> {
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
			virtualHeight,
			maxRowsVisible
		} = this.props
		const { selectedIds, locations, unselectableIds } = this.state
		return (
			<RecordSelectionList
				canSearch
				selectedIds={selectedIds}
				unselectableIds={unselectableIds}
				loadRecords={async ({ limit, offset, search }) => {
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

					console.log('Simulated response')
					console.log('==================')
					console.log(results)

					return results
				}}
				getRecordId={record => record.node.id}
				renderRecord={record => (
					<RecordSelectionListItem
						id={record.node.id}
						title={record.node.publicName}
						subtitle={record.node.address}
						isDisabled={unselectableIds.indexOf(record.node.id) >= 0}
						note={
							unselectableIds.indexOf(record.node.id) >= 0 &&
							'Location already in group!'
						}
					/>
				)}
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
				virtualHeight={virtualHeight}
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
					<BasicExample
						canSelect={select('Can Select', [null, 'many', 'one'], null)}
						canRemove={boolean('Can Remove', false)}
						locations={map(generateLocations({ amount: 5 }), o => ({
							node: { ...o }
						}))}
						totalRecordCount={5}
						maxRowsVisible={select('Max Rows Visible', [null, 3, 'auto'])}
					/>
					<Button text="Show me all the things" kind="simple" />
				</CardBody>
			</Card>
		</div>
	))
	.add('In a Modal', () => (
		<Modal isOpen onAfterOpen={() => null} onRequestClose={() => null}>
			<Modal.Header title="Modal title" onRequestClose={() => null} />
			<Modal.Body>
				<BasicExample
					canSelect={select('Can Select', [null, 'many', 'one'], null)}
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

// class WithModalExample extends Component<Props, State> {
// 	state = {
// 		isModalOpen: false
// 	}

// 	toggleModal = () => {
// 		this.setState({ isModalOpen: !this.state.isModalOpen })
// 	}

// 	render() {
// 		const locations = generateLocations({
// 			amount: 1000
// 		})

// 		return (
// 			<Fragment>
// 				<Button
// 					text={`Show me the list`}
// 					onClick={() => this.toggleModal()}
// 					kind="secondary"
// 				/>
// 				<Modal
// 					isOpen={this.state.isModalOpen}
// 					onRequestClose={this.toggleModal}
// 				>
// 					<RecordSelectionList
// 						selectedIds={locations.map(loc => loc.id)}
// 						loadRecords={async ({ limit, offset }) => {
// 							// Artificial API wait time
// 							await new Promise(resolve =>
// 								setTimeout(() => {
// 									resolve()
// 								}, Math.random() * 1000)
// 							)

// 							return locations.slice(offset, offset + limit)
// 						}}
// 						renderRecord={record => (
// 							<RecordSelectionListItem
// 								id={record.id}
// 								title={record.publicName}
// 								subtitle={record.address}
// 								icon={{ name: 'location', isLineIcon: true }}
// 							/>
// 						)}
// 					/>
// 				</Modal>
// 			</Fragment>
// 		)
// 	}
// }

// stories.add('In modal', () => <WithModalExample />)
