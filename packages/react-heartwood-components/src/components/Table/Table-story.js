// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import { data, generateLocations } from '../../../.storybook/data/tableData'
import Table, { TableSearch } from './index'
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
		maxWidth: 400
		// width: 'auto'
	},
	{
		Header: 'Store',
		accessor: 'storeNumber',
		minWidth: 80,
		maxWidth: 100
		// width: '100%'
	},
	{
		Header: 'Status',
		accessor: 'status',
		minWidth: 80,
		maxWidth: 100
		// width: '100%'
	},
	{
		Header: 'Address',
		accessor: 'address',
		minWidth: 420,
		maxWidth: 500
		// width: '100%'
	}
]

stories
	.add('Table', () => {
		console.log({ locations })
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
	.add('Selectable Table', () => (
		<Layout width="full-width">
			<LayoutSection>
				<Card>
					{boolean('Show Title', false) && (
						<CardHeader title={text('Title', 'Locations')} />
					)}
					<TableSearch placeholder="Search locations…" />
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
