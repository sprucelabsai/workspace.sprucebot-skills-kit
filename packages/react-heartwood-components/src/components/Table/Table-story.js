// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { data } from '../../../.storybook/data/tableData'
import Table from './Table'
import Layout from '../Layout/Layout'
import Card from '../Card/Card'

const stories = storiesOf('Table', module)

stories.addDecorator(withKnobs)

const columns = [
	{
		Header: 'Public Name',
		accessor: 'publicName',
		// NOTE: It looks like with has to be passed here to override built-in inline styles
		width: '100%'
	},
	{
		Header: 'Store',
		accessor: 'storeNumber',
		width: '100%'
	},
	{
		Header: 'Status',
		accessor: 'status',
		width: '100%'
	},
	{
		Header: 'Address',
		accessor: 'address',
		width: '100%'
	}
]

stories
	.add('Table', () => (
		<Layout width="full-width">
			<Card>
				<Table
					className="services-table"
					data={data}
					columns={columns}
					sortable={true}
					defaultPageSize={data.length}
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
						totalPages: 87,
						currentPage: 0
					}}
					keyField="id"
				/>
			</Card>
		</Layout>
	))
	.add('Selectable Table', () => (
		<Layout width="full-width">
			<Card>
				<Table
					className="services-table-selectable"
					data={data}
					columns={columns}
					sortable={true}
					defaultPageSize={data.length}
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
						totalPages: 87,
						currentPage: 0
					}}
					isSelectable={true}
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
					toggleAll={() => console.log('toggleAll')}
					toggleSelection={() => console.log('toggleSelection')}
					keyField="id"
				/>
			</Card>
		</Layout>
	))
