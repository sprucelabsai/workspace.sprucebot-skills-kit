// @flow

export interface IBigSearchSection {
	/** The title of this section. Rendered as a tab. */
	title: string;
	/** A unique identifier for this section. Similar to a slug. */
	section: string;
	/** how many results are there in total (not including paging/limiting) */
	totalCount: number;
	/** Search results for this section */
	results: IBigSearchResult[];
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
		routeParams?: { [key: string]: any }
	};
}

export type BIG_SEARCH_TYPE = 'any' | 'user' | 'location' | 'group'

export interface IBigSearchCtx {
	auth: { Organization: Object, Location?: Object };
	services: any;
	utilities: any;
	db: any;
	body: any;
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
	services: any;
	utilities: any;
	db: any;
	body: any;
	event: {
		payload: {
			/** the id of the result the user clicked, it matches whatever you returned from big-search result */
			id: string,
			/** if the user is asking to merge with another result */
			matchId?: string,
			/** is the user viewing a location while importing */
			section: string,
			/** is the API in test mode? */
			testing: boolean
		}
	};
}

export interface IImportBigSearchResult {
	/** If the import was successful, this is where the resulting record will be */
	successfulImport?: IBigSearchResult;
	/** If the import resulted in a possible match (that requires human intervention), it'll show here. */
	matchGroup?: IImportBigSearchMatchGroup;
}

export interface IImportBigSearchMatchGroup {
	/** The title to show at the top of merge component. Make sure it describes the action the human is about to take. Something like, "Merge users?" */
	matchGroupTitle: string;
	/** Your chance to give the human handling the merge a little more details about what is happening. */
	matchGroupDescription?: string;
	/** The label shown above the matches you found in the platform. Could be "Existing User". */
	matchingRecordLabel: string;
	/** The label show above the record the user selected from search that is now being considered for import. Example: "Imported User" */
	importingRecordLabel: string;
	/** A list of possible matches the user can choose to merge to */
	matches: IImportBigSearchMatch[];
}

/** List of possible matches found in core */
export interface IImportBigSearchMatch {
	/** The UUID of the match */
	id: string;
	/** Text to render in the title of the list item */
	title: string;
	/** Text to render as the subtitle of the list item */
	subtitle?: string;
	/** Url to the image to show for this record */
	image?: string;
}
