// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import Button from '../Button/Button'
import EmptyState from '../EmptyState/EmptyState'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'

import type { RecordSelectionListItemProps } from '../RecordSelectionList/RecordSelectionList'

type Props = {
	/** Optional class name for the component */
	className?: string,

	/** Optional text header for the list */
	header?: string,

	/** When true, will display the truncated action button */
	isTruncated: boolean,

	/** Optional truncated action button text - defaults to 'See All' */
	truncatedActionText?: string,

	/** Method called when truncated action is clicked */
	onClickTruncatedAction?: Function,

	/** RecordSelectionListItems to be displayed in the list */
	recordSelectionListItems: Array<RecordSelectionListItemProps>,

	/** Optional selectedIds passed to RecordSelectionList */
	selectedIds?: Array<string>,

	/** Optional unselectableIds passed to RecordSelectionList */
	unselectableIds?: Array<string>,

	/** Can the user select many or one records in this list? */
	canSelect?: 'many' | 'one',

	/** Can the user remove records from this list? */
	canRemove?: boolean,

	/** Set to false to hide "# selected" text - defaults to true */
	showSelectedCount?: boolean,

	/** Callback for selection of a record */
	onSelect?: Function,

	/** Callback for when user requests to remove a record from the list. */
	onRemove?: Function,

	/** Text displayed when the list is empty */
	noItemsText?: string
}

type State = {
	recordListItems: Array<RecordSelectionListItemProps>
}

export default class TruncatedList extends Component<Props, State> {
	static defaultProps = {
		isTruncated: false,
		canRemove: false,
		recordSelectionListItems: [],
		noItemsText: 'Nothing to see here.'
	}

	constructor(props: Props) {
		super(props)

		this.recordSelectionListRef = React.createRef()
	}

	render() {
		const {
			className,
			header,
			isTruncated,
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
								return await recordSelectionListItems
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
						{isTruncated ? (
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
