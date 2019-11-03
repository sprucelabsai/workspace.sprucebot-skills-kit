import React, { Component, Fragment } from 'react'
import { default as Table, ITableProps } from '../Table/Table'
import {
	default as TableSearch,
	ITableSearchProps
} from '../Table/components/TableSearch/TableSearch'
import Tabs from '../Tabs/Tabs'
import { TextInput } from '../Forms'
import Button from '../Button/Button'
import EmptyState from '../EmptyState/EmptyState'
import Loader from '../Loader/Loader'
import { SortingRule } from 'react-table'

const RECORD_TABLE_INITIAL_LIMIT = 50

export interface IRecordTableFetchOptions {
	sortColumn: string
	sortDirection: 'asc' | 'desc'
	offset: number
	limit: number
	search?: string
	selectedTab?: string
}

export interface IRecordTableFetchResults {
	visibleRows: Record<string, any>[]
	totalRows: number
}

export interface IRecordTableProps extends ITableProps {
	/** Singular noun describing the contents of this table */
	kind?: string

	/** Plural noun describing the contents of this table */
	pluralKind?: string

	/** for handling when a tab is selected, return false to stop tab form being set */
	onClickTab?: (
		e: MouseEvent,
		data: { idx?: number; key: string; payload?: Record<string, any> }
	) => boolean

	/** the tabs to render, passed to Tabs component. onClick is ignored */
	tabs?: any[]

	/** Should rows be selectable? */
	isSelectable?: boolean

	/** which tab to select at first */
	initialSelectedTab?: string

	/** how to sort to start */
	initialSortColumn: string

	/** direction to start (defaults to desc) */
	initialSortDirection?: 'asc' | 'desc'

	/** starting limit, defaults to RECORD_TABLE_INITIAL_LIMIT  */
	initialLimit?: number

	/** The rows that should be visible when the table mounts */
	initialVisibleRows: Record<string, any>[]

	/** The total possible number of rows this table may contain */
	totalRows: number

	/** should we enable searching? */
	enableSearch?: boolean

	/** should we enable filtering? */
	enableFilter?: boolean

	/** placeholder to show for search */
	searchPlaceholder?: string

	/** props to pass through to the table search component */
	tableSearchProps?: ITableSearchProps

	/** when rendering search results, this is how i'll know what to output */
	searchSuggestionAccessor?: (suggestion: Record<string, any>) => any

	/** called anytime records need to be fetched */
	fetchRecords: (
		options: IRecordTableFetchOptions
	) => Promise<IRecordTableFetchResults>

	/** table columns to be rendered TODO(TR) import Column interfaces  */
	columns: Record<string, any>[]

	/** should I fetch all my data on mount? */
	fetchOnMount?: boolean

	/** Flag for error on fetching data */
	fetchError?: boolean

	/** passthrough to Table component */
	handleClickRow?: (
		e: MouseEvent,
		meta: { idx: number; item: Record<string, any> }
	) => void

	/** called when search suggestion is selected */
	onSelection?: (options: { selectedIds: (string | number)[] }) => void

	/** called when navigating to page */
	onNavigateToPage?: Function

	/** Icon to show if no results match the current filter */
	noFilteredMatchesIcon?: string
	/** Headline to show if no results match the current filter */
	noFilteredMatchesHeadline?: string
	/** Subhead to show if no results match the current filter */
	noFilteredMatchesSubheadline?: string
	/** CTA Text to show if no results match the current filter */
	noFilteredMatchesPrimaryActionText?: string

	/** Icon to show if no data is available to be loaded into the table */
	noDataIcon?: string
	/** Headline to show if no data is available to be loaded into the table */
	noDataHeadline?: string
	/** Subhead to show if no data is available to be loaded into the table */
	noDataSubheadline?: string
	/** CTA Text to show if no data is available to be loaded into the table */
	noDataPrimaryAction?: IPrimaryAction
	/** CTA Button kind to display if no data is available to be loaded into the table */
	noDataPrimaryActionButtonKind?: string
	/** CTA Button Icon to display if no data is available to be loaded into the table */
	noDataPrimaryActionButtonIcon?: string
}

interface IPrimaryAction {
	text: string
	onClick: (e: MouseEvent) => void
	type: string
}

interface IRecordTableState {
	selectedTab?: string
	currentPage: number
	limit: number
	sortColumn: string
	sortDirection: 'asc' | 'desc'
	visibleRows: Record<string, any>[]
	totalRows: number
	loading: boolean
	currentFilter?: string
	expandedRows: Record<string, boolean>
}

