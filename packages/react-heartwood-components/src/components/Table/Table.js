// @flow
import React from 'react'
import ReactTable from 'react-table'
import checkboxHOC from 'react-table/lib/hoc/selectTable'
import cx from 'classnames'
import Pagination from '../Pagination/Pagination'

import type { Props as PaginationProps } from '../Pagination/Pagination'

type Props = {
	/** Set true if the rows in this table can be selected */
	isSelectable?: boolean,

	/** Optional classname to add to the table. Useful for grid styling */
	className?: string,

	/** Pagination component props */
	paginationProps?: PaginationProps
}

const Table = (props: Props) => {
	const { className, isSelectable, paginationProps } = props
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
			getLoadingProps={state => {
				return {
					className: state.loading ? 'table-loader--is-visible' : 'table-loader'
				}
			}}
			PaginationComponent={tableProps => (
				<Pagination {...paginationProps} {...tableProps} />
			)}
			{...props}
		/>
	)
}

Table.defaultProps = {
	isSelectable: false,
	paginationProps: {}
}

export default Table
