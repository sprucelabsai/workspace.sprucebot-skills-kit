// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import SidebarExpander from './components/SidebarExpander/SidebarExpander'
import SidebarItem, {
	Props as ItemProps
} from './components/SidebarItem/SidebarItem'
import SidebarFooter from './components/SidebarFooter/SidebarFooter'

type Props = {
	items: Array<ItemProps>,
	forceCloseSidebar: Function,
	sidebarIsVisible?: boolean
}
type State = {
	isExpanded: boolean
}

export default class Sidebar extends Component<Props, State> {
	state = {
		isExpanded: true
	}

	static defaultProps = {
		sidebarIsVisible: false
	}

	componentWillReceiveProps(newProps: Props) {
		// NOTE: Make sure the sidebar is expanded when the Hamburger is used
		if (newProps.sidebarIsVisible && !this.props.sidebarIsVisible) {
			this.setState({
				isExpanded: true
			})
		}
	}

	toggleExpanded = () => {
		this.setState(prevState => ({
			isExpanded: !prevState.isExpanded
		}))
	}

	render() {
		const { isExpanded } = this.state
		const { items, forceCloseSidebar } = this.props

		return (
			<aside
				className={cx('sidebar', {
					'sidebar--is-collapsed': !isExpanded
				})}
			>
				<SidebarExpander
					toggleExpanded={this.toggleExpanded}
					isExpanded={isExpanded}
					forceCloseSidebar={forceCloseSidebar}
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
