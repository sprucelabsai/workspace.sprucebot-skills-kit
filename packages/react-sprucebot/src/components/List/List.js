// @flow
import React, { Fragment } from 'react'
import cx from 'classnames'
import ListHeader, {
	Props as ListHeaderProps
} from './components/ListHeader/ListHeader'
import ListItem, {
	Props as ListItemProps
} from './components/ListItem/ListItem'

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
			{header && <ListHeader {...header} />}
			<ul className={parentClass}>
				{items.map((item, idx) => (
					<ListItem key={idx} {...item} />
				))}
			</ul>
		</Fragment>
	)
}

List.defaultProps = {
	header: {},
	className: '',
	isSmall: false
}

export default List
