// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { data } from '../../../.storybook/data/tableData'

import ReactTable from 'react-table'

const stories = storiesOf('Table', module)

stories.addDecorator(withKnobs)

const columns = [
	{
		Header: 'Public Name',
		accessor: 'publicName'
	},
	{
		Header: 'Store',
		accessor: 'storeNumber'
	},
	{
		Header: 'Status',
		accessor: 'status'
	},
	{
		Header: 'Address',
		accessor: 'address'
	}
]

stories.add('Table', () => <ReactTable data={data} columns={columns} />)
