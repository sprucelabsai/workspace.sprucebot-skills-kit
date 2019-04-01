// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import { generateLocations } from '../../../.storybook/data/tableData'
import Table, { TableSearch, TableFilters } from './index'
import Layout, { LayoutSection } from '../Layout'
import Card, { CardHeader } from '../Card'
import Tabs from '../Tabs'

const stories = storiesOf('Table', module)

stories.addDecorator(withKnobs)

const locations = generateLocations({ amount: 149 })

const columns = [
	{
		Header: 'Public Name',
		accessor: 'publicName',
		// NOTE: It looks like with has to be passed here to override built-in inline styles
		minWidth: 300,
		maxWidth: 400,
		Cell: function PublicNameCell(row) {
			return <a href="#">{row.value}</a>
		}
	},
	{
		Header: 'Store',
		accessor: 'storeNumber',
		minWidth: 80,
		maxWidth: 100
	},
	{
		Header: 'Status',
		accessor: 'status',
		minWidth: 80,
		maxWidth: 100
	},
	{
		Header: 'Address',
		accessor: 'address',
		minWidth: 420,
		maxWidth: 500
	}
]

const renderSubComponentForRow = (row: Object) => {
	const schedule = locations[row.index] && locations[row.index].schedule
	return schedule ? (
		<Fragment>
			<CardHeader title={'Store Schedule'} />
			<Table
				className="services-table"
				data={schedule}
				columns={[
					{
						Header: 'Day',
						accessor: 'day',
						minWidth: 100,
						maxWidth: 300
					},
					{
						Header: 'Hours',
						accessor: 'hours',
						minWidth: 100,
						maxWidth: 500
					}
				]}
				loading={false}
				pageSize={schedule.length}
				showPagination={false}
				keyField="id"
			/>
		</Fragment>
	) : null
}

stories
	.add('Table', () => {
		return (
			<Layout width="full-width">
				<LayoutSection>
					<Card>
						{boolean('Show Title', false) && (
							<CardHeader title={text('Title', 'Locations')} />
						)}
						{boolean('Show Tabs', false) && (
							<Tabs
								tabs={[
									{ text: 'All locations', isCurrent: true },
									{ text: 'Midwest' },
									{ text: 'Northeast' }
								]}
								isPadded
							/>
						)}
						<TableSearch placeholder="Search locations…" />
						{boolean('Is Filtered', false) && (
							<TableFilters
								filters={[
									{ text: 'State: IL' },
									{ text: 'Status: Published' },
									{ text: 'City: Bolingbrook' },
									{ text: 'City: Chicago' },
									{
										text: 'Chimera Hair Salon'
									}
								]}
							/>
						)}
						<Table
							className="services-table"
							data={locations}
							columns={columns}
							sortable={true}
							defaultPageSize={50}
							defaultSorted={[
								{
									id: 'publicName',
									desc: false
								}
							]}
							loading={false}
							paginationProps={{
								showPages: true,
								onPageButtonClick: () => console.log('onPageButtonClick'),
								totalPages: Math.ceil(locations.length / 50),
								currentPage: 0
							}}
							keyField="id"
						/>
					</Card>
				</LayoutSection>
			</Layout>
		)
	})
	.add('Expandable Table', () => {
		return (
			<Layout width="full-width">
				<LayoutSection>
					<Card>
						<Table
							className="services-table"
							data={locations}
							columns={columns}
							sortable={true}
							defaultPageSize={50}
							defaultSorted={[
								{
									id: 'publicName',
									desc: false
								}
							]}
							loading={false}
							paginationProps={{
								showPages: true,
								onPageButtonClick: () => console.log('onPageButtonClick'),
								totalPages: Math.ceil(locations.length / 50),
								currentPage: 0
							}}
							subComponentForRow={renderSubComponentForRow}
							keyField="id"
						/>
					</Card>
				</LayoutSection>
			</Layout>
		)
	})
	.add('Selectable Table', () => (
		<Layout width="full-width">
			<LayoutSection>
				<Card>
					{boolean('Show Title', false) && (
						<CardHeader title={text('Title', 'Locations')} />
					)}
					{boolean('Show Tabs', false) && (
						<Tabs
							tabs={[
								{ text: 'All locations', isCurrent: true },
								{ text: 'Midwest' },
								{ text: 'Northeast' }
							]}
							isPadded
						/>
					)}
					<TableSearch placeholder="Search locations…" />
					{boolean('Is Filtered', false) && (
						<TableFilters
							filters={[
								{ text: 'State: IL' },
								{ text: 'Status: Published' },
								{ text: 'City: Bolingbrook' },
								{ text: 'City: Chicago' },
								{
									text: 'Chimera Hair Salon'
								}
							]}
						/>
					)}
					<Table
						className="services-table-selectable"
						data={locations}
						columns={columns}
						sortable={true}
						defaultPageSize={50}
						defaultSorted={[
							{
								id: 'publicName',
								desc: false
							}
						]}
						loading={false}
						paginationProps={{
							showPages: true,
							onPageButtonClick: () => console.log('onPageButtonClick'),
							totalPages: Math.ceil(locations.length / 50),
							currentPage: 0
						}}
						isSelectable
						kind="location"
						selectType="checkbox"
						bulkActions={[
							{
								text: 'Add to location group',
								onClick: () => console.log('Click')
							},
							{
								text: 'Make locations live',
								onClick: () => console.log('Click')
							},
							{
								text: 'Hide locations',
								onClick: () => console.log('Click')
							},
							{
								text: 'Delete locations',
								onClick: () => console.log('Click')
							}
						]}
						keyField="id"
					/>
				</Card>
			</LayoutSection>
		</Layout>
	))
