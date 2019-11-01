import {
	ICoreGQLBigSearchResultsRecord,
	ICoreGQLBigSearchObjectType,
	ICoreGQLImportBigSearchResult,
	ICoreGQLImportBigSearchMatchGroup,
	ICoreGQLImportBigSearchMatch
} from '@sprucelabs/spruce-types'

export interface ISpruceBigSearchSection {
	/** The title of this section. Rendered as a tab. */
	title: string
	/** A unique identifier for this section. Similar to a slug. */
	section: string
	/** how many results are there in total (not including paging/limiting) */
	totalCount: number
	/** Search results for this section */
	results: ISpruceBigSearchResult[]
}

export type ISpruceBigSearchBody = ISpruceBigSearchSection[]

export interface ISpruceBigSearchResult
	extends Omit<ICoreGQLBigSearchResultsRecord, '__typename'> {}

export declare enum SpruceBigSearchType {
	Any = 'any',
	User = 'user',
	Location = 'location',
	Group = 'group'
}

export interface ISpruceBigSearchPayload {
	/** the max amount of results Big Search would like you to return */
	limit: number
	/** how many results to skip */
	offset: number
	/** Search string entered by the human doing the search */
	search: string
	/** If we're in testing mode */
	testing: boolean
	/** The things we're searching for */
	types: SpruceBigSearchType[]
}

export interface ISpruceImportFromBigSearchPayload {
	/** the id of the result the user clicked, it matches whatever you returned from big-search result */
	id: string
	/** if the user is asking to merge with another result */
	matchId?: string
	/** is the user viewing a location while importing */
	section: string
	/** is the API in test mode? */
	testing: boolean
}

export interface ISpruceImportBigSearchResult
	extends Omit<ICoreGQLImportBigSearchResult, '__typename'> {}

export interface ISpruceImportBigSearchMatchGroup
	extends Omit<ICoreGQLImportBigSearchMatchGroup, '__typename'> {}

/** List of possible matches found in core */
export interface ISpruceImportBigSearchMatch
	extends Omit<ICoreGQLImportBigSearchMatch, '__typename'> {}
