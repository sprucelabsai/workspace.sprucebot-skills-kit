import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import cloneDeep from 'lodash'

import List from '../List'
import RecordSelectionListItem from './RecordSelectionListItem'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Modal from '../Modal/Modal'
import Heading from '../Heading/Heading'
import TextContainer from '../TextContainer/TextContainer'
import Text from '../Text/Text'
import Button from '../Button/Button'

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
				<List {...rest}>
					{loadedRecords.map(r => (
						<RecordSelectionListItem
							onRemoveSelection={this.handleRemoveSelection}
							{...this.props.recordItemProps(r)}
						/>
					))}
				</List>
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
