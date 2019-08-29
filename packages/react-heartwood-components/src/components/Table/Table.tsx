// Uses React Table. See https://react-table.js.org/#/story/readme details.
import React, { Component, Fragment, ReactElement } from 'react'
import ReactTable, { TableProps } from 'react-table'
import { CSSTransition } from 'react-transition-group'
import cx from 'classnames'
import { Checkbox } from '../Forms'
import Icon from '../Icon/Icon'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import EmptyState from '../EmptyState/EmptyState'
import ContextMenu from '../ContextMenu/ContextMenu'
import { IButtonProps } from '../Button/Button'

export interface ITableProps extends Partial<TableProps> {
	/** Table data */
	data: Record<string, any>[]

	/** The total number of rows which this table can access */
	totalRows: number

	/** Columns of the table */
	columns: Record<string, any>[]

	/** Set true if the table rows can be selected */
	isSelectable?: boolean

	/** any Id's that are selected by default when the page loads */
	initialSelectedIds?: (string | number)[]

	/** The kind of data this table displays. This will affect the text shown when at least one row is selected. */
	kind?: string

	/** Optional text for pluralization when multiple rows are selected */
	pluralKind?: string

	// TODO: IMPLEMENT PAGINATION PROPS
	/** Pagination component props */
	paginationProps?: any

	/** Enable bulk actions for selectable tables */
	bulkActions?: IButtonProps[]

	/** Handle clicking on a row */
	onClickRow?: (
		e: MouseEvent,
		meta: { idx: number; item: Record<string, any> }
	) => void

	/** Callback when selection changes */
	onSelection?: (options: { selectedIds: (string | number)[] }) => void

	/** No data available */
	noDataIcon?: string
	noDataHeadline?: string
	noDataSubheadline?: string
	noDataPrimaryAction?: IPrimaryAction
	noDataPrimaryActionButtonKind?: string
	noDataPrimaryActionButtonIcon?: string

	/** Return a nested sub-component to be added as an expansion level for designated row. */
	subComponentForRow?: (row: Record<string, any>) => any

	/** Called any time row props are updated. Return true if the given row should appear dirty. */
	rowIsDirty?: (row: Record<string, any>) => boolean
}

interface IPrimaryAction {
	text: string
	onClick: (e: MouseEvent) => void
	type: string
}

interface ITableState {
	selectedIds: (string | number)[]
	allRowsSelected: boolean
}

export default class Table extends Component<ITableProps, ITableState> {
	private static defaultProps = {
		className: '',
		paginationProps: {},
		isSelectable: false,
		noDataIcon: 'empty_box',
		noDataHeadline: 'Nothing to see here',
		noDataPrimaryAction: null,
		noDataPrimaryActionButtonKind: 'simple',
		noDataPrimaryActionButtonIcon: null
	}

	private table: any

	public constructor(props: ITableProps) {
		super(props)

		this.state = {
			selectedIds: props.initialSelectedIds || [],
			allRowsSelected: false
		}
	}

