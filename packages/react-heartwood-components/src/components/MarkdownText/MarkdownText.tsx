import React from 'react'
import ReactMarkdown from 'react-markdown'

export interface IMarkdownText {
	/** Markdown text to be rendered */
	source: string
}

const MarkdownText = (props: IMarkdownText): React.ReactElement => {
	const { source } = props
	return <ReactMarkdown source={source} />
}

export default MarkdownText
