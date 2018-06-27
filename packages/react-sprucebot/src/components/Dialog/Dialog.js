import React, { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import skill from '../../skillskit/index'
import Measure from 'react-measure'
import Button from '../Button/Button'
import SK from '../../skillskit'
import { ENGINE_METHOD_DIGESTS } from 'constants'

const DialogUnderlay = styled.div.attrs({
	className: ({ show }) => classnames('dialog_underlay', show ? 'on' : 'off')
})`
	min-height: 100%;
`

const DialogContainer = styled.div.attrs({
	className: ({ show, className }) =>
		classnames('dialog', className, show ? 'on' : 'off')
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
			width: -1,
			height: 500,
			scrollTop: 0,
			firstShow: true,
			opacity: 0
		}
	}
	setSize({ width, height }) {
		this.setState({ width, height })
		this.postHeight()
	}

	postHeight() {
		const underlay = document.querySelector('.dialog_underlay')
		const underlayHeight = underlay ? underlay.offsetHeight : 0

		//min height on body
		document.body.style.minHeight = `${underlayHeight}px`
	}
	componentDidMount() {
		window.addEventListener('message', this.iframeMessageHandler)
		if (this.props.show && this.state.firstShow) {
			SK.requestScroll()
		}
	}

	componentDidUpdate() {
		// in case our starting state is not showing
		if (this.props.show && this.state.firstShow) {
			SK.requestScroll()
		}
	}

	componentWillReceiveProps(nextProps) {
		// we are being hidden, reset
		if (this.props.show && !nextProps.show) {
			this.setState({
				firshShow: false,
				opacity: 0
			})
		}
	}

	componentWillUnmount() {
		document.body.style.minHeight = `auto`
		window.removeEventListener('message', this.iframeMessageHandler)
	}

	iframeMessageHandler(e) {
		try {
			const results = JSON.parse(e.data)
			if (this.state.firstShow && results.name === 'SkillContainer:Scroll') {
				const top =
					results.skillScrollTop < 0 ? Math.abs(results.skillScrollTop) : 0
				this.setState({
					scrollTop: top,
					firstShow: false,
					opacity: 1
				})
			}
		} catch (err) {
			console.log('error', err)
		}
	}
	onTapClose() {
		this.postHeight()
		this.props.onTapClose()
	}
	render() {
		const { tag, children, className, show, ...props } = this.props
		const { opacity, height } = this.state
		const Tag = tag
		const dialogStyle = {
			marginTop: this.state.scrollTop
		}

		if (!show) {
			return null
		}

		return (
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
					<DialogUnderlay
						ref={ref => (this.underlay = ref)}
						show={show}
						height={height}
						onClick={e => {
							if (e.target.className.search('dialog_underlay') > -1) {
								this.onTapClose()
							}
						}}
					>
						<DialogContainer
							innerRef={measureRef}
							className={className}
							show={show}
							opacity={opacity}
							style={dialogStyle}
							{...props}
						>
							{this.props.onTapClose && (
								<DialogCloseButton onClick={this.onTapClose.bind(this)} />
							)}
							{children}
						</DialogContainer>
					</DialogUnderlay>
				)}
			</Measure>
		)
	}
}

Dialog.propTypes = {
	tag: PropTypes.string,
	show: PropTypes.bool,
	onTapClose: PropTypes.func
}

Dialog.defaultProps = {
	tag: 'div',
	show: false
}
