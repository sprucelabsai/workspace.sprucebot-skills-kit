// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import { debounce } from 'lodash'
import { CSSTransition } from 'react-transition-group'

import Icon from '../../../Icon/Icon'
import List from '../../../List/List'
import Tabs from '../../../Tabs/Tabs'
import { InputInner } from '../../../Forms/FormPartials'
import Button from '../../../Button/Button'

import type { Props as TabProps } from '../../../Tabs/Tabs'
import type { Props as ListProps } from '../../../List/List'
import type { Props as ListItemProps } from '../../../List'

type TabbedListProps = { text: string, items: Array<ListItemProps> }

type Props = {
	/** The placeholder displayed in search bar */
	searchPlaceholder?: string,

	/** The list of initial results to show when search is displayed */
	initialSearchResults?: Array<ListProps>,

	/** Get search suggestions as search value changes */
	getSearchSuggestions: (value: string) => Promise<Array<ListProps>>,

	/** Debounce time in ms for getSearchSuggestions calls */
	getSearchSuggestionsDebounce: number,

	/** Handle search submit. Can respond with a list or tabbed lists of results */
	getSearchResults?: (
		value: string
	) => Promise<ListProps | Array<TabbedListProps>>,

	/** Handle close button click */
	onClose?: () => void
}

type State = {
	isAddButtonVisible: boolean,
	searchValue: string,
	searchContextBarIsHighlighted: boolean,
	activeSearchResultsTabIndex: number,
	suggestedSearchResults: Array<ListProps>,
	searchResults: Array<ListProps>
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
		suggestedSearchResults: []
	}

	bigSearchRef: any = React.createRef()
	searchInputRef: any = React.createRef()

	componentDidMount = () => {
		this.searchInputRef && this.searchInputRef.current.focus()
	}

	getSearchSuggestions = debounce(async (searchValue: string) => {
		try {
			const suggestedSearchResults = await this.props.getSearchSuggestions(
				searchValue
			)
			this.setState({ suggestedSearchResults: suggestedSearchResults })
		} catch (err) {
			// TODO: Track error here?
		}
	}, this.props.getSearchSuggestionsDebounce)

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
		if (this.props.getSearchResults) {
			const searchValue = this.state.searchValue
			try {
				const searchResults = await this.props.getSearchResults(searchValue)
				this.setState({ searchResults: searchResults })
			} catch (err) {
				// TODO: Track error here?
			}
		}
	}

	handleClearSearchValue = () => {
		this.setState({ searchValue: '' })
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

	renderSearchResultsList = (results: ListProps) => {
		return <List isSmall={true} {...results} />
	}

	renderTabbedSearchResults = (results: Array<TabbedListProps>) => {
		const { activeSearchResultsTabIndex } = this.state
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
	}

	renderSearchResults = () => {
		const { searchValue, suggestedSearchResults } = this.state
		const { initialSearchResults, searchResults } = this.props

		if (
			initialSearchResults &&
			suggestedSearchResults.length === 0 &&
			!searchResults
		) {
			return initialSearchResults.map<ListProps>(this.renderSearchResultsList)
		} else if (suggestedSearchResults.length > 0 && !searchResults) {
			return suggestedSearchResults.map<ListProps>(this.renderSearchResultsList)
		} else if (searchResults) {
			return Array.isArray(searchResults)
				? this.renderTabbedSearchResults(searchResults)
				: this.renderSearchResultsList(searchResults)
		}
	}

	renderSearchContextButton = () => {
		const {
			searchValue,
			searchContextBarIsHighlighted,
			suggestedSearchResults
		} = this.state
		const { searchResults } = this.props

		if (suggestedSearchResults.length === 0 && !searchResults) {
			return (
				<Button
					className="big-search__search-view-add-btn"
					text="Quick add a new guest"
					icon={{ name: 'add' }}
				/>
			)
		} else if (searchValue && !searchResults) {
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
			searchContextBarIsHighlighted
		} = this.state

		const { searchPlaceholder } = this.props

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
						<div className="big-search__search-view-header">
							<form onSubmit={this.handleSearchSubmit}>
								<div className="big-search__search-view-search-bar">
									<div className={'text-input'}>
										<div className="text-input__inner">
											<Icon icon={'search'} className="text-input__icon-pre" />
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
						<div className="big-search__view-body">
							{this.renderSearchResults()}
						</div>
					</div>
				</div>
			</CSSTransition>
		)
	}
}
