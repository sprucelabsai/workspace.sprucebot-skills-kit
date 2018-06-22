import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

const I = styled.i.attrs({
	className: ({ className }) => `Icon icon ${className || ''}`
})`
	font-family: 'Material Icons';
	font-weight: normal;
	font-style: normal;
	font-size: 1em;
	display: inline-block;
	height: 1em;
	line-height: 1;
	opacity: 0;
	text-transform: none;
	letter-spacing: normal;
	word-wrap: normal;
	white-space: nowrap;
	width: 1em;
	direction: ltr;
	/* Support for all WebKit browsers. */
	-webkit-font-smoothing: antialiased;
	/* Support for Safari and Chrome. */
	text-rendering: optimizeLegibility;
	/* Support for Firefox. */
	-moz-osx-font-smoothing: grayscale;
	/* Support for IE. */
	font-feature-settings: 'liga';

	.wf-active & {
		opacity: 1;
	}
`

const Icon = ({ children, ...props }) => <I {...props}>{children}</I>

Icon.propTypes = {
	color: PropTypes.string
}

export default Icon