	public render(): ReactElement {
		const {
			data,
			totalRows,
			columns,
			className,
			paginationProps,
			isSelectable,
			kind,
			pluralKind,
			bulkActions,
			sortable,
			noDataIcon,
			noDataHeadline,
			noDataSubheadline,
			noDataPrimaryAction,
			noDataPrimaryActionButtonKind,
			noDataPrimaryActionButtonIcon,
			subComponentForRow,
			rowIsDirty,
			...rest
		} = this.props

		const { selectedIds } = this.state

		let columnsToRender = [...columns]

		if (isSelectable) {
			columnsToRender.unshift({
				id: 'checkbox',
				accessor: '',
				Header: () => (
					<Checkbox
						id=""
						isIndeterminate={
							selectedIds.length > 0 && selectedIds.length < totalRows
						}
						// NOTE: Using state here because this Header can't access page size on its own
						checked={selectedIds.length > 0}
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
				width: 36
			})
		}

		// Handle updating header columns when at least one row is selected
		if (isSelectable && selectedIds.length > 0) {
			const numSelectedRows = selectedIds.length
			let selectedText = `${numSelectedRows} selected`
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
			columnsToRender = columnsToRender.map((col, idx) => {
				if (idx === 0) {
					return col
				} else if (idx === 1) {
					return {
						...col,
						Header: () => (
							<Fragment>
								<p className="table-selected-text">{selectedText}</p>
								{bulkActions && bulkActions.length > 0 && (
									<ContextMenu
										actions={bulkActions}
										text="Actions"
										isSimple
										isTextOnly
										isLeftAligned
										closeOnSelectAction
									/>
								)}
							</Fragment>
						)
					}
				}
				return { ...col, Header: null }
			})
		}

		return (
			<ReactTable
				ref={ref => (this.table = ref)}
				data={data}
				columns={columnsToRender}
				className={cx('table', className)}
				sortable={isSelectable && selectedIds.length > 0 ? false : sortable}
				expanderDefaults={{
					sortable: false,
					resizable: false,
					filterable: false,
					width: 40
				}}
				getTableProps={() => ({
					className: 'table__inner'
				})}
				getTbodyProps={() => ({
					className: 'table__body'
				})}
				getTheadTrProps={() => ({
					className: cx('table-header-row', {
						'table-header-row--has-selections':
							isSelectable && selectedIds.length > 0
					})
				})}
				getTheadThProps={(state, rowInfo, column) => ({
					className: cx('table-header-cell', {
						'table-checkbox-cell': column.id === 'checkbox'
					}),
					width: 'auto'
				})}
				getTrGroupProps={(state, rowInfo) => {
					const expanded = state.expanded[rowInfo.viewIndex]
					const isDirty =
						(typeof rowIsDirty === 'function' && !!rowIsDirty(rowInfo)) ||
						rowInfo.original.isDirty

					return {
						className: cx('table-row-group', {
							'table-row-group--expanded': expanded,
							'table-row-group--is-dirty': isDirty
						})
					}
				}}
				getTrProps={(state, rowInfo) => {
					const expanded = state.expanded[rowInfo.viewIndex]
					const isDirty =
						(typeof rowIsDirty === 'function' && !!rowIsDirty(rowInfo)) ||
						rowInfo.original.isDirty

					return {
						className: cx('table-row', {
							'table-row--expanded': expanded,
							'table-row--is-dirty': isDirty
						}),
						onClick: this.handleClickRow
					}
				}}
				getTdProps={(state, rowInfo, column) => ({
					className: cx('table-cell', {
						'table-checkbox-cell': column.id === 'checkbox',
						'table-expander-cell': column.expander
					}),
					width: 'auto'
				})}
				getPaginationProps={() => ({
					className: 'table__pagination'
				})}
				getLoadingProps={state => {
					return {
						className: state.loading
							? 'table-loader--is-visible'
							: 'table-loader'
					}
				}}
				getNoDataProps={() => ({
					icon: noDataIcon,
					headline: noDataHeadline,
					subheadline: noDataSubheadline,
					primaryAction: noDataPrimaryAction,
					primaryActionButtonKind: noDataPrimaryActionButtonKind,
					primaryActionButtonIcon: noDataPrimaryActionButtonIcon
				})}
				SubComponent={
					subComponentForRow
						? row => (
								<CSSTransition
									in={true}
									appear={true}
									classNames="table-subcomponent"
									timeout={100}
								>
									<div className={'table-subcomponent'}>
										<Card>{subComponentForRow(row)}</Card>
									</div>
								</CSSTransition>
						  )
						: null
				}
				NoDataComponent={EmptyState}
				// @ts-ignore-next-line
				ExpanderComponent={
					<Icon
						name={'keyboard_arrow_right'}
						className={'table-expander-row'}
					/>
				}
				ThComponent={tableProps => {
					const { toggleSort, className, ...rest } = tableProps
					const isSortable =
						className && className.indexOf('-cursor-pointer') > -1
					const isSortedAsc = className && className.indexOf('-sort-asc') > -1
					const isSortedDesc =
						tableProps.className &&
						tableProps.className.indexOf('-sort-desc') > -1
					return (
						<div
							onClick={toggleSort}
							className={cx(className, {
								'table-header-cell--is-sortable':
									(isSortable || isSortedAsc || isSortedDesc) &&
									selectedIds.length === 0,
								'table-header-cell--is-sorted-asc': isSortedAsc,
								'table-header-cell--is-sorted-desc': isSortedDesc
							})}
							{...rest}
						>
							{tableProps.children}
							{(isSortable || isSortedAsc || isSortedDesc) &&
								selectedIds.length === 0 && (
									<Icon
										name="arrow_drop_down"
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
				PaginationComponent={tableProps =>
					tableProps.page === 0 && totalRows <= tableProps.pageSize ? null : (
						<div className="table-pagination__wrapper">
							<Pagination {...paginationProps} {...tableProps} />
						</div>
					)
				}
				{...rest}
			/>
		)
	}

	private handleChange = ({ id }: any) => {
		const { onSelection, totalRows } = this.props
		this.setState(
			prevState => {
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
					allRowsSelected: newIds.length === totalRows
				}
			},
			() => {
				onSelection && onSelection({ selectedIds: this.state.selectedIds })
			}
		)
	}

	private handleSelectAll = () => {
		const { onSelection } = this.props
		const currentPage = this.table.state.page
		const pageSize = this.table.state.pageSize
		const allRows = this.table.getResolvedState().sortedData
		const startIdx = currentPage * pageSize
		const currentRows = allRows
			.slice(startIdx, startIdx + pageSize)
			.map(item => item._original)
		const visibleIds = currentRows.map(row => row.id)

		this.setState(
			prevState => ({
				selectedIds:
					prevState.selectedIds.length > 0
						? []
						: [...prevState.selectedIds, ...visibleIds]
			}),
			() => {
				onSelection && onSelection({ selectedIds: this.state.selectedIds })
			}
		)
	}

	private handleClickRow = (e, handleOriginal) => {
		const { onClickRow = () => {} } = this.props

		// determine which row we clicked
		const children = [...e.currentTarget.parentNode.parentNode.children]
		const idx = children.indexOf(e.currentTarget.parentNode)

		onClickRow(e, {
			idx,
			item: this.props.data[idx]
		})

		handleOriginal && handleOriginal(e)
	}
}
