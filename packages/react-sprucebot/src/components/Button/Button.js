import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader/Loader'

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
		if (this.props.onClick) {
			this.props.onClick(e)
		} else if (this.props.href) {
			e.preventDefault()
			this.setState({ busy: true })
			const url = this.props.href
			if (/^http/.test(url)) {
				// If the href is a full domain name
				if (this.props.target) {
					window.open(url, this.props.target)
				} else {
					window.open(url, '_self')
				}
			} else {
				// Relative url
				if (this.props.target) {
					window.open(url, this.props.target)
				} else if (this.props.router) {
					this.props.router.push(url)
				} else {
					window.open(url, '_self')
				}
			}

			// Reset the state to not-busy if it's been 10 sec
			// is there a reason for this?
			setTimeout(() => {
				this.setState({ busy: false })
			}, 10000)
		}
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
		} else if (!btnClass) {
			btnClass = 'btn'
		}

		// if this button has a href or is a "remove" button, make it an anchor
		const Tag = props.href || remove ? 'a' : tag

		return (
			<Tag
				className={`${btnClass} ${className || ''}`}
				onClick={this.onClick}
				{...props}
			>
				{busy && !hideLoader ? (
					<Loader
						dark={loaderDark ? true : false}
						fullWidth={false}
						loaderStyle={loaderStyle}
					/>
				) : (
					children
				)}
			</Tag>
		)
	}
}

Button.propTypes = {
	tag: PropTypes.string,
	primary: PropTypes.bool,
	alt: PropTypes.bool,
	secondary: PropTypes.bool,
	caution: PropTypes.bool,
	busy: PropTypes.bool,
	href: PropTypes.string,
	remove: PropTypes.bool,
	toggle: PropTypes.bool,
	hideLoader: PropTypes.bool
}

Button.defaultProps = {
	tag: 'button',
	primary: false,
	alt: false,
	secondary: false,
	busy: false,
	remove: false,
	toggle: false
}
