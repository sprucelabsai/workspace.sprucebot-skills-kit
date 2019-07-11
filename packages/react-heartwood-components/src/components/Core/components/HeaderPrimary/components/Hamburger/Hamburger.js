// @flow
import React from 'react'
import MenuIcon from '../../../../../../../static/assets/icons/ic_menu.svg'
import CloseIcon from '../../../../../../../static/assets/icons/ic_close.svg'

type Props = {
	/** Set true when the sidebar is visible */
	isSidebarVisible: boolean,

	/** Click handler to toggle sidebar visibility */
	onClick: Function
}

const Hamburger = (props: Props) => {
	const { isSidebarVisible, onClick } = props
	return (
		<button className="hamburger btn" type="button" onClick={onClick}>
			{isSidebarVisible ? (
				<CloseIcon className="hamburger__icon" />
			) : (
				<MenuIcon className="hamburger__icon" />
			)}
		</button>
	)
}

export default Hamburger
