// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import {
	SortableContainer,
	SortableElement,
	arrayMove
} from 'react-sortable-hoc'
import ListHeader from '../ListHeader/ListHeader'
import ListItem from '../ListItem/ListItem'
import { Props as ListProps } from '../../List'

type Props = ListProps
type State = {
	isSorting: boolean
}
const SortableItem = SortableElement(({ item }) => <ListItem {...item} />)
const SortableList = SortableContainer(({ items, parentClass, disabled }) => {
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
})

const headerActions = ({
	isSorting,
	onClickToggle,
	onClickCancel,
	onClickConfirm
}) => {
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

export default class SortableComponent extends Component<Props, State> {
	state = {
		items: this.props.items,
		isSorting: false
	}

	toggleSorting = () => {
		this.setState(prevState => ({
			isSorting: !prevState.isSorting
		}))
	}

	onCancel = () => {
		this.setState({
			items: this.props.items,
			isSorting: false
		})
	}

	onCofirm = () => {
		this.setState({
			isSorting: false
		})
		// Do other stuff with the API to save changes
	}

	onSortStart = () => {
		//
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex)
		})
	}

	render() {
		const { isSorting } = this.state
		const { header, items, className, isSmall } = this.props
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
							onClickConfirm: this.toggleSorting,
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
