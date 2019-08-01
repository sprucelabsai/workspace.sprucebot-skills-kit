// @flow

export interface IBigSearchSection {
	/** The title of this section. Rendered as a tab. */
	title: string;
	/** A unique identifier for this section. Similar to a slug. */
	section: string;
	/** how many results are there in total (not including paging/limiting) */
	totalCount: number;
	/** Search results for this section */
	results: BigSearchResult[];
}

export interface IBigSearchResult {
	/** Your id for the result (is passed back with this id to the import event) */
	id: string;
	/** What is rendered in the title of the search result list item */
	title: string;
	/** The optional subtitle of the search result */
	subtitle?: string;
	/** Tells Big Search how to handle selecting your result */
	action: {
		/** Should we redirect OR import */
		type: 'coreRedirect' | 'import',
		/**  if type is 'coreRedirect', this is where we forward them. not needed if type is import */
		page?: string,
		/** An object that is used to populate the route template for the page */
		routeParams?: Record<string, string>
	};
}

export type BIG_SEARCH_TYPE = 'any' | 'user' | 'location' | 'group'

export const BIG_SEARCH_TYPES = {
	ANY: 'any',
	USER: 'user',
	LOCATION: 'location',
	GROUP: 'group'
}

export interface IBigSearchCtx {
	auth: { Organization: Object, Location?: Object };
	event: {
		payload: {
			/** the max amount of results Big Search would like you to return */
			limit: number,
			/** how many results to skip */
			offset: number,
			/** Search string entered by the human doing the search */
			search: string,
			/** If we're in testing mode */
			testing: boolean,
			/** The things we're searching for */
			types: BIG_SEARCH_TYPE[]
		}
	};
}

export interface IImportFromBigSearchCtx {
	auth: { Organization: Object, Location?: Object };
	event: {
		payload: {
			/** the max amount of results Big Search would like you to return */
			limit: number,
			/** how many results to skip */
			offset: number,
			/** Search string entered by the human doing the search */
			search: string,
			/** If we're in testing mode */
			testing: boolean
		}
	};
}
