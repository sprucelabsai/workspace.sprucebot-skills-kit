// @flow
import React, { Component, Fragment } from 'react'

import Table, { TableSearch } from '../Table'
import Tabs from '../Tabs'
import { TextInput } from '../Forms'
import Button from '../Button/Button'

import type { Props as TabProps } from '../Tabs/Tabs'

const RECORD_TABLE_INITIAL_LIMIT = 10

export type RecordTableFetchOptions = {
	sortColumn: string,
	sortDirection: string,
	offset: number,
	limit: number,
	search?: string,
	selectedTab?: string
}

export type RecordTableFetchResults = {|
	visibleRows: Array<Object>,
	totalRows: number
|}

export type Tab = {
	...TabProps,
	key: string,
	payload?: Object
}

type RecordTableProps = {|
	/** Singular noun describing the contents of this table */
	kind?: string,

	/** Plural noun describing the contents of this table */
	pluralKind?: string,

	/** for handling when a tab is selected, return false to stop tab form being set */
	onClickTab?: (
		e: MouseEvent,
		{ idx: number, key: string, payload?: Object }
	) => boolean,

	/** the tabs to render, passed to Tabs component. onClick is ignored */
	tabs?: Array<Tab>,

	/** Should rows be selectable? */
	isSelectable?: boolean,

	/** which tab to select at first */
	initialSelectedTab?: string,

	/** how to sort to start */
	initialSortColumn: string,

	/** direction to start (defaults to desc) */
	initialSortDirection?: string,

	/** starting limit, defaults to RECORD_TABLE_INITIAL_LIMIT  */
	initialLimit?: number,

	/** The rows that should be visible when the table mounts */
	initialVisibleRows: Array<Object>,

	/** The total possible number of rows this table may contain */
	totalRows: number,

	/** should we enable searching? */
	enableSearch?: boolean,

	/** should we enable filtering? */
	enableFilter?: boolean,

	/** placeholder to show for search */
	searchPlaceholder?: string,

	/** props to pass through to the table search component */
	tableSearchProps?: Object,

	/** when rendering search results, this is how i'll know what to output */
	searchSuggestionAccessor?: (suggestion: Object) => any,

	/** called anytime records need to be fetched */
	fetchRecords: (
		options: RecordTableFetchOptions
	) => Promise<RecordTableFetchResults>,

	/** table columns to be rendered TODO(TR) import Column interfaces  */
	columns: Array<Object>,

	/** should I fetch all my data on mount? */
	fetchOnMount?: boolean,

	/** passthrough to Table component */
	handleClickRow?: Function,

	/** called when search suggestion is selected */
	onSelection?: Function
|}

type RecordTableState = {
	selectedTab?: string,
	currentPage: number,
	limit: number,
	sortColumn: string,
	sortDirection: string,
	visibleRows: Array<Object>,
	totalRows: number,
	loading: boolean,
	currentFilter?: string
}

class RecordTable extends Component<RecordTableProps, RecordTableState> {
	static defaultProps = {
		enableSearch: false,
		enableFilter: false,
		searchPlaceholder: 'Filter table...',
		initialLimit: RECORD_TABLE_INITIAL_LIMIT
	}

