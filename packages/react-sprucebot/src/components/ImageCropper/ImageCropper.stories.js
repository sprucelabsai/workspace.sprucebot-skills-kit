import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
// import ImageCropper from './ImageCropper'
import readme from './ImageCropper.md'

const stories = storiesOf('ImageCropper', module)
stories.addDecorator(withKnobs)

stories.add('Placeholder', () => <p>Placeholder</p>)

// stories.add(
// 	'Interactive',
// 	withReadme(readme, () => (
// 		<ImageCropper
// 			base64Image=""
// 			imageUrl=""
// 			onSave={() => null}
// 			badImageMessage=""
// 			outOfDateBrowserMessage=""
// 			uploadImageFailedMessage=""
// 			loadingImageFailedMessage=""
// 			uploadButtonText="Upload"
// 			uploadNewButtonText="Upload New"
// 			tapToCropButtonText="Crop"
// 			saveButtonText="Save"
// 			cancelButtonText="Cancel"
// 			accept=""
// 			crop={{
// 				width: 100,
// 				height: 100,
// 				x: 0,
// 				y: 0,
// 				aspect: 1
// 			}}
// 			tapToCrop={false}
// 		/>
// 	))
// )
