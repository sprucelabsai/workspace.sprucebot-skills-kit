import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

const Cursor = ({ className }) => (
	<div className={cx(className, 'cursor')}>|</div>
)

Cursor.propTypes = { className: PropTypes.string }
Cursor.defaultProps = { className: '' }

export default Cursor
