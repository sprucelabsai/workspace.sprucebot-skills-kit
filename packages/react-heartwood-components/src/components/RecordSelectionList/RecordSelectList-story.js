// @flow
import React, { Component, Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'

import { generateLocations } from '../../../.storybook/data/tableData'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'

const stories = storiesOf('RecordSelectionList', module)

stories.addDecorator(withKnobs)

const locations = generateLocations({
	amount: number('totalRecordCount', 100)
})

stories.add('Default, async record loading', () => (
	<RecordSelectionList
		isModal={boolean('isModal', false)}
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
))

stories.add('Default, static record list', () => (
	<RecordSelectionList
		isModal={boolean('isModal', false)}
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
))

class WithModalExample extends Component<Props, State> {
	state = {
		isModalOpen: false
	}

	toggleModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen })
	}

	render() {
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
						isModal={boolean('isModal', true)}
						recordTypeName={text('recordTypeName', 'locations')}
						selectedIds={locations.map(loc => loc.id)}
						loadRecords={() => generateLocations({ amount: 20 })}
						onCancel={this.toggleModal}
						onSelectAll={() => alert('all locations selected!')}
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
