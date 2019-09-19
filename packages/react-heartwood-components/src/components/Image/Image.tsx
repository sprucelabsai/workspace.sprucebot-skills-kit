import React from 'react'
import { IHWImage } from '@sprucelabs/spruce-types'

export interface IImageProps extends IHWImage {
	alt?: string
}

const Image = (props: IImageProps): React.ReactElement => <img {...props} />

export default Image
