// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'

export type Props = {
	/** Tab text */
	text: string,

	/** Should tab be displayed as an anchor, rather than a button? */
	isAnchor?: boolean,

	/** Method used to render anchor, if isAnchor is true */
	AnchorComponent?: Function,

	/** Set true if this is the current tab */
	isCurrent?: boolean,

	/** Panel to show when this tab is current */
	panel?: Object,

	/** Optional class */
	className?: string
}

const DefaultAnchor = ({ className, text, href, target }) => (
	<a className={className} href={href} target={target}>
		{text}
	</a>
)

const Tab = ({
	isAnchor,
	AnchorComponent = DefaultAnchor,
	text,
	isCurrent,
	className,
	...rest
}: Props) => {
	const tabActionElementClassNames = cx('tab__inner', {
		'tab--is-current': isCurrent
	})

	return (
		<li className={cx('tab', className)}>
			{isAnchor ? (
				<AnchorComponent
					className={tabActionElementClassNames}
					text={text}
					{...rest}
				/>
			) : (
				<Button className={tabActionElementClassNames} text={text} {...rest} />
			)}
		</li>
	)
}

Tab.defaultProps = {
	isCurrent: false,
	panel: null
}

export default Tab
