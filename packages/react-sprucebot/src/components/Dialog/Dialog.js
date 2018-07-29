import React, { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import skill from '../../skillskit/index'
import Measure from 'react-measure'
import Button from '../Button/Button'
import IconButton from '../IconButton/IconButton'
import { H2 } from '../Typography/Typography'
import SK from '../../skillskit'

var dialogUnderlay = null
const currentDialogs = []

const DialogWrapper = styled.div.attrs({
	className: ({ show, className }) => `dialog__wrapper ${className}`
})`
	opacity: ${props => props.opacity};
`

const DialogContainer = styled.div.attrs({
	className: ({ show, className }) => `dialog ${className}`
})`
	opacity: ${props => props.opacity};
`
const DialogCloseButton = styled(Button).attrs({
	className: 'btn__close_dialog',
	remove: true
})``

export default class Dialog extends Component {
	constructor(props) {
		super(props)

		//for callbacks
		this.iframeMessageHandler = this.iframeMessageHandler.bind(this)

		this.state = {
			focusClass: '',
			isHidden: true,
			width: -1,
			height: 500,
			scrollTop: 0,
			firstShow: true,
			opacity: 0,
			inIframe: true,
			dialogIndex: 0
		}
	}

	blur() {
		this.setState({ focusClass: 'blurred' }, () => {
			setTimeout(() => {
				this.setState({ isHidden: true })
			}, 500)
		})
	}

	focus() {
		this.setState({ isHidden: false }, () => {
			setTimeout(() => {
				this.setState({ focusClass: 'focused' }, () => {
					// Resize the skill
					this.postHeight()
				})
			}, 100)
		})
	}

	setSize({ width, height }) {
		this.setState({ width, height })
		this.postHeight()
	}

	setIdx = idx => {
		this.setState({ dialogIndex: idx })
	}

	postHeight() {
		const underlayHeight = dialogUnderlay ? dialogUnderlay.offsetHeight : 0

		//min height on body
		document.body.style.minHeight = `${underlayHeight}px`
	}

	componentWillMount() {
		if (typeof document !== 'undefined' && !dialogUnderlay) {
			dialogUnderlay = document.createElement('div')
			dialogUnderlay.className = 'dialog_underlay'
			document.body.appendChild(dialogUnderlay)
		}
		if (dialogUnderlay) {
			dialogUnderlay.classList.add('on')
		}
	}

	componentDidMount() {
		window.addEventListener('message', this.iframeMessageHandler)
		if (this.props.show && this.state.firstShow) {
			this.requestScroll()
		}

		this.focus()
		currentDialogs.push(this)
		this.updateIndexes()
	}

	updateIndexes = () => {
		const index = currentDialogs.length
		currentDialogs.forEach((dialog, idx) => {
			dialog.blur()
			dialog.setIdx(index - idx)
		})
	}

	componentDidUpdate() {
		// in case our starting state is not showing
		if (this.props.show && this.state.firstShow) {
			this.requestScroll()
		}

		if (!this.state.inIframe) {
			dialogUnderlay.classList.add('not_in_iframe')
		}
	}

	componentWillReceiveProps(nextProps) {
		// if we are being show, set opacity and request scroll
		if (!this.props.show && nextProps.show) {
			this.setState({ firstShow: true, opacity: 0 })
			this.requestScroll()
		}

		if (this.props.show && !nextProps.show) {
			document.body.style.minHeight = `auto`
		}
	}

	componentWillUnmount() {
		document.body.style.minHeight = `auto`
		window.removeEventListener('message', this.iframeMessageHandler)
		currentDialogs.pop()
		if (currentDialogs.length - 1 >= 0) {
			currentDialogs[currentDialogs.length - 1].focus()
		} else {
			dialogUnderlay.classList.remove('on')
		}

		this.updateIndexes()
	}

	requestScroll() {
		SK.requestScroll()
		setTimeout(() => {
			// we are not in the sb iframe
			if (this.state.opacity === 0) {
				this.setState({
					opacity: 1,
					scrollTop: window.document.body.scrollTop,
					firstShow: false,
					inIframe: false
				})
			}
		}, 250)
	}

	iframeMessageHandler(e) {
		try {
			const results = JSON.parse(e.data)
			if (this.state.firstShow && results.name === 'SkillContainer:ScrollTop') {
				const top =
					results.skillScrollTop < 0 ? Math.abs(results.skillScrollTop) : 0
				this.setState({
					scrollTop: top,
					firstShow: false,
					opacity: 1
				})
			}
		} catch (err) {}
	}
	onTapClose() {
		this.setState({ focusClass: '' })
		this.postHeight()
		if (this.props.onTapClose) {
			setTimeout(() => {
				this.props.onTapClose()
			}, 600)
		}
	}
	render() {
		const {
			tag,
			children,
			className,
			title,
			onTapClose,
			show,
			...props
		} = this.props
		const {
			opacity,
			height,
			inIframe,
			focusClass,
			isHidden,
			firstShow,
			dialogIndex
		} = this.state

		const Tag = tag
		const dialogStyle = {
			marginTop: this.state.scrollTop
		}

		if (!show) {
			return null
		}

		const hasHeader = onTapClose || title

		return (
			typeof document !== 'undefined' &&
			ReactDOM.createPortal(
				<Measure
					scroll
					onResize={contentRect => {
						this.setSize({
							width: contentRect.scroll.width,
							height: contentRect.scroll.height
						})
					}}
				>
					{({ measureRef }) => (
						<DialogWrapper
							className={`${focusClass} ${!firstShow ? 'was-focused' : ''} ${
								isHidden ? 'hidden' : ''
							} dialog-${dialogIndex}`}
							show={show}
							style={dialogStyle}
							onClick={e => {
								if (
									e.target.className.search('dialog__wrapper') > -1 &&
									currentDialogs.length - 1 >= 0
								) {
									currentDialogs[currentDialogs.length - 1].onTapClose()
								}
							}}
						>
							<DialogContainer
								innerRef={measureRef}
								className={`${className || ''} ${
									hasHeader ? 'has_header' : ''
								}`}
								show={show}
								opacity={opacity}
								{...props}
							>
								{hasHeader && (
									<div className="dialog__header">
										{title && <H2>{title}</H2>}
										{onTapClose && (
											<IconButton
												className="btn__close_dialog"
												onClick={this.onTapClose.bind(this)}
											>
												close
											</IconButton>
										)}
									</div>
								)}
								{children}
							</DialogContainer>
						</DialogWrapper>
					)}
				</Measure>,
				dialogUnderlay
			)
		)
	}
}

Dialog.propTypes = {
	tag: PropTypes.string,
	show: PropTypes.bool,
	onTapClose: PropTypes.func,
	title: PropTypes.string
}

Dialog.defaultProps = {
	tag: 'div',
	show: true
}
