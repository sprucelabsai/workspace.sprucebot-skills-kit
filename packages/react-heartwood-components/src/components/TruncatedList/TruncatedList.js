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
	maxItemsVisible?: boolean,
	truncatedActionText?: string,
	onClickTruncatedAction?: Function,
	recordSelectionListItems: Array<RecordSelectionListItemProps>,
	totalRecordCount?: number,
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
			totalRecordCount,
			selectedIds,
			unselectableIds,
			canSelect,
			canRemove,
			showSelectedCount,
			onSelect,
			onRemove,
			noItemsText
		} = this.props
		const parentClass = cx('list truncated-list', className)
		return (
			<Fragment>
				{!recordSelectionListItems || recordSelectionListItems.length === 0 ? (
					<EmptyState headline="" subheadline={noItemsText} />
				) : (
					<Fragment>
						{header && <h3 className="truncated-list__header">{header}</h3>}
						<RecordSelectionList
							loadRecordListItems={() =>
								recordSelectionListItems.slice(0, maxItemsVisible)
							}
							totalRecordCount={totalRecordCount}
							selectedIds={selectedIds}
							unselectableIds={unselectableIds}
							canSelect={canSelect}
							canRemove={canRemove}
							showSelectedCount={showSelectedCount}
							onSelect={onSelect}
							onRemove={onRemove}
						/>
						{maxItemsVisible &&
						recordSelectionListItems.length >= maxItemsVisible ? (
							<Button
								kind="simple"
								text={truncatedActionText || 'See all'}
								onClick={onClickTruncatedAction}
							/>
						) : null}
					</Fragment>
				)}
			</Fragment>
		)
	}
}
