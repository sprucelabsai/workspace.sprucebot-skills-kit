// @flow
import React, { Component } from 'react'

import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader
} from 'react-virtualized'
import cx from 'classnames'

import { TextInput, Checkbox, Radio } from '../Forms'
import Button from '../Button/Button'
import TextContainer from '../TextContainer/TextContainer'
import Text from '../Text/Text'

import type { Node } from 'react'

type Record = any
type RecordId = string

type RecordSelectionListProps = {|
	/** Required method to render a record into a node */
	renderRecord: any => Node,

	/** Get a unique ID for a record; given that data may be shaped in an unpredictable manner,
	 * you must implement this at each usage.
	 */
	getRecordId: Record => string,

	/** Load records for the offset/limit provided */
	loadRecords: ({|
		offset: number,
		limit: number,
		search?: string
	|}) => Promise<Array<Record>>,

	/** Total number of records that could be in this list.
	 * Optional, but optimizes infinite load and adds supplementary UI */
	totalRecordCount?: number,

	/** Array of IDs in this collection of records that should be marked as selected */
	selectedIds?: Array<RecordId>,

	/** Can the search the records in the list? */
	canSearch?: boolean,

	/** Array of IDs that should not be selectable */
	unselectableIds?: Array<RecordId>,

	/** Can the user select many or one records in this list? */
	canSelect?: 'many' | 'one',

	/** Can the user remove records from this list? */
	canRemove?: boolean,

	/** Optionally provide a placeholder to the search input */
	searchPlaceholder?: string,

	/** Set to false to hide "# selected" text - defaults to true */
	showSelectedCount?: boolean,

	/** Callback for selection of a record */
	onSelect?: (RecordId, Record) => void,

	/** Callback for when user requests to remove a record from the list. */
	onRemove?: (RecordId, Record) => void,

	/** Is the list infinitely scrollable? */
	isInfiniteScroll: boolean,

	/** The height of the infinite scroll list. If not set, list will fill parent height. */
	infiniteScrollHeight?: string
|}

type RecordSelectionListState = {|
	/** Records that have been loaded into state via `loadRecords` */
	loadedRecords: Array<Record>,

	/** Is the list loading data? */
	isLoading: boolean,

	/** Search value */
	search: string,

	/** ID to manage the last request to loadRecords */
	loadingId?: string
|}

export default class RecordSelectionList extends Component<
	RecordSelectionListProps,
	RecordSelectionListState
