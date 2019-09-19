import React from 'react'
import ReactMarkdown from 'react-markdown'
import { IHWMarkdown } from '@sprucelabs/spruce-types'

export interface IMarkdownProps extends IHWMarkdown {}

const MarkdownText = (props: IMarkdownProps): React.ReactElement => {
	const { source, id } = props
	return <ReactMarkdown key={id} source={source} />
}

export default MarkdownText
