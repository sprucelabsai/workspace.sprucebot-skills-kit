// @flow
import React, { Component } from 'react'
import ReactModal from 'react-modal'
import cx from 'classnames'
import ModalHeader, {
	Props as HeaderProps
} from './components/ModalHeader/ModalHeader'
import ModalBody from './components/ModalBody/ModalBody'
import ModalFooter from './components/ModalFooter/ModalFooter'

type Props = {
	...HeaderProps,
	isOpen: boolean,
	isSmall?: boolean
}
type State = {}

export default class Modal extends Component<Props, State> {
	static Header = ModalHeader
	static Body = ModalBody
	static Footer = ModalFooter
	static defaultProps = {
		isSmall: false
	}
	render() {
		const { isOpen, isSmall, ...rest } = this.props
		const modalClassName = cx('modal', { 'modal-small': isSmall })
		return (
			<ReactModal
				isOpen={isOpen}
				overlayClassName="modal-overlay"
				className={modalClassName}
				{...rest}
			/>
		)
	}
}
