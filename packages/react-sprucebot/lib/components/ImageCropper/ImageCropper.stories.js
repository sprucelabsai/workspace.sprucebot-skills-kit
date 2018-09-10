'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _ImageCropper = require('./ImageCropper.md');

var _ImageCropper2 = _interopRequireDefault(_ImageCropper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('ImageCropper', module);
// import ImageCropper from './ImageCropper'

stories.addDecorator(_react4.withKnobs);

stories.add('Placeholder', function () {
  return _react2.default.createElement(
    'p',
    null,
    'Placeholder'
  );
});

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