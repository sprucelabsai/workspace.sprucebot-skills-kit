// @flow
import React, { Component } from 'react'
import ReactTable from 'react-table'
import cx from 'classnames'
import { Checkbox } from '../Forms'
import Pagination from '../Pagination/Pagination'
import Icon from '../Icon/Icon'
import type { Props as PaginationProps } from '../Pagination/Pagination'

type Props = {
	/** Table data */
	data: Array<Object>,

	/** Columns of the table */
	columns: Array<Object>,

	/** Optional classname to add to the table. Useful for grid styling */
	className?: string,

	/** Set true if the table rows can be selected */
	isSelectable?: boolean,

	/** The kind of data this table displays. This will affect the text shown when at least one row is selected. */
	kind?: string,

	/** Optional text for pluralization when multiple rows are selected */
	pluralKind?: string,

	/** Pagination component props */
	paginationProps?: PaginationProps
}

type State = {
	selectedIds: Array<string>,
	allRowsSelected: boolean
}

export default class Table extends Component<Props, State> {
	table: any

	state = {
		selectedIds: [],
		allRowsSelected: false
	}
	static defaultProps = {
		className: '',
		paginationProps: {},
		isSelectable: false
	}

	handleChange = ({ id, pageSize }: any) => {
		this.setState(prevState => {
			const idx = prevState.selectedIds.indexOf(id)
			let newIds = [...prevState.selectedIds]
			if (idx > -1) {
				newIds.splice(idx, 1)
			} else {
				if (prevState.selectedIds.length === 0) {
					newIds = [id]
				} else {
					newIds.push(id)
				}
			}
			return {
				selectedIds: newIds,
				allRowsSelected: newIds.length === pageSize
			}
		})
	}

	handleSelectAll = () => {
		const currentPage = this.table.state.page
		const pageSize = this.table.state.pageSize
		const allRows = this.table.getResolvedState().sortedData
		const startIdx = currentPage * pageSize
		const currentRows = allRows
			.slice(startIdx, startIdx + pageSize)
			.map(item => item._original)
		const selectedIds = currentRows.map(row => row.id)

		this.setState(prevState => ({
			allRowsSelected: !prevState.allRowsSelected,
			selectedIds: prevState.allRowsSelected ? [] : selectedIds
		}))
	}

	render() {
		const {
			data,
			columns,
			className,
			paginationProps,
			isSelectable,
			kind,
			pluralKind,
			...rest
		} = this.props
		const { selectedIds, allRowsSelected } = this.state

		let renderColumns = [...columns]
		if (isSelectable) {
			renderColumns.unshift({
				id: 'checkbox',
				accessor: '',
				Header: () => (
					<Checkbox
						id=""
						isIndeterminate={
							!allRowsSelected &&
							(selectedIds.length > 0 && selectedIds.length < data.length)
						}
						// NOTE: Using state here because this Header can't access page size on its own
						checked={allRowsSelected}
						onChange={() => this.handleSelectAll()}
					/>
				),
				Cell: props => {
					const { original, pageSize } = props
					const { id } = original
					return (
						<Checkbox
							id={id}
							checked={selectedIds.indexOf(id) > -1}
							onChange={() => this.handleChange({ id, pageSize })}
						/>
					)
				},
				sortable: false,
				width: 'auto'
			})
		}

		// Handle updating header columns when at least one row is selected
		if (isSelectable && selectedIds.length > 0) {
			let selectedText = ''
			const numSelectedRows = selectedIds.length
			if (numSelectedRows > 1) {
				if (pluralKind) {
					selectedText = `${numSelectedRows} ${pluralKind} selected`
				} else if (kind) {
					selectedText = `${numSelectedRows} ${kind}s selected`
				}
			} else {
				if (kind) {
					selectedText = `${numSelectedRows} ${kind} selected`
				}
			}

			// Change the header text to reflect which rows are selected
			renderColumns = renderColumns.map((col, idx) => {
				if (idx === 0) {
					return col
				} else if (idx === 1) {
					return {
						...col,
						Header: <p className="table-selected-text">{selectedText}</p>
					}
				}
				return { ...col, Header: null }
			})
		}

		return (
			<ReactTable
				ref={ref => (this.table = ref)}
				data={data}
				columns={renderColumns}
				className={cx('table', className)}
				getTheadTrProps={() => ({
					className: cx('table-header-row', {
						'table-header-row--has-selections':
							isSelectable && selectedIds.length > 0
					})
				})}
				getTheadThProps={(state, rowInfo, column, instance) => ({
					className: cx('table-header-cell', {
						'table-checkbox-cell': column.id === 'checkbox'
					}),
					width: 'auto'
				})}
				getTrProps={() => ({
					className: 'table-row'
				})}
				getTdProps={(state, rowInfo, column, instance) => ({
					className: cx('table-cell', {
						'table-checkbox-cell': column.id === 'checkbox'
					}),
					width: 'auto'
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
