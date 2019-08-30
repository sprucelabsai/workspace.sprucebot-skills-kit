import React from 'react'

export interface IImageProps {
	key?: string
	src: string
	type?: string
	alt?: string
}

const Image = (props: IImageProps) => {
	return <img />
}

export default Image
