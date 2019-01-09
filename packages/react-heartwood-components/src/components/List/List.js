// @flow
import React, { Fragment } from 'react'
import type { Node } from 'react'
import cx from 'classnames'
import ListHeader from './components/ListHeader/ListHeader'
import ListItem from './components/ListItem/ListItem'
import PermissionsListItem from './components/PermissionsListItem/PermissionsListItem'
import type { Props as ListHeaderProps } from './components/ListHeader/ListHeader'
import type { Props as ListItemProps } from './components/ListItem/ListItem'

export const ListWrapper = (props: { children: Node }) => (
	<div className="list-wrapper">{props.children}</div>
)

export type Props = {
	/** List Header */
	header?: ?ListHeaderProps,

	/** List items */
	items: Array<ListItemProps>,

	/** Class for the list */
	className?: string,

	/** Set true to make the list smaller */
	isSmall?: boolean,

	/**  Set true to use PermissionsListItem */
	isPermissionsList?: boolean
}

const List = (props: Props) => {
	const { header, items, className, isSmall, isPermissionsList } = props
	const parentClass = cx('list', className, { 'list-small': isSmall })

	return (
		<Fragment>
			{header && <ListHeader isSmall={isSmall} {...header} />}
			<ul className={parentClass}>
				{items.map((item, idx) =>
					isPermissionsList ? (
						<PermissionsListItem key={idx} {...item} />
					) : (
						<ListItem key={idx} {...item} />
					)
				)}
			</ul>
		</Fragment>
	)
}

List.defaultProps = {
	header: null,
	className: '',
	isSmall: false,
	isPermissionsList: false
}

export default List
