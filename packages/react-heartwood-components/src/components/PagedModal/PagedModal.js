// @flow
import * as React from 'react'
import cx from 'classnames'
import Modal from '../Modal/Modal'

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

export default class PagedModal extends React.PureComponent<Props> {
	static defaultProps = {
		size: 'medium',
		canGoBack: true
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

		const currentPage = pages.find(page => page.isCurrent)

		return (
			<Modal isOpen={isOpen} size={size} className="paged-modal">
				<Modal.Header
					title={(currentPage && currentPage.title) || ''}
					onRequestClose={onRequestClose}
					onClickBack={canGoBack && onClickBack}
				/>
				{pages.map((page, idx) => (
					<Modal.Body
						key={`${idx}`}
						className={cx('paged-modal__page', {
							'paged-modal__page--is-current': page.isCurrent
						})}
					>
						{page.body}
					</Modal.Body>
				))}
				{currentPage && currentPage.footerPrimaryAction && (
					<Modal.Footer
						primaryAction={currentPage.footerPrimaryAction}
						secondaryAction={currentPage.footerSecondaryAction}
					/>
				)}
			</Modal>
		)
	}
}
