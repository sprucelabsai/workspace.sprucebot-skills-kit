// @flow
import React, { Component } from 'react'
import ReactTable from 'react-table'
import cx from 'classnames'
import { Checkbox } from '../Forms'
import Pagination from '../Pagination/Pagination'
import Icon from '../Icon/Icon'
import type { Props as PaginationProps } from '../Pagination/Pagination'

type Props = {
	/** Columns of the table */
	columns: Array<Object>,

	/** Optional classname to add to the table. Useful for grid styling */
	className?: string,

	/** Set true if the table rows can be selected */
	isSelectable?: boolean,

	/** Pagination component props */
	paginationProps?: PaginationProps
}

type State = {}

export default class Table extends Component<Props, State> {
	state = {}
	static defaultProps = {
		className: '',
		paginationProps: {},
		isSelectable: false
	}

	render() {
		const {
			columns,
			className,
			paginationProps,
			isSelectable,
			...rest
		} = this.props

		let renderColumns = [...columns]
		if (isSelectable) {
			renderColumns.unshift({
				id: 'checkbox',
				accessor: '',
				Header: () => <Checkbox />,
				Cell: ({ original }) => {
					const { id } = original
					console.log({ original })
					return <Checkbox id={id} />
				},
				sortable: false
			})
		}

		return (
			<ReactTable
				columns={renderColumns}
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
						className: state.loading
							? 'table-loader--is-visible'
							: 'table-loader'
					}
				}}
				ThComponent={tableProps => {
					const { toggleSort, className, ...rest } = tableProps
					const isSortable =
						className && className.indexOf('-cursor-pointer') > -1
					// const isSortable = true
					const isSortedAsc = className && className.indexOf('-sort-asc') > -1
					const isSortedDesc =
						tableProps.className &&
						tableProps.className.indexOf('-sort-desc') > -1
					return (
						<div
							onClick={toggleSort}
							className={cx(className, {
								'table-header-cell--is-sortable':
									isSortable || isSortedAsc || isSortedDesc,
								'table-header-cell--is-sorted-asc': isSortedAsc,
								'table-header-cell--is-sorted-desc': isSortedDesc
							})}
							{...rest}
						>
							{tableProps.children}
							{(isSortable || isSortedAsc || isSortedDesc) && (
								<Icon
									icon="arrow_drop_down"
									className={cx('table-header-cell__icon', {
										'table-header-cell__icon--is-visible':
											isSortedAsc || isSortedDesc,
										'table-header-cell__icon--is-reversed': isSortedDesc
									})}
								/>
							)}
						</div>
					)
				}}
				PaginationComponent={tableProps => (
					<div className="table-pagination__wrapper">
						<Pagination {...paginationProps} {...tableProps} />
					</div>
				)}
				{...rest}
			/>
		)
	}
}
