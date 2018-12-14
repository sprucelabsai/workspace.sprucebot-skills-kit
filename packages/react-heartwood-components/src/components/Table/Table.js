// @flow
import React from 'react'
import ReactTable from 'react-table'
import checkboxHOC from 'react-table/lib/hoc/selectTable'
import cx from 'classnames'

type Props = {
	/** Set true if the rows in this table can be selected */
	isSelectable?: boolean,

	/** Optional classname to add to the table. Useful for grid styling */
	className?: string
}

const Table = (props: Props) => {
	const { className, isSelectable } = props
	const TableComponent = isSelectable ? checkboxHOC(ReactTable) : ReactTable
	return (
		<TableComponent
			className={cx('table', className)}
			getTheadTrProps={() => ({
				className: 'table-header-row'
			})}
			getTheadThProps={() => ({
				className: 'table-header-cell'
			})}
			getTrProps={() => ({
				className: 'table-row'
			})}
			getTdProps={() => ({
				className: 'table-cell'
			})}
			{...props}
		/>
	)
}

Table.defaultProps = {
	isSelectable: false
}

export default Table
