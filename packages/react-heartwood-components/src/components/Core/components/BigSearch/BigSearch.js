// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import { debounce } from 'lodash'
import { CSSTransition } from 'react-transition-group'

import Icon from '../../../Icon/Icon'
import List from '../../../List/List'
import Tabs from '../../../Tabs/Tabs'
import { InputInner } from '../../../Forms/FormPartials'
import Button from '../../../Button/Button'
import QuickAddUserView from './components/QuickAddUserView/QuickAddUserView'
import BigSearchBody from './components/BigSearchBody/BigSearchBody'

import type { Props as TabProps } from '../../../Tabs/Tabs'
import type { Props as ListProps } from '../../../List/List'
import type { Props as ListItemProps } from '../../../List'

// TODO: Hook up real search data
import {
	recentSearchResults,
	suggestedSearchResults,
	searchResults
} from '../../../../../.storybook/data/searchData'

type TabbedListProps = { text: string, items: Array<ListItemProps> }

type Props = {
	/** The placeholder displayed in search bar */
	searchPlaceholder?: string,

	/** The list of initial results to show when search is displayed. Can provide multiple lists. */
	initialSearchResults?: Array<ListProps>,

	/** Get search suggestions as search value changes. Can respond with multiple lists. */
	getSearchSuggestions: (value: string) => Promise<Array<ListProps>>,

	/** Debounce time in ms for getSearchSuggestions calls */
	getSearchSuggestionsDebounce: number,

	/** Handle search submit. Can respond with tabbed lists of results */
	getSearchResults?: (value: string) => Promise<Array<TabbedListProps>>,

	/** Handle added or updated user via quick add */
	onUserAddedOrUpdated?: (user: Object) => void,

	/** Handle close button click */
	onClose?: () => void
}

type State = {
	isAddButtonVisible: boolean,
	searchValue: string,
	searchContextBarIsHighlighted: boolean,
	activeSearchResultsTabIndex: number,
	suggestedSearchResults: Array<ListProps>,
	searchResults: Array<TabbedListProps>,
	currentView: 'search' | 'quick-add' | 'merge'
}

export default class BigSearch extends Component<Props, State> {
	static defaultProps = {
		getSearchSuggestionsDebounce: 200
	}

	state = {
		isAddButtonVisible: false,
		searchValue: '',
		searchContextBarIsHighlighted: false,
		activeSearchResultsTabIndex: 0,
		suggestedSearchResults: [],
		searchResults: [],
		currentView: 'search'
	}

	bigSearchRef: any = React.createRef()
	searchInputRef: any = React.createRef()

	componentDidMount = () => {
		this.searchInputRef && this.searchInputRef.current.focus()
	}

	getSearchSuggestions = debounce(async (searchValue: string) => {
		this.setState({ suggestedSearchResults: [], searchResults: [] })
		try {
			const suggestedSearchResults = await this.props.getSearchSuggestions(
				searchValue
			)
			this.setState({ suggestedSearchResults: suggestedSearchResults })
		} catch (err) {
			// TODO: Track error here?
		}
	}, this.props.getSearchSuggestionsDebounce)

	getSearchResults = async (searchValue: string) => {
		// TODO: Replace with real search
		const mockRequest = ms => new Promise(resolve => setTimeout(resolve, ms))
		return mockRequest(1000).then(() => {
			// TODO: Map real data to search result items
			// This is just looping through mock data that is already structured as search result items
			// and dding button functionality
			const searchResultsData = searchResults.map(result => {
				if (result.text === 'Shopify Customers') {
					result.items.map(item => {
						item['actions'] = [
							{
								text: 'Import',
								onClick: () => this.handleImportUser(item),
								kind: 'secondary'
							}
						]
					})
				} else {
					result.items.map(
						item =>
							(item['primaryAction'] = {
								onClick: () => console.log('clicked!')
							})
					)
				}
				return result
			})
			console.log('DATA', searchResultsData)
			return searchResultsData
		})
	}

	handleClickQuickAdd = () => {
		this.setState({ currentView: 'quick-add' })
	}

	handleClickQuckAddBack = () => {
		this.setState({ currentView: 'search' })
	}

	handleSearchValueChange = (e: any) => {
		const searchValue = e.target.value
		this.setState({
			searchValue,
			searchContextBarIsHighlighted: searchValue !== ''
		})
		this.getSearchSuggestions(searchValue)
	}

	handleSearchSubmit = async (e: any) => {
		e.preventDefault()
		const searchValue = this.state.searchValue
		try {
			const searchResults = await this.getSearchResults(searchValue)
			this.setState({ searchResults: searchResults })
		} catch (err) {
			// TODO: Track error here?
		}
	}

	handleImportUser = async (user: Object) => {
		console.log('import user', user)
	}

