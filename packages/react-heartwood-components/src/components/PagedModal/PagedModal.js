// @flow
import * as React from 'react'
import ReactModal from 'react-modal'
import cx from 'classnames'
import Modal from '../Modal/Modal'

import type { Props as ModalHeaderProps } from '../Modal/components/ModalHeader/ModalHeader'
import type { Props as ModalProps } from '../Modal/Modal'
import type { Props as ButtonProps } from '../Button/Button'

type ModalPageProps = {
	/** The title for this page */
	title: string,

	/** The modal body for this page */
	body: React.Node,

	/** The modal footer primary action for this page */
	footerPrimaryAction?: ButtonProps,

	/** The modal footer secondary action for this page */
	footerSecondaryAction?: ButtonProps,

	/** Whether this page is currently visible */
	isCurrent: boolean
}

type Props = {
	...ModalProps,

	/** Callback to close the modal */
	onRequestClose: Function,

	/** Whether back button is active */
	canGoBack: boolean,

	/** Function to handle navigating backwards in the modal */
	onClickBack?: Function,

	/** Set true to show the modal */
	pages: Array<ModalPageProps>
}

type State = {
	currentPageIndex: number
}

const getCurrentPageIndex = (pages: Array<ModalPageProps>) => {
	const activeTabIndex = pages.findIndex(tab => tab.isCurrent)
	return activeTabIndex
}

export default class PagedModal extends React.PureComponent<Props, State> {
	static defaultProps = {
		size: 'medium',
		canGoBack: true
	}

	state = {
		currentPageIndex: getCurrentPageIndex(this.props.pages)
	}

	render() {
		const {
			isOpen,
			size,
			pages,
			onRequestClose,
			canGoBack,
			onClickBack
		} = this.props
		const { currentPageIndex } = this.state

		const currentPage = pages.find(page => page.isCurrent)

		return (
			<Modal isOpen={isOpen} size={size} className="paged-modal">
				<Modal.Header
					title={currentPage.title}
					onRequestClose={onRequestClose}
					onClickBack={canGoBack && onClickBack}
				/>
				{pages.map((page, idx) => (
					<Modal.Body
						className={cx('paged-modal__page', {
							'paged-modal__page--is-current': page.isCurrent
						})}
					>
						{page.body}
					</Modal.Body>
				))}
				{currentPage.footerPrimaryAction && (
					<Modal.Footer
						primaryAction={currentPage.footerPrimaryAction}
						secondaryAction={currentPage.footerSecondaryAction}
					/>
				)}
			</Modal>
		)
	}
}
