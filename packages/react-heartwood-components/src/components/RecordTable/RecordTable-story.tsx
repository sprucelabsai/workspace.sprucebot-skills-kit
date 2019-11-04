import React from 'react'
import { filter, orderBy } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

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

stories.add('Basic RecordTable', () => {
	const records: IDummyRecordTableRecord[] = [...Array(1000)].map(() => ({
		name: `${Math.floor(Math.random() * 1000)}-Dummy`,
		count: Math.floor(Math.random() * 1000)
	}))

	// Faked API, made syncronous to populate initial state of the table.
	// In the real world you'd just make a `fetchRecords` async method and call it
	// in `getInitialProps` to populate your server-rendered state.
	function syncFetchRecords(
		options: IRecordTableFetchOptions
	): IRecordTableFetchResults {
		const filteredRecords: Record<string, any> = filter(
			orderBy(records, [options.sortColumn], [options.sortDirection]),
			(o: IDummyRecordTableRecord) => {
				return o.name.match(new RegExp(options.search || '', 'gi'))
			}
		)

		if (options.selectedTab === 'empty') {
			return {
				visibleRows: [],
				totalRows: 0
			}
		}
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
		sortDirection: 'asc'
	})

	const timeout = number('API Simulated Timeout (MS)', 50)

	return (
		<div>
			<RecordTable
				fetchRecords={async options => {
					await new Promise(resolve => {
						setTimeout(resolve, timeout)
					})

					return syncFetchRecords(options)
				}}
				enableFilter={true}
				searchPlaceholder={'Search groups...'}
				fetchError={false}
				initialLimit={10}
				initialSortColumn={'name'}
				initialSortDirection={'asc'}
				initialSelectedTab={'all'}
				initialVisibleRows={initialRecords.visibleRows}
				totalRows={records.length}
				tabs={[
					{
						key: 'all',
						text: 'All things'
					},
					{
						key: 'empty',
						text: 'No things'
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

stories.add('Empty RecordTable', () => {
	const records = []

	return (
		<div>
			<RecordTable
				fetchRecords={async () => ({ visibleRows: [], totalRows: 0 })}
				enableFilter={true}
				searchPlaceholder={'Search groups...'}
				fetchError={false}
				initialLimit={10}
				initialSortColumn={'name'}
				initialSortDirection={'asc'}
				initialSelectedTab={'all'}
				initialVisibleRows={records}
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
						id: 'count',
						accessor: function renderCountColumn(
							record: IDummyRecordTableRecord
						) {
							return <div>{record.count}</div>
						}
					}
				]}
			/>
		</div>
	)
})

stories.add('Empty RecordTable w/ Customized Empty States', () => {
	const records = []

	return (
		<div>
			<RecordTable
				fetchRecords={async () => ({ visibleRows: [], totalRows: 0 })}
				enableFilter={true}
				searchPlaceholder={'Search groups...'}
				fetchError={false}
				initialLimit={10}
				initialSortColumn={'name'}
				initialSortDirection={'asc'}
				initialSelectedTab={'all'}
				initialVisibleRows={records}
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
						id: 'count',
						accessor: function renderCountColumn(
							record: IDummyRecordTableRecord
						) {
							return <div>{record.count}</div>
						}
					}
				]}
				noFilteredMatchesIcon="vip"
				noFilteredMatchesHeadline="Couldn't find that stuff!!!"
				noFilteredMatchesSubheadline="KLJkjlasfk laksjf"
				noFilteredMatchesPrimaryActionText="wakka"
				noDataIcon="guests"
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
