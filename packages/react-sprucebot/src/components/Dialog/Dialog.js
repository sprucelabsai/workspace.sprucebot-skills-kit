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
const dialogVerticalPadding = 30

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
	dialogHeight = 0

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
		const dialogs = document.body.getElementsByClassName('dialog')

		if (dialogs.length < 1) {
			return
		}

		const topDialog = dialogs[dialogs.length - 1]
		const styles = window.getComputedStyle(topDialog)
		const margin = parseFloat(styles['marginTop'])

		this.dialogHeight = Math.ceil(topDialog.offsetHeight + margin)

		let minHeight = this.dialogHeight

		for (var i = 0; i < dialogs.length; i++) {
			const height = dialogs[i].dialogHeight
			if (dialogs[i].dialogHeight > minHeight) {
				minHeight = height
			}
		}

		//min height on body
		document.body.style.minHeight = `${minHeight + dialogVerticalPadding * 2}px`
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
			if (idx < index - 1) {
				dialog.blur()
			}
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
		this.closeDialog()
	}

	requestScroll() {
		SK.requestScroll()
		setTimeout(() => {
			// we are not in the sb iframe
			// console.log('TIMEOUT SCROLL TOP', currentDialogs.length, top)
			// if (this.state.opacity === 0) {
			// 	this.setState({
			// 		opacity: 1,
			// 		scrollTop: window.document.body.scrollTop,
			// 		firstShow: false,
			// 		inIframe: false
			// 	})
			// }
		}, 250)
	}

	iframeMessageHandler(e) {
		try {
			const results = JSON.parse(e.data)
			console.log('CURRENT SCROLL TOP', results.skillScrollTop)
			if (this.state.firstShow && results.name === 'SkillContainer:ScrollTop') {
				const top =
					results.skillScrollTop < 0 ? Math.abs(results.skillScrollTop) : 0
				console.log('SET SCROLL TOP', currentDialogs.length, top)
				this.setState({
					scrollTop: top,
					firstShow: false,
					opacity: 1
				})
			}
		} catch (err) {}
	}
	onTapClose() {
		this.closeDialog()
		this.setState({ focusClass: 'closed', opacity: 0 }, () => {
			if (this.props.onTapClose) {
				setTimeout(() => {
					this.props.onTapClose()
				}, 500)
			}
		})
	}

	closeDialog() {
		if (this.state.focusClass !== 'closed') {
			currentDialogs.pop()
			if (currentDialogs.length - 1 >= 0) {
				const nextDialog = currentDialogs[currentDialogs.length - 1]
				nextDialog.focus()
				let node = ReactDOM.findDOMNode(this.dialogNode)
				// SK.scrollTo(node.offsetTop - dialogVerticalPadding)
			} else {
				dialogUnderlay.classList.add('hidden')
				setTimeout(() => {
					dialogUnderlay.classList.remove('on')
				}, 300)
			}

			this.updateIndexes()
		}
		this.postHeight()
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
			marginTop: this.state.scrollTop + dialogVerticalPadding
		}
		console.log('RENDER SCROLL TOP', this.state.scrollTop)
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
								ref={node => (this.dialogNode = node)}
								innerRef={measureRef}
								className={`${className || ''} ${
									hasHeader ? 'has_header' : ''
								}`}
								style={dialogStyle}
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