class RecordTable extends Component<IRecordTableProps, IRecordTableState> {
	public static defaultProps: Partial<IRecordTableProps> = {
		enableFilter: false,
		enableSearch: false,
		initialLimit: RECORD_TABLE_INITIAL_LIMIT,
		noFilteredMatchesHeadline: 'No matches found',
		noFilteredMatchesIcon: 'no_matches',
		noFilteredMatchesPrimaryActionText: 'Show All',
		searchPlaceholder: 'Filter table...'
	}

	public constructor(props: IRecordTableProps) {
		super(props)

		this.state = {
			loading: false,
			currentPage: 0,
			limit: props.initialLimit || RECORD_TABLE_INITIAL_LIMIT,
			selectedTab: props.initialSelectedTab,
			sortColumn: props.initialSortColumn,
			sortDirection: props.initialSortDirection || 'desc',
			visibleRows: props.initialVisibleRows,
			totalRows: props.totalRows,
			currentFilter: '',
			expandedRows: {}
		}
	}

	public refresh = async () => {
		this.setState({ loading: true })
		const { visibleRows, totalRows } = await this.fetchRecords({
			page: this.state.currentPage
		})
		this.setState({ loading: false, visibleRows, totalRows })
	}

	public navigateToPage = async ({
		search,
		page
	}: {
		search?: string
		page: number
	}) => {
		const { onNavigateToPage = () => {} } = this.props

		try {
			const { visibleRows, totalRows } = await this.fetchRecords({
				search,
				page
			})

			onNavigateToPage({
				currentPage: page
			})

			this.setState({
				currentPage: page,
				visibleRows,
				totalRows,
				expandedRows: {}
			})
		} catch (e) {
			// Nothing
		}
	}

	public updateFilter = (filter: string) => {
		this.setState(
			{
				currentPage: 0,
				currentFilter: filter
			},
			() => {
				this.refresh()
			}
		)
	}

	public componentDidMount = () => {
		if (this.props.fetchOnMount) {
			this.refresh()
		}
	}

	public render(): React.ReactNode {
		const {
			tabs,
			columns,
			isSelectable,
			handleClickRow,
			enableSearch,
			enableFilter,
			searchPlaceholder,
			noDataPrimaryActionButtonKind,
			noDataPrimaryActionButtonIcon,
			tableSearchProps,
			...rest
		} = this.props

		const {
			currentPage,
			sortColumn,
			loading,
			limit,
			selectedTab,
			visibleRows,
			totalRows,
			currentFilter,
			expandedRows
		} = this.state

		const defaultTableSearchProps: ITableSearchProps = {
			getSuggestionValue(value) {
				return value.text
			},
			getSuggestions: this.handleSearchSuggestions,
			renderSuggestion: this.renderSuggestion,
			onSuggestionSelected: () => {},
			id: ''
		}

		return (
			<Fragment>
				{tabs && (
					<Tabs
						tabs={tabs.map(tab => {
							return {
								...tab,
								isCurrent: selectedTab === tab.key,
								onClick: e => {
									this.handleClickTab(e, tab)
								}
							}
						})}
						isPadded
					/>
				)}

				{enableSearch && (
					<TableSearch
						placeholder={searchPlaceholder}
						{...defaultTableSearchProps}
						{...tableSearchProps}
					/>
				)}

				{enableFilter && (
					<div className="table-search__wrapper">
						<div className="autosuggest__wrapper">
							<TextInput
								id="record-table-filter"
								value={currentFilter}
								placeholder={searchPlaceholder}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									this.updateFilter(e.target.value)
								}}
								isSmall
							/>
							<Button
								isSmall
								className="text-input__clear-btn"
								icon={{
									name: 'close'
								}}
								onClick={() => {
									this.updateFilter('')
								}}
							/>
						</div>
					</div>
				)}