> {
	listContainer: any
	virtualizedList: any
	infiniteLoader: any
	cache = new CellMeasurerCache({
		fixedWidth: true
	})

	constructor(props: RecordSelectionListProps) {
		super(props)

		if (!props.getRecordId) {
			throw new Error(
				"RecordSelectionList: `getRecordId` must be provided to determine a record's unique identifier. (record => string)"
			)
		}

		this.state = { loadedRecords: [], isLoading: false, search: '' }
	}

	async componentDidMount() {
		const { loadRecords, recordsPerRequest } = this.props

		const initialRecords = await loadRecords({
			offset: 0,
			limit: recordsPerRequest
		})

		this.setState({
			loadedRecords: initialRecords
		})
	}

	// Lifecycle required since we need to manually tell virtualized to update if these props
	// change. This is mostly for storybook but it may be nice to support later in product.
	componentDidUpdate(prevProps: RecordSelectionListProps) {
		const { canRemove, canSelect } = this.props

		if (
			this.virtualizedList &&
			this.cache &&
			(prevProps.canRemove !== canRemove || prevProps.canSelect !== canSelect)
		) {
			this.cache.clearAll()
			this.virtualizedList.recomputeRowHeights(0)
			this.virtualizedList.forceUpdateGrid()
		}
	}

	async reset() {
		const { loadRecords, recordsPerRequest } = this.props

		const initialRecords = await loadRecords({
			offset: 0,
			limit: recordsPerRequest
		})

		this.setState({
			loadedRecords: initialRecords
		})

		if (this.virtualizedList && this.cache) {
			this.cache.clearAll()
			this.virtualizedList.recomputeRowHeights(0)
			this.virtualizedList.forceUpdateGrid()
		}
	}

	renderRow = ({
		index,
		key,
		parent,
		style
	}: {
		index: number,
		key: string,
		parent: any,
		style: Object
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
					{this.renderInnerRow({ index, key, style })}
				</CellMeasurer>
			)
		)
	}

	renderInnerRow = ({
		index,
		key,
		style
	}: {
		index: number,
		key: string,
		style: Object
	}) => {
		const {
			selectedIds,
			unselectableIds,
			renderRecord,
			getRecordId,
			canSelect,
			canRemove,
			onSelect,
			onRemove
		} = this.props
		const { loadedRecords } = this.state
		const record = loadedRecords[index]
		const SelectionComponent = canSelect === 'one' ? Radio : Checkbox

		return (
			record && (
				<div
					className="record-selection__record-wrapper"
					key={key}
					style={{ ...style }}
				>
					{onSelect && canSelect && (
						<SelectionComponent
							className="record-selection__record-select"
							onChange={() => {
								onSelect(getRecordId(record), record)
							}}
							disabled={
								unselectableIds &&
								unselectableIds.indexOf(getRecordId(record)) >= 0
							}
							checked={
								selectedIds && selectedIds.indexOf(getRecordId(record)) >= 0
							}
						/>
					)}

					<div className="record-selection__record-content" key={key}>
						{renderRecord(record)}
					</div>

					{onRemove && canRemove && (
						<Button
							kind="simple"
							disabled={false}
							isSmall
							icon={{ name: 'remove_circle', className: 'btn__line-icon' }}
							onClick={() => {
								this.setState({
									loadedRecords: loadedRecords.filter(
										loadedRecord =>
											getRecordId(loadedRecord) !== getRecordId(record)
									)
								})

								onRemove(getRecordId(record), record)
							}}
						/>
					)}
				</div>
			)
		)
	}

	handleInfiniteLoad = async () => {
		const { loadRecords, recordsPerRequest } = this.props
		const { loadedRecords, isLoading, search } = this.state

		if (isLoading) {
			return
		}

		this.setState({ isLoading: true })

		const newRows = await loadRecords({
			offset: loadedRecords.length,
			limit: recordsPerRequest,
			search
		})

		if (newRows.length > 0) {
			this.setState({
				isLoading: false,
				loadedRecords: [...loadedRecords, ...newRows]
			})
		}

		return true
	}

	handleSearchUpdate = async (e: SyntheticInputEvent<HTMLInputElement>) => {
		const { loadRecords, recordsPerRequest } = this.props

		// Search will rapid-fire, but we only want to use the last result.
		// If this value doesn't change by the time the API responds, we'll use
		// that data to update the list!
		const uniqueId = `${Math.random()}`

		this.setState({
			search: e.target.value,
			isLoading: true,
			loadingId: uniqueId
		})

		// When we search, we'll want to reset the list, so back to offset 0!
		const newRows = await loadRecords({
			offset: 0,
			limit: recordsPerRequest,
			search: e.target.value
		})

		if (uniqueId === this.state.loadingId) {
			// We reset the list with the zero offset, so clear everything out.
			// This will scroll the user back to the top automatically.
			if (this.virtualizedList && this.cache) {
				this.cache.clearAll()
				this.virtualizedList.recomputeRowHeights(0)
				this.virtualizedList.forceUpdateGrid()
			}

			this.setState({ isLoading: false, loadedRecords: newRows })
		}
	}

	handleRemoveSelection = () => {}

	render() {
		const {
			selectedIds = [],
			totalRecordCount,
			canSearch,
			getRecordId,
			searchPlaceholder,
			showSelectedCount,
			isInfiniteScroll,
			infiniteScrollHeight
		} = this.props
		const { loadedRecords, search } = this.state
		const totalSelected = selectedIds.length
		const isRowLoaded = ({ index }) => {
			return !!loadedRecords[index]
		}
		const onResize = () => {
			if (this.virtualizedList && this.cache) {
				this.cache.clearAll()
				this.virtualizedList.recomputeRowHeights(0)
				this.virtualizedList.forceUpdateGrid()
			}
		}

		// TODO: add ability to make regular list until infinite scroll is required
		// This would require calculating the height of rows and setting a max number
		// of rows before the virtualized list takes over, taking into consideration whether
		// or not the list should fill the container or grow to a set height (infiniteScrollHeight)

		return (
			<div
				className={cx('record-selection__list', {
					'record-selection__list--is-infinite': isInfiniteScroll,
					'record-selection__list--is-searchable': canSearch,
					'record-selection__list--is-showing-selected-count': showSelectedCount
				})}
				ref={ref => (this.listContainer = ref)}
				{...(isInfiniteScroll && infiniteScrollHeight
					? { style: { height: infiniteScrollHeight } }
					: {})}
			>
				{showSelectedCount && (
					<TextContainer>
						<Text>{`${totalSelected} selected`}</Text>
					</TextContainer>
				)}

				{canSearch && (
					<TextInput
						type="text"
						iconBefore="search"
						placeholder={searchPlaceholder || 'Search...'}
						value={search}
						onChange={this.handleSearchUpdate}
					/>
				)}

				{!isInfiniteScroll ? (
					loadedRecords.map((rec, idx) => {
						const id = getRecordId(rec)
						return this.renderInnerRow({ index: idx, key: id, style: {} })
					})
				) : (
					<div className="record-selection__list-wrapper">
						<InfiniteLoader
							ref={ref => (this.infiniteLoader = ref)}
							isRowLoaded={isRowLoaded}
							loadMoreRows={() => this.handleInfiniteLoad()}
							rowCount={totalRecordCount || Infinity}
							threshold={1}
						>
							{({ onRowsRendered, registerChild }) => (
								<AutoSizer onResize={onResize}>
									{({ height, width }) => (
										<List
											ref={ref => {
												registerChild(ref)
												this.virtualizedList = ref
											}}
											className="record-selection__virtual-list"
											deferredMeasurementCache={this.cache}
											height={height}
											width={width}
											rowCount={loadedRecords.length}
											rowHeight={this.cache.rowHeight}
											rowRenderer={this.renderRow}
											onRowsRendered={onRowsRendered}
											selectedIds={JSON.stringify(selectedIds)}
										/>
									)}
								</AutoSizer>
							)}
						</InfiniteLoader>
					</div>
				)}
			</div>
		)
	}
}

RecordSelectionList.defaultProps = {
	showSelectedCount: false,
	recordsPerRequest: 10,
	isInfiniteScroll: false
}
