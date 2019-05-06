// @flow

import React, {Fragment} from 'react'

type Props = { src: string,
	alt: string,
	className: string,
	width: string,
	height: string
}

// This component returns a wrapped img element that will handle image sources that fail to load.
// Regular JSX <img /> tag onError event does not work correclty with SSR so
// this component is used as a workaround.

const ImageSSR = (props: Props) => {
	const { className, alt, src, width, height } = props
	return (
		<div
			className="image-wrapper"
			dangerouslySetInnerHTML={{
				__html: `
					<img class=${className} alt=${alt} src="${src}"
					onerror="this.onerror=null;this.classList.add('error');"
					width=${width}
					height=${height} 
					/>
				`
			}}
		/>
	);
}

export default ImageSSR