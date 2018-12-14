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

stories.add('Table', () => (
	<Layout width="full-width">
		<Card>
			<Table
				className="services-table"
				data={data}
				columns={columns}
				defaultPageSize={2}
				loading={false}
			/>
		</Card>
	</Layout>
))
