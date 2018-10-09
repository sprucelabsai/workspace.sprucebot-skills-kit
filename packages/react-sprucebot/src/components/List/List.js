// @flow
import React, { Fragment } from 'react'
import cx from 'classnames'
import ListHeader, {
	Props as ListHeaderProps
} from './components/ListHeader/ListHeader'
import ListItem, {
	Props as ListItemProps
} from './components/ListItem/ListItem'

export const ListWrapper = (props: { children: React.Node }) => (
	<div className="list-wrapper">{props.children}</div>
)

export interface Props {
	header?: ListHeaderProps;
	items: Array<ListItemProps>;
	className?: string;
	isSmall?: boolean;
}

const List = (props: Props) => {
	const { header, items, className, isSmall } = props
	const parentClass = cx('list', className, { 'list-small': isSmall })

	return (
		<Fragment>
			{header && <ListHeader isSmall={isSmall} {...header} />}
			<ul className={parentClass}>
				{items.map((item, idx) => (
					<ListItem key={idx} {...item} />
				))}
			</ul>
		</Fragment>
	)
}

List.defaultProps = {
	header: null,
	className: '',
	isSmall: false
}

export default List
