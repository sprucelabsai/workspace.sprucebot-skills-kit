// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import { Text, Span } from '../Text/Text'
import { InputInner } from '../Forms/FormPartials'
import ArrowNext from '../../../static/assets/icons/ic_arrow_forward.svg'
import ArrowBack from '../../../static/assets/icons/ic_arrow_back.svg'

type Props = {
	currentPage: number,
	totalPages: number,
	showPages?: boolean,
	showJump?: boolean
}

const Pagination = (props: Props) => {
	const { currentPage, totalPages, showPages, showJump } = props
	const pagesArray = []
	let displayPages = []
	for (let i = 1; i < totalPages + 1; i++) {
		pagesArray.push(i)
	}
	if (currentPage <= 3 || totalPages - currentPage <= 3) {
		displayPages = pagesArray.filter(
			page =>
				page === 1 ||
				page === 2 ||
				page === 3 ||
				page === totalPages ||
				page === totalPages - 1 ||
				page === totalPages - 2 ||
				page === currentPage
		)
		displayPages.splice(3, 0, { text: '…' })
	} else {
		displayPages = pagesArray.filter(
			page =>
				page === 1 ||
				page === totalPages ||
				page === currentPage ||
				page === currentPage - 1 ||
				page === currentPage + 1
		)
		displayPages.splice(1, 0, { text: '…' })
		displayPages.splice(displayPages.length - 1, 0, { text: '…' })
	}
	return (
		<div
			className={cx('pagination-wrapper', {
				'pagination-wrapper-minimal': !showPages
			})}
		>
			<Button
				kind="secondary"
				isSmall
				className="pagination__btn"
				icon={<ArrowBack />}
				disabled={currentPage === 1}
			/>
			{showPages &&
				displayPages.map(page => {
					if (page.text === '…') {
						return (
							<Text className="pagination__page-ellipse">
								<Span>…</Span>
							</Text>
						)
					}
					return (
						<Button
							key={page}
							kind={currentPage === page ? 'simple' : ''}
							text={page.toString()}
							isSmall
							className="pagination__page-btn"
						/>
					)
				})}
			<Button
				kind="secondary"
				isSmall
				className="pagination__btn"
				icon={<ArrowNext />}
				disabled={currentPage >= totalPages}
			/>
			{showJump && (
				<div className="pagination__jump-wrapper">
					<Span className="pagination__jump-text">Jump:&nbsp;</Span>
					<InputInner placeholder={currentPage} />
				</div>
			)}
		</div>
	)
}

export default Pagination
