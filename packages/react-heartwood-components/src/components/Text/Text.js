// @flow
import React from 'react'

type Props = {
	children: any
}

export const H1 = (props: Props) => {
	const { children, ...rest } = props
	if (typeof children === 'string') {
		return <h1 {...rest} dangerouslySetInnerHTML={{ __html: children }} />
	}
	return <h1 {...rest}>{props.children}</h1>
}

export const H2 = (props: Props) => {
	const { children, ...rest } = props
	if (typeof children === 'string') {
		return <h2 {...rest} dangerouslySetInnerHTML={{ __html: children }} />
	}
	return <h2 {...rest}>{props.children}</h2>
}

export const H3 = (props: Props) => {
	const { children, ...rest } = props
	if (typeof children === 'string') {
		return <h3 {...rest} dangerouslySetInnerHTML={{ __html: children }} />
	}
	return <h3 {...rest}>{props.children}</h3>
}

export const H4 = (props: Props) => {
	const { children, ...rest } = props
	if (typeof children === 'string') {
		return <h4 {...rest} dangerouslySetInnerHTML={{ __html: children }} />
	}
	return <h4 {...rest}>{props.children}</h4>
}

export const H5 = (props: Props) => {
	const { children, ...rest } = props
	if (typeof children === 'string') {
		return <h5 {...rest} dangerouslySetInnerHTML={{ __html: children }} />
	}
	return <h5 {...rest}>{props.children}</h5>
}

export const H6 = (props: Props) => {
	const { children, ...rest } = props
	if (typeof children === 'string') {
		return <h6 {...rest} dangerouslySetInnerHTML={{ __html: children }} />
	}
	return <h6 {...rest}>{props.children}</h6>
}

export const Text = (props: Props) => {
	const { children, ...rest } = props
	if (typeof children === 'string') {
		return <p {...rest} dangerouslySetInnerHTML={{ __html: children }} />
	}
	return <p {...rest}>{children}</p>
}

export const Span = (props: Props) => {
	const { children, ...rest } = props
	if (typeof children === 'string') {
		return <span {...rest} dangerouslySetInnerHTML={{ __html: children }} />
	}
	return <span {...rest}>{children}</span>
}

export const Anchor = (props: Props) => {
	const { children, ...rest } = props
	if (typeof children === 'string') {
		return <a {...rest} dangerouslySetInnerHTML={{ __html: children }} />
	}
	return <a {...rest}>{children}</a>
}
