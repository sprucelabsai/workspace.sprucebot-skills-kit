import React, { Component } from 'react'
import { IListProps } from '../../List'
import ListItem, { IListItemProps } from '../ListItem/ListItem'
import { IHWExpandableListItem } from '@sprucelabs/spruce-types'
import { ButtonKinds } from '../../../Button/Button'

export interface IExpandableListItemProps
	extends Omit<IHWExpandableListItem, 'item' | 'list' | 'lists'> {
	/** Base list item props */
	item: IListItemProps

	/** Optional; adds a nested list */
	list?: IListProps

	/** Optional; adds multiple lists nested at the same level */
	lists?: IListProps[]
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
			expandedIconName
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
			/>
		)
	}
}
