import React, { Component } from 'react'
import { IListProps } from '../../List'
import ListItem, { IListItemProps } from '../ListItem/ListItem'
import { ButtonKinds } from '../../../Button/Button'

export interface IExpandableListItemProps {
	/** Base list item props */
	item: IListItemProps

	/** Optional; adds a nested list */
	list?: IListProps

	/** Optional; adds multiple lists nested at the same level */
	lists?: IListProps[]

	/** Optional icon for collapsed state */
	collapsedIconName?: string

	/** Optional icon for expanded state */
	expandedIconName?: string

	/** defaults to true for this compoment */
	isExpandable?: boolean
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
			collapsedIconName: collapsedIcon,
			expandedIconName: expandedIcon
		} = this.props
		const { isExpanded } = this.state
		return (
			<ListItem
				{...item}
				list={isExpanded && list}
				lists={isExpanded && lists}
				actions={[
					{
						icon: {
							name: isExpanded
								? expandedIcon || 'keyboard_arrow_down'
								: collapsedIcon || 'keyboard_arrow_right'
						},
						kind: isExpanded ? null : ButtonKinds.Simple,
						onClick: this.toggleExpanded
					}
				]}
			/>
		)
	}
}
