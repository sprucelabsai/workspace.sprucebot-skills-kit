import { IHWPage } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React from 'react'
import PageContent from './components/PageContent/PageContent'
import PageHeader, {
	IPageHeaderProps
} from './components/PageHeader/PageHeader'

interface IPageProps extends IHWPage {
	/** Should be Card Header, Card Body, and Card Footer, unless using the card background for styling only. */
	children: React.ReactNode

	/** Page header props */
	header?: IPageHeaderProps

	/** Contents injected into page sidebar */
	sidebar?: React.ReactNode
}

export const Page = (props: IPageProps) => {
	const {
		children,
		isCentered,
		hasHeader,
		className,
		header,
		sidebarIsCollapsed,
		sidebar,
		...rest
	} = props
	return (
		<div
			{...rest}
			className={cx('page', className, {
				'page--centered': isCentered,
				'page--no-header': !hasHeader,
				'page--sidebar-is-collapsed': sidebarIsCollapsed
			})}
		>
			<div className={'page__content-container'}>
				{header && <PageHeader {...header} />}
				{children}
			</div>
			{sidebar && <div className={'page__sidebar'}>{sidebar}</div>}
		</div>
	)
}

Page.Header = PageHeader
Page.Content = PageContent

Page.defaultProps = {
	isCentered: false,
	hasHeader: true,
	header: null,
	sidebarIsCollapsed: false
}

export default Page
