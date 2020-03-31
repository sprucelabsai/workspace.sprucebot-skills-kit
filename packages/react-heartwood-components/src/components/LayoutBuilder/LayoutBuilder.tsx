import {
	IHWButton,
	IHWCardBuilder,
	IHWLayoutBuilder,
	IHWLayoutBuilderSectionType
} from '@sprucelabs/spruce-types'
import React from 'react'
import Button from '../Button/Button'
import { CardBuilder } from '../Card'

// Strictly associate valid types to their correct viewModel;
// GQL doesn't support this level of association, so we just need to
// make sure we're establish the correct mappings while adhering to the
// general data layout defined in the GQL.
type ValidLayoutBuilderSectionConfigs =
	| {
			type: IHWLayoutBuilderSectionType.Button
			viewModel: IHWButton
	  }
	| {
			type: IHWLayoutBuilderSectionType.CardBuilder
			viewModel: IHWCardBuilder
	  }

interface ILayoutBuilderProps extends IHWLayoutBuilder {
	sections: ValidLayoutBuilderSectionConfigs[]
}

export const LayoutBuilder = ({ sections }: ILayoutBuilderProps) => (
	<div>
		{sections.map(section => {
			if (section) {
				if (section.type === IHWLayoutBuilderSectionType.CardBuilder) {
					return <CardBuilder {...section.viewModel} />
				} else if (section.type === IHWLayoutBuilderSectionType.Button) {
					return <Button {...section.viewModel} />
				}
			}
		})}
	</div>
)
