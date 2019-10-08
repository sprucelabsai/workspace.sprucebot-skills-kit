import React, { Fragment } from 'react'
import cx from 'classnames'
import ListHeader, {
	IListHeaderProps
} from './components/ListHeader/ListHeader'
import ListItem, { IListItemProps } from './components/ListItem/ListItem'
import ExpandableListItem, {
	IExpandableListItemProps
} from './components/ExpandableListItem/ExpandableListItem'
import { IHWList } from '@sprucelabs/spruce-types'

export const ListWrapper = (props): React.ReactElement => (
	<div className="list-wrapper">{props.children}</div>
)

export type IWrappedItemProps = IListItemProps | IExpandableListItemProps

export interface IListProps extends Omit<IHWList, 'id' | 'header' | 'items'> {
	/** optional id for view caching */
	id?: string

	/** List Header */
	header?: IListHeaderProps

	/** List items */
	items?: IWrappedItemProps[]

	/** Class for the list */
	className?: string

	/** any passthrough to render in the body of the list */
	children?: React.ReactNode

	/** Is this whole list in a loading state? Sets all list items to loading only if true. */
	isLoading: boolean
}

const List = (props: IListProps): React.ReactElement => {
	const {
		header,
		items,
		className,
		isSmall,
		areSeparatorsVisible: areSeparatorsVisibleProp,
		children,
		selectableType,
		isLoading
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
								/>
							)
						}
						return <ExpandableListItem key={idx} {...expandablListItem} />
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
