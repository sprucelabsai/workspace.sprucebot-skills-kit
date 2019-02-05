//@flow
import React, { Component, Fragment } from 'react'

import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader
} from 'react-virtualized'

// import List from '../List'
import RecordSelectionListItem from './RecordSelectionListItem'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Modal from '../Modal/Modal'
import Heading from '../Heading/Heading'
import TextContainer from '../TextContainer/TextContainer'
import Text from '../Text/Text'

type Props = {
	/** Static list of records */
	records: Array<any>,

	/** Load records asyncronously */
	loadRecords: (
		Array<{ limit: number, offset: number, filter: string }>
	) => Promise<Array<Object>>,

	/** IDs in this record list which have been selected */
	selectedIds: Array<string>,

	/** Called when Cancel button is clicked or modal is closed */
	onCancel: () => void,

	/** Called when Update Selection button is clicked */
	onUpdate: (Array<string>) => void,

	/** Total number of records available to be selected */
	totalRecordCount: number,

	/** Name of record type */
	recordTypeName: string,

	/** Whether or not list is rendered in a modal */
	isModal?: boolean,

	/** Outlines props that are passed to list item */
	recordItemProps: Function
}

export default class RecordSelectionList extends Component<Props, State> {
	list: any
	cache = new CellMeasurerCache({
		fixedWidth: true
	})

	constructor(props) {
		super(props)

		if (props.records && props.loadedRecords) {
			throw new Error(
				'RecordSelectionList: You provided `records` and `loadRecords` but I only want one.`'
			)
		}

		this.state = {
			loadedRecords: props.records || [],
			selectedIds: props.selectedIds
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

	renderRow = ({ index, key, parent, style }) => {
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

	renderList = () => {
		const { totalRecordCount } = this.props
		const { selectedIds, loadedRecords } = this.state

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
		)
	}

	handleRemoveSelection = id => {
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
		const { isModal, onCancel, onUpdate, recordTypeName } = this.props
		const { selectedIds } = this.state

		const totalSelected = selectedIds.length

		const title = `Selected ${recordTypeName}`

		const body = (
			<Fragment>
				<TextContainer>
					<Text>{`${totalSelected} ${recordTypeName} are selected`}</Text>
				</TextContainer>

				{this.renderList()}
			</Fragment>
		)

		const actions = [
			{
				kind: 'primary',
				text: 'Update selection',
				onClick: () => onUpdate(),
				disabled: this.props.selectedIds === selectedIds
			},
			{
				kind: 'secondary',
				text: 'Cancel',
				onClick: () => onCancel()
			}
		]

		return (
			<div className="record-selection__list">
				{isModal ? (
					<Fragment>
						<Modal.Header title={title} onRequestClose={onCancel} />
						<Modal.Body>{body}</Modal.Body>
						<Modal.Footer
							primaryAction={actions[0]}
							secondaryAction={actions[1]}
						/>
					</Fragment>
				) : (
					<Fragment>
						<Heading>{title}</Heading>
						{body}
						<ButtonGroup actions={actions} />
					</Fragment>
				)}
			</div>
		)
	}
}

RecordSelectionList.defaultProps = {
	isModal: false
}
