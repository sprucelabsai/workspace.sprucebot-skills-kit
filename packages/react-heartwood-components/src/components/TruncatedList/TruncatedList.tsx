import React, { Component, Fragment, ReactElement } from 'react'
import cx from 'classnames'

import Button, { ButtonKinds } from '../Button/Button'
import EmptyState from '../EmptyState/EmptyState'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'

import { IRecordSelectionListItemProps } from '../RecordSelectionList/RecordSelectionList'

interface ITruncatedListProps {
	/** Optional class name for the component */
	className?: string

	/** Optional text header for the list */
	header?: string

	/** When true, will display the truncated action button */
	isTruncated: boolean

	/** Optional truncated action button text - defaults to 'See All' */
	truncatedActionText?: string

	/** Method called when truncated action is clicked */
	onClickTruncatedAction?: Function

	/** RecordSelectionListItems to be displayed in the list */
	recordSelectionListItems: IRecordSelectionListItemProps[]

	/** Optional selectedIds passed to RecordSelectionList */
	selectedIds?: string[]

	/** Optional unselectableIds passed to RecordSelectionList */
	unselectableIds?: string[]

	/** Can the user select many or one records in this list? */
	canSelect?: 'many' | 'one'

	/** Can the user remove records from this list? */
	canRemove?: boolean

	/** Set to false to hide "# selected" text - defaults to true */
	showSelectedCount?: boolean

	/** Callback for selection of a record */
	onSelect?: (RecordId: string, Record: Record<string, any>) => void

	/** Callback for when user requests to remove a record from the list. */
	onRemove?: Function

	/** Text displayed when the list is empty */
	noItemsText?: string
}

interface ITruncatedListState {
	recordListItems: IRecordSelectionListItemProps[]
}

export default class TruncatedList extends Component<
	ITruncatedListProps,
	ITruncatedListState
> {
	public static defaultProps = {
		isTruncated: false,
		canRemove: false,
		recordSelectionListItems: [],
		noItemsText: 'Nothing to see here.'
	}

	private recordSelectionListRef: React.RefObject<RecordSelectionList>

	public constructor(props: ITruncatedListProps) {
		super(props)

		this.recordSelectionListRef = React.createRef()
	}

	public reset = async (): Promise<void> => {
		if (this.recordSelectionListRef.current) {
			this.recordSelectionListRef.current.reset()
		}
	}

	public render(): ReactElement {
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
									if (this.recordSelectionListRef.current) {
										this.recordSelectionListRef.current.reset()
									}
								}
							}}
						/>
						{isTruncated ? (
							<div className="truncated-list__action-btn-wrapper">
								<Button
									kind={ButtonKinds.Simple}
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
