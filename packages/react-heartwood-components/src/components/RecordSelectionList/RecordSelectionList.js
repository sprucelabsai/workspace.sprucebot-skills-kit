// @flow
import React, { Component, Fragment } from 'react'

import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader
} from 'react-virtualized'

import TextContainer from '../TextContainer/TextContainer'
import Text from '../Text/Text'

import type { Node } from 'react'

type Record = any
type RecordId = string

type RecordSelectionListProps = {|
	/** Required method to render a record into a node */
	renderRecord: any => Node,

	/** Load records for the offset/limit provided */
	loadRecords: ({ offset: number, limit: number }) => Promise<Array<Record>>,

	/** Total number of records that could be in this list.
	 * Optional, but optimizes infinite load and adds supplementary UI */
	totalRecordCount?: number,

	/** Array of IDs in this collection of records that should be marked as selected */
	selectedIds?: Array<RecordId>,

	/** Can the user select many or one records in this list? */
	canSelect?: 'many' | 'one',

	/** Can the user remove records from this list? */
	canRemove?: boolean,

	/** Callback for selection of a record */
	onSelect?: RecordId => void,

	/** Callback for removal of a record */
	onRemove?: RecordId => void
|}

type RecordSelectionListState = {|
	/** Records that have been loaded into state via `loadRecords` */
	loadedRecords: Array<Record>,

	/** Is the list loading data? */
	isLoading: boolean
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

		this.state = {
			loadedRecords: [],
			isLoading: false
		}
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
		const { renderRecord } = this.props
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
					<div
						className="record-selection__record-wrapper"
						style={{
							...style
						}}
					>
						<Fragment key={key}>{renderRecord(record)}</Fragment>
					</div>
				</CellMeasurer>
			)
		)
	}

	handleInfiniteLoad = async () => {
		const { loadRecords } = this.props
		const { loadedRecords, isLoading } = this.state

		if (isLoading || !loadRecords) {
			return
		}

		this.setState({ isLoading: true })

		const newRows = await loadRecords({
			offset: loadedRecords.length,
			limit: 10
		})

		this.setState({
			isLoading: false,
			loadedRecords: [...loadedRecords, ...newRows]
		})

		return true
	}

	handleRemoveSelection = () => {}

	render() {
		const { selectedIds = [], totalRecordCount } = this.props
		const { loadedRecords } = this.state

		const totalSelected = selectedIds.length

		const isRowLoaded = ({ index }) => {
			return loadedRecords.find(record => record.id === selectedIds[index])
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
				<TextContainer>
					<Text>{`${totalSelected} are selected`}</Text>
				</TextContainer>

				<div className="record-selection__list-wrapper">
					<AutoSizer onResize={onResize}>
						{({ height, width }) => (
							<InfiniteLoader
								isRowLoaded={isRowLoaded}
								loadMoreRows={() => {
									this.handleInfiniteLoad()
								}}
								// If we can know the total record count, we can stop the loader
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
