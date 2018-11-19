const Classes = require('../../classes')

module.exports = {
	title: 'Drop Zone',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n${markup}\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		uploadBtnText: 'Upload Files',
		defaultIcon:
			'<path fill="none" d="M24.5001 54.8332H3.50008C2.21142 54.8332 1.16675 53.7885 1.16675 52.4998V3.49984C1.16675 2.21117 2.21142 1.1665 3.50008 1.1665H34.5171C35.1362 1.16725 35.7297 1.41403 36.1668 1.8525L44.8164 10.4998C45.254 10.9373 45.5 11.5307 45.5001 12.1495V19.8332" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M20.8554 36.0967C15.1327 35.4477 10.74 30.7198 10.5126 24.965C10.2853 19.2101 14.2914 14.1504 19.945 13.0519C25.5986 11.9534 31.2079 15.1448 33.152 20.5661" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M22.1667 17.502V24.502H26.8334" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M40.8335 54.8355C48.5655 54.8355 54.8335 48.5674 54.8335 40.8355C54.8335 33.1035 48.5655 26.8354 40.8335 26.8354C33.1015 26.8354 26.8335 33.1035 26.8335 40.8355C26.8335 48.5674 33.1015 54.8355 40.8335 54.8355Z" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M40.8335 47.8355V33.8354" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M40.8335 33.8354L35.5835 39.0855" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M40.8335 33.8354L46.0835 39.0855" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/>'
	},
	variants: [
		{
			name: 'Is Hovered',
			context: {
				isHovered: true,
				helperText: 'Drop files to upload them'
			}
		},
		{
			name: 'Is Uploading',
			context: {
				isUploading: true
			}
		},
		{
			name: 'Has Error',
			context: {
				hasError: true,
				helperText: 'Please upload an image file'
			}
		},
		{
			name: 'Success',
			context: {
				uploadSuccess: true
			}
		},
		{
			name: 'Small',
			context: {
				isSmall: true
			}
		},
		{
			name: 'circular',
			context: {
				isSmall: true,
				isCircular: true
			}
		}
	]
}
