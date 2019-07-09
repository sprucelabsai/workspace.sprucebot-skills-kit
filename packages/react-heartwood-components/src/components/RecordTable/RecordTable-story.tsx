import React from 'react'
import { filter, orderBy } from 'lodash'
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
	const records: IDummyRecordTableRecord[] = [...Array(1000)].map(() => ({
		name: `${Math.floor(Math.random() * 1000)}-Dummy`,
		count: Math.floor(Math.random() * 1000)
	}))

	function syncFetchRecords(
		options: IRecordTableFetchOptions
	): IRecordTableFetchResults {
		const filteredRecords = filter(
			orderBy(records, [options.sortColumn], [options.sortDirection]),
			(o: IDummyRecordTableRecord) => {
				return o.name.match(new RegExp(options.search, 'gi'))
			}
		)

		return {
			visibleRows: filteredRecords.slice(
				options.offset,
				options.offset + options.limit
			),
			totalRows: filteredRecords.length
		}
	}

	const initialRecords = syncFetchRecords({
		offset: 0,
		limit: 10,
		sortColumn: 'name',
		sortDirection: 'ASC'
	})

	return (
		<div>
			<RecordTable
				fetchRecords={async options => syncFetchRecords(options)}
				enableFilter={true}
				searchPlaceholder={'Search groups...'}
				fetchError={false}
				initialLimit={10}
				initialSortColumn={'name'}
				initialSortDirection={'ASC'}
				initialSelectedTab={'all'}
				initialVisibleRows={initialRecords.visibleRows}
				totalRows={records.length}
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
