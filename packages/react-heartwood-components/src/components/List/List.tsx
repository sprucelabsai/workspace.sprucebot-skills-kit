import React, { Fragment } from 'react'
import cx from 'classnames'
import ListHeader, {
	IListHeaderProps
} from './components/ListHeader/ListHeader'
import ListItem, { IListItemProps } from './components/ListItem/ListItem'
import ExpandableListItem, {
	IExpandableListItemProps
} from './components/ExpandableListItem/ExpandableListItem'

export const ListWrapper = (props): React.ReactElement => (
	<div className="list-wrapper">{props.children}</div>
)

export type IWrappedItemProps = IListItemProps | IExpandableListItemProps

export interface IListProps {
	/** List Header */
	header?: IListHeaderProps

	/** List items */
	items?: IWrappedItemProps[]

	/** Class for the list */
	className?: string

	/** Set true to make the list smaller */
	isSmall?: boolean

	/** any passthrough to render in the body of the list */
	children?: React.ReactNode

	/** Set to true to show separators between list items */
	areSeparatorsVisible?: boolean

	/** Optional: set whether to use checkbox or radio for selectable list items */
	selectableType?: 'checkbox' | 'radio'
}

const List = (props: IListProps): React.ReactElement => {
	const {
		header,
		items,
		className,
		isSmall,
		areSeparatorsVisible,
		children,
		selectableType
	} = props
	const parentClass = cx('list', className, {
		'list-small': isSmall,
		'list--separators-hidden': !areSeparatorsVisible
	})

	return (
		<Fragment>
			{header && <ListHeader isSmall={isSmall} {...header} />}
			<ul className={parentClass}>
				{items &&
					items.map((item, idx) => {
						if (item.isExpandable) {
							const expndableItem = item as IExpandableListItemProps
							return <ExpandableListItem key={idx} {...expndableItem} />
						}

						const listItem = item as IListItemProps
						return (
							<ListItem
								key={idx}
								selectableType={selectableType}
								isSeparatorVisible={areSeparatorsVisible}
								{...listItem}
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
