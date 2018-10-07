// @flow
import React, { Component, Fragment } from 'react'
import Loader from '../Loader/Loader'
import SingletonRouter from 'next/router'
import Link from 'next/link'

import type { Node } from 'react'

type Props = {
	tag?: string,
	primary?: boolean,
	alt?: boolean,
	secondary?: boolean,
	busy?: boolean,
	href?: string,
	remove?: boolean,
	toggle?: boolean,
	hideLoader?: boolean,
	left?: boolean,
	right?: boolean,
	type?: string,
	disabled?: any,
	onClick?: any,
	target?: any,
	router?: any,
	loaderDark?: boolean,
	loaderStyle?: string,
	children?: Node,
	link?: any,
	caution?: boolean,
	className?: string,
	submit?: any
}

type State = {
	busy: boolean
}
export default class Button extends Component<Props, State> {
	static defaultProps = {
		tag: 'button',
		primary: false,
		alt: false,
		secondary: false,
		busy: false,
		remove: false,
		toggle: false,
		type: 'button'
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			busy: !!props.busy
		}
	}

	componentWillReceiveProps(nextProps: Props) {
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
		} else if (href && (!target || target === 'self')) {
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
			type,
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
			Tag = 'button'
		} else {
			Tag = tag
		}

		if (usingLink) {
			return (
				<Link href={href} {...props}>
					<a
						onClick={this.onClick}
						className={`btn ${btnClass} ${className || ''}`}
					>
						<span className="wrapper">{this.renderView()}</span>
					</a>
				</Link>
			)
		}

		return (
			<Tag
				className={`btn ${btnClass} ${className || ''}`}
				onClick={this.onClick}
				disabled={disabled}
				busy={busy}
				href={href}
				{...props}
				type={type}
			>
				<span className="wrapper">{this.renderView()}</span>
			</Tag>
		)
	}
}
