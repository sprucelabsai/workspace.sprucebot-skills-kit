import React, { Component, Fragment, ChangeEvent } from 'react'
import { debounce, get } from 'lodash'

import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader
} from 'react-virtualized'
import cx from 'classnames'
import { checkDeprecatedProps } from '../../utilities'

import { TextInput, Radio, Checkbox } from '../Forms'
import { InputPre } from '../Forms/FormPartials'
import TextContainer from '../TextContainer/TextContainer'
import Text from '../Text/Text'
import Button, { ButtonKinds } from '../Button/Button'
import ListItem, { IListItemProps } from '../List/components/ListItem/ListItem'
import EmptyState, { IEmptyStateProps } from '../EmptyState/EmptyState'

export interface IRecordSelectionListItemProps extends IListItemProps {
	id: string
}

export interface IRecordSelectionListProps {
	/** DEPRECATED Required method to render a record into a node */
	renderRecord?: (record: any) => React.ReactElement

	/** DEPRECATED Get a unique ID for a record; given that data may be shaped in an unpredictable manner,
	 * you must implement this at each usage if using loadRecords method.
	 */
	getRecordId?: (record: any) => string

	/** DEPRECATED Load custom records data for the offset/limit provided */
	loadRecords?: (options: {
		offset: number
		limit: number
		search?: string
	}) => Promise<any[]>

	/** Load records as list items for the offset/limit provided */
	loadRecordListItems?: ({
		offset,
		limit,
		search
	}: {
		offset: number
		limit: number
		search?: string
	}) => Promise<IRecordSelectionListItemProps[]>

	/** How many records should be retrieved from the server at one time? */
	recordsPerRequest: number

	/** Total number of records that could be in this list.
	 * Optional, but optimizes infinite load and adds supplementary UI */
	totalRecordCount?: number

	/** Array of IDs in this collection of records that should be marked as selected */
	selectedIds?: string[]

	/** Can the search the records in the list? */
	canSearch?: boolean

	/** If provided, controls the value of the search string */
	searchValue?: string

	/** Respond to changes to the search value */
	onSearchChange?: (value: string) => any

	/** delays invoking search until after a certain ms have elapsed since the last time the
	 * search was invoked */
	searchDelayMs?: number

	/** Array of IDs that should not be selectable */
	unselectableIds?: string[]

	/** Can the user select many or one records in this list? */
	canSelect?: 'many' | 'one'

	/** Can the user remove records from this list? */
	canRemove?: boolean

	/** Optionally provide a label for the search input */
	searchLabel?: string

	/** Optionally provide a placeholder to the search input */
	searchPlaceholder?: string

	/** Set to false to hide "# selected" text - defaults to true */
	showSelectedCount?: boolean

	/** Callback for selection of a record */
	onSelect?: (RecordId, Record) => void

	/** Callback for when user requests to remove a record from the list. */
	onRemove?: (RecordId, Record) => void

	/** When set, list will become infinitely scrollable
	/*  A number value will set the max height of the list to the number of rows specified
	/*  A value of 'auto' will allow the list to fill the height of the parent container */
	maxRowsVisible?: number | 'auto'

	/** Should the no-data empty state be hidden? */
	hideDataEmptyState?: boolean

	/** Should the no-result empty state be hidden? */
	hideSearchResultsEmptyState?: boolean

	/** Props for the no-result empty state */
	noSearchResultsEmptyState?: IEmptyStateProps

	/** Props for the no-data empty state */
	noDataEmptyState?: IEmptyStateProps
}

interface IRecordSelectionListState {
	/** Records that have been loaded into state via `loadRecords` */
	loadedRecords: Record<string, any>[]

	/** Is the list loading data? */
	isLoading: boolean

	/** Search value */
	search?: string

	/** ID to manage the last request to loadRecords */
	loadingId?: string

	listHeight: number
}

export default class RecordSelectionList extends Component<
	IRecordSelectionListProps,
	IRecordSelectionListState
