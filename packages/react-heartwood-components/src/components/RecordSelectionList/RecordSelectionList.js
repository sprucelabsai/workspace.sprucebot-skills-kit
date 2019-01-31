import React, { Component, Fragment } from 'react'
import cx from 'classnames'

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
import Button from '../Button/Button'
import Search from '../Forms/components/Search/Search'

type Props = {
	selectedIds: Array<string>,

	loadData: (Array<string>) => Promise<Array<Object>>,

	/** Called when Cancel button is clicked or modal is closed */
	onCancel: () => void,

	/** Called when Update Selection button is clicked */
	onUpdate: (Array<string>) => void,

	/** Called when Select All button is clicked */
	onSelectAll: Function,

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
		this.state = {
			loadedRecords: [],
			selectedIds: []
		}
	}

	componentDidMount() {
		this.setState({
			loadedRecords: this.props.loadData(),
			selectedIds: this.props.selectedIds
		})
	}

	renderRow = ({ index, key, parent, style, isScrolling, isVisible }) => {
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
							...style,
							visibility: isScrolling ? 'visible' : 'visible'
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

	renderList = () => {
		const { selectedIds } = this.state
		const { loadData } = this.props

		const isRowLoaded = ({ index }) => {
			return index > 0
		}

		const loadMoreRows = ({ startIndex, stopIndex }) => {
			// Do API Stuff™

			if (this.list) {
				loadData()
				this.cache.clearAll()
				this.list.recomputeRowHeights(0)
				this.list.forceUpdateGrid()
			}
			let done
			return new Promise(resolve => (done = resolve))
		}

		const onResize = () => {
			if (this.list && this.cache) {
				this.cache.clearAll()
				this.list.recomputeRowHeights(0)
				this.list.forceUpdateGrid()
			}
		}

		return (
			<InfiniteLoader
				ref={ref => (this.infiniteLoader = ref)}
				isRowLoaded={isRowLoaded}
				loadMoreRows={loadMoreRows}
				rowCount={selectedIds.length}
				threshold={1}
			>
				{({ onRowsRendered, registerChild }) => (
					<AutoSizer
						className="record-selection__autosizer"
						onResize={onResize}
					>
						{({ height, width }) => (
							<div ref={registerChild}>
								<List
									ref={ref => (this.list = ref)}
									className="record-selection__virtual-list"
									deferredMeasurementCache={this.cache}
									height={height}
									width={width}
									rowCount={selectedIds.length}
									rowHeight={this.cache.rowHeight}
									rowRenderer={this.renderRow}
									scrollToIndex={20}
									scrollToAlignment="end"
									onRowsRendered={onRowsRendered}
								/>
							</div>
						)}
					</AutoSizer>
				)}
			</InfiniteLoader>
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
		const {
			isModal,
			onCancel,
			onUpdate,
			onSelectAll,
			renderRecord,
			recordTypeName,
			totalRecordCount,
			...rest
		} = this.props
		const { selectedIds, loadedRecords } = this.state

		const totalSelected = selectedIds.length

		const title = `Selected ${recordTypeName}`

		const body = (
			<Fragment>
				<TextContainer>
					<Text>{`${totalSelected} ${recordTypeName} are selected`}</Text>
					<Button
						kind={'simple'}
						text={`Select all ${totalRecordCount} ${recordTypeName}`}
						onClick={onSelectAll}
					/>
				</TextContainer>
				<Search placeholder={`Search ${recordTypeName}...`} />
				{this.renderList({
					list: loadedRecords,
					loadNextPage: this.props.loadData
				})}
				{/* <List {...rest}>
					{loadedRecords.map(r => (
						<RecordSelectionListItem
							onRemoveSelection={this.handleRemoveSelection}
							{...this.props.recordItemProps(r)}
						/>
					))}
				</List> */}
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