				<Table
					className="results-table"
					isSelectable={isSelectable}
					columns={columns}
					defaultSorted={[
						{
							id: sortColumn,
							desc: false
						}
					]}
					expanded={expandedRows}
					onExpandedChange={newExpanded => {
						this.setState({
							expandedRows: newExpanded
						})
					}}
					pageSize={Math.min(visibleRows.length, limit)}
					paginationProps={{
						currentPage,
						showPages: Math.ceil(totalRows / limit) > 1,
						onClickNext: () => {
							this.navigateToPage({ page: currentPage + 1 })
						},
						onClickBack: () => {
							this.navigateToPage({ page: currentPage - 1 })
						},
						onPageButtonClick: (pageIdx: number) => {
							this.navigateToPage({ page: pageIdx })
						},
						totalPages: Math.ceil(totalRows / limit)
					}}
					manual
					loading={loading}
					showPagination={totalRows >= limit}
					data={visibleRows || []}
					totalRows={totalRows}
					onSortedChange={this.handleSortChanged}
					onClickRow={handleClickRow}
					key="id"
					NoDataComponent={
						loading && !currentFilter
							? () => (
									<div className="table__inner__loader">
										<Loader />
									</div>
							  )
							: EmptyState
					}
					getNoDataProps={() => ({
						icon: this.getNoDataIcon(),
						headline: this.getNoDataHeadline(),
						subheadline: this.getNoDataSubheadline(),
						primaryAction: this.getNoDataPrimaryAction(),
						primaryActionButtonKind: noDataPrimaryActionButtonKind,
						primaryActionButtonIcon: noDataPrimaryActionButtonIcon
					})}
					{...rest}
				/>
			</Fragment>
		)
	}

	// TODO: Update the table based on the tab that was clicked
	private handleClickTab = (e: MouseEvent, tab: any) => {
		const { onClickTab } = this.props
		let cancel = false

		if (onClickTab) {
			cancel =
				onClickTab(e, {
					payload: tab.payload,
					key: tab.key
				}) === false
		}

		if (!cancel) {
			this.setState(
				{ currentPage: 0, selectedTab: tab.key, expandedRows: {} },
				this.refresh
			)
		}
	}

	private fetchRecords = async ({
		search,
		page
	}: {
		search?: string
		page: number
	}) => {
		const {
			sortDirection,
			sortColumn,
			limit,
			selectedTab,
			currentFilter
		} = this.state

		const offset = limit * page

		const data = await this.props.fetchRecords({
			sortColumn,
			sortDirection,
			limit,
			offset,
			selectedTab,
			search: search || currentFilter
		})

		return data
	}

	private handleSortChanged = (sorted: SortingRule[]) => {
		const sort: {
			sortColumn: string
			sortDirection: 'asc' | 'desc'
		} = {
			sortColumn: sorted[0].id,
			sortDirection: sorted[0].desc ? 'desc' : 'asc'
		}

		this.setState(sort, this.refresh)
	}

	private handleSearchSuggestions = async (value: string) => {
		const { currentPage } = this.state
		const { visibleRows } = await this.fetchRecords({
			page: currentPage,
			search: value
		})

		const suggestions =
			visibleRows.length > 0
				? visibleRows.map((record: Record<string, any>) => {
						return {
							text: record.name,
							record
						}
				  })
				: [
						{
							text: 'NO RESULTS',
							isEmptyMessage: true,
							value
						}
				  ]

		return suggestions
	}

	private renderSuggestion = (suggestion: any) => {
		const {
			searchSuggestionAccessor = (/* record */) => (
				<Button
					isSmall
					className="autosuggest__list-item-inner"
					text={suggestion.text}
				/>
			)
		} = this.props

		if (suggestion.isEmptyMessage && suggestion.value) {
			return (
				<div className="autosuggest__no-results">
					<p className="autosuggest__no-results-title">No matches found.</p>
					<p className="autosuggest__no-results-subtitle">
						Please adjust your search and try again.
					</p>
				</div>
			)
		}

		if (suggestion.isEmptyMessage && !suggestion.value) {
			return (
				<div className="autosuggest__no-results">
					<p className="autosuggest__no-results-title">Type to search.</p>
					<p className="autosuggest__no-results-subtitle">
						{`I'll find whataver I can as fast as I can.`}
					</p>
				</div>
			)
		}

		return searchSuggestionAccessor(suggestion.record)
	}

	private isFiltered = () => {
		const { enableFilter } = this.props
		const { currentFilter } = this.state

		return currentFilter && currentFilter.length > 0 && enableFilter
	}

	private getNoDataIcon = () => {
		const { noDataIcon, noFilteredMatchesIcon, fetchError } = this.props

		return fetchError
			? 'caution'
			: this.isFiltered()
			? noFilteredMatchesIcon
			: noDataIcon
	}

	private getNoDataHeadline = () => {
		const { noDataHeadline, noFilteredMatchesHeadline, fetchError } = this.props

		return fetchError
			? 'Data not available'
			: this.isFiltered()
			? noFilteredMatchesHeadline
			: noDataHeadline
	}

	private getNoDataSubheadline = () => {
		const {
			noDataSubheadline,
			noFilteredMatchesSubheadline,
			fetchError
		} = this.props
		return fetchError
			? 'It looks like something went wrong.'
			: this.isFiltered()
			? noFilteredMatchesSubheadline
			: noDataSubheadline
	}

	private getNoDataPrimaryAction = () => {
		const {
			noDataPrimaryAction,
			noFilteredMatchesPrimaryActionText,
			fetchError
		} = this.props
		return fetchError
			? {
					text: 'Try again',
					onClick: () => window.location.reload()
			  }
			: this.isFiltered()
			? {
					text: noFilteredMatchesPrimaryActionText,
					onClick: () => {
						this.updateFilter('')
					},
					type: 'submit'
			  }
			: noDataPrimaryAction
	}
}

export default RecordTable
