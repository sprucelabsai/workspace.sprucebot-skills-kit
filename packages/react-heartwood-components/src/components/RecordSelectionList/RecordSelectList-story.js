// @flow
import React, { Component, Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'

import { generateLocations } from '../../../.storybook/data/tableData'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'

const stories = storiesOf('RecordSelectionList', module)

stories.addDecorator(withKnobs)

stories.add('Default, async record loading', () => {
	const locations = generateLocations({
		amount: 1000
	})

	return (
		<RecordSelectionList
			recordTypeName={text('recordTypeName', 'locations')}
			selectedIds={locations.map(loc => loc.id)}
			loadRecords={async ({ limit, offset }) => {
				// Artificial API wait time
				await new Promise(resolve =>
					setTimeout(() => {
						resolve()
					}, Math.random() * 2000)
				)

				return locations.slice(offset, offset + limit)
			}}
			recordItemProps={record => ({
				id: record.id,
				key: record.id,
				title: record.publicName,
				subtitle: record.address,
				icon: { name: 'location', isLineIcon: true }
			})}
		/>
	)
})

stories.add('Default, static record list', () => {
	const locations = generateLocations({
		amount: 1000
	})

	return (
		<RecordSelectionList
			recordTypeName={text('recordTypeName', 'locations')}
			selectedIds={locations.map(loc => loc.id)}
			records={locations}
			recordItemProps={record => ({
				id: record.id,
				key: record.id,
				title: record.publicName,
				subtitle: record.address,
				icon: { name: 'location', isLineIcon: true }
			})}
		/>
	)
})

type Props = {}

type State = {
	isModalOpen: boolean
}

class WithModalExample extends Component<Props, State> {
	state = {
		isModalOpen: false
	}

	toggleModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen })
	}

	render() {
		const locations = generateLocations({
			amount: 1000
		})

		return (
			<Fragment>
				<Button
					text={`Show me the list`}
					onClick={() => this.toggleModal()}
					kind="secondary"
				/>
				<Modal
					isOpen={this.state.isModalOpen}
					onRequestClose={this.toggleModal}
				>
					<RecordSelectionList
						recordTypeName={text('recordTypeName', 'locations')}
						selectedIds={locations.map(loc => loc.id)}
						loadRecords={() => generateLocations({ amount: 20 })}
						recordItemProps={record => ({
							id: record.id,
							key: record.id,
							title: record.publicName,
							subtitle: record.address,
							icon: { name: 'location', isLineIcon: true }
						})}
					/>
				</Modal>
			</Fragment>
		)
	}
}

stories.add('In modal', () => <WithModalExample />)
