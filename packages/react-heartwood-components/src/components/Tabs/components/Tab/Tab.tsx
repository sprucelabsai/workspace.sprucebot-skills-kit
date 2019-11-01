import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'
import { IIconProps } from '../../../Icon/Icon'

export interface ITabProps {
	/** Tab text */
	text: string

	/** Tab icon */
	icon?: IIconProps | null

	/** Method used to render anchor, if isAnchor is true */
	AnchorComponent?: Node

	/** Set true if this is the current tab */
	isCurrent?: boolean

	/** Panel to show when this tab is current */
	panel?: Record<string, any>

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
}: ITabProps) => {
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
