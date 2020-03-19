import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
const Reset = props => <noscript />

Reset.updateCursor = (cursor, { count, delay, speed }) => {
	return {
		...cursor,
		numToErase: count,
		preEraseLineNum: cursor.lineNum,
		speed: speed > 0 ? speed : cursor.speed,
		delay: delay > 0 ? cursor.delay + delay : cursor.delay,
		step: 'line'
	}
}

Reset.getName = () => 'Reset'

Reset.propTypes = {
	delay: PropTypes.number
}

export default Reset
