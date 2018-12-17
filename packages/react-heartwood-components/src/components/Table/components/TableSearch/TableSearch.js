// @flow
import React from 'react'
import { Autosuggest } from '../../../Forms'

import type { Props as AutosuggestProps } from '../../../Forms'

type Props = {
	...AutosuggestProps
}

const TableSearch = (props: Props) => {
	const { ...rest } = props
	return (
		<div className="table-search__wrapper">
			<Autosuggest isSmall {...rest} />
		</div>
	)
}

export default TableSearch
