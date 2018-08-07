import React, { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import skill from '../../skillskit/index'
import Button from '../Button/Button'
import IconButton from '../IconButton/IconButton'
import { H2 } from '../Typography/Typography'
import SK from '../../skillskit'

var dialogUnderlay = null
const currentDialogs = []
const dialogVerticalPadding = 30

const DialogWrapper = styled.div.attrs({
	className: ({ className }) => `dialog__wrapper ${className}`
})`
	opacity: ${props => props.opacity};
`

const DialogContainer = styled.div.attrs({
	className: ({ className }) => `dialog ${className}`
})`
	opacity: ${props => props.opacity};
`
const DialogCloseButton = styled(Button).attrs({
	className: 'btn__close_dialog',
	remove: true
})``

let timerRunning = false

export default class Dialog extends Component {
	dialogHeight = 0

	constructor(props) {
		super(props)

		//for callbacks
		this.iframeMessageHandler = this.iframeMessageHandler.bind(this)

		this.state = {
			focusClass: '',
			isHidden: true,
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
					setTimeout(() => {
						this.postHeight()
					}, 500)
				})
			}, 10)
		})
	}

	setIdx = idx => {
		this.setState({ dialogIndex: idx })
	}

	postHeight() {
		let height = 0

		currentDialogs.forEach(dialog => {
			const node = ReactDOM.findDOMNode(dialog.dialogNode)
			const styles = window.getComputedStyle(node)
			const margin = parseFloat(styles['marginTop'])

			const dialogHeight = Math.ceil(node.offsetHeight + margin)
			height = Math.max(dialogHeight, height)
		})

		if (currentDialogs.length > 0) {
			SK.setMinBodyHeight(height)
		}
	}

	componentWillMount() {
		if (typeof document !== 'undefined' && !dialogUnderlay) {
			dialogUnderlay = document.createElement('div')
			dialogUnderlay.className = 'dialog_underlay'
			dialogUnderlay.classList.add('hidden')
			document.body.appendChild(dialogUnderlay)
		}
		if (dialogUnderlay) {
			dialogUnderlay.classList.add('on')
			setTimeout(() => {
				dialogUnderlay.classList.remove('hidden')
			}, 10)
		}
	}

	componentDidMount() {
		window.addEventListener('message', this.iframeMessageHandler)
		if (this.state.firstShow) {
			this.requestScroll()
		}

		this.focus()
		currentDialogs.push(this)
		this.updateIndexes()
		SK.showUnderlay()

		if (!timerRunning) {
			timerRunning = true
			this.heightInterval = setInterval(() => {
				if (currentDialogs[0]) {
					currentDialogs[0].postHeight()
				}
			}, 300)
		}
	}

	updateIndexes = () => {
		const index = currentDialogs.length
		currentDialogs.forEach((dialog, idx) => {
			if (idx < index - 1) {
				dialog.blur()
			}
			dialog.setIdx(index - idx)
		})
	}

	componentDidUpdate() {
		// in case our starting state is not showing
		if (this.state.firstShow) {
			this.requestScroll()
		}

		if (!this.state.inIframe) {
			dialogUnderlay.classList.add('not_in_iframe')
		}
	}

	componentWillUnmount() {
		document.body.style.minHeight = `auto`
		window.removeEventListener('message', this.iframeMessageHandler)
		this.closeDialog()

		if (this.heightInterval) {
			clearInterval(this.heightInterval)
			timerRunning = false
		}
	}

	requestScroll() {
		// we are not in the sb iframe
		if (window.top === window.self) {
			this.setState({
				opacity: 1,
				scrollTop: window.document.body.scrollTop,
				firstShow: false,
				inIframe: false
			})
		} else {
			SK.requestScroll()
		}
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
	handleTapClose = () => {
		// because dialogs are shown/hidden by being conditionally rendered, we actually have no way of knowing how we should close unless someone tells us
		if (this.props.onTapClose) {
			this.closeDialog()
			this.setState({ focusClass: 'closed', opacity: 0 }, () => {
				if (this.props.onTapClose) {
					setTimeout(() => {
						this.props.onTapClose()
					}, 500)
				}
			})
		}
	}

	closeDialog() {
		if (this.state.focusClass !== 'closed') {
			currentDialogs.pop()
			if (currentDialogs.length - 1 >= 0) {
				const nextDialog = currentDialogs[currentDialogs.length - 1]
				nextDialog.focus()
				let node = ReactDOM.findDOMNode(this.dialogNode)
				SK.scrollTo(node.offsetTop - dialogVerticalPadding)
			} else {
				dialogUnderlay.classList.add('hidden')
				SK.hideUnderlay()
				setTimeout(() => {
					SK.clearMinBodyHeight()
					dialogUnderlay.classList.remove('on')
				}, 300)
			}

			this.updateIndexes()
		} else {
			this.postHeight()
		}
	}

	render() {
		const { tag, children, className, title, onTapClose, ...props } = this.props
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
			marginTop: this.state.scrollTop + dialogVerticalPadding
		}

		const hasHeader = true // always have a header, just won't show close/title if not supplied

		return (
			typeof document !== 'undefined' &&
			ReactDOM.createPortal(
				<DialogWrapper
					className={`${focusClass} ${!firstShow ? 'was-focused' : ''} ${
						isHidden ? 'hidden' : ''
					} dialog-${dialogIndex}`}
					onClick={e => {
						if (
							e.target.className.search('dialog__wrapper') > -1 &&
							currentDialogs.length - 1 >= 0
						) {
							currentDialogs[currentDialogs.length - 1].handleTapClose()
						}
					}}
				>
					<DialogContainer
						ref={node => (this.dialogNode = node)}
						className={`${className || ''} ${hasHeader ? 'has_header' : ''}`}
						style={dialogStyle}
						opacity={opacity}
						{...props}
					>
						{hasHeader && (
							<div className="dialog__header">
								{title && <H2>{title}</H2>}
								{onTapClose && (
									<IconButton
										className="btn__close_dialog"
										onClick={this.handleTapClose}
									>
										close
									</IconButton>
								)}
							</div>
						)}
						{children}
					</DialogContainer>
				</DialogWrapper>,
				dialogUnderlay
			)
		)
	}
}

Dialog.propTypes = {
	tag: PropTypes.string,
	onTapClose: PropTypes.func,
	title: PropTypes.string
}

Dialog.defaultProps = {
	tag: 'div'
}
