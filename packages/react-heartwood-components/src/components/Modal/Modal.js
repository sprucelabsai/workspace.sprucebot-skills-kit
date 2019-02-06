// @flow
import React from 'react'
import ReactModal from 'react-modal'
import cx from 'classnames'
import ModalHeader from './components/ModalHeader/ModalHeader'
import type { Props as HeaderProps } from './components/ModalHeader/ModalHeader'
import ModalBody from './components/ModalBody/ModalBody'
import ModalFooter from './components/ModalFooter/ModalFooter'

type Props = {
	...HeaderProps,

	/** Set true to show the modal */
	isOpen: boolean,

	/** Size of the modal */
	size: 'small' | 'medium' | 'full-width'
}
type State = {}

export default class Modal extends React.PureComponent<Props, State> {
	static Header = ModalHeader
	static Body = ModalBody
	static Footer = ModalFooter
	static defaultProps = {
		size: 'medium'
	}
	render() {
		const { isOpen, size, ...rest } = this.props
		const modalClassName = cx('modal', {
			'modal-small': size === 'small',
			'modal-medium': size === 'medium'
		})
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
