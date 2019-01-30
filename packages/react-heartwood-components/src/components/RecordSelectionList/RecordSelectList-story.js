// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'

import { generateLocations } from '../../../.storybook/data/tableData'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'
import RecordSelectionListItem from '../RecordSelectionList/RecordSelectionListItem'
import Modal from '../Modal/Modal'

const stories = storiesOf('RecordSelectionList', module)

stories.addDecorator(withKnobs)

const locations = generateLocations({ amount: 20 })

stories.add('Default', () => (
	<RecordSelectionList
		isSmall={boolean('isSmall', true)}
		isModal={boolean('isModal', false)}
		recordTypeName={text('recordTypeName', 'locations')}
		totalRecordCount={number('totalRecordCount', 100)}
		selectedIds={locations.map(loc => loc.id)}
		onSelectAll={() => alert('all locations selected!')}
		loadData={() => locations}
		recordItemProps={record => ({
			id: record.id,
			key: record.id,
			title: record.publicName,
			subtitle: record.address,
			icon: { name: 'location', isLineIcon: true }
		})}
	/>
))

stories.add('In modal', () => (
	<Modal isOpen={true}>
		<RecordSelectionList
			isSmall={boolean('isSmall', true)}
			isModal={boolean('isModal', true)}
			recordTypeName={text('recordTypeName', 'locations')}
			totalRecordCount={number('totalRecordCount', 100)}
			selectedIds={locations.map(loc => loc.id)}
			loadData={() => locations}
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
))
