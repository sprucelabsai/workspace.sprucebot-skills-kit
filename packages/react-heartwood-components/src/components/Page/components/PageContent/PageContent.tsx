import React from 'react'

export type Props = {
	/** Contents of the Page */
	children: React.ReactNode
}

const PageContent = (props: Props) => {
	const { children } = props

	return <div className="page__content">{children}</div>
}

PageContent.displayName = 'Page.Content'

export default PageContent
