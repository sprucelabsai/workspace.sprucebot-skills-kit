import React from 'react'

const Container = React.forwardRef(({ className, ...props }, ref) => {
	return <div {...props} ref={ref} className={`container ${className || ''}`} />
})

export default Container
