// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'
import ArrowBack from '../../../../../static/assets/icons/ic_arrow_back.svg'
import CloseIcon from '../../../../../static/assets/icons/ic_close.svg'

export type Props = {
	/** Title text */
	title: string,

	/** Whether this is a paged modal. Title will center on pages */
	isPaginated: boolean,

	/** Callback to close the modal */
	onRequestClose: Function,

	/** Function to handle navigating backwards in a modal */
	onClickBack?: Function
}

const ModalHeader = (props: Props) => {
	const { title, onRequestClose, isPaginated, onClickBack } = props

	return (
		<div
			className={cx('modal-header', {
				'modal-header--is-paginated': isPaginated
			})}
		>
			<div className="modal-header__title-wrapper">
				{isPaginated && (
					<Button
						isSmall
						className={cx('modal-header__back-btn', {
							'modal-header__back-btn--is-hidden': !onClickBack
						})}
						icon={{ customIcon: ArrowBack }}
						disabled={!onClickBack}
						onClick={onClickBack}
					/>
				)}
				<h2 className="modal-header__title">{title}</h2>
			</div>
			<Button
				isSmall
				icon={{ customIcon: CloseIcon }}
				onClick={onRequestClose}
			/>
		</div>
	)
}

ModalHeader.defaultProps = {
	isPaginated: false
}

export default ModalHeader
