import React from 'react'
import ReactMarkdown from 'react-markdown'
import { IHWMarkdown } from '@sprucelabs/spruce-types'

export interface IMarkdownProps extends Omit<IHWMarkdown, 'id'> {
	id?: string
}

const MarkdownText = (
	props: IMarkdownProps | IHWMarkdown
): React.ReactElement => {
	const { source, id } = props
	return (
		<ReactMarkdown className={'markdown-wrapper'} key={id} source={source} />
	)
}

export default MarkdownText
