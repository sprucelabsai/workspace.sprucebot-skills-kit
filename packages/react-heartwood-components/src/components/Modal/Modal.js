// @flow
import React from 'react'
import ReactModal from 'react-modal'
import cx from 'classnames'
import ModalHeader from './components/ModalHeader/ModalHeader'
import ModalBody from './components/ModalBody/ModalBody'
import ModalFooter from './components/ModalFooter/ModalFooter'

export type Props = {
	/** Set true to show the modal */
	isOpen: boolean,

	/** Should the modal stretch to its maximum height whatever the content? */
	isFullHeight: boolean,

	/** Size of the modal */
	size: 'small' | 'medium' | 'full-width',

	/** Optional class name */
	className?: string
}

type State = {}

export default class Modal extends React.PureComponent<Props, State> {
	static defaultProps = {
		isFullHeight: false
	}

	static Header = ModalHeader
	static Body = ModalBody
	static Footer = ModalFooter
	static defaultProps = {
		size: 'medium',
		isOpen: false
	}

	render() {
		const { isOpen, size, isFullHeight, className, ...rest } = this.props
		const modalClassName = cx('modal', className, {
			'modal-small': size === 'small',
			'modal-medium': size === 'medium',
			'modal-fullHeight': isFullHeight
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
