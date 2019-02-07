// @flow
import React, { Component, Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'

import { generateLocations } from '../../../.storybook/data/tableData'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'
import RecordSelectionListItem from '../RecordSelectionList/RecordSelectionListItem'
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
			selectedIds={locations.map(loc => loc.id)}
			loadRecords={async ({ limit, offset }) => {
				// Artificial API wait time
				await new Promise(resolve =>
					setTimeout(() => {
						resolve()
					}, Math.random() * 1000)
				)

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
						selectedIds={locations.map(loc => loc.id)}
						loadRecords={async ({ limit, offset }) => {
							// Artificial API wait time
							await new Promise(resolve =>
								setTimeout(() => {
									resolve()
								}, Math.random() * 1000)
							)

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
					/>
				</Modal>
			</Fragment>
		)
	}
}

stories.add('In modal', () => <WithModalExample />)
