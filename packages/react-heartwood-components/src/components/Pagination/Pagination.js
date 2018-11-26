// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import { Text, Span } from '../Text/Text'
import { InputInner } from '../Forms/FormPartials'
import ArrowNext from '../../../static/assets/icons/ic_arrow_forward.svg'
import ArrowBack from '../../../static/assets/icons/ic_arrow_back.svg'

type Props = {
	/** The current page */
	currentPage: number,

	/** Total pages */
	totalPages: number,

	/** Go forward one page */
	onClickNext: Function,

	/** Go back one page */
	onClickBack: Function,

	/** Navigate to the clicked/tapped page */
	onPageButtonClick?: Function,

	/** Navigate throught the jump input */
	onJump?: Function,

	/** Set true to display pages between arrows */
	showPages?: boolean,

	/** Set true to show the jump input */
	showJump?: boolean,

	/** Set true to use simple buttons */
	isSimple?: boolean
}

const Pagination = (props: Props) => {
	const {
		currentPage,
		totalPages,
		showPages,
		showJump,
		onClickNext,
		onClickBack,
		onPageButtonClick,
		onJump,
		isSimple
	} = props
	const pagesArray = []
	let displayPages = []
	for (let i = 0; i < totalPages; i++) {
		pagesArray.push(i)
	}
	if (currentPage <= 2 || totalPages - currentPage <= 2) {
		displayPages = pagesArray.filter(
			page =>
				page === 0 ||
				page === 1 ||
				page === 2 ||
				page === totalPages - 1 ||
				page === totalPages - 2 ||
				page === totalPages - 3 ||
				page === currentPage
		)
		displayPages.splice(3, 0, { text: '…' })
	} else {
		displayPages = pagesArray.filter(
			page =>
				page === 0 ||
				page === totalPages - 1 ||
				page === currentPage ||
				page === currentPage + 1 ||
				page === currentPage - 1
		)
		displayPages.splice(1, 0, { text: '…' })
		displayPages.splice(displayPages.length - 1, 0, { text: '…' })
	}

	const kind = isSimple ? 'simple' : 'secondary'

	return (
		<div
			className={cx('pagination-wrapper', {
				'pagination-wrapper-minimal': !showPages
			})}
		>
			<Button
				kind={kind}
				onClick={onClickBack}
				isSmall
				className="pagination__btn"
				icon={{ customIcon: ArrowBack }}
				disabled={currentPage === 0}
			/>
			{showPages &&
				onPageButtonClick &&
				displayPages.map((page, idx) => {
					if (page.text === '…') {
						return (
							<Text key={idx} className="pagination__page-ellipse">
								<Span>…</Span>
							</Text>
						)
					}
					return (
						<Button
							key={idx}
							onClick={() => onPageButtonClick(page)}
							kind={currentPage === page ? 'simple' : ''}
							text={(page + 1).toString()}
							isSmall
							className="pagination__page-btn"
						/>
					)
				})}
			<Button
				kind={kind}
				onClick={onClickNext}
				isSmall
				className="pagination__btn"
				icon={{ customIcon: ArrowNext }}
				disabled={currentPage >= totalPages - 1}
			/>
			{showJump && onJump && (
				<form
					className="pagination__jump-wrapper"
					onSubmit={e => {
						e.preventDefault()
						for (let i = 0; i < e.currentTarget.elements.length; i++) {
							if (e.currentTarget.elements[i].name === 'jump') {
								onJump(
									e.currentTarget.elements[i].value ||
										e.currentTarget.elements[i].placeholder
								)
							}
						}
					}}
				>
					<Span className="pagination__jump-text">Jump:&nbsp;</Span>
					<InputInner
						name="jump"
						autoComplete="off"
						placeholder={currentPage}
						onBlur={e => {
							onJump(e.currentTarget.value || e.currentTarget.placeholder)
						}}
					/>
				</form>
			)}
		</div>
	)
}

export default Pagination
