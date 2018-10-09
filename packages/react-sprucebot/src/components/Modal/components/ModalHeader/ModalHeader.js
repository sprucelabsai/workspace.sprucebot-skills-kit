// @flow
import React from 'react'
import Button from '../../../Button/Button'
import ArrowBack from '../../../../../static/assets/icons/ic_arrow_back.svg'
import CloseIcon from '../../../../../static/assets/icons/ic_close.svg'

export interface Props {
	title: string;
	onRequestClose: Function;
	handleGoBack?: Function;
}

const ModalHeader = (props: Props) => {
	const { title, onRequestClose, handleGoBack } = props
	return (
		<div className="modal-header">
			<div className="modal-header__title-wrapper">
				{handleGoBack && <Button isSmall icon={<ArrowBack />} />}
				<h2 className="modal-header__title">{title}</h2>
			</div>
			<Button isSmall icon={<CloseIcon />} onClick={onRequestClose} />
		</div>
	)
}

export default ModalHeader
