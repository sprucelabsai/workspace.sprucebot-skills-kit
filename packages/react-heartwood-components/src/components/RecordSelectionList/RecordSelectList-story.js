// @flow
import React, { Component } from 'react'
import { sampleSize } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'

import { generateLocations } from '../../../.storybook/data/tableData'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'
import RecordSelectionListItem from '../RecordSelectionList/RecordSelectionListItem'
// import Modal from '../Modal/Modal'
// import Button from '../Button/Button'
import { select } from '@storybook/addon-knobs'

const stories = storiesOf('RecordSelectionList', module)

stories.addDecorator(withKnobs)

type Props = {
	canSelect?: 'many' | 'one',
	canRemove: boolean,
	locations: Array<Object>
}

type State = {
	isModalOpen?: boolean,
	selectedIds: Array<string>,
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

		this.state = { selectedIds, locations: props.locations }
	}

	render() {
		const { canSelect, canRemove } = this.props
		const { selectedIds, locations } = this.state

		return (
			<RecordSelectionList
				selectedIds={selectedIds}
				loadRecords={async ({ limit, offset, search }) => {
					// Artificial API wait time
					await new Promise(resolve =>
						setTimeout(() => {
							resolve()
						}, Math.random() * 1000)
					)

					if (search) {
						const filteredLocations = locations.filter(location => {
							return location.publicName.match(new RegExp(search, 'ig'))
						})

						return filteredLocations.slice(offset, offset + limit)
					}

					return locations.slice(offset, offset + limit)
				}}
				renderRecord={record => (
					<RecordSelectionListItem
						id={record.id}
						title={record.publicName}
						subtitle={record.address}
						icon={{ name: 'location', isLineIcon: true }}
					/>
				)}
				canSelect={canSelect}
				canRemove={canRemove}
				onSelect={id => {
					if (canSelect === 'many') {
						if (selectedIds.indexOf(id) >= 0) {
							this.setState({
								selectedIds: selectedIds.filter(selectedId => selectedId !== id)
							})
						} else {
							this.setState({
								selectedIds: [...selectedIds, id]
							})
						}
					} else if (canSelect === 'one') {
						this.setState({
							selectedIds: [id]
						})
					}
				}}
				onRemove={id => {
					this.setState({
						selectedIds: selectedIds.filter(selectedId => selectedId !== id)
					})
				}}
			/>
		)
	}
}

stories.add('Default', () => (
	<BasicExample
		canSelect={select('Can Select', [null, 'many', 'one'], null)}
		canRemove={select('Can Remove', [true, false], false)}
		locations={generateLocations({ amount: 100 })}
	/>
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
