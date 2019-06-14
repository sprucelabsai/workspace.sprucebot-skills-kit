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

	/** When set, list will become infinitely scrollable
	/*  A number value will set the max height of the list to the number of rows specified
	/*  A value of 'auto' will allow the list to fill the height of the parent container */

	maxRowsVisible?: number | 'auto'
|}

type RecordSelectionListState = {|
	/** Records that have been loaded into state via `loadRecords` */
	loadedRecords: Array<Record>,

	/** Is the list loading data? */
	isLoading: boolean,

	/** Search value */
	search: string,

	/** ID to manage the last request to loadRecords */
	loadingId?: string,

	listHeight: number
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
	visibleRecordHeights = []

	constructor(props: RecordSelectionListProps) {
		super(props)

		if (!props.getRecordId) {
			throw new Error(
				"RecordSelectionList: `getRecordId` must be provided to determine a record's unique identifier. (record => string)"
			)
		}

		this.state = {
			loadedRecords: [],
			isLoading: false,
			search: '',
			listHeight: 1
		}
	}

	async componentDidMount() {
		const { loadRecords, recordsPerRequest } = this.props

		const initialRecords = await loadRecords({
			offset: 0,
			limit: recordsPerRequest
		})

		await this.setState({
			loadedRecords: initialRecords
		})

		const newListHeight = this.getVisibleRecordHeight()

		if (this.state.listHeight !== newListHeight) {
			this.setState({ listHeight: newListHeight })
		}
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
			this.setState({ listHeight: this.getVisibleRecordHeight() })
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
			this.setState({ listHeight: this.getVisibleRecordHeight() })
		}
	}

	getVisibleRecordHeight = () => {
		const { loadedRecords } = this.state

		if (loadedRecords.length < this.visibleRecordHeights.length) {
			this.visibleRecordHeights.length = loadedRecords.length
		}

		const height = this.visibleRecordHeights.reduce(
			(height, current) => (height += current),
			0
		)

		return height > 0 ? height : 1
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
		const { maxRowsVisible } = this.props
		const { loadedRecords } = this.state

		const record = loadedRecords[index]

		const updateListHeight =
			maxRowsVisible &&
			(typeof maxRowsVisible === 'number' ? index < maxRowsVisible : true)

		if (typeof style.height === 'number' && updateListHeight) {
			if (this.visibleRecordHeights.length < index + 1) {
				this.visibleRecordHeights.push(style.height)
			} else {
				this.visibleRecordHeights[index] = style.height
			}
		}

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
							className="record-selection__record-remove-btn"
							disabled={false}
							isSmall
							icon={{ name: 'cancel_solid', className: 'btn__line-icon' }}
							onClick={() => {
								this.setState(
									{
										loadedRecords: loadedRecords.filter(
											loadedRecord =>
												getRecordId(loadedRecord) !== getRecordId(record)
										)
									},
									() => {
										this.setState({ listHeight: this.getVisibleRecordHeight() })
									}
								)

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
				this.setState({ listHeight: this.getVisibleRecordHeight() })
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
			maxRowsVisible
		} = this.props
		const { loadedRecords, search, listHeight } = this.state
		const totalSelected = selectedIds.length

		const isRowLoaded = ({ index }) => {
			return !!loadedRecords[index]
		}
		const onResize = () => {
			if (this.virtualizedList && this.cache) {
				this.cache.clearAll()
				this.virtualizedList.recomputeRowHeights(0)
				this.virtualizedList.forceUpdateGrid()
				this.setState({ listHeight: this.getVisibleRecordHeight() })
			}
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

				{canSearch && (
					<TextInput
						type="text"
						iconBefore="search"
						placeholder={searchPlaceholder || 'Search...'}
						value={search}
						onChange={this.handleSearchUpdate}
					/>
				)}

				{!maxRowsVisible ? (
					loadedRecords.map((rec, idx) => {
						const id = getRecordId(rec)
						return this.renderInnerRow({ index: idx, key: id, style: {} })
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
							threshold={1}
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
			</div>
		)
	}
}

RecordSelectionList.defaultProps = {
	showSelectedCount: false,
	recordsPerRequest: 10
}
