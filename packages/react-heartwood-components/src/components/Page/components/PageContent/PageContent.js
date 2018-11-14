// @flow
import React from 'react'

export type Props = {
	/** Contents of the Page */
	children: Node
}

const PageContent = (props: Props) => {
	const { children } = props

	return <div className="page__content">{children}</div>
}

export default PageContent
