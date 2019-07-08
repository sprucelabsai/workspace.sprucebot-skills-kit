// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import Button from '../Button/Button'
import EmptyState from '../EmptyState/EmptyState'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'

import type {
	RecordSelectionListProps,
	RecordSelectionListItemProps
} from '../RecordSelectionList/RecordSelectionList'

import type { Props as ListItemProps } from '../List/List'

type TruncatedListItemProps = {
	id: string
}

type Props = {
	className?: string,
	header?: string,
	maxItemsVisible?: number,
	truncatedActionText?: string,
	onClickTruncatedAction?: Function,
	recordSelectionListItems: Array<RecordSelectionListItemProps>,
	selectedIds?: Array<string>,
	unselectableIds?: Array<string>,
	canSelect?: 'many' | 'one',
	canRemove?: boolean,
	showSelectedCount?: boolean,
	onSelect?: Function,
	onRemove?: Function,
	noItemsText?: string
}

type State = {
	recordListItems: Array<RecordSelectionListItemProps>
}

export default class TruncatedList extends Component<Props, State> {
	static defaultProps = {
		canRemove: false,
		maxItemsVisible: 5,
		recordSelectionListItems: [],
		noItemsText: 'Nothing to see here.'
	}

	constructor(props: Props) {
		super(props)

		this.recordSelectionListRef = React.createRef()
	}

	handleClickFooterCTA = () => {
		const { onClickTruncatedAction } = this.props
		if (onClickTruncatedAction) {
			onClickTruncatedAction()
		}
	}

	render() {
		const {
			className,
			header,
			maxItemsVisible,
			truncatedActionText,
			onClickTruncatedAction,
			recordSelectionListItems,
			selectedIds,
			unselectableIds,
			canSelect,
			canRemove,
			showSelectedCount,
			onSelect,
			onRemove,
			noItemsText
		} = this.props
		const parentClass = cx('truncated-list', className)
		return (
			<div className={parentClass}>
				{!recordSelectionListItems || recordSelectionListItems.length === 0 ? (
					<EmptyState headline="" subheadline={noItemsText} />
				) : (
					<Fragment>
						{header && <h3 className="truncated-list__header">{header}</h3>}
						<RecordSelectionList
							ref={this.recordSelectionListRef}
							loadRecordListItems={async () => {
								console.log('LOAD RECORDS', recordSelectionListItems)
								return await recordSelectionListItems.slice(0, maxItemsVisible)
							}}
							selectedIds={selectedIds}
							unselectableIds={unselectableIds}
							canSelect={canSelect}
							canRemove={canRemove}
							showSelectedCount={showSelectedCount}
							onSelect={onSelect}
							onRemove={async id => {
								if (onRemove) {
									await onRemove(id)
									this.recordSelectionListRef.current.reset()
								}
							}}
						/>
						{maxItemsVisible &&
						recordSelectionListItems.length >= maxItemsVisible ? (
							<div className="truncated-list__action-btn-wrapper">
								<Button
									kind="simple"
									className="truncated-list__action-btn"
									isSmall={true}
									text={truncatedActionText || 'See all'}
									onClick={onClickTruncatedAction}
								/>
							</div>
						) : null}
					</Fragment>
				)}
			</div>
		)
	}
}
