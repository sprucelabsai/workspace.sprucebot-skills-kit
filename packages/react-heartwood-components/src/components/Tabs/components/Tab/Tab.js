// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'

export type Props = {
	/** Tab text */
	text: string,

	/** Tab icon */
	icon?: string,

	/** Method used to render anchor, if isAnchor is true */
	AnchorComponent?: Node,

	/** Set true if this is the current tab */
	isCurrent?: boolean,

	/** Panel to show when this tab is current */
	panel?: Object,

	/** Optional class */
	className?: string
}

const Tab = ({
	AnchorComponent,
	text,
	icon,
	isCurrent,
	className,
	...rest
}: Props) => {
	return (
		<li className={cx('tab', className)}>
			<Button
				AnchorComponent={AnchorComponent}
				className={cx('tab__inner', {
					'tab--is-current': isCurrent
				})}
				text={text}
				icon={icon}
				{...rest}
			/>
		</li>
	)
}

Tab.defaultProps = {
	isCurrent: false,
	panel: null,
	icon: ''
}

export default Tab
