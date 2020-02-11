import React from 'react'

// Card Footer
export interface ICardFooterProps {
	/** Children to show in the Card Footer */
	children?: React.ReactNode
}

const CardFooter = (props: ICardFooterProps): React.ReactElement => {
	const { children } = props
	return <div className="card__footer">{children}</div>
}

CardFooter.displayName = 'Card.Footer'
export default CardFooter
