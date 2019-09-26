import { IHWRadio } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React from 'react'
import RadioIconYes from '../../../../../static/assets/icons/ic_radio_button_checked.svg'
import RadioIconNo from '../../../../../static/assets/icons/ic_radio_button_unchecked.svg'

export interface IRadioProps extends Omit<IHWRadio, 'id'> {
	/** optional id for the radio */
	id?: string

	/** Parent class */
	className?: string

	/** Change handler */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio = (props: IRadioProps): React.ReactElement => {
	const {
		isChecked,
		className,
		isDisabled,
		id,
		label,
		name,
		onChange,
		postText
	} = props
	const parentClass = cx('checkbox-item', className)
	return (
		<div className={parentClass}>
			<div className="checkbox-item__inner">
				<input
					checked={isChecked || false}
					className="checkbox-item__input"
					disabled={isDisabled || false}
					id={id}
					name={name || undefined}
					onChange={onChange}
					type="radio"
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
