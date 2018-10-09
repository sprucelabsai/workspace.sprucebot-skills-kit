// @flow
import React from 'react'
import Button from '../../../../../Button/Button'
import MenuIcon from '../../../../../../../static/assets/icons/ic_menu.svg'
import CloseIcon from '../../../../../../../static/assets/icons/ic_close.svg'

type Props = {
	isMenuVisible: boolean,
	onClick: Function
}

const Hamburger = (props: Props) => {
	const { isMenuVisible, onClick } = props
	return (
		<button className="hamburger btn" type="button" onClick={onClick}>
			{isMenuVisible ? (
				<CloseIcon className="hamburger__icon" />
			) : (
				<MenuIcon className="hamburger__icon" />
			)}
		</button>
	)
}

export default Hamburger
