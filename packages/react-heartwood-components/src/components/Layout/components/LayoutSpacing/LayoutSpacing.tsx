import {
	IHWLayoutSpacing,
	IHWLayoutSpacingDirection
} from '@sprucelabs/spruce-types'
import React from 'react'
import {
	ILayoutBuilderProps,
	LayoutBuilder
} from '../../../LayoutBuilder/LayoutBuilder'

export interface ILayoutSpacingProps extends IHWLayoutSpacing {
	/** Contents of the Layout Section */
	children?: React.ReactNode
}

const LayoutSpacing = (props: ILayoutSpacingProps) => {
	const { direction, amount, children, layoutBuilder } = props

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

	return (
		<div className={`p${prefixes[direction]}-${amount}`}>
			{children}
			{layoutBuilder && (
				// Note: We have to cast this since ILayoutBuilderProps
				// enforces typematching. All that interface is, is a stricter
				// version of IHWLayoutBuilder.
				<LayoutBuilder {...layoutBuilder as ILayoutBuilderProps} />
			)}
		</div>
	)
}

export default LayoutSpacing
