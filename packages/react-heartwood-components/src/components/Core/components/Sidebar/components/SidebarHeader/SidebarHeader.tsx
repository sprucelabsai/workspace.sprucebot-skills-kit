import React from 'react'
import SidebarSection from '../SidebarSection/SidebarSection'
import Button, { IButtonProps } from '../../../../../Button/Button'
import Text from '../../../../../Text/Text'

interface ISidebarHeaderProps {
	/** The title to show in the sidebar header */
	title: string

	/** Optional; callback on close */
	onClose?: () => void

	/** Optional; adds a back arrow and destination */
	onGoBack?: (destination: string) => void
}

const SidebarHeader = (props: ISidebarHeaderProps): React.ReactElement => {
	const { title, onClose, onGoBack } = props

	return (
		<SidebarSection className="sidebar-header">
			<div className="sidebar-header__action-wrapper">
				{onGoBack && (
					<Button icon={{ name: 'arrow_back' }} onClick={onGoBack} isSmall />
				)}
			</div>
			<Text className="sidebar-header__title">{title}</Text>
			<div className="sidebar-header__action-wrapper">
				{onClose && (
					<Button icon={{ name: 'close' }} onClick={onClose} isSmall />
				)}
			</div>
		</SidebarSection>
	)
}

export default SidebarHeader
