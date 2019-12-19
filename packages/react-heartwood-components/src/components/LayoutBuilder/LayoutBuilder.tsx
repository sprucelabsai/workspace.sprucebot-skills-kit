import {
	IHWButton,
	IHWCardBuilder,
	IHWLayout,
	IHWLayoutBuilder,
	IHWLayoutBuilderSectionType,
	IHWLayoutSpacing
} from '@sprucelabs/spruce-types'
import React from 'react'
import Button from '../Button/Button'
import { CardBuilder } from '../Card'
import LayoutSpacing from '../Layout/components/LayoutSpacing/LayoutSpacing'
import Layout from '../Layout/Layout'

// Strictly associate valid types to their correct viewModel;
// GQL doesn't support this level of association, so we just need to
// make sure we're establish the correct mappings while adhering to the
// general data layout defined in the GQL.
export type ValidLayoutBuilderSectionConfigs =
	| {
			type: IHWLayoutBuilderSectionType.Button
			viewModel: IHWButton
	  }
	| {
			type: IHWLayoutBuilderSectionType.CardBuilder
			viewModel: IHWCardBuilder
	  }
	| {
			type: IHWLayoutBuilderSectionType.Layout
			viewModel: IHWLayout
	  }
	| {
			type: IHWLayoutBuilderSectionType.LayoutSpacing
			viewModel: IHWLayoutSpacing
	  }

export interface ILayoutBuilderProps extends IHWLayoutBuilder {
	items: ValidLayoutBuilderSectionConfigs[]
}

export const LayoutBuilder = ({ items }: ILayoutBuilderProps) => (
	<div>
		{items.map(item => {
			if (item) {
				if (item.type === IHWLayoutBuilderSectionType.CardBuilder) {
					return <CardBuilder {...item.viewModel} />
				} else if (item.type === IHWLayoutBuilderSectionType.Button) {
					return <Button {...item.viewModel} />
				} else if (item.type === IHWLayoutBuilderSectionType.Layout) {
					return <Layout {...item.viewModel} />
				} else if (item.type === IHWLayoutBuilderSectionType.LayoutSpacing) {
					return <LayoutSpacing {...item.viewModel} />
				}
			}
		})}
	</div>
)
