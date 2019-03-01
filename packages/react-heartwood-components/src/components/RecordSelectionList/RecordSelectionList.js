// @flow
import React, { Component } from 'react'

import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader
} from 'react-virtualized'

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
	onRemove?: (RecordId, Record) => void
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
	list: any
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
		const { loadRecords } = this.props

		const initialRecords = await loadRecords({
			offset: 0,
			limit: 10
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
			prevProps.canRemove !== canRemove ||
			prevProps.canSelect !== canSelect
		) {
			this.cache.clearAll()
			this.list.recomputeRowHeights(0)
			this.list.forceUpdateGrid()
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
				<CellMeasurer
					cache={this.cache}
					columnIndex={0}
					key={key}
					parent={parent}
					rowIndex={index}
				>
					<div
						className="record-selection__record-wrapper"
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
				</CellMeasurer>
			)
		)
	}

	handleInfiniteLoad = async () => {
		const { loadRecords } = this.props
		const { loadedRecords, isLoading, search } = this.state

		if (isLoading) {
			return
		}

		this.setState({ isLoading: true })

		const newRows = await loadRecords({
			offset: loadedRecords.length,
			limit: 10,
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
		const { loadRecords } = this.props

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
			limit: 10,
			search: e.target.value
		})

		if (uniqueId === this.state.loadingId) {
			// We reset the list with the zero offset, so clear everything out.
			// This will scroll the user back to the top automatically.
			this.cache.clearAll()
			this.list.recomputeRowHeights(0)
			this.list.forceUpdateGrid()

			this.setState({ isLoading: false, loadedRecords: newRows })
		}
	}

	handleRemoveSelection = () => {}

	render() {
		const {
			selectedIds = [],
			totalRecordCount,
			canSearch,
			searchPlaceholder,
			showSelectedCount
		} = this.props
		const { loadedRecords, search } = this.state
		const totalSelected = selectedIds.length
		const isRowLoaded = ({ index }) => {
			return !!loadedRecords[index]
		}
		const onResize = () => {
			if (this.list && this.cache) {
				this.cache.clearAll()
				this.list.recomputeRowHeights(0)
				this.list.forceUpdateGrid()
			}
		}

		return (
			<div className="record-selection__list">
				{showSelectedCount && (
					<TextContainer>
						<Text>{`${totalSelected} selected`}</Text>
					</TextContainer>
				)}

				{canSearch && (
					<TextInput
						type="text"
						placeholder={searchPlaceholder || 'Search...'}
						value={search}
						onChange={this.handleSearchUpdate}
					/>
				)}

				<div className="record-selection__list-wrapper">
					<AutoSizer onResize={onResize}>
						{({ height, width }) => (
							<InfiniteLoader
								isRowLoaded={isRowLoaded}
								loadMoreRows={() => {
									this.handleInfiniteLoad()
								}} // If we can know the total record count, we can stop the loader
								// from attempting to load more when nothing's there. Passing
								// Infinity just tells it to keep trying.
								// TODO: We could fix the record count in state if `handleInfiniteLoad`
								// ever returns 0 results, but that might get complex with
								// filtering, or other states this form could hit.
								rowCount={totalRecordCount || Infinity}
							>
								{({ onRowsRendered, registerChild }) => (
									<List
										ref={ref => {
											this.list = ref
											registerChild(ref)
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
							</InfiniteLoader>
						)}
					</AutoSizer>
				</div>
			</div>
		)
	}
}

RecordSelectionList.defaultProps = {
	showSelectedCount: true
}
