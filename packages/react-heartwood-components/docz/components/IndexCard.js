import React from 'react'
import Card from '../../src/components/Card/Card'

const IndexCard = ({
	name,
	description,
	icon,
	iconBg = '#8388f0',
	isSmall
}) => (
	<Card isSmall className="docz__index-card">
		<p className="docz__index-card-title">{name}</p>
	</Card>
)

export default IndexCard
