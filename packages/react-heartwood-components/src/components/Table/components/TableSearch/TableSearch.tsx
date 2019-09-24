import React, { ReactElement } from 'react'
import {
	default as Autosuggest,
	IAutosuggestInterfaceProps
} from '../../../Forms/components/Autosuggest/Autosuggest'

export interface ITableSearchProps extends IAutosuggestInterfaceProps {}

const TableSearch = (props: ITableSearchProps): ReactElement => {
	const { ...rest } = props

	return (
		<div className="table-search__wrapper">
			<Autosuggest isSmall icon={{ name: 'search' }} {...rest} />
		</div>
	)
}

export default TableSearch
