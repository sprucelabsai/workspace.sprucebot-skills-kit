import {
	ICoreGQLImportBigSearchResult,
	ICoreGQLImportBigSearchMatchGroup,
	ICoreGQLImportBigSearchMatch
} from '../generated/api-gql'

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

export interface ISpruceImportBigSearchBody
	extends Omit<ICoreGQLImportBigSearchResult, '__typename'> {}

export interface ISpruceImportBigSearchMatchGroup
	extends Omit<ICoreGQLImportBigSearchMatchGroup, '__typename'> {}

/** List of possible matches found in core */
export interface ISpruceImportBigSearchMatch
	extends Omit<ICoreGQLImportBigSearchMatch, '__typename'> {}
