// @flow
import React from 'react'
import { Search, Autosuggest } from '../../../Forms'

import type { Props as AutosuggestProps } from '../../../Forms'

type Props = {
	...AutosuggestProps
}

const TableSearch = (props: Props) => {
	const { ...rest } = props
	return (
		<div className="table-search__wrapper">
			{/* <Search isSmall placeholder={placeholder} {...rest} /> */}
			<Autosuggest isSmall {...rest} />
		</div>
	)
}

export default TableSearch
