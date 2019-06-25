import React from 'react'
import { useDocs, Link } from 'docz'

import IndexCard from './IndexCard'

const IndexComponents = () => {
	const docs = useDocs()
	const categories = {}
	docs.forEach(doc => {
		if (!categories[doc.menu]) {
			categories[doc.menu] = {
				name: doc.menu,
				route: doc.route
			}
		}
	})
	console.log({ docs, categories })
	return (
		<div className="docz__index-cards">
			{Object.keys(categories).map(key => {
				if (categories[key].name) {
					return (
						<Link
							className="docz__index-card-link"
							key={key}
							to={categories[key].route}
						>
							<IndexCard
								name={categories[key].name}
								icon={categories[key].name}
							/>
						</Link>
					)
				}
				return null
			})}
		</div>
	)
}

export default IndexComponents
