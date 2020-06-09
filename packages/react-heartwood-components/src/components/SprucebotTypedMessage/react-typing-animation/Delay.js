import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
const Delay = props => <noscript />

Delay.updateCursor = (cursor, { ms }) => {
	return {
		...cursor,
		delay: cursor.delay + ms
	}
}

Delay.getName = () => 'Delay'

Delay.propTypes = {
	ms: PropTypes.number
}

export default Delay