> {
	public static defaultProps = {
		showSelectedCount: false,
		hideSearchResultsEmptyState: false,
		hideDataEmptyState: false,
		recordsPerRequest: 10
	}

	private listContainer: any
	private virtualizedList: any
	private infiniteLoader: any
	private cache = new CellMeasurerCache({
		fixedWidth: true
	})

	private loadSearchResults = debounce(
		async ({ value, uniqueId }: { value: string; uniqueId: string }) => {
			// When we search, we'll want to reset the list, so back to offset 0!
			const newRows = await this.loadRecordsRequest({
				offset: 0,
				search: value
			})

			if (uniqueId === this.state.loadingId) {
				this.setState(
					{ isLoading: false, loadedRecords: newRows || [] },
					() => {
						this.resetVirtualizedList()
					}
				)
			}
		},
		this.props.searchDelayMs || 200
	)

	public constructor(props: IRecordSelectionListProps) {
		super(props)

		if (props.loadRecords && !props.getRecordId) {
			throw new Error(
				"RecordSelectionList: `getRecordId` must be provided to determine a record's unique identifier. (record => string)"
			)
		}

		checkDeprecatedProps({
			componentName: 'RecordSelectionList',
			props,
			deprecatedProps: {
				renderRecord: {
					details:
						'Use loadRecordListItems to manage loading and rendering of record list item.'
				},
				getRecordId: {
					details:
						'Use loadRecordListItems to manage loading and rendering of record list item.'
				},
				loadRecords: {
					details:
						'Use loadRecordListItems to manage loading and rendering of record list item.'
				}
			}
		})

		this.state = {
			loadedRecords: [],
			isLoading: true,
			search: props.searchValue,
			listHeight: 1
		}
	}

	public async componentDidMount(): Promise<void> {
		const { search } = this.state

		const initialRecords = await this.loadRecordsRequest({
			search,
			offset: 0
		})

		await this.setState({
			loadedRecords: initialRecords || [],
			isLoading: false
		})

		const newListHeight = this.getVisibleRecordHeight()

		if (this.state.listHeight !== newListHeight) {
			this.setState({ listHeight: newListHeight })
		}
	}

	public componentDidUpdate(prevProps: IRecordSelectionListProps): void {
		const { canRemove, canSelect, searchValue } = this.props

		if (searchValue && searchValue !== prevProps.searchValue) {
			this.updateSearchValue(searchValue)
		}

		// We need to manually tell virtualized to update if these props
		// change. This is mostly for storybook but it may be nice to support later in product.
		if (
			prevProps.canRemove !== canRemove ||
			prevProps.canSelect !== canSelect
		) {
			this.resetVirtualizedList()
		}
	}

	public async reset({
		persistSearch = false
	}: {
		/** Persist the value of the search when resetting. Defaults `false`. */
		persistSearch?: boolean
	} = {}): Promise<void> {
		// TODO: This just "works" but ideally I'd be resetting more holistically.
		// Come back to this and clean up the API a bit. Make sure that resetting
		// doesn't cause infiniteLoad to fail.
		this.updateSearchValue(
			persistSearch && this.state.search ? this.state.search : ''
		)
	}

	public getVisibleRecordHeight = (): number => {
		const { maxRowsVisible } = this.props

		let visibleRecordHeight = 0

		if (typeof maxRowsVisible === 'number') {
			for (let i = 0; i < Math.min(maxRowsVisible); i += 1) {
				if (i < this.cache._rowCount) {
					visibleRecordHeight += this.cache.rowHeight({ index: i })
				} else {
					visibleRecordHeight += 1
				}
			}
		}

		return visibleRecordHeight
	}

	public render(): React.ReactElement {
		const {
			canSearch,
			maxRowsVisible,
			hideDataEmptyState,
			hideSearchResultsEmptyState,
			noDataEmptyState,
			noSearchResultsEmptyState,
			searchLabel,
			searchPlaceholder,
			selectedIds = [],
			showSelectedCount,
			totalRecordCount
		} = this.props

		const { loadedRecords, search, listHeight, isLoading } = this.state
		const totalSelected = selectedIds.length

		const isRowLoaded = ({ index }): boolean => {
			return !!loadedRecords[index]
		}
		const onResize = (): void => {
			this.resetVirtualizedList()
		}

		return (
			<div
				className={cx('record-selection__list', {
					'record-selection__list--is-infinite': maxRowsVisible,
					'record-selection__list--is-searchable': canSearch,
					'record-selection__list--is-showing-selected-count': showSelectedCount
				})}
				ref={ref => (this.listContainer = ref)}
			>
				{showSelectedCount && (
					<TextContainer>
						<Text>{`${totalSelected} selected`}</Text>
					</TextContainer>
				)}

				{canSearch && loadedRecords.length > 0 && (
					<Fragment>
						{searchLabel && <InputPre label={searchLabel} />}
						<TextInput
							id={'record-selection-list-filter'}
							type="text"
							iconBefore="search"
							placeholder={searchPlaceholder || 'Search...'}
							value={search}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								this.updateSearchValue(e.target.value)
							}}
						/>
					</Fragment>
				)}

				{loadedRecords.length > 0 ? (
					<Fragment>
						{!maxRowsVisible ? (
							loadedRecords.map(record => {
								return this.renderInnerRow({
									record,
									style: {}
								})
							})
						) : (
							<div
								className="record-selection__list-wrapper"
								// Only set listHeight if maxRowsVisible is not undefined or 'auto'
								{...(typeof maxRowsVisible === 'number'
									? { style: { height: `${listHeight}px` } }
									: {})}
							>
								<InfiniteLoader
									ref={ref => (this.infiniteLoader = ref)}
									isRowLoaded={isRowLoaded}
									loadMoreRows={() => this.handleInfiniteLoad()}
									rowCount={totalRecordCount || Infinity}
									threshold={maxRowsVisible || 5}
								>
									{({ onRowsRendered, registerChild }) => (
										<AutoSizer onResize={onResize}>
											{({ height, width }) => {
												return (
													<List
														ref={ref => {
															registerChild(ref)
															this.virtualizedList = ref
														}}
														className="record-selection__virtual-list"
														deferredMeasurementCache={this.cache}
														height={height}
														width={width}
														rowHeight={this.cache.rowHeight}
														rowCount={loadedRecords.length}
														rowRenderer={this.renderRow}
														onRowsRendered={args => {
															onRowsRendered(args)
														}}
														selectedIds={JSON.stringify(selectedIds)}
													/>
												)
											}}
										</AutoSizer>
									)}
								</InfiniteLoader>
							</div>
						)}
					</Fragment>
				) : (
					!isLoading &&
					loadedRecords.length === 0 && (
						<Fragment>
							{search
								? !hideSearchResultsEmptyState && (
										<EmptyState
											icon="no_matches"
											headline="No search results"
											{...noSearchResultsEmptyState}
											primaryAction={{
												text: 'Show all',
												type: 'submit',
												onClick: () => {
													this.updateSearchValue('')
												},
												...get(noSearchResultsEmptyState, 'primaryAction', {})
											}}
										/>
								  )
								: !hideDataEmptyState && (
										<EmptyState headline="No records" {...noDataEmptyState} />
								  )}
						</Fragment>
					)
				)}
			</div>
		)
	}

	private updateSearchValue = async (value: string) => {
		const { onSearchChange } = this.props

		// Search will rapid-fire, but we only want to use the last result.
		// If this value doesn't change by the time the API responds, we'll use
		// that data to update the list!
		const uniqueId = `${Math.random()}`

		this.setState(
			{
				search: value,
				isLoading: true,
				loadingId: uniqueId
			},
			async () => {
				if (onSearchChange) {
					onSearchChange(value)
				}

				this.loadSearchResults({
					value,
					uniqueId
				})
			}
		)
	}

	private resetVirtualizedList = () => {
		if (this.virtualizedList && this.cache && this.infiniteLoader) {
			this.cache.clearAll()
			this.virtualizedList.recomputeRowHeights()
			this.virtualizedList.forceUpdateGrid()
			this.infiniteLoader.resetLoadMoreRowsCache(true)

			setTimeout(() => {
				this.setState({ listHeight: this.getVisibleRecordHeight() })
			}, 0)
		}
	}

	private loadRecordsRequest = async (options: {
		offset: number
		search?: string
	}) => {
		const { loadRecords, loadRecordListItems, recordsPerRequest } = this.props
		const requestArgs = {
			limit: recordsPerRequest,
			...options
		}

		if (loadRecords) {
			return await loadRecords(requestArgs)
		} else if (loadRecordListItems) {
			return await loadRecordListItems(requestArgs)
		}
	}

	private renderRow = ({
		index,
		key,
		parent,
		style
	}: {
		index: number
		key: string
		parent: any
		style: {
			height: number
		}
	}) => {
		const { loadedRecords } = this.state

		const record = loadedRecords[index]

		return (
			record && (
				<CellMeasurer
					cache={this.cache}
					columnIndex={0}
					key={key}
					parent={parent}
					rowIndex={index}
				>
					{() => this.renderInnerRow({ record, style })}
				</CellMeasurer>
			)
		)
	}

	private renderInnerRow = ({
		record,
		style
	}: {
		record: any
		style: Record<string, any>
	}) => {
		const { loadedRecords } = this.state

		const {
			selectedIds,
			unselectableIds,
			getRecordId,
			canSelect,
			canRemove,
			onSelect,
			onRemove,
			renderRecord,
			loadRecords,
			loadRecordListItems
		} = this.props

		if (loadRecordListItems && record.id) {
			const { id: recordId } = record
			return (
				<div
					className="record-selection__record-wrapper"
					key={recordId}
					style={{ ...style }}
				>
					<ListItem
						{...record}
						key={recordId}
						selectableId={onSelect && canSelect && recordId}
						selectableProps={{
							onChange: onSelect
								? () => {
										onSelect(recordId, record)
								  }
								: () => null,
							isChecked: selectedIds && selectedIds.indexOf(recordId) >= 0
						}}
						selectableType={canSelect === 'one' ? 'radio' : 'checkbox'}
						isDisabled={
							unselectableIds && unselectableIds.indexOf(recordId) >= 0
						}
						actions={
							onRemove && canRemove
								? [
										{
											kind: 'simple',
											className: 'record-selection__record-remove-btn',
											disabled: false,
											isSmall: true,
											icon: {
												name: 'cancel_solid',
												className: 'btn__line-icon'
											},
											onClick: () => {
												this.setState(
													{
														loadedRecords: loadedRecords.filter(
															loadedRecord => loadedRecord.id !== recordId
														)
													},
													() => {
														this.setState({
															listHeight: this.getVisibleRecordHeight()
														})
													}
												)

												onRemove(recordId, record)
											}
										}
								  ]
								: []
						}
					/>
				</div>
			)
		} else if (loadRecords && renderRecord && getRecordId) {
			// DEPRECATED RENDER METHOD

			const SelectionComponent = canSelect === 'one' ? Radio : Checkbox
			const recordId = getRecordId(record)

			return (
				<div
					className="record-selection__record-wrapper"
					key={recordId}
					style={{ ...style }}
				>
					{onSelect && canSelect && (
						<SelectionComponent
							id={recordId}
							name={recordId}
							className="record-selection__record-select"
							onChange={() => {
								onSelect(recordId, record)
							}}
							isDisabled={
								unselectableIds && unselectableIds.indexOf(recordId) >= 0
							}
							isChecked={
								selectedIds && selectedIds.indexOf(recordId) >= 0 ? true : false
							}
						/>
					)}

					<div className="record-selection__record-content" key={recordId}>
						{renderRecord(record)}
					</div>

					{onRemove && canRemove && (
						<Button
							kind={ButtonKinds.Simple}
							className="record-selection__record-remove-btn"
							isDisabled={false}
							isSmall
							icon={{ name: 'cancel_solid', className: 'btn__line-icon' }}
							onClick={() => {
								this.setState(
									{
										loadedRecords: loadedRecords.filter(
											loadedRecord => getRecordId(loadedRecord) !== recordId
										)
									},
									() => {
										this.setState({ listHeight: this.getVisibleRecordHeight() })
									}
								)

								onRemove(recordId, record)
							}}
						/>
					)}
				</div>
			)
		} else {
			return null
		}
	}

	private handleInfiniteLoad = async () => {
		const { loadedRecords, isLoading, search } = this.state

		if (isLoading) {
			return
		}

		this.setState({ isLoading: true })

		const newRows = await this.loadRecordsRequest({
			offset: loadedRecords.length,
			search
		})

		this.setState({
			isLoading: false
		})

		if (newRows && newRows.length > 0) {
			this.setState({
				loadedRecords: [...loadedRecords, ...newRows]
			})
		}

		return true
	}

	private handleRemoveSelection = () => {}
}
