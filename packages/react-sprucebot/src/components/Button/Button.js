import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Loader from '../Loader/Loader'
import SingletonRouter from 'next/router'
import Link from 'next/link'

const ButtonWrapper = styled.div`
	display: flex;
	width: 50%;
	${props => props.left && `padding-right: 1.125em;`};
	${props => props.right && `padding-left: 1.125em;`};
`

const StyledButton = styled.button`
	${props =>
		props.busy ||
		(props.disabled &&
			`
			pointer-events: none;
			cursor: not-allowed;
		`)};
`

const StyledAnchor = styled.a`
	${props =>
		props.busy ||
		(props.disabled &&
			`
		pointer-events: none;
		cursor: not-allowed;
	`)};
`

// TODO refactor into styled component
export default class Button extends Component {
	constructor(props) {
		super(props)
		this.state = {
			busy: !!props.busy
		}
	}

	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.busy !== 'undefined') {
			this.setState({
				busy: nextProps.busy
			})
		}
	}

	onClick = e => {
		const { busy } = this.state
		const { disabled, onClick, href, target, router } = this.props

		if (busy || disabled) {
			return
		}

		if (onClick) {
			onClick(e)
		} else if (href) {
			this.setState({ busy: true })
		}
	}

	renderView = () => {
		const { busy } = this.state
		const { hideLoader, loaderDark, loaderStyle, children } = this.props

		if (busy && !hideLoader) {
			return (
				<Loader
					dark={loaderDark ? true : false}
					fullWidth={false}
					loaderStyle={loaderStyle}
				/>
			)
		}
		return children
	}

	render() {
		const {
			tag,
			disabled,
			primary,
			secondary,
			alt,
			link,
			caution,
			className,
			children,
			submit,
			remove,
			toggle,
			router,
			loaderDark,
			loaderStyle,
			busy: propBusy,
			hideLoader,
			left,
			right,
			href,
			...props
		} = this.props

		const { busy } = this.state

		if (primary && secondary) {
			return (
				<button className="btn__primary">
					'primary' and 'secondary' are mutually exclusive.
				</button>
			)
		} else if (primary && alt) {
			return (
				<button className="btn__primary">
					'primary' and 'alt' are mutually exclusive.
				</button>
			)
		}

		let btnClass = primary ? 'btn__primary' : ''
		btnClass += secondary ? 'btn__secondary' : ''
		btnClass += alt && btnClass.length > 0 ? '__alt' : ''
		btnClass += alt && btnClass.length === 0 ? 'btn__alt' : ''
		btnClass += disabled ? ' btn__disabled' : ''
		btnClass += caution ? ' btn__caution' : ''
		btnClass += link ? ' btn__link' : ''
		btnClass += toggle ? 'btn__toggle' : ''

		if (remove) {
			btnClass = 'btn__remove'
		}

		// if this button has a href or is a "remove" button, make it an anchor
		let Tag
		let usingLink = false

		if (href || remove) {
			Tag = SingletonRouter.router ? Link : 'a'
			usingLink = SingletonRouter.router
		} else if (tag === 'button') {
			Tag = StyledButton
		} else {
			Tag = tag
		}

		return (
			<Tag
				className={`btn ${btnClass} ${className || ''}`}
				onClick={usingLink ? null : this.onClick}
				disabled={disabled}
				busy={busy}
				href={href}
				{...props}
			>
				<Fragment>
					{usingLink && (
						<a
							href={href}
							onClick={this.onClick}
							className={`btn ${btnClass} ${className || ''}`}
						>
							<span className="wrapper">{this.renderView()}</span>
						</a>
					)}
					{!usingLink && <span className="wrapper">{this.renderView()}</span>}
				</Fragment>
			</Tag>
		)
	}
}

Button.propTypes = {
	tag: PropTypes.string,
	primary: PropTypes.bool,
	alt: PropTypes.bool,
	secondary: PropTypes.bool,
	busy: PropTypes.bool,
	href: PropTypes.string,
	remove: PropTypes.bool,
	toggle: PropTypes.bool,
	hideLoader: PropTypes.bool,
	left: PropTypes.bool,
	right: PropTypes.bool,
	type: PropTypes.string
}

Button.defaultProps = {
	tag: 'button',
	primary: false,
	alt: false,
	secondary: false,
	busy: false,
	remove: false,
	toggle: false,
	type: 'button'
}