	handleClearSearchValue = () => {
		this.setState({
			searchValue: '',
			suggestedSearchResults: [],
			searchResults: []
		})
	}

	handleClickCloseSearch = () => {
		this.props.onClose && this.props.onClose()
	}

	handleClickOverlay = (e: any) => {
		if (
			this.bigSearchRef.current &&
			e.target.contains(this.bigSearchRef.current)
		) {
			this.props.onClose && this.props.onClose()
		}
	}

	handleTabClick = (idx: number) => {
		this.setState({ activeSearchResultsTabIndex: idx })
	}

	renderSearchResultsList = (results: Array<ListProps>) => {
		return results.map((resultList, idx) => (
			<List
				key={idx}
				className="big-search__search-results-list"
				isSmall={true}
				{...resultList}
			/>
		))
	}

	renderTabbedSearchResults = (results: Array<TabbedListProps>) => {
		const { activeSearchResultsTabIndex } = this.state
		console.log(results)
		if (results.length > 1) {
			return (
				<Tabs
					tabs={results.map<TabbedListProps>((result, idx) => {
						const { text, items } = result
						return {
							text: text,
							isCurrent: idx === activeSearchResultsTabIndex,
							panel: <List isSmall={true} items={items} />,
							onClick: () => this.handleTabClick(idx),
							...result
						}
					})}
				/>
			)
		} else if (results[0]) {
			// render as a list if only 1 set of results
			const resultsList = [
				{
					header: results[0].text && {
						title: results[0].text
					},
					items: results[0].items || []
				}
			]
			return this.renderSearchResultsList(resultsList)
		} else {
			return []
		}
	}

	renderSearchResults = () => {
		const { searchValue, suggestedSearchResults, searchResults } = this.state
		const { initialSearchResults } = this.props

		if (
			!searchValue &&
			initialSearchResults &&
			suggestedSearchResults.length === 0 &&
			searchResults.length === 0
		) {
			return this.renderSearchResultsList(initialSearchResults)
		} else if (searchResults.length === 0) {
			return this.renderSearchResultsList(suggestedSearchResults)
		} else if (searchResults) {
			return this.renderTabbedSearchResults(searchResults)
		}
	}

	renderSearchContextButton = () => {
		const {
			searchValue,
			searchContextBarIsHighlighted,
			suggestedSearchResults,
			searchResults
		} = this.state

		if (!searchValue && searchResults.length === 0) {
			return (
				<Button
					className="big-search__search-view-add-btn"
					text="Quick add a new guest"
					icon={{ name: 'add' }}
					onClick={this.handleClickQuickAdd}
				/>
			)
		} else if (searchValue && searchResults.length === 0) {
			return (
				<Button
					className={cx('big-search__search-view-context-bar-btn', {
						'big-search__search-view-context-bar-btn--highlighted': searchContextBarIsHighlighted
					})}
					text={searchValue}
					icon={{ name: 'search' }}
					onClick={this.handleSearchSubmit}
					type="submit"
				/>
			)
		}
	}

	render() {
		const {
			isAddButtonVisible,
			searchValue,
			searchContextBarIsHighlighted,
			currentView
		} = this.state

		const { searchPlaceholder, onUserAddedOrUpdated } = this.props

		return (
			<CSSTransition
				in={true}
				appear={true}
				classNames="big-search-overlay"
				timeout={100}
			>
				<div
					className={cx('big-search-overlay')}
					onClick={this.handleClickOverlay}
				>
					<div className="big-search" ref={this.bigSearchRef}>
						{currentView === 'search' && (
							<Fragment>
								<div className="big-search__search-view-header">
									<form onSubmit={this.handleSearchSubmit}>
										<div className="big-search__search-view-search-bar">
											<div className={'text-input'}>
												<div className="text-input__inner">
													<Icon
														icon={'search'}
														className="text-input__icon-pre"
													/>
													<input
														ref={this.searchInputRef}
														className="text-input__input"
														placeholder={searchPlaceholder || 'Search'}
														value={searchValue}
														onChange={this.handleSearchValueChange}
													/>
												</div>
											</div>
											<div className="big-search__search-view-search-bar-buttons">
												<Button
													text="Clear"
													onClick={this.handleClearSearchValue}
												/>
												<Button
													icon={{ name: 'close' }}
													onClick={this.handleClickCloseSearch}
												/>
											</div>
										</div>
										{this.renderSearchContextButton()}
									</form>
								</div>
								<BigSearchBody>{this.renderSearchResults()}</BigSearchBody>
							</Fragment>
						)}
						{currentView === 'quick-add' && (
							<QuickAddUserView
								onUserAddedOrUpdated={onUserAddedOrUpdated}
								onClickBack={this.handleClickQuckAddBack}
								onClickClose={this.handleClickCloseSearch}
							/>
						)}
					</div>
				</div>
			</CSSTransition>
		)
	}
}
