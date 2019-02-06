// @flow
import React, { Component } from 'react'

import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader
} from 'react-virtualized'

import RecordSelectionListItem from './RecordSelectionListItem'
import TextContainer from '../TextContainer/TextContainer'
import Text from '../Text/Text'

type RecordSelectionListProps = {|
	/** Static list of records */
	records: Array<any>,

	/** Load records asyncronously */
	loadRecords: ({ limit: number, offset: number, filter?: string }) => Promise<
		Array<Object>
	>,

	/** IDs in this record list which have been selected */
	selectedIds: Array<string>,

	onSelect: string => void,

	onRemove: string => void,

	/** Total number of records available to be selected */
	totalRecordCount: number,

	/** Name of record type */
	recordTypeName: string,

	/** Outlines props that are passed to list item */
	recordItemProps: Function
|}

type RecordSelectionListState = {
	selectedIds: Array<string>,
	loadedRecords: Array<any>,
	isLoading: boolean
}

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

		if (props.records && props.loadRecords) {
			throw new Error(
				'RecordSelectionList: You provided `records` and `loadRecords` but I only want one.`'
			)
		}

		this.state = {
			loadedRecords: props.records || [],
			selectedIds: props.selectedIds,
			isLoading: false
		}
	}

	async componentDidMount() {
		const { loadRecords } = this.props

		if (loadRecords) {
			const initialRecords = await loadRecords({
				offset: 0,
				limit: 10
			})

			this.setState({
				loadedRecords: initialRecords
			})
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
		const { recordItemProps } = this.props
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
						<RecordSelectionListItem
							key={key}
							onRemoveSelection={this.handleRemoveSelection}
							{...recordItemProps(record)}
						/>
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

	handleRemoveSelection = (id: string) => {
		const { loadedRecords, selectedIds } = this.state
		const updatedLoadedRecords = loadedRecords.slice(0)
		const updatedSelectedIds = selectedIds.slice(0)

		const recordToRemove = updatedLoadedRecords.find(r => r.id === id)
		const loadedIdx = updatedLoadedRecords.indexOf(recordToRemove)
		updatedLoadedRecords.splice(loadedIdx, 1)

		const selectedIdx = updatedSelectedIds.indexOf(id)
		updatedSelectedIds.splice(selectedIdx, 1)

		this.setState({
			loadedRecords: updatedLoadedRecords,
			selectedIds: updatedSelectedIds
		})
	}

	render() {
		const { recordTypeName, totalRecordCount } = this.props
		const { selectedIds, loadedRecords } = this.state

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
					<Text>{`${totalSelected} ${recordTypeName} are selected`}</Text>
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
