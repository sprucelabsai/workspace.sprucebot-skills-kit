// @flow
import React from 'react'
import cx from 'classnames'

type Props = {
	/** Unique identifier */
	id: string,

	/** Optional class */
	className: string,

	/** Text after the toggle */
	postText: string
}

const Toggle = (props: Props) => {
	const { id, className, postText, ...rest } = props
	const parentClass = cx('toggle__wrapper', className)
	return (
		<div className={parentClass}>
			<div className="toggle">
				<input className="toggle__input" type="checkbox" id={id} {...rest} />
				<label className="toggle__label" htmlFor={id} />
			</div>
			{postText && (
				<label className="toggle__text" htmlFor={id}>
					{postText}
				</label>
			)}
		</div>
	)
}

export default Toggle
