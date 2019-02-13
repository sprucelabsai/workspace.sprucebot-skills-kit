// @flow
import React from 'react'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import type { Props as ButtonProps } from '../Button/Button'

export type Props = {
	/** Headline text to be displayed */
	headline: string,

	/** Subheadline text to be displayed (optional) */
	subheadline?: string,

	/** Primary icon to be displayed above the headline (optional) */
	icon?: string,

	/** Primary icon as line art (optional) */
	isLineIcon?: boolean,

	/** Primary action in the footer (optional) */
	primaryAction?: { ...ButtonProps },

	/** Primary action in the footer (optional) */
	primaryActionButtonKind?: string,

	/** Primary action in the footer (optional) */
	primaryActionButtonIcon?: string
}

const EmptyState = (props: Props) => {
	const {
		headline,
		subheadline,
		icon,
		isLineIcon,
		primaryAction,
		primaryActionButtonKind,
		primaryActionButtonIcon
	} = props

	return (
		<div className="empty-state">
			{icon && (
				<span className="empty-state__icon">
					<Icon icon={icon} isLineIcon={isLineIcon || true} />
				</span>
			)}
			<h3 className="empty-state__headline">{headline}</h3>
			{subheadline && (
				<div className="empty-state__subheadline">{subheadline}</div>
			)}
			{primaryAction && (
				<Button
					icon={
						primaryActionButtonIcon
							? { name: primaryActionButtonIcon, className: `btn__line-icon` }
							: null
					}
					kind={primaryActionButtonKind || `simple`}
					{...primaryAction}
				/>
			)}
		</div>
	)
}

EmptyState.defaultProps = {
	headline: 'Data not available'
}

export default EmptyState
