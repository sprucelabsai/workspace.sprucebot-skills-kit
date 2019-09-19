import React from 'react'
import cx from 'classnames'
import RadioIconYes from '../../../../../static/assets/icons/ic_radio_button_checked.svg'
import RadioIconNo from '../../../../../static/assets/icons/ic_radio_button_unchecked.svg'
import { IHWRadio } from '@sprucelabs/spruce-types'

export interface IRadioProps extends Omit<IHWRadio, 'id'> {
	/** optional id for the radio */
	id?: string

	/** Parent class */
	className?: string
}

const Radio = (props: IRadioProps): React.ReactElement => {
	const { id, label, postText, className, name, disabled } = props
	const parentClass = cx('checkbox-item', className)
	return (
		<div className={parentClass}>
			<div className="checkbox-item__inner">
				<input
					className="checkbox-item__input"
					type="radio"
					id={id}
					name={name}
					disabled={disabled || false}
				/>
				<label className="checkbox-item__label" htmlFor={id}>
					{label}
				</label>
				<div className="checkbox-item__icons">
					<RadioIconYes className="checkbox-item__icon checkbox-item__icon-yes" />
					<RadioIconNo className="checkbox-item__icon checkbox-item__icon-no" />
				</div>
			</div>
			{postText && <p className="checkbox-item__post-text">{postText}</p>}
		</div>
	)
}

export default Radio
