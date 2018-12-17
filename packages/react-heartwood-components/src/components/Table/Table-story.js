// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { data, generateLocations } from '../../../.storybook/data/tableData'
import Table from './Table'
import Layout, { LayoutSection } from '../Layout'
import Card from '../Card/Card'

const stories = storiesOf('Table', module)

stories.addDecorator(withKnobs)

const locations = generateLocations({ amount: 200 })

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
								totalPages: 87,
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
