module.exports = {
	title: 'Color',
	context: {
		pageContext: {
			colorGroups: {
				primaries: {
					colors: [
						{value: '#0076d6', name: 'Primary', variable: '$c-primary'},
						{value: '#0099ff', name: 'Primary Light', variable: '$c-primary-light'},
						{value: '#005499', name: 'Primary Dark', variable: '$c-primary-dark'}
					]
				},
				greyscale: {
					colors: [
						{value: '#242933', name: 'Body', variable: '$c-body'},
						{value: '#525966', name: 'Body, Light', variable: '$c-body-light'},
						{value: '#737780', name: 'Body, Icon', variable: '$c-body-icon'},
						{value: '#9599A2', name: 'Placeholder', variable: '$c-placeholder'},
						{value: '#f2f4f7', name: 'Light Body', variable: '$c-light-body', textColor: '#242933'},
						{value: '#d7d9de', name: 'Light Body, Light', variable: '$c-light-body-light', textColor: '#242933'},
						{value: '#0a0b0d', name: 'Black', variable: '$c-black'},
						{value: '#12141a', name: 'Black 90', variable: '$c-black-90'},
						{value: '#3d424d', name: 'Black 80', variable: '$c-black-80'},
						{value: '#f9fafc', name: 'Off White', variable: '$c-off-white', textColor: '#242933'},
						{value: '#fff', name: 'White', variable: '$c-white', textColor: '#242933'},
						{value: '#e6e8eb', name: 'Grey 20', variable: '$c-grey-20', textColor: '#242933'},
						{value: '#c7cbd1', name: 'Border', variable: '$c-border', textColor: '#242933'}
					]
				},
				ui: {
					colors: [
						{value: '#00b2a4', name: 'Online', variable: '$c-online'},
						{value: '#ccf3f0', name: 'Online, Light', variable: '$c-online-light', textColor: '#242933'},
						{value: '#e51b3d', name: 'Caution', variable: '$c-caution'},
						{value: '#fdd3d4', name: 'Caution, Light', variable: '$c-caution-light', textColor: '#242933'},
						{value: '#e0edf8', name: 'Input Autofill', variable: '$c-input-autofill', textColor: '#242933'}
					]
				}
			}
		}
	}
}