import React from 'react'
import { IHWImage } from '@sprucelabs/spruce-types'

export interface IImageProps extends Omit<IHWImage, 'id'> {
	id?: string

	alt?: string | null

	width?: number

	height?: number
}

const Image = (props: IImageProps | IHWImage): React.ReactElement => {
	const { id, alt, width, height, src } = props as IImageProps

	const imageProps = {
		id: id || undefined,
		alt: alt || undefined,
		width: width || undefined,
		height: height || undefined,
		src: src || undefined
	}

	return <img {...imageProps} />
}

export default Image
