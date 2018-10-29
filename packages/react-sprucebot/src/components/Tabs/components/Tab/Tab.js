// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'

export type Props = {
	text: string,
	isCurrent?: boolean,
	panel?: Object
}

const Tab = (props: Props) => {
	const { text, isCurrent, ...rest } = props
	return (
		<li className="tab">
			<Button
				className={cx('tab__inner', {
					'tab--is-current': props.isCurrent
				})}
				text={props.text}
				{...rest}
			/>
		</li>
	)
}

Tab.defaultProps = {
	isCurrent: false,
	panel: null
}

export default Tab
