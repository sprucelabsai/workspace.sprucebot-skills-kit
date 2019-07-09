import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'

import RecordTable, {
	IRecordTableFetchOptions,
	IRecordTableFetchResults
} from './RecordTable'

const stories = storiesOf('RecordTable', module)

stories.addDecorator(withKnobs)

interface IDummyRecordTableRecord {
	name: string
	count: number
}

stories.add('RecordTable', () => {
	async function fetchRecords(
		options: IRecordTableFetchOptions
	): Promise<IRecordTableFetchResults> {
		console.log(options)

		return {
			visibleRows: [],
			totalRows: 0
		}
	}

	return (
		<div>
			<RecordTable
				fetchRecords={fetchRecords}
				enableFilter={true}
				searchPlaceholder={'Search groups...'}
				fetchError={false}
				initialLimit={10}
				initialSortColumn={'name'}
				initialSortDirection={'ASC'}
				initialSelectedTab={'all'}
				initialVisibleRows={[]}
				totalRows={0}
				tabs={[
					{
						key: 'all',
						text: 'All things'
					}
				]}
				columns={[
					{
						Header: 'Name',
						id: 'name',
						accessor: function renderNameColumn(
							record: IDummyRecordTableRecord
						) {
							return <div>{record.name}</div>
						}
					},
					{
						Header: 'Count',
						sortable: false,
						id: 'count',
						accessor: function renderCountColumn(
							record: IDummyRecordTableRecord
						) {
							return <div>{record.count}</div>
						}
					}
				]}
				noDataIcon="trip_pin_multiple_light_large"
				noDataHeadline={'No data!'}
				noDataPrimaryAction={{
					text: 'Try Again',
					onClick: () => {},
					type: 'submit'
				}}
			/>
		</div>
	)
})
