import { IHWLayout, IHWLayoutWidth } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React from 'react'
import LayoutSection from './components/LayoutSection/LayoutSection'

interface ILayoutProps extends IHWLayout {
	/** Contents of the Layout. Should be LayoutSection components */
	children?: React.ReactNode
}

const Layout = (props: ILayoutProps) => {
	const {
		children,
		isCentered,
		isFullBleed,
		width,
		className,
		sections
	} = props

	return (
		<div
			className={cx('layout', className, {
				'layout--centered': isCentered,
				'layout--wide': width === IHWLayoutWidth.Wide,
				'layout--tight': width === IHWLayoutWidth.Tight,
				'layout--full-width': width === IHWLayoutWidth.FullWidth,
				'layout--full-bleed': isFullBleed
			})}
		>
			{children}
			{sections &&
				sections.map((section, idx) => (
					<LayoutSection key={`section-${idx}`} {...section} />
				))}
		</div>
	)
}

Layout.Section = LayoutSection

Layout.defaultProps = {
	isCentered: false,
	width: IHWLayoutWidth.Base,
	isFullBleed: false
}

export default Layout
