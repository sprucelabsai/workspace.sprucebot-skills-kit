import {
	IHWLayoutSpacing,
	IHWLayoutSpacingDirection
} from '@sprucelabs/spruce-types'
import React from 'react'

export interface ILayoutSpacingProps extends IHWLayoutSpacing {
	/** Contents of the Layout Section */
	children: React.ReactElement
}

const LayoutSpacing = (props: ILayoutSpacingProps) => {
	const { direction, amount, children } = props

	const prefixes = {
		[IHWLayoutSpacingDirection.All]: '',
		[IHWLayoutSpacingDirection.Horizontal]: 'x',
		[IHWLayoutSpacingDirection.Vertical]: 'y',
		[IHWLayoutSpacingDirection.Top]: 't',
		[IHWLayoutSpacingDirection.Right]: 'r',
		[IHWLayoutSpacingDirection.Bottom]: 'b',
		[IHWLayoutSpacingDirection.Left]: 'l'
	}

	if (amount < 0 || amount > 12) {
		throw new Error('LayoutSpacing: Invalid spacing amount. Only use 0-12.')
	}

	return <div className={`p${prefixes[direction]}-${amount}`}>{children}</div>
}

export default LayoutSpacing
