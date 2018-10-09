// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import SidebarExpander from './components/SidebarExpander/SidebarExpander'
import SidebarItem, {
	Props as ItemProps
} from './components/SidebarItem/SidebarItem'
import SidebarFooter from './components/SidebarFooter/SidebarFooter'

type Props = {
	items: Array<ItemProps>
}
type State = {
	isExpanded: boolean
}

export default class Sidebar extends Component<Props, State> {
	state = {
		isExpanded: true
	}

	toggleExpanded = () => {
		this.setState(prevState => ({
			isExpanded: !prevState.isExpanded
		}))
	}

	render() {
		const { isExpanded } = this.state
		const { items } = this.props

		return (
			<aside
				className={cx('sidebar', {
					'sidebar--is-collapsed': !isExpanded
				})}
			>
				<SidebarExpander
					toggleExpanded={this.toggleExpanded}
					isExpanded={isExpanded}
				/>
				<ul className="sidebar__inner">
					{items.map((item, idx) => (
						<SidebarItem key={idx} {...item} />
					))}
				</ul>
				<SidebarFooter />
			</aside>
		)
	}
}
