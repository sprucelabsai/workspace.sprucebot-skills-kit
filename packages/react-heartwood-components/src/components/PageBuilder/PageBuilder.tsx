import {
	IHWButton,
	IHWCardBuilder,
	IHWPageBuilder,
	IHWPageBuilderSectionType,
	Maybe
} from '@sprucelabs/spruce-types'
import React from 'react'
import Button from '../Button/Button'
import { CardBuilder } from '../Card'

// Strictly associate valid types to their correct viewModel;
// GQL doesn't support this level of association, so we just need to
// make sure we're establish the correct mappings while adhering to the
// general data layotu defined in the GQL.
type ValidPageBuilderSectionConfigs =
	| {
			type: IHWPageBuilderSectionType.Button
			viewModel: IHWButton
	  }
	| {
			type: IHWPageBuilderSectionType.CardBuilder
			viewModel: IHWCardBuilder
	  }

interface IPageBuilderProps extends IHWPageBuilder {
	sections: Maybe<ValidPageBuilderSectionConfigs>[]
}

export const PageBuilder = ({ sections }: IPageBuilderProps) => (
	<div>
		{sections.map(section => {
			if (section) {
				if (section.type === IHWPageBuilderSectionType.CardBuilder) {
					return <CardBuilder {...section.viewModel} />
				} else if (section.type === IHWPageBuilderSectionType.Button) {
					return <Button {...section.viewModel} />
				}
			}
		})}
	</div>
)
