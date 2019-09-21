import React from 'react'
import cx from 'classnames'
import { IHWToggle } from '@sprucelabs/spruce-types'

export interface IToggleProps extends IHWToggle {
	/** optional class name applied to the toggle */
	className?: string
}

const Toggle = (props: IToggleProps): React.ReactElement => {
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
