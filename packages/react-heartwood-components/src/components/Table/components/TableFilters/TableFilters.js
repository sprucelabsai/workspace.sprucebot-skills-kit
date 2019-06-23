// @flow
import React from 'react'
import { Tag } from '../../../Forms'

type Props = {
	/** Filters applied to the table */
	filters: Array<Object>
}

const TableFilters = (props: Props) => {
	const { filters } = props
	return (
		<div className="table-filters__wrapper">
			{filters.map(filter => (
				<Tag key={filter.text} kind="secondary" isSmall {...filter} />
			))}
		</div>
	)
}

export default TableFilters
