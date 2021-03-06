import { IHWPageHeader } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import is from 'is_js'
import Link, { LinkProps } from 'next/link'
import React from 'react'
import BackIcon from '../../../../../static/assets/icons/ic_keyboard_arrow_left.svg'
import Button from '../../../Button/Button'
import Icon from '../../../Icon/Icon'
import { ITabProps } from '../../../Tabs/components/Tab/Tab'
import Tabs from '../../../Tabs/Tabs'

export interface IPageHeaderProps extends IHWPageHeader {
	backLinkComponent?: typeof Link

	/** Optional function to handle back click */
	onClickBack?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

	/** Props for Next router link: https://nextjs.org/docs/#routing. */
	linkProps?: LinkProps

	/** Adds tabbed navigation for subviews */
	tabs?: ITabProps[]
}

const PageHeader = (props: IPageHeaderProps) => {
	const {
		backLinkComponent: RelativeBackLinkComponent = Link,
		backLinkHref,
		backLinkText,
		className,
		collapsed = false,
		hasBottomBorder,
		linkProps,
		onClickBack,
		primaryAction,
		sidebarExpander,
		tabs,
		title
	} = props

	const backLinkClass = 'page__header-back-link'
	let anchor

	if (onClickBack || backLinkHref) {
		const backIcon = (
			<span className="page__header-back-link-icon">
				<Icon customIcon={BackIcon} />
			</span>
		)

		if (onClickBack) {
			anchor = (
				<button
					className={cx(backLinkClass, 'btn')}
					type="button"
					onClick={onClickBack}
				>
					{backIcon}
					{backLinkText}
				</button>
			)
		} else if (backLinkHref) {
			// Check if the link is relative (client-side) or absolute
			let linkIsRelative = true
			if (backLinkHref && is.url(backLinkHref)) {
				linkIsRelative = false
			}
			// Only return a Next link if the href is relative
			anchor = linkIsRelative ? (
				<RelativeBackLinkComponent href={backLinkHref} {...linkProps}>
					<a className={backLinkClass}>
						{backIcon}
						{backLinkText}
					</a>
				</RelativeBackLinkComponent>
			) : (
				<a href={backLinkHref} className={backLinkClass}>
					{backIcon}
					{backLinkText}
				</a>
			)
		}
	}

	return (
		<header
			className={cx(
				'page__header',
				{
					'page__header--is-collapsed': collapsed
				},
				className
			)}
		>
			<div
				className={cx('page__header-inner', {
					'page__header-inner--is-collapsed': collapsed
				})}
			>
				{anchor && anchor}
				<div
					className={cx('page__header-main', {
						'page__header-main--has-bottom-border': hasBottomBorder
					})}
				>
					<div className="page__header-title-wrapper">
						<h1>{title}</h1>
						<div>
							{sidebarExpander && (
								<Button
									{...sidebarExpander}
									isSmall
									className="page__header-sidebar-btn"
								/>
							)}
							{primaryAction && <Button {...primaryAction} />}
						</div>
					</div>
				</div>
			</div>
			{tabs && tabs.length > 0 && (
				<Tabs isPadded={false} className="page__header-tabs" tabs={tabs} />
			)}
		</header>
	)
}

PageHeader.displayName = 'Page.Header'
PageHeader.defaultProps = {
	title: '',
	backLinkText: 'Back',
	backLinkHref: '',
	primaryAction: null,
	hasBottomBorder: false,
	tabs: []
}

export default PageHeader
