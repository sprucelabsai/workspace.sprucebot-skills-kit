//@flow
import React, { PureComponent, Fragment } from 'react'

import Button from '../../../../../Button/Button'

type Props = {
	/** title displayed in the header */
	title: string,

	/** handle back button click */
	onClickBack?: () => void,

	/** handle close button click */
	onClickClose?: () => void
}

type State = {}

export default class BigSearchHeader extends PureComponent<Props, State> {
	static defaultProps = {
		title: ''
	}

	render() {
		const { title, onClickBack, onClickClose } = this.props
		return (
			<div class="big-search__view-header">
				{onClickBack && (
					<Button
						icon={{ name: 'arrow_back' }}
						onClick={onClickBack}
						isSmall
						isIconOnly
					/>
				)}
				<div class="big-search__view-header-title-wrapper">
					<h2 class="big-search__view-header-title">{title}</h2>
				</div>
				<Button
					icon={{ name: 'close' }}
					onClick={onClickClose}
					isSmall
					isIconOnly
				/>
			</div>
		)
	}
}
