import React, { Fragment } from 'react'
import Sidebar from './Sidebar'

const Page = ({ children, doc, location }) => {
	return (
		<div className="page">
			<Fragment>
				<Sidebar />
				<main className="page__content">
					<div className="layout">
						<div className="layout-section">{children}</div>
					</div>
				</main>
			</Fragment>
		</div>
	)
}

export default Page
