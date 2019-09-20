import React from 'react'
import { IHWImage } from '@sprucelabs/spruce-types'

export interface IImageProps extends Omit<IHWImage, 'id'> {
	id?: string

	alt?: string

	width?: number

	height?: number
}

const Image = (props: IImageProps): React.ReactElement => <img {...props} />

export default Image
