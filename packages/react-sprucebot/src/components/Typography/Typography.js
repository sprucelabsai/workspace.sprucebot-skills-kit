import React from 'react'

export const Paragraph = ({ className, fine, ...props }) => {
	return (
		<p
			{...props}
			className={`${fine ? 'fine__print' : ''} ${className || ''}`}
		/>
	)
}

export const H1 = ({ className, with_subheader, ...props }) => {
	return (
		<h1
			{...props}
			className={`${with_subheader ? 'with__subheader' : ''} ${className ||
				''}`}
		/>
	)
}

export const H2 = ({ className, subheader, ...props }) => {
	return (
		<h2
			{...props}
			className={`${subheader ? 'is__subheader' : ''} ${className || ''}`}
		/>
	)
}

export const H3 = ({ className, ...props }) => {
	return <h3 {...props} className={`${className || ''}`} />
}

export const H4 = ({ className, ...props }) => {
	return <h4 {...props} className={`${className || ''}`} />
}

export const H5 = ({ className, ...props }) => {
	return <h5 {...props} className={`${className || ''}`} />
}

export const H6 = ({ className, ...props }) => {
	return <h6 {...props} className={`${className || ''}`} />
}

export const A = ({ className, ...props }) => {
	return <a {...props} className={`${className || ''}`} />
}

export const SectionHeading = ({ className, ...props }) => {
	return <h2 {...props} className={`profile__subtitle ${className || ''}`} />
}
