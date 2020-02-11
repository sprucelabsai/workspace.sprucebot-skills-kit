import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import {
	SortableContainer,
	SortableElement,
	arrayMove
} from 'react-sortable-hoc'
import { IListProps } from '../../List'
import ListHeader from '../ListHeader/ListHeader'
import ListItem, { IListItemProps } from '../ListItem/ListItem'

export interface ISortableListProps extends IListProps {
	/** onConfirm callback */
	onConfirm?: () => void

	/** Optional classname for the parent */
	parentClass?: string

	/** Optional; disables sorting */
	disabled?: boolean

	/** Callback when sorting starts */
	onSortStart: (item: IListItemProps) => void

	/** Callabck when sorting ends */
	onSortEnd: (props: any) => void

	/** List items you want to be sortable */
	items?: IListItemProps[]
}

interface ISortableListState {
	items?: IListItemProps[]
	isSorting: boolean
}
const SortableItem = SortableElement(
	(itemProps: any): React.ReactElement => {
		return <ListItem {...itemProps.item} />
	}
)
const SortableList = SortableContainer(
	({ items, parentClass, disabled }: any): React.ReactElement => {
		return (
			<ul className={parentClass}>
				{items.map((item, index) => (
					<SortableItem
						key={`item-${index}`}
						disabled={disabled}
						index={index}
						item={item}
					/>
				))}
			</ul>
		)
	}
)

const headerActions = ({
	isSorting,
	onClickToggle,
	onClickCancel,
	onClickConfirm
}): any => {
	if (isSorting) {
		return [
			{
				text: 'Cancel',
				onClick: onClickCancel
			},
			{
				text: 'Confirm',
				kind: 'simple',
				onClick: onClickConfirm
			}
		]
	}

	return [
		{
			text: 'Change Order',
			kind: 'simple',
			onClick: onClickToggle
		}
	]
}

export default class SortableComponent extends Component<
	ISortableListProps,
	ISortableListState
> {
	public state = {
		items: this.props.items || [],
		isSorting: false
	}

	public toggleSorting = () => {
		this.setState(prevState => ({
			isSorting: !prevState.isSorting
		}))
	}

	public onCancel = () => {
		this.setState({
			items: this.props.items,
			isSorting: false
		})
	}

	public onConfirm = () => {
		const { onConfirm } = this.props
		this.setState({
			isSorting: false
		})
		// Do other stuff with the API to save changes
		if (onConfirm) {
			onConfirm()
		}
	}

	public onSortStart = () => {
		//
	}

	public onSortEnd = ({ oldIndex, newIndex }: any) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex)
		})
	}

	public render(): React.ReactElement {
		const { isSorting } = this.state
		const { header, className, isSmall } = this.props
		const parentClass = cx('list sortable-list', className, {
			'list-small': isSmall
		})
		return (
			<Fragment>
				{header && (
					<ListHeader
						isSmall={isSmall}
						actions={headerActions({
							isSorting,
							onClickToggle: this.toggleSorting,
							onClickConfirm: this.onConfirm,
							onClickCancel: this.onCancel
						})}
						{...header}
					/>
				)}
				<SortableList
					parentClass={parentClass}
					items={[...this.state.items].map(item => ({
						isDraggable: isSorting,
						...item
					}))}
					disabled={!isSorting}
					onSortStart={this.onSortStart}
					onSortEnd={this.onSortEnd}
				/>
			</Fragment>
		)
	}
}
