import React, { HTMLProps } from 'react'

export interface IImageProps extends HTMLProps<HTMLImageElement> {
	key?: string
}

const Image = (props: IImageProps) => {
	return <img />
}

export default Image
