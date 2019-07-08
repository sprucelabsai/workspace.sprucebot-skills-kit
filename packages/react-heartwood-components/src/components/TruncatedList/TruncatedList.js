// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import Button from '../Button/Button'
import EmptyState from '../EmptyState/EmptyState'
import RecordSelectionList from '../RecordSelectionList/RecordSelectionList'

import type { Props as ListItemProps } from '../List/List'

type TruncatedListItemProps = {
	id: string,
	...ListItemProps
}

type Props = {
	className?: string,
	items: Array<ListItemProps>,
	canSelect?: 'many' | 'one',
	canRemove: boolean,
	maxItemsVisible: number,
	footerActionText?: string,
	onClickFooterAction?: () => void,

	/** Callback for selection of a list item */
	onSelect?: any => void,

	/** Callback for when user requests to remove an item from the list. */
	onRemove?: any => void
}

type State = {}

export default class TruncatedList extends Component<Props, State> {
	static defaultProps = {
		items: [],
		canRemove: false,
		maxItemsVisible: 5
	}

	handleClickFooterCTA = () => {
		const { onClickFooterAction } = this.props
		if (onClickFooterAction) {
			onClickFooterAction()
		}
	}

	render() {
		const {
			className,
			items,
			canSelect,
			canRemove,
			maxItemsVisible,
			onRemove,
			onSelect,
			footerActionText,
			onClickFooterAction
		} = this.props
		const parentClass = cx('list truncated-list', className)
		return (
			<Fragment>
				{items.length === 0 ? (
					<EmptyState
						headline="EMPTY STATE TEXT"
						primaryAction={{
							text: 'EMPTY STATE CTA TEXT',
							onClick: () => {
								console.log('EMPTY STATE CTA CLICKED')
							}
						}}
					/>
				) : (
					<div>RECORD SELECTION LIST GOES HERE</div>
				)}
				{items.length >= maxItemsVisible && (
					<Button
						kind="simple"
						text={footerActionText || 'See all'}
						onClick={onClickFooterAction}
					/>
				)}
			</Fragment>
		)
	}
}
