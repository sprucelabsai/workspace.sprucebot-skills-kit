// @flow
import React from 'react'
import is from 'is_js'
import cx from 'classnames'
import Link from 'next/link'
import type { Props as LinkProps } from 'next/link'
import type { Props as ButtonProps } from '../../../Button/Button'
import Icon from '../../../Icon/Icon'
import Button from '../../../Button/Button'
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
			className={cx('page__header', 'debug-layout', {
				'page__header--has-bottom-border': hasBottomBorder
			})}
		>
			{anchor && anchor}
			{/* <a className="page__header-back-link" href="#">
            <?xml version="1.0" encoding="utf-8"?>
        <svg className="page__header-back-link-icon" version=" 1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
    
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.842 13.825L9.02533 10L12.842 6.175L11.667 5L6.66699 10L11.667 15L12.842 13.825Z" />
        </svg>Previous Page</a> */}
			<h1>{title}</h1>
			{primaryAction && <Button {...primaryAction} />}
		</header>
	)
}

PageHeader.defaultProps = {
	title: '',
	backLinkText: 'Back',
	backLinkHref: '',
	primaryAction: null,
	hasBottomBorder: false
}

export default PageHeader