	constructor(props: RecordTableProps) {
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
			currentFilter: ''
		}
	}

	handleClickTab = (e: MouseEvent, tab: Tab) => {
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
			this.setState({ currentPage: 0, selectedTab: tab.key }, this.refresh)
		}
	}

	refresh = async () => {
		this.setState({ loading: true })
		const { visibleRows, totalRows } = await this.fetchRecords({
			page: this.state.currentPage
		})
		this.setState({ loading: false, visibleRows, totalRows })
	}

	navigateToPage = async ({
		search,
		page
	}: { search?: string, page: number } = {}) => {
		try {
			const { visibleRows, totalRows } = await this.fetchRecords({
				search,
				page
			})

			this.setState({
				currentPage: page,
				visibleRows,
				totalRows
			})
		} catch (e) {
			// Nothing
		}
	}

	fetchRecords = async ({
		search,
		page
	}: {|
		search?: string,
		page: number
	|}) => {
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

	handleSortChanged = (sorted: Array<{ id: string, desc: boolean }>) => {
		const sort = {
			sortColumn: sorted[0].id,
			sortDirection: sorted[0].desc ? 'desc' : 'asc'
		}

		this.setState(sort, this.refresh)
	}

	handleSearchSuggestions = async (value: string) => {
		const { currentPage } = this.state
		const { visibleRows } = await this.fetchRecords({
			page: currentPage,
			search: value
		})

		const suggestions =
			visibleRows.length > 0
				? visibleRows.map<Object>((record: Object) => {
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

	renderSuggestion = (suggestion: any) => {
		const {
			// eslint-disable-next-line no-unused-vars
			searchSuggestionAccessor = record => (
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

	componentDidMount = () => {
		if (this.props.fetchOnMount) {
			this.refresh()
		}
	}

	handleSuggestionSelected = async (e: MouseEvent, suggestion: any) => {
		this.props.onSelection && this.props.onSelection(e, suggestion)
	}

	updateFilter = (filter: string) => {
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

	isFiltered = () => {
		const { enableFilter } = this.props
		const { currentFilter } = this.state
		return currentFilter.length > 0 && enableFilter
	}

	getNoDataIcon = () => {
		const { noDataIcon, fetchError } = this.props
		return fetchError
			? 'caution'
			: this.isFiltered()
			? 'no_matches'
			: noDataIcon
	}

	getNoDataHeadline = () => {
		const { noDataHeadline, fetchError } = this.props
		return fetchError
			? 'Data not available'
			: this.isFiltered()
			? 'No matches found'
			: noDataHeadline
	}

	getNoDataSubheadline = () => {
		const { noDataSubheadline, fetchError } = this.props
		return fetchError
			? 'It looks like something went wrong.'
			: this.isFiltered()
			? null
			: noDataSubheadline
	}

	getNoDataPrimaryAction = () => {
		const { noDataPrimaryAction, fetchError } = this.props
		return fetchError
			? {
					text: 'Try again',
					onClick: () => window.location.reload()
			  }
			: this.isFiltered()
			? {
					text: 'Show all',
					onClick: () => {
						this.updateFilter('')
					},
					type: 'submit'
			  }
			: noDataPrimaryAction
	}

	render() {
		const {
			// eslint-disable-next-line no-unused-vars
			onClickTab,
			tabs,
			columns,
			isSelectable,
			handleClickRow,
			enableSearch,
			enableFilter,
			searchPlaceholder,
			tableSearchProps = {}
		} = this.props

		const {
			currentPage,
			sortColumn,
			loading,
			limit,
			selectedTab,
			visibleRows,
			totalRows,
			currentFilter
		} = this.state

		// setup default props types
		tableSearchProps.getSuggestionValue =
			tableSearchProps.getSuggestionValue ||
			function(value) {
				return value.text
			}

		tableSearchProps.getSuggestions =
			tableSearchProps.getSuggestions || this.handleSearchSuggestions

		tableSearchProps.renderSuggestion =
			tableSearchProps.renderSuggestion || this.renderSuggestion

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
						onSuggestionSelected={this.handleSuggestionSelected}
						{...tableSearchProps}
					/>
				)}

				{enableFilter && (
					<div className="table-search__wrapper">
						<div className="autosuggest__wrapper">
							<TextInput
								value={currentFilter}
								placeholder={searchPlaceholder}
								onChange={e => {
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
					data={visibleRows || []}
					onSortedChange={this.handleSortChanged}
					onClickRow={handleClickRow}
					key="id"
					noDataIcon={this.getNoDataIcon()}
					noDataHeadline={this.getNoDataHeadline()}
					noDataSubheadline={this.getNoDataSubheadline()}
					noDataPrimaryAction={this.getNoDataPrimaryAction()}
				/>
			</Fragment>
		)
	}
}

export default RecordTable
