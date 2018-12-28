// @flow
import React from 'react'
import is from 'is_js'
import cx from 'classnames'
import Link from 'next/link'
import type { Props as LinkProps } from 'next/link'
import type { Props as ButtonProps } from '../../../Button/Button'
import type { Props as TabsProps } from '../../../Tabs/Tabs'
import Icon from '../../../Icon/Icon'
import Button from '../../../Button/Button'
import Tabs from '../../../Tabs/Tabs'
import BackIcon from '../../../../../static/assets/icons/ic_keyboard_arrow_left.svg'

export type PageHeaderProps = {
	/** Title of the Page */
	title?: string,

	/** Optional back link href. Outputs next Link if relative, otherwise outputs anchor */
	backLinkHref?: string,

	/** Optional function to handle back click */
	onClickBack?: Function,

	/** Back link text */
	backLinkText?: string,

	/** Props for Next router link: https://nextjs.org/docs/#routing. */
	linkProps?: LinkProps,

	/** Adds a button to the page header for its primary action. */
	primaryAction?: ButtonProps,

	/** Adds tabbed navigation for subviews */
	tabs?: TabsProps,

	/** Set true to add a border to the page header */
	hasBottomBorder?: boolean
}

const PageHeader = (props: PageHeaderProps) => {
	const {
		title,
		backLinkHref,
		onClickBack,
		backLinkText,
		linkProps,
		primaryAction,
		tabs,
		hasBottomBorder
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
				<Link href={backLinkHref} {...linkProps}>
					<a className={backLinkClass}>
						{backIcon}
						{backLinkText}
					</a>
				</Link>
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
			className={cx('page__header', {
				'page__header--has-bottom-border': hasBottomBorder,
				'page__header--has-tabs': tabs && tabs.length > 0
			})}
		>
			<div className="page__header-inner">
				{anchor && anchor}
				<div className="page__header-main">
					<h1>{title}</h1>
					{primaryAction && <Button {...primaryAction} />}
				</div>
			</div>
			{tabs && tabs.length > 0 && (
				<Tabs className="page__header-tabs" tabs={tabs} />
			)}
		</header>
	)
}

PageHeader.defaultProps = {
	title: '',
	backLinkText: 'Back',
	backLinkHref: '',
	primaryAction: null,
	hasBottomBorder: false,
	tabs: []
}

export default PageHeader
