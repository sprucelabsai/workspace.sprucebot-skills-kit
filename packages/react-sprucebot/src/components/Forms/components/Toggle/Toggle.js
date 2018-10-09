// @flow
import React from 'react'
import cx from 'classnames'

type Props = { id: string, className: string, postText: string }

const Toggle = (props: Props) => {
	const { id, className, postText, ...rest } = props
	const parentClass = cx('toggle__wrapper', className)
	return (
		<div className={parentClass}>
			<div className="toggle">
				<input className="toggle__input" type="checkbox" id={id} />
				<label className="toggle__label" for={id} />
			</div>
			{postText && (
				<label className="toggle__text" for={id}>
					{postText}
				</label>
			)}
		</div>
	)
}

export default Toggle
