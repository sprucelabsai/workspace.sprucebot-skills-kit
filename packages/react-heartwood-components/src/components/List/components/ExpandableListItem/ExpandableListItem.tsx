import { IHWAction, IHWExpandableListItem } from '@sprucelabs/spruce-types'
import React, { Component } from 'react'
import { ButtonKinds } from '../../../Button/Button'
import { IListProps } from '../../List'
import ListItem, { IListItemProps } from '../ListItem/ListItem'

export interface IExpandableListItemProps
	extends Omit<IHWExpandableListItem, 'item' | 'list' | 'lists'> {
	/** Base list item props */
	item: IListItemProps

	/** Optional; adds a nested list */
	list?: IListProps

	/** Optional; adds multiple lists nested at the same level */
	lists?: IListProps[]

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}
interface IExpandableListItemState {
	/** Is the list item expanded */
	isExpanded: boolean
}

export default class ExpandableListItem extends Component<
	IExpandableListItemProps,
	IExpandableListItemState
> {
	public state = {
		isExpanded: false
	}

	public toggleExpanded = () => {
		this.setState(prevState => ({
			isExpanded: !prevState.isExpanded
		}))
	}

	public render(): React.ReactElement {
		const {
			item,
			list,
			lists,
			collapsedIconName,
			expandedIconName,
			onAction
		} = this.props
		const { isExpanded } = this.state
		return (
			<ListItem
				{...item}
				list={isExpanded ? list : undefined}
				lists={isExpanded ? lists : undefined}
				actions={[
					{
						icon: {
							name: isExpanded
								? expandedIconName || 'keyboard_arrow_down'
								: collapsedIconName || 'keyboard_arrow_right'
						},
						kind: isExpanded ? undefined : ButtonKinds.Simple,
						onClick: this.toggleExpanded
					}
				]}
				onAction={onAction}
			/>
		)
	}
}
