// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'

export interface Props {
	text: string;
	href: string;
	isCurrent?: boolean;
}

const Tab = (props: Props) => {
	console.log({ props })
	return (
		<li className="tab">
			<Button
				className={cx('tab__inner', {
					'tab--is-current': props.isCurrent
				})}
				text={props.text}
				href={props.href}
			/>
		</li>
	)
}

Tab.defaultProps = {
	isCurrent: false
}

export default Tab
