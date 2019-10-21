import {
	IHWAction,
	IHWList,
	IHWListHeader,
	IHWListItemTypes
} from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React, { Fragment } from 'react'
import ExpandableListItem, {
	IExpandableListItemProps
} from './components/ExpandableListItem/ExpandableListItem'
import ListHeader, {
	IListHeaderProps
} from './components/ListHeader/ListHeader'
import ListItem, { IListItemProps } from './components/ListItem/ListItem'

export type IWrappedItemProps = IListItemProps | IExpandableListItemProps

export interface IListProps extends Omit<IHWList, 'id' | 'header' | 'items'> {
	/** optional id for view caching */
	id?: string

	/** List Header */
	header?: IListHeaderProps | IHWListHeader | null

	/** List items */
	items?: Array<IWrappedItemProps | IHWListItemTypes> | null

	/** Class for the list */
	className?: string

	/** any passthrough to render in the body of the list */
	children?: React.ReactNode

	/** Is this whole list in a loading state? Sets all list items to loading only if true. */
	isLoading?: boolean

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

export const ListWrapper = (props): React.ReactElement => (
	<div className="list-wrapper">{props.children}</div>
)

const List = (props: IListProps): React.ReactElement => {
	const {
		header,
		items,
		className,
		isSmall,
		areSeparatorsVisible: areSeparatorsVisibleProp,
		children,
		selectableType,
		isLoading,
		onAction
	} = props

	// seperators a true by default
	const areSeparatorsVisible =
		typeof areSeparatorsVisibleProp === 'boolean'
			? areSeparatorsVisibleProp
			: true

	const parentClass = cx('list', className, {
		'list-small': isSmall,
		'list--separators-hidden': !areSeparatorsVisible,
		'loading-placeholder': isLoading
	})

	return (
		<Fragment>
			{header && <ListHeader isSmall={isSmall} {...header} />}
			<ul className={parentClass}>
				{items &&
					items.map((item, idx) => {
						const listItem = item as IListItemProps
						const expandablListItem = item as IExpandableListItemProps

						if (listItem.title) {
							return (
								<ListItem
									key={listItem.id}
									selectableType={
										typeof listItem.selectableType === 'string'
											? listItem.selectableType
											: selectableType
									}
									{...listItem}
									isSeparatorVisible={
										typeof listItem.isSeparatorVisible === 'boolean'
											? listItem.isSeparatorVisible
											: areSeparatorsVisible
									}
									onAction={onAction}
								/>
							)
						}
						return (
							<ExpandableListItem
								key={idx}
								{...expandablListItem}
								onAction={onAction}
							/>
						)
					})}
				{children && children}
			</ul>
		</Fragment>
	)
}

List.defaultProps = {
	header: null,
	className: '',
	isSmall: false,
	areSeparatorsVisible: true
}

export default List
