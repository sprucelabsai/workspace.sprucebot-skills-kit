import React, { Fragment } from 'react'
import cx from 'classnames'
import ListHeader, {
	IListHeaderProps
} from './components/ListHeader/ListHeader'
import ListItem, { IListItemProps } from './components/ListItem/ListItem'
import ExpandableListItem from './components/ExpandableListItem/ExpandableListItem'

export const ListWrapper = (props: {
	children: React.ReactElement
}): React.ReactElement => <div className="list-wrapper">{props.children}</div>

export interface IWrappedItemProps extends IListItemProps {
	/** Optional; Set true to render an expandable item */
	isExpandable?: boolean
}

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
							return <ExpandableListItem key={idx} item={item} {...item} />
						}
						return (
							<ListItem
								key={idx}
								selectableType={selectableType}
								isSeparatorVisible={areSeparatorsVisible}
								{...item}
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
